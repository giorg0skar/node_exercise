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
    type: DataTypes.INTEGER,
  },

  receiver: {
    type: DataTypes.INTEGER,
  },

  seen: {
    type: DataTypes.BOOLEAN,
  },

  timestampSent: {
    type: DataTypes.DATE,
  },
});

export interface MessageEntry {
  id?: number;
  content?: string;
  sender?: number;
  receiver?: number;
  seen?: boolean;
  timestampSent?: Date;
}

export const messageProperties = [
  "id",
  "content",
  "sender",
  "receiver",
  "seen",
  "timestampSent",
];
