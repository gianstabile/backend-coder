import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { usersService } from "../dao/services/users.service.js";
import { isValidPassword } from "../utils.js";
import GetCurrentUserDTO from "../dao/currentuser.dto.js";

export const register = async (req, res, next) => {
  try {
    const userData = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    };

    const currentUser = new GetCurrentUserDTO(userData);

    logger.info("User registered");
    return res.send({ status: "success", message: "User registered", currentUser });
  } catch (error) {
    const customError = CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });
    logger.error("Internal Server Error", customError);
    next(customError);
  }
};

export const failRegister = async (req, res, next) => {
  try {
    throw CustomError({
      name: errorsName.AUTHENTICATION_ERROR,
      message: errorsMessage.AUTHENTICATION_ERROR,
      cause: errorsCause.AUTHENTICATION_ERROR,
    });
  } catch (error) {
    logger.error("Authentication error", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.getUserById({ email });

    if (!user) {
      logger.warning("Invalid user.");
      throw CustomError({
        name: errorsName.INVALID_CREDENTIALS,
        message: errorsMessage.INVALID_CREDENTIALS,
        cause: errorsCause.INVALID_CREDENTIALS,
      });
    }

    if (!isValidPassword(user, password)) {
      logger.warning("Invalid password.");
      throw CustomError({
        name: errorsName.INVALID_CREDENTIALS,
        message: errorsMessage.INVALID_CREDENTIALS,
        cause: errorsCause.INVALID_CREDENTIALS,
      });
    }

    const userData = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      thumbnails: user.thumbnails,
      cart: user.cart,
    };

    const currentUser = new GetCurrentUserDTO(userData);

    req.session.user = currentUser;

    logger.info("User login successful");
    return res.send({
      status: "sucess",
      message: "Login sucessful",
      currentUser,
    });
  } catch (error) {
    logger.error("Login error", error);
    next(error);
  }
};

export const gitHubLogin = (req, res, next) => {
  try {
    const user = req.user;
    req.session.user = user;
    logger.info("User logged in with GitHub");
    res.redirect("/profile");
  } catch (error) {
    logger.error("GitHub login error", error);
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error("Logout error", err);
        return res.status(500).send({ status: "error", message: "Logout error", error: err });
      }
      res.clearCookie("connect.sid");
      logger.info("User logged out");
      res.redirect("/login");
    });
  } catch (error) {
    logger.error("Internal Server Error", error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};
