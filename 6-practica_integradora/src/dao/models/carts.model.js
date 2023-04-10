import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  title: String,
  products: {
    type: Array,
    ref: "Products",
    default: [],
  },
  date: Date,
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
