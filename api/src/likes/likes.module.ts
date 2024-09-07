import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: 'https://api.thecatapi.com/v1',
        headers: {
          'x-api-key': config.get('CAT_API_KEY'),
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    TypeOrmModule.forFeature([LikeEntity]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
