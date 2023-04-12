import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [30, "Too long!"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      maxLength: [10, "Not valid!"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      maxLength: [5, "Too long!"],
      required: true,
    },
    status: String,
    code: {
      type: Number,
      maxLength: [8, "Characters limit"],
      required: true,
      unique: true,
    },
    thumbnails: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
