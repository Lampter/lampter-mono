import {
  Column,
  CreatedAt,
  DataType,
  Default,
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
  @PrimaryKey
  @Default(DataType.INTEGER)
  @Column({ primaryKey: true, type: DataType.INTEGER })
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
