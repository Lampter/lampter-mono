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
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Lens from "./Lens";
import Project from "./Project";
import Repository from "./Repository";

enum OpticRelation {
  PRIMARY = "PRIMARY",
  DEPENDANT = "DEPENDANT",
  INFORMATIONAL = "INFORMATIONAL",
}

@ObjectType()
@Table
export default class Optic extends Model<Optic> {
  @Field({ description: "Id of the optic." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Lens of the optic." })
  @ForeignKey(() => Lens)
  @Column
  public lensId!: number;

  @BelongsTo(() => Lens)
  public lens!: Lens;

  @Field({ description: "Reference table of the optic." })
  @Column
  public reference!: string;

  @Field({ description: "Reference Id of the optic." })
  @Column
  public referenceId!: number;

  @Field({ description: "Relation of the optic." })
  @Column({
    type: DataType.ENUM(...Object.keys(OpticRelation)),
  })
  public relation!: OpticRelation;

  @BelongsTo(() => Project, { foreignKey: "referenceId", constraints: false })
  public project!: Project;

  @BelongsTo(() => Repository, {
    foreignKey: "referenceId",
    constraints: false,
  })
  public repository!: Repository;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
