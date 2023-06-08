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

  findByCartId = async (cartId) => {
    try {
      const user = await userModel.findOne({ cart: cartId });
      return user;
    } catch (error) {
      throw new Error("Error finding user by cart ID: " + error.message);
    }
  };
}
