import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [30, "Too long!"],
      required: true,
      index: true,
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
      enum: [
        "Gaseosas",
        "Galletitas",
        "Bebidas c/alcohol",
        "Bebidas s/alcohol",
        "Otros",
      ],
      default: "Otros",
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
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
