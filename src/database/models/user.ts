import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  surname: {
    type: DataTypes.STRING,
  },

  dateOfBirth: {
    type: DataTypes.DATE,
  },

  gender: {
    type: DataTypes.STRING,
  },

  username: {
    type: DataTypes.STRING,
  },
});

export interface UserEntry {
  id?: number;
  name?: string;
  surname?: string;
  dateOfBirth?: Date;
  gender?: string;
  username?: string;
}

export const userProperties = [
  "id",
  "name",
  "surname",
  "dateOfBirth",
  "gender",
  "username",
];
