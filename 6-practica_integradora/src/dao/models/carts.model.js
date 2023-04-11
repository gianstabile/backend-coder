import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
