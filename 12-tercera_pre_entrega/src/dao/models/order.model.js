import mongoose from "mongoose";

const collection = "Orders";
const orderSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: {
    type: String,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});

const orderModel = mongoose.model(collection, orderSchema);
export default orderModel;
