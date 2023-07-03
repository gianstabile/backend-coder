import { logger } from "../utils/logger.js";
import passport from "passport";
import userModel from "../dao/models/user.model.js";
import { createHash } from "../utils/utils.js";

export const register = passport.authenticate("register", {
  failureRedirect: "/api/sessions/failregister",
});

export const failRegister = (req, res) => {
  logger.error("Authentication error");

  return res.json({ status: "error", error: "Authentication error" });
};

export const getLogin = passport.authenticate("login", {
  failureRedirect: "/api/sessions/faillogin",
});

export const processLogin = (req, res) => {
  req.session.user = {
    name: `${req.user.first_name} ${req.user.last_name}`,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
    thumbnails: req.user.thumbnails,
    cart: req.user.cart,
  };

  logger.info("User logged in");

  res.json({
    status: "success",
    message: "Logged In",
    payload: req.user,
  });
};

export const failLogin = (req, res) => {
  return res.json({ status: "error", error: "Invalid credentials." });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error("Logout error", err);
      return res.status(500).json({ status: "error", message: "Logout error", error: err });
    }

    logger.info("User logged out");

    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

export const getProfile = (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
  } else {
    res.redirect("/login");
  }
};

export const getRestore = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      logger.error("User does not exist");
      return res.status(404).json({ status: "error", error: "User does not exist" });
    }

    const hashedPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashedPassword });

    logger.info("Successfully updated password.");
    return res.json({
      status: "success",
      message: "Successfully updated password.",
    });
  } catch (error) {
    logger.error("Internal Server Error", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const gitHub = passport.authenticate("github", { scope: ["user:email"] });

export const gitHubCb = passport.authenticate("github", { failureRedirect: "/login" });

export const processGitHubCb = (req, res) => {
  req.session.user = req.user;
  res.redirect("/profile");
};
