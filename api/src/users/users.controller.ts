import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() dto: AddUserDto) {
    return this.usersService.create(dto);
  }
}
