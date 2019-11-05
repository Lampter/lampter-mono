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

import Lens from './Lens'
import Project from './Project'
import Repository from './Repository'

enum OpticRelation {
  PRIMARY = 'PRIMARY',
  DEPENDANT = 'DEPENDANT',
  INFORMATIONAL = 'INFORMATIONAL',
}

@ObjectType()
@Table
export default class Optic extends Model<Optic> {
  @Field({ description: 'Id of the lens.' })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number

  @Field({ description: 'Lens of the lens.' })
  @ForeignKey(() => Lens)
  @Column
  public lensId!: number

  @BelongsTo(() => Lens)
  public lens!: Lens

  @Field({ description: 'Optic type of the lens.' })
  @Column
  public optic!: string

  @Field({ description: 'Optic Id of the lens' })
  @Column
  public opticId!: number

  @Field({ description: 'Optic Id of the lens' })
  @Column({
    type: DataType.ENUM(...Object.keys(OpticRelation)),
  })
  public relation!: OpticRelation

  @BelongsTo(() => Project, { foreignKey: 'opticId', constraints: false })
  public project!: Project

  @BelongsTo(() => Repository, {
    foreignKey: 'opticId',
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
