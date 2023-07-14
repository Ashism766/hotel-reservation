import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import config from "../../../config.js";
import logger from "../../utils/logger.js";



// Database connection details
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: (log) => {
    logger.info(`${log.message}`); 
  }
});


// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Add the comparePassword method to the User model
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Synchronize the model with the database
sequelize.sync()
  .then(() => {
    console.log("User model synchronized with the database");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

export default User;
