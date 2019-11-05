import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
  Unique,
  UpdatedAt,
  Scopes,
} from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import Project from './Project'
import Repository from './Repository'
import LensComponent from './LensComponent'

@ObjectType()
@Table
export default class Lens extends Model<Lens> {
  @Field({ description: 'Id of the lens.' })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number

  @Field({ description: 'Title of the lens.' })
  @Column
  public title!: string

  @BelongsToMany(() => Project, {
    through: () => LensComponent,
    scope: {
      component: 'project',
    },
    foreignKey: 'lensId',
    otherKey: 'componentId',
    constraints: false,
  })
  projects: Array<Project & { LensComponent: LensComponent }>

  @BelongsToMany(() => Repository, {
    through: () => LensComponent,
    scope: {
      component: 'repository',
    },
    foreignKey: 'lensId',
    otherKey: 'componentId',
    constraints: false,
  })
  repositories: Array<Repository & { LensComponent: LensComponent }>

  @Field()
  @CreatedAt
  public createdAt!: Date

  @Field()
  @UpdatedAt
  public updatedAt!: Date
}
