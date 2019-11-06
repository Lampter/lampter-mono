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
  PULL_REQUEST__ASSIGNED = "PULL_REQUEST__ASSIGNED",
  PULL_REQUEST__CLOSED = "PULL_REQUEST__CLOSED",
  PULL_REQUEST__EDITED = "PULL_REQUEST__EDITED",
  PULL_REQUEST__LABELED = "PULL_REQUEST__LABELED",
  PULL_REQUEST__OPENED = "PULL_REQUEST__OPENED",
  PULL_REQUEST__REOPENED = "PULL_REQUEST_REOPENED",
  PULL_REQUEST__REVIEW_REQUESTED_REMOVED = "PULL_REQUEST__REVIEW_REQUESTED_REMOVED",
  PULL_REQUEST__REVIEW_REQUESTED = "PULL_REQUEST__REVIEW_REQUESTED",
  PULL_REQUEST__UNASSIGNED = "PULL_REQUEST__UNASSIGNED",
  PULL_REQUEST__UNLABELED = "PULL_REQUEST__UNLABELED",
  PULL_REQUEST__SYNCHRONIZE = "PULL_REQUEST__SYNCHRONIZE",
  PULL_REQUEST_REVIEW__EDITED = "PULL_REQUEST_REVIEW__EDITED",
  PULL_REQUEST_REVIEW__SUBMITTED = "PULL_REQUEST_REVIEW__SUBMITTED",
  PULL_REQUEST_REVIEW__DISMISSED = "PULL_REQUEST_REVIEW__DISMISSED",
  PULL_REQUEST_REVIEW_COMMENT__CREATED = "PULL_REQUEST_REVIEW_COMMENT__CREATED",
  PULL_REQUEST_REVIEW_COMMENT__EDITED = "PULL_REQUEST_REVIEW_COMMENT__EDITED",
  PULL_REQUEST_REVIEW_COMMENT__DELETED = "PULL_REQUEST_REVIEW_COMMENT__DELETED",
  ISSUES__ASSIGNED = "ISSUES__ASSIGNED",
  ISSUES__CLOSED = "ISSUES__CLOSED",
  ISSUES__DELETED = "ISSUES__DELETED",
  ISSUES__DEMILESTONED = "ISSUES__DEMILESTONED",
  ISSUES__EDITED = "ISSUES__EDITED",
  ISSUES__LABELED = "ISSUES__LABELED",
  ISSUES__MILESTONED = "ISSUES__MILESTONED",
  ISSUES__OPENED = "ISSUES__OPENED",
  ISSUES__REOPENED = "ISSUES__REOPENED",
  ISSUES__TRANSFERED = "ISSUES__TRANSFERED",
  ISSUES__UNASSIGNED = "ISSUES__UNASSIGNED",
  ISSUES__UNLABELED = "ISSUES__UNLABELED",
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
