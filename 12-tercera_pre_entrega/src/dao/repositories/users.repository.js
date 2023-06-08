import UsersDao from "../db/user.dao.js";

export default class UsersRepository {
  constructor() {
    this.userDao = new UsersDao();
  }

  getUserById = async (id) => {
    try {
      const user = await this.userDao.getUserById(id);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const createdUser = await this.userDao.createUser(user);
      return createdUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  findByCartId = async (cartId) => {
    try {
      return await this.userDao.findByCartId(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };
}
