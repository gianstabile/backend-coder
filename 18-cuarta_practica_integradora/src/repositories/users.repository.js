import UsersDao from "../dao/db/user.dao.js";

export default class UsersRepository {
  constructor() {
    this.userDao = new UsersDao();
  }

  getUserById = async (id) => {
    try {
      const user = await this.userDao.getUserById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  createUser = async (user) => {
    try {
      const createdUser = await this.userDao.createUser(user);
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  saveUser = async (user) => {
    try {
      if (user.last_connection) {
        await this.userDao.updateLastConnection(user._id, user.last_connection);
      }
      return await this.userDao.saveUser(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByCartId = async (cartId) => {
    try {
      return await this.userDao.findByCartId(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      return await this.userDao.findByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id) => {
    try {
      return await this.userDao.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  changeRole = async (userId, role) => {
    try {
      return await this.userDao.changeRole(userId, role);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateDocuments = async (userId, createdDocument) => {
    try {
      return await this.userDao.updateDocuments(userId, createdDocument);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateLastConnection = async (userId, lastConnection) => {
    try {
      await this.userDao.updateLastConnection(userId, lastConnection);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateHasUploadedDocuments = async (userId, value) => {
    try {
      await this.userDao.updateHasUploadedDocuments(userId, value);
    } catch (error) {
      throw new Error(error);
    }
  };
}
