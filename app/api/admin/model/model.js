import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import config from "../../../../config.js";
import logger from "../../../utils/logger.js";

// Database connection details
const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: (log) => {
      logger.info(`${log.message}`);
    },
  }
);

const Room = sequelize.define("Room", {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  available: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Synchronize the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Room model synchronized with the database");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

export default Room;
