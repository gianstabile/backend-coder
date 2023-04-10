import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
  chat: {
    type: Schema.ObjectId,
    ref: "Chat",
  },
  user: {
    type: String,
    required: true,
  },
  message: { type: String, required: true },
  date: Date,
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export { messageModel };
