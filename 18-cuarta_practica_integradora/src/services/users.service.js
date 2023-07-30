import usersRepository from "../repositories/users.repository.js";
import { errorsCause, errorsMessage, errorsName } from "../errors/errorDictionary.js";
import __dirname from "../utils/utils.js";
import path from "path";

const basePath = path.resolve();

class UsersService {
  constructor() {
    this.usersRepository = new usersRepository();
  }

  getUserById = async (id) => {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  createUser = async (user) => {
    try {
      const createdUser = await this.usersRepository.createUser(user);
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id) => {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        CustomError.generateCustomError({
          name: errorsName.USER_NOT_FOUND,
          message: errorsMessage.USER_NOT_FOUND,
          cause: errorsCause.USER_NOT_FOUND,
        });
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      const user = await this.usersRepository.findByEmail(email);

      return user;
    } catch (error) {
      throw new Error(`Error retrieving user by email: ${error.message}`);
    }
  };

  changeRole = async (userId) => {
    try {
      const user = await this.usersRepository.findById(userId);
      if (!user) {
        CustomError.generateCustomError({
          name: errorsName.USER_NOT_FOUND,
          message: errorsMessage.USER_NOT_FOUND,
          cause: errorsCause.USER_NOT_FOUND,
        });
      }
      const role = user.role === "user" ? (user.role = "premium") : "user";
      const data = await this.usersRepository.changeRole(user._id, role);
      const response = {
        _id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        age: data.age,
        role: data.role,
        cart: data.cart,
      };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProfileImage = async (userId, profilePicture) => {
    try {
      const user = await this.usersRepository.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }

      if (!profilePicture) {
        throw new Error("No image was uploaded.");
      }

      const baseUrl = "http://localhost:8080";
      const profilePictureUrl = `${baseUrl}/uploads/profiles/${profilePicture}`;

      user.profilePicture = profilePictureUrl;

      await this.usersRepository.saveUser(user);

      return user;
    } catch (error) {
      throw new Error("Failed to upload profile image.");
    }
  };
}

export const usersService = new UsersService();
