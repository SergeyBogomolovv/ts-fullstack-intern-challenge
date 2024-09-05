import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
