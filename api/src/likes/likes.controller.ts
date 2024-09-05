import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard, UserId } from 'src/common';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  likesList(@UserId() userId: string) {
    return this.likesService.getList(userId);
  }

  @Post()
  likeCat(@UserId() userId: string, @Body('cat_id') cat_id: string) {
    return this.likesService.likeCat(userId, cat_id);
  }

  @Delete(':cat_id')
  deleteLike(@UserId() userId: string, @Param('cat_id') cat_id: string) {
    return this.likesService.deleteLike(userId, cat_id);
  }
}
