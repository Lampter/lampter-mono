import { Model, Table, Column, Unique } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Table
export class User extends Model<User> {
  @Field({ description: "Email of the user." })
  @Unique
  @Column
  public email!: string;

  @Field({ description: "Handle of the user." })
  @Column
  public handle!: string;
}
