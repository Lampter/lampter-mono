import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
  Table,
  ForeignKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Trace from "./Trace";
import Project from "./Project";
import Application from "./Application";

@ObjectType()
@Table
export default class Issue extends Model<Issue> {
  @Field({ description: "Id of the issue." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Original Id of the Issue in it's application." })
  @Column
  public originalId!: string;

  @Field({ description: "Title of the issue." })
  @Column
  public title!: string;

  @Field({ description: "Body of the issue." })
  @Column
  public body!: string;

  @Field(_ => String, { description: "labels of the issue." })
  @Column(DataType.JSON)
  public labels!: string;

  @Field({ description: "State of the issue." })
  @Column
  public state!: string; // FIXME: Enum ?

  @Field({ description: "Url of the issue." })
  @Column
  public url!: string;

  @Field({ description: "Comment count of the issue." })
  @Column
  public comments!: number;

  @Field({ description: "Trace of the issue." })
  @ForeignKey(() => Trace)
  @Column
  public traceId!: number;

  @BelongsTo(() => Trace)
  public trace!: Trace;

  @Field({ description: "Project of the issue." })
  @ForeignKey(() => Project)
  @Column
  public projectId!: number;

  @BelongsTo(() => Project, { constraints: false })
  public project!: Project;

  @Field({ description: "Application of the issue." })
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
