import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { UserEntity } from './users/entities/user.entity';
import { LikeEntity } from './likes/entities/like.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    LikesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().integer().required(),
        POSTGRES_HOST: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),

        CAT_API_KEY: Joi.string().required(),

        CORS_ORIGIN: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [UserEntity, LikeEntity],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
      global: true,
    }),
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
