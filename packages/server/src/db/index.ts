import { Sequelize } from "sequelize-typescript";

import User from "../models/User";
import Lens from "../models/Lens";
import Optic from "../models/Optic";
import Trace from "../models/Trace";
import Application from "../models/Application";
import Repository from "../models/Repository";
import Project from "../models/Project";
import Issue from "../models/Issue";
import PullRequest from "../models/PullRequest";
import Contributer from "../models/Contributer";
import Event from "../models/Event";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.db",
  models: [
    User,
    Lens,
    Optic,
    Trace,
    Application,
    Repository,
    Project,
    PullRequest,
    Issue,
    Contributer,
    Event,
  ],
});
