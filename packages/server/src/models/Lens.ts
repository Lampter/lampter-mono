import {
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
  UpdatedAt,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";

import Project from "./Project";
import Repository from "./Repository";
import Optic from "./Optic";

@ObjectType()
@Table
export default class Lens extends Model<Lens> {
  @Field({ description: "Id of the lens." })
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Field({ description: "Title of the lens." })
  @Column
  public title!: string;

  @BelongsToMany(() => Project, {
    through: () => Optic,
    scope: {
      reference: "project",
    },
    foreignKey: "lensId",
    otherKey: "referenceId",
    constraints: false,
  })
  public projects!: Array<Project & { Optic: Optic }>;

  @BelongsToMany(() => Repository, {
    through: () => Optic,
    scope: {
      reference: "repository",
    },
    foreignKey: "lensId",
    otherKey: "referenceId",
    constraints: false,
  })
  public repositories!: Array<Repository & { Optic: Optic }>;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;
}
