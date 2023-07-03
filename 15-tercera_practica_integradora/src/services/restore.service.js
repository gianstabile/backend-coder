import { calculateExpirationDate, createHash, generateUniqueToken } from "../utils/utils.js";
import UserRepository from "./../repositories/users.repository.js";
import { restoreRepository } from "./../repositories/restore.repository.js";
import { sendEmail } from "../utils/sendEmail.js";
import CustomError from "../errors/customError.js";
import { errorsCause, errorsMessage, errorsName } from "../errors/errorDictionary.js";
import { restorePasswordTemplate } from "../emails/restore.password.js";

const userRepository = new UserRepository();

class RestoreService {
  constructor() {
    this.repository = restoreRepository;
    this.userRepository = userRepository;
  }

  async createRestore(email) {
    try {
      const userExists = await this.userRepository.findByEmail(email);

      if (!userExists) {
        CustomError.generateCustomError({
          name: errorsName.RESTORE_ERROR_NAME,
          message: errorsMessage.USER_NOT_FOUND_MESSAGE,
          cause: errorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
        });
      }

      const token = generateUniqueToken();
      const expiredAt = calculateExpirationDate();

      const restoreData = {
        email: userExists.email,
        token,
        created_at: new Date(),
        expired_at: expiredAt,
      };

      const restore = await this.repository.create(restoreData);

      if (!restore) {
        CustomError.generateCustomError({
          name: errorsName.RESTORE_ERROR_NAME,
          message: errorsMessage.RESTORE_NOT_CREATED_MESSAGE,
          cause: errorsCause.RESTORE_NOT_CREATED_CAUSE,
        });
      } else {
        const subject = "Password reset";
        const message = restorePasswordTemplate(token);

        await sendEmail(email, subject, message);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async restorePassword(token) {
    try {
      const restore = await this.repository.findByToken(token);
      if (!restore) {
        return null;
      }

      const actualDatetime = new Date();
      const expirationDatetime = new Date(restore.expired_at);

      if (actualDatetime.getTime() > expirationDatetime.getTime()) {
        return null;
      }

      return restore;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changePassword(token, newPassword) {
    try {
      const restore = await this.repository.findByToken(token);
      if (!restore) {
        CustomError.generateCustomError({
          name: errorsName.RESTORE_ERROR_NAME,
          message: errorsMessage.RESTORE_NOT_FOUND_MESSAGE,
          cause: errorsCause.RETORE_NOT_FOUND_CAUSE,
        });
      }
      const user = await this.userRepository.findByEmail(restore.email);
      if (!user) {
        CustomError.generateCustomError({
          name: errorsName.RESTORE_ERROR_NAME,
          message: errorsMessage.USER_NOT_FOUND_MESSAGE,
          cause: errorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
        });
      }

      await this.repository.setRestored(restore._id);

      user.password = createHash(newPassword);
      return await this.userRepository.saveUser(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const restoreService = new RestoreService();
