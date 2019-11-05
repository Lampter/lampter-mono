import { Sequelize } from "sequelize-typescript";

import User from "../models/User";
import Lens from "../models/Lens";
import Trace from "../models/Trace";
import Application from "../models/Application";
import Repository from "../models/Repository";
import Project from "../models/Project";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.db",
  models: [User, Lens, Trace, Application, Repository, Project]
});
