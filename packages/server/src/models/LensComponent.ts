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
  UpdatedAt
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Lens from "./Lens";
import Project from "./Project";
import Repository from "./Repository";

enum LensComponentRelation {
  PRIMARY = "PRIMARY",
  DEPENDANT = "DEPENDANT",
  INFORMATIONAL = "INFORMATIONAL"
}

@ObjectType()
@Table
export default class LensComponent extends Model<LensComponent> {
  @Field({ description: "Id of the lens." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Lens of the lens." })
  @ForeignKey(() => Lens)
  @Column
  lensId: number;

  @BelongsTo(() => Lens)
  lens: Lens;

  @Field({ description: "Component type of the lens." })
  @Column
  component: string;

  @Field({ description: "Component Id of the lens" })
  @Column
  componentId: number;

  @Field({ description: "Component Id of the lens" })
  @Column({
    type: DataType.ENUM(...Object.keys(LensComponentRelation))
  })
  public relation!: LensComponentRelation;

  @BelongsTo(() => Project, { foreignKey: "componentId", constraints: false })
  project: Project;

  @BelongsTo(() => Repository, {
    foreignKey: "componentId",
    constraints: false
  })
  repository: Repository;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
