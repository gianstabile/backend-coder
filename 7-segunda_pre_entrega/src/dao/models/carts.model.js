import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("find", function () {
  this.populate("products");
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
