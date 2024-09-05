import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { compare, hash, genSaltSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: AddUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      login: dto.login,
    });

    if (existingUser) {
      const isPasswordsMatch = await this.compare(
        dto.password,
        existingUser.password,
      );
      if (isPasswordsMatch) {
        return {
          token: this.generateToken(existingUser.id),
          user: existingUser,
        };
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.usersRepository.save({
      ...dto,
      password: hashedPassword,
    });

    return { token: this.generateToken(user.id), user };
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, genSaltSync());
  }

  private compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  private generateToken(id: string) {
    return this.jwtService.sign({ id });
  }
}
