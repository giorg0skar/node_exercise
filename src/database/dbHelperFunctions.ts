import { Message } from "./models/message";
import { User } from "./models/user";

export const createNewUsersTable = async () => {
  await User.sync({ force: true });
};

export const createNewMessagesTable = async () => {
  await Message.sync({ force: true });
};

// const addNewUser = async ({id, name, surname, dateOfBirth, gender, username}) => {
export const addNewUsers = async (userArray) => {
  try {
    // await User.create({id, name, surname, dateOfBirth, gender, username});
    await User.bulkCreate(userArray);
  } catch (error) {
    console.error(error);
  }
};

// const addNewMessage = async ({id, content, sender, receiver, seen, timestampSent}) => {
export const addNewMessages = async (messagesArray) => {
  try {
    // await Message.create({id, content, sender, receiver, seen, timestampSent});
    await Message.bulkCreate(messagesArray);
  } catch (error) {
    console.error(error);
  }
};
