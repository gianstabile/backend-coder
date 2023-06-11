import generateError from "../utils/errorHandler.js";
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

    return res.send({ status: "success", message: "User registered", currentUser });
  } catch (error) {
    const customError = generateError("INTERNAL_SERVER_ERROR", error.message);
    next(customError);
  }
};

export const failRegister = async (req, res, next) => {
  try {
    throw generateError("AUTHENTICATION_ERROR");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.getUserById({ email });

    if (!user) {
      throw generateError("INVALID_CREDENTIALS");
    }

    if (!isValidPassword(user, password)) {
      throw generateError("INVALID_CREDENTIALS");
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

    return res.send({
      status: "sucess",
      message: "Login sucessful",
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const gitHubLogin = (req, res, next) => {
  try {
    const user = req.user;
    req.session.user = user;
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ status: "error", message: "Logout error", error: err });
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};
