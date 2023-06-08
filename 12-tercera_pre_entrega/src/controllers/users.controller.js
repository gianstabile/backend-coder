import { usersService } from "../dao/services/users.service.js";
import GetCurrentUserDTO from "../dao/currentuser.dto.js";
import { isValidPassword } from "../utils.js";

export const register = async (req, res) => {
  try {
    const userData = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    };

    const currentUser = new GetCurrentUserDTO(userData);

    return res.send({ status: "success", message: "User registered", currentUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};

export const failRegister = async (req, res) => {
  try {
    console.log("Failed Register");
    return res.send({ status: "error", error: "Authentication error" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.getUserById({ email });

    if (!user) {
      return res.status(401).send({ status: "error", error: "Invalid credentials" });
    }

    if (!isValidPassword(user, password)) {
      return res.status(401).send({ status: "error", error: "Invalid credentials" });
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
    console.log(error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};

export const gitHubLogin = async (req, res) => {
  try {
    req.session.user = req.user;
    console.log(req.user);

    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
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
    console.log(error);
    res.status(500).send({ status: "error", error: "Internal Server Error" });
  }
};
