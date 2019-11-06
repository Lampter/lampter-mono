import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  BelongsTo,
  Table,
  ForeignKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Lens from "./Lens";

@ObjectType()
@Table
export default class Trace extends Model<Trace> {
  @Field({ description: "Id of the trace." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Title of the trace." })
  @Column
  public title!: string;

  @Field({ description: "Lens of the trace." })
  @ForeignKey(() => Lens)
  @Column
  public lensId!: number;

  @BelongsTo(() => Lens)
  public lens!: Lens;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
