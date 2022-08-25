import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { createNanoId } from './util/id';

@Entity()
export class User {
  @PrimaryColumn('varchar')
  readonly id!: string;

  @BeforeInsert()
  setId() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.id = createNanoId();
  }

  @Column()
  name!: string;

  @Column()
  emailaddress!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt!: Date;
}
