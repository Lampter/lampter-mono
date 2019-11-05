import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Table,
  Unique,
  UpdatedAt
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Application from "./Application";

@ObjectType()
@Table
export default class Project extends Model<Project> {
  @Field({ description: "Id of the project." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Original Id of the project in it's application." })
  @Unique
  @Column
  public originalId!: string;

  @Field({ description: "Title of the project." })
  @Unique
  @Column
  public title!: string;

  @Field({ description: "Url of the project." })
  @Unique
  @Column
  public url!: string;

  @Field({ description: "Application of the project." })
  @ForeignKey(() => Application)
  @Column
  applicationId: number;

  @BelongsTo(() => Application)
  application: Application;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
