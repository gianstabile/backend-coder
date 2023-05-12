import { messageModel } from "../models/messages.model.js";

export default class MessageManager {
  constructor() {}

  getMessages = async () => {
    try {
      const messages = await messageModel.find().lean();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  createMessage = async (message) => {
    try {
      const createdMessage = await messageModel.create(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}
