import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const collection = "Orders";
const orderSchema = new mongoose.Schema({
  code: { type: String, default: uuidv4, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const orderModel = mongoose.model(collection, orderSchema);
export default orderModel;
