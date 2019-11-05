import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Table,
  DataType,
  UpdatedAt,
} from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import User from './User'
import Project from './Project'
import Repository from './Repository'

enum ContributorRole {
  AUTHOR = 'AUTHOR',
  ASSIGNEE = 'ASSIGNEE',
  REVIEWER = 'REVIEWER',
  MERGER = 'MERGER',
  REFERENCED = 'REFERENCED',
}

@ObjectType()
@Table
export default class Contributer extends Model<Contributer> {
  @Field({ description: 'Id of the contributer.' })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number

  @Field({ description: 'User of the contributer.' })
  @ForeignKey(() => User)
  @Column
  public userId!: number

  @BelongsTo(() => User)
  public user!: User

  @Field({ description: 'Reference table of the contributer.' })
  @Column
  public reference!: string

  @Field({ description: 'Reference Id of the contributer.' })
  @Column
  public referenceId!: number

  @Field({ description: 'Role of the contributer.' })
  @Column({
    type: DataType.ENUM(...Object.keys(ContributorRole)),
  })
  public role!: ContributorRole

  @BelongsTo(() => Project, { foreignKey: 'referenceId', constraints: false })
  public project!: Project

  @BelongsTo(() => Repository, {
    foreignKey: 'referenceId',
    constraints: false,
  })
  public repository!: Repository

  @Field()
  @CreatedAt
  public createdAt!: Date

  @Field()
  @UpdatedAt
  public updatedAt!: Date
}
