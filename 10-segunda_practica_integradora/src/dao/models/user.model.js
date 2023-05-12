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
    // required: true,
    unique: true,
  },
  age: Number,
  address: String,
  password: {
    type: String,
    // required: true,
  },
  thumbnails: Array,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
