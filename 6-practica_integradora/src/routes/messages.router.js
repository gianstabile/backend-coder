import { Router } from "express";
import MessageManager from "../dao/dbManagers/messageManager.js";
// import MessagesManager from "../dao/fileManagers/messageManager.js";

const messageManager = new MessageManager();
const router = Router();

router.get("/", async (req, res) => {
  const messages = await messageManager.getMessages();
  return res.send({ status: "success", payload: messages });
});

router.post("/", async (req, res) => {
  const {body} = req;
  const createdMessage = await messageManager.createMessage(body);
  return res.send({ status: "success", payload: createdMessage });
});

export default router;
