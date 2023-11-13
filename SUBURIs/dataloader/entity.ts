import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  userId!: number;

  @Column()
  published!: boolean;
}

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  userId!: number;
}
