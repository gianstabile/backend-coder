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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  thumbnails: Array,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
