import usersRepository from "../repositories/users.repository.js";

export default class UsersService {
  constructor() {
    this.usersRepository = usersRepository();
  }
  getUserById = async (id) => {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const createdUser = await this.usersRepository.createUser(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
