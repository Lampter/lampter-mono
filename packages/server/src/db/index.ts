import { Sequelize } from "sequelize-typescript";

import User from "../models/User";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.db",
  models: [User]
});
