import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private likesRepository: Repository<LikeEntity>,
    private readonly usersService: UsersService,
  ) {}

  async likeCat(userId: string, cat_id: string) {
    const user = await this.usersService.findOneOrFail(userId);
    const like = this.likesRepository.create({
      cat_id,
      user,
    });

    return this.likesRepository.save(like);
  }

  async deleteLike(userId: string, cat_id: string) {
    const like = await this.likesRepository.findOne({
      where: { user: { id: userId }, cat_id },
    });
    if (!like) {
      return;
    }
    return this.likesRepository.remove(like);
  }

  getList(userId: string) {
    return this.usersService.getUsersLikes(userId);
  }
}
