import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  DataType,
  PrimaryKey,
  BelongsTo,
  BelongsToMany,
  Table,
  ForeignKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Trace from "./Trace";
import Repository from "./Repository";
import Application from "./Application";
import Contributer from "./Contributer";
import User from "./User";

@ObjectType()
@Table
export default class PullRequest extends Model<PullRequest> {
  @Field({ description: "Id of the pull request." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({
    description: "Original Id of the pull request in it's application.",
  })
  @Column
  public originalId!: string;

  @Field({ description: "Title of the pull request." })
  @Column
  public title!: string;

  @Field({ description: "Body of the pull request." })
  @Column
  public body!: string;

  @Field({ description: "Commit count of the pull request." })
  @Column
  public commits!: number;

  @Field(_ => String, { description: "head of the pull request."  })
  @Column(DataType.JSON)
  head: string

  @Field(_ => String
  , { description: "base of the pull request."  })
  @Column(DataType.JSON)
  base: string

  @Field({ description: "State of the pull request." })
  @Column
  public state!: string; // FIXME: Enum ?

  @Field({ description: "Is the pull request merged?." })
  @Column
  public merged!: boolean;

  @Field({ description: "Is the pull request mergeable?." })
  @Column
  public mergeable!: boolean;

  @Field({ description: "Is the pull request rebaseable?." })
  @Column
  public rebaseable!: boolean;

  @Field({ description: "Mergeable state of the pull request." })
  @Column
  public mergeableState!: string;

  @Field({ description: "Url of the pull request." })
  @Column
  public url!: string;

  @Field({ description: "Diff Url of the pull request." })
  @Column
  public diffUrl!: string;

  @Field({ description: "Patch Url of the pull request." })
  @Column
  public patchUrl!: string;

  @Field({ description: "Trace of the pull request." })
  @ForeignKey(() => Trace)
  @Column
  public traceId!: number;

  @BelongsTo(() => Trace)
  public trace!: Trace;

  @Field({ description: "Repository of the pull request." })
  @ForeignKey(() => Repository)
  @Column
  public repositoryId!: number;

  @BelongsTo(() => Repository)
  public repository!: Repository;

  @Field({ description: "Application of the pull request." })
  @ForeignKey(() => Application)
  @Column
  public applicationId!: number;

  @BelongsTo(() => Application)
  public application!: Application;

  @BelongsToMany(() => User, {
    through: () => Contributer,
    scope: {
      reference: "repository",
    },
    foreignKey: "userId",
    otherKey: "referenceId",
    constraints: false,
  })
  public contributors!: Array<User & { Contributer: Contributer }>;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
