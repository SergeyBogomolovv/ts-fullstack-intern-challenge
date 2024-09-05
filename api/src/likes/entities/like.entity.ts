import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @Column()
  cat_id: string;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;
}
