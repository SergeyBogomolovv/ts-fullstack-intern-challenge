import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: AddUserDto, @Res() response: Response) {
    const { token, user } = await this.usersService.create(dto);
    response.setHeader('X-Auth-Token', token);
    return response.json(user);
  }
}
