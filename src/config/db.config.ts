import { Sequelize } from "sequelize-typescript";
import { Tasks } from "../models/task.model";

const connection = new Sequelize({
    dialect: "sqlite",
    database: "todos",
    storage: 'database.sqlite',
    logging: false,
    models: [Tasks]
});

export default connection;