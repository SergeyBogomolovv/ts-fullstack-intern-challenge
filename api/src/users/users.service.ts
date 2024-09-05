import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: AddUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      login: dto.login,
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await this.hash(dto.password);
    return this.usersRepository.save({ ...dto, password: hashedPassword });
  }

  private hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, bcrypt.genSaltSync());
  }

  private compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
