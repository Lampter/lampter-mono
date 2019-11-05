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
export default class Lens extends Model<Lens> {
  @Field({ description: "Id of the lens." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Title of the lens." })
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
