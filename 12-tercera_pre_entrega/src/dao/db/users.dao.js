import userModel from "../models/user.model.js";

export default class usersDao {
  constructor() {}

  getUserById = async (id) => {
    try {
      const user = await userModel.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
