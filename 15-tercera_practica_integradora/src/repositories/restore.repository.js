import { restore } from "./../dao/db/restore.dao.js";

class RestoreRepository {
  constructor() {
    this.manager = restore;
  }

  create = async (data) => {
    try {
      return await this.manager.create(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      return await this.manager.findByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByToken = async (token) => {
    try {
      return await this.manager.findByToken(token);
    } catch (error) {
      throw new Error(error);
    }
  };

  setRestored = async (id) => {
    try {
      return await this.manager.setRestored(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      return await this.manager.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const restoreRepository = new RestoreRepository();
