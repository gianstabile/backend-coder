import passport from "passport";
import local from "passport-local";
import config from "../config/config.js";
import userModel from "../dao/models/user.model.js";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";
import { cartModel } from "../dao/models/carts.model.js";

const LocalStrategy = local.Strategy;
const { github } = config;

const initializePassport = () => {
  //REGISTER
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, address } = req.body;

          const user = await userModel.findOne({ email });
          if (user) {
            console.log("User already exists");
            return done(null, false, { message: "User already exists" });
          }

          const cart = await cartModel.create({});
          const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            address,
            role: "user",
            password: createHash(password),
            cart: cart._id,
          });

          const result = await newUser.save();

          return done(null, result);
        } catch (error) {
          console.error("Error when trying to find user:", error);
          return done(error);
        }
      }
    )
  );

  //LOGIN
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            console.log("User not found.");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.log("Invalid user or password.");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //GITHUB
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: github.clientId,
        clientSecret: github.clientSecret,
        callbackURL: github.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            const newUser = {
              first_name: profile.displayName,
              last_name: profile._json.last_name || "",
              email: profile._json.email,
              password: "",
              thumbnails: profile._json.avatar_url,
              // Añadir más propiedades aquí si es necesario
            };

            const result = await userModel.create(newUser);
            return done(null, result);
          }

          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
