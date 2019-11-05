import { Sequelize } from "sequelize-typescript";

import User from "../models/User";
import Lens from "../models/Lens";
import Trace from "../models/Trace";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.db",
  models: [User, Lens, Trace]
});
