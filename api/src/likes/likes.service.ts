import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';
import { Favourite } from 'src/common/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private likesRepository: Repository<LikeEntity>,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async likeCat(userId: string, cat_id: string) {
    if (!cat_id) {
      throw new MethodNotAllowedException('Cat id is required');
    }

    try {
      const user = await this.usersService.findOneOrFail(userId);

      const { data } = await firstValueFrom(
        this.httpService.post<Favourite>('/favourites', {
          image_id: cat_id,
          sub_id: user.login,
        }),
      );

      const like = this.likesRepository.create({
        user,
        cat_id,
        favourite_id: data.id,
      });

      return this.likesRepository.save(like);
    } catch (error) {
      throw new BadRequestException('Invalid cat id');
    }
  }

  async deleteLike(userId: string, cat_id: string) {
    const like = await this.likesRepository.findOne({
      where: { user: { id: userId }, cat_id },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await firstValueFrom(
      this.httpService.delete<Favourite>(`/favourites/${like.favourite_id}/`),
    );

    return this.likesRepository.remove(like);
  }

  getList(userId: string) {
    return this.usersService.getUsersLikes(userId);
  }
}
