import { LikeEntity } from 'src/likes/entities/like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
