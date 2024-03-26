import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  content: {
    type: DataTypes.TEXT,
  },

  sender: {
    type: DataTypes.STRING,
  },

  retriever: {
    type: DataTypes.STRING,
  },

  seen: {
    type: DataTypes.BOOLEAN,
  },

  timestampSent: {
    type: DataTypes.DATE,
  },
});

export const messageProperties = [
  "id",
  "content",
  "sender",
  "receiver",
  "seen",
  "timestampSent",
];
