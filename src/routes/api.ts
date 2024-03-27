import express from "express";
import readXlsxFile from "read-excel-file/node";
import {
  Message,
  MessageEntry,
  messageProperties,
} from "../database/models/message";
import { userProperties, User, UserEntry } from "../database/models/user";
import {
  createNewUsersTable,
  createNewMessagesTable,
  addNewUsers,
  addNewMessages,
} from "../database/dbHelperFunctions";
import { Op } from "sequelize";
import { sequelize } from "../database/db";

const router = express.Router();
const pathToSeedsInputFile = "seeds.xlsx";

type Entry = UserEntry | MessageEntry;

const parseModelRowsToJsonArray = (rowsArray, modelProperties: string[]) => {
  const jsonArray: Entry[] = [];
  for (const row of rowsArray) {
    const entry = {} as Entry;
    for (let i = 0; i < modelProperties.length; i++) {
      if (
        modelProperties[i] === "dateOfBirth" ||
        modelProperties[i] === "timestampSent"
      ) {
        const dateToStore = new Date(row[i]);
        entry[modelProperties[i]] = dateToStore;
      } else {
        entry[modelProperties[i]] = row[i];
      }
    }
    jsonArray.push(entry);
  }
  return jsonArray;
};

router.post("/feedDB", async (req, res) => {
  // We create the tables from scratch.
  await createNewUsersTable();
  await createNewMessagesTable();

  // We need to read both users and messages sheets from the xlsx file.
  readXlsxFile(pathToSeedsInputFile)
    .then((rows) => {
      const usersRows = parseModelRowsToJsonArray(rows, userProperties);

      addNewUsers(usersRows);
    })
    .catch((error) => console.error(error));

  readXlsxFile(pathToSeedsInputFile, { sheet: 2 })
    .then((rows) => {
      const messageRows = parseModelRowsToJsonArray(rows, messageProperties);

      addNewMessages(messageRows);
    })
    .catch((error) => console.error(error));

  res.status(200).send({ message: "Database updated successfully" });
});

router.post("/users", async (req, res) => {
  // We search for users that satisfy all criteria in the request body.
  const queryParamsToFindUsers = {};

  for (const [key, value] of Object.entries(req?.body ?? {})) {
    // We ignore parameters that are not valid columns in the Users table.
    if (userProperties.includes(key)) {
      queryParamsToFindUsers[key] = value;
    }
  }

  const users = await User.findAll({ where: queryParamsToFindUsers });
  res.status(200).json(users);
});

router.get("/discussion", async (req, res) => {
  const { userId1, userId2 } = req.query;
  const id1 = Number(userId1);
  const id2 = Number(userId2);

  if (isNaN(id1) || isNaN(id2) || id1 === id2) {
    res.status(400).json("Please give 2 different valid user id's");
    return;
  }

  try {
    const messagesSentBetweenUsers = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: id1, receiver: id2 },
          { sender: id2, receiver: id1 },
        ],
      },
      order: [[sequelize.fn("max", sequelize.col("timestampSent")), "DESC"]],
      group: "id",
    });

    res.status(200).json({ messagesSentBetweenUsers });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
    return;
  }
});

router.post("/userChat/:id", async (req, res) => {
  // Retrieve a list of users that exchanged messages with the user with the given id. Sort by most recent message.
  // Idea: Get all messages that the user has sent or received and keep the receiver and sender ids. Keep a list of the unique ones and remove userId from that list.

  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json("Invalid user id given");
    return;
  }
  res.status(200).json([]);
});

export default router;
