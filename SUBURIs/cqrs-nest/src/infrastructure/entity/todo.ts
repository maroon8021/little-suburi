import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { createNanoId } from './util/id';

@Entity()
export class Todo {
  @PrimaryColumn('varchar')
  readonly id!: string;

  @BeforeInsert()
  setId() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.id = createNanoId();
  }

  @Column()
  content!: string;

  @Column({ name: 'is_completed' })
  isCompleted!: boolean;

  @Column({ name: 'user_id' })
  userId!: string;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User)
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt!: Date;
}
