import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Table
export default class User extends Model<User> {
  @Field({ description: "Id of the user." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Email of the user." })
  @Unique
  @Column
  public email!: string;

  @Column
  public password!: string;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
