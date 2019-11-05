import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  BelongsTo,
  Table,
  ForeignKey,
  Unique,
  UpdatedAt
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Trace from "./Trace";
import Project from "./Project";

@ObjectType()
@Table
export default class Issue extends Model<Issue> {
  @Field({ description: "Id of the issue." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Title of the issue." })
  @Unique
  @Column
  public title!: string;

  @Field({ description: "Body of the issue." })
  @Column
  public body!: string;

  @Field({ description: "Trace of the issue." })
  @ForeignKey(() => Trace)
  @Column
  traceId: number;

  @BelongsTo(() => Trace)
  trace: Trace;

  @Field({ description: "Project of the issue." })
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @Field({ description: "Url of the issue." })
  @Unique
  @Column
  public url!: string;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
