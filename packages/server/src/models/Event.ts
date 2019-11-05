import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  BelongsTo,
  DataType,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import PullRequest from "./PullRequest";
import Issue from "./Issue";

enum EventAction {
  PR_OPENED = "PR_OPENED",
  PR_SYNCHRONIZE = "PR_SYNCHRONIZE",
  PR_CLOSED = "PR_CLOSED",
  PR_REVIEW_REQUESTED = "PR_REVIEW_REQUESTED",
  PR_REVIEW_REQUEST_REMOVED = "PR_REVIEW_REQUEST_REMOVED",
  PR_REVIEW_ASSIGNED = "PR_REVIEW_ASSIGNED",
  PR_REVIEW_EDITED = "PR_REVIEW_EDITED",
  PR_REVIEW_SUBMITTED = "PR_REVIEW_SUBMITTED",
  PR_REVIEW_DISMISSED = "PR_REVIEW_DISMISSED",
  PR_REVIEW_COMMENT_CREATED = "PR_REVIEW_COMMENT_CREATED",
  PR_REVIEW_COMMENT_EDITED = "PR_REVIEW_COMMENT_EDITED",
  PR_REVIEW_COMMENT_DELETED = "PR_REVIEW_COMMENT_DELETED",
  ISSUE_CREATED = "ISSUE_CREATED",
  ISSUE_EDITED = "ISSUE_EDITED",
  ISSUE_ASSIGNED = "ISSUE_ASSIGNED",
  ISSUE_MOVED = "ISSUE_MOVED",
  ISSUE_DELETED = "ISSUE_DELETED",
}
@ObjectType()
@Table
export default class Event extends Model<Event> {
  @Field({ description: "Id of the event." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Reference table of the event." })
  @Column
  public reference!: string;

  @Field({ description: "Reference Id of the event." })
  @Column
  public referenceId!: number;

  @Field({ description: "Action of the event." })
  @Column({
    type: DataType.ENUM(...Object.keys(EventAction)),
  })
  public action!: EventAction;

  @Field(_ => String, { description: "Payload of the event." })
  @Column(DataType.JSON)
  public payload!: string;

  @BelongsTo(() => PullRequest, {
    foreignKey: "referenceId",
    constraints: false,
  })
  public project!: PullRequest;

  @BelongsTo(() => Issue, {
    foreignKey: "referenceId",
    constraints: false,
  })
  public repository!: Issue;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
