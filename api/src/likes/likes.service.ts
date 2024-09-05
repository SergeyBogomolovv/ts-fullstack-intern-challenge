import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesService {
  likeCat(userId: string, cat_id: string) {
    return `This action adds a new like ${userId} ${cat_id}`;
  }

  deleteLike(userId: string, cat_id: string) {
    return `This action removes a like ${userId} ${cat_id}`;
  }

  getList(userId: string) {
    return `This action returns all likes ${userId}`;
  }
}
