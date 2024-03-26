import { Sequelize } from "sequelize";

const DB_NAME = "pccw_db";
const DB_USER = "pccw_user";
const DB_PASSWORD = "pccw_password";
const DB_HOST = "postgres_db"; // This MUST match the service name in docker-compose.yml

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

if (!sequelize) {
  testDbConnection();
}
