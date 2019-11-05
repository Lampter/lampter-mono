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
export default class Application extends Model<Application> {
  @Field({ description: "Id of the application." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Title of the application." })
  @Unique
  @Column
  public title!: string;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
