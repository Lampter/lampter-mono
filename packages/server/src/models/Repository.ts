import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Application from "./Application";

@ObjectType()
@Table
export default class Repository extends Model<Repository> {
  @Field({ description: "Id of the repository." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Original Id of the repository in it's application." })
  @Column
  public originalId!: string;

  @Field({ description: "Title of the repository." })
  @Column
  public title!: string;

  @Field({ description: "Url of the repository." })
  @Column
  public url!: string;

  @Field({ description: "Application of the repository." })
  @ForeignKey(() => Application)
  @Column
  public applicationId!: number;

  @BelongsTo(() => Application)
  public application!: Application;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
