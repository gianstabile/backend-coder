import usersRepository from "../repositories/users.repository.js";

export default class UsersService {
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
}
