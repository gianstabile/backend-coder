import userModel from "../models/user.model.js";

export default class UsersDao {
  constructor() {}

  getUserById = async (id) => {
    try {
      const user = await userModel.findOne({ _id: id });
      return user;
    } catch (error) {
      throw new Error("Error retrieving user by ID: " + error.message);
    }
  };

  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  };

  saveUser = async (user) => {
    try {
      return await userModel.findOneAndUpdate({ _id: user._id }, { $set: user });
    } catch (error) {
      throw new Error("Error save user: " + error);
    }
  };

  findByCartId = async (cartId) => {
    try {
      const user = await userModel.findOne({ cart: cartId });
      return user;
    } catch (error) {
      throw new Error("Error finding user by cart ID: " + error.message);
    }
  };

  findByEmail = async (email) => {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id) => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  changeRole = async (userId, role) => {
    try {
      return await userModel.findOneAndUpdate({ _id: userId }, { role }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };
}
