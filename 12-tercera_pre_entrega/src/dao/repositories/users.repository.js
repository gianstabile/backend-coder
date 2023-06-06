import usersDao from "../db/users.dao.js";

export default class usersRepository {
  constructor(){
    this.userDao = usersDao()
  }
  getUserById = async (id) => {
    try {
      const user = await this.userDao.getUserById(id);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const user = await this.userDao.createUser(user);
      return user;
    } catch (error) {
      console.log();
      return null;
    }
  };
}
