import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  address: String,
  password: {
    type: String,
  },
  thumbnails: Array,
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
