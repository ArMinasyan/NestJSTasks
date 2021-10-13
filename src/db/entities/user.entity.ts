import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";

@Entity({
  name: "users"
})
export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    default: false,
    nullable: false
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
