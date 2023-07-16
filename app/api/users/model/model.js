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

const Booking = sequelize.define("Booking", {
    bookingId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });


sequelize
  .sync()
  .then(() => {
    console.log("Booking model synchronized with the database");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

export default Booking;
