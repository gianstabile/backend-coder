import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import passport from "passport";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

// REGISTER
router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failRegister",
  }),
  checkLogged,
  async (req, res) => {
    return res.json({ status: "success", payload: "User registered" });
  }
);

// FAIL REGISTER
router.get("/failregister", async (req, res) => {
  console.log("Failed Register");
  return res.json({ status: "error", error: "Authentication error" });
});

// LOGIN
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  checkLogged,
  async (req, res) => {
    req.session.user = {
      name: `${req.user.first_name} ${req.user.last_name}`,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      thumbnails: req.user.thumbnails,
      cart: req.user.cart,
    };

    res.json({
      status: "success",
      message: "Logged In",
      payload: req.user,
    });
  }
);

// FAIL LOGIN
router.get("/faillogin", async (req, res) => {
  console.log("Login failed!");
  return res.json({ status: "error", error: "Invalid credentials." });
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

// RESTORE
router.put("/restore", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", error: "User does not exist" });
    }

    const hashedPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashedPassword });

    return res.json({
      status: "success",
      message: "Successfully updated password.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect("/profile");
  }
);

export default router;
