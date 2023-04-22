import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import userModel from "../dao/models/user.model.js";

const router = Router();

// REGISTER
router.post("/register", checkLogged, async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    }

    const user = {
      first_name,
      last_name,
      email,
      password,
    };
    await userModel.create(user);
    return res.json({ status: "success", payload: "user registered" });
  } catch (error) {
    console.log(error);
  }
});

// LOGIN
router.post("/login", checkLogged, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // validación
    if (!user || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "Incorrect credentials" });
    }

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
      thumbnails: user.thumbnails,
    };

    // res.redirect("/products");
    res.json({
      status: "success",
      message: "Logged In",
      name: req.session.user.name,
      email: req.session.user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "logout error", error: err });
    }
    res.clearCookie("connect.sid"); // Eliminamos la cookie de la sesión
    res.redirect("/login");
  });
});

// PROFILE
router.get("/profile", checkLogin, async (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
  } else {
    res.redirect("/login");
  }
});

export default router;
