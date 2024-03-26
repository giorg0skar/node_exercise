import { Sequelize } from "sequelize";

const DB_NAME = "myDB";
const DB_USER = "myuser";
const DB_PASSWORD = "pass";
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

// export default { sq: sequelize, testDbConnection };
