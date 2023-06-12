import dotenv from "dotenv";
dotenv.config();

import express from "express";
import socket from "./socket.js";
import nodemailer from "nodemailer";
import handlebars from "express-handlebars";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import db from "./config/db.js";
import config from "./config/config.js";
import __dirname from "./utils.js";
import errorHandlerMiddleware from "./errors/error.middleware.js";
import initializePassport from "./auth/passport.js";
import path, { dirname } from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ordersRouter from "./routes/orders.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// Inicialización
const app = express();

// Config
const { server, mailConfig } = config;

// Server
const httpServer = app.listen(server.port, (err) => {
  if (err) console.log(err);
  console.log("Server ready on port", server.port);
});

// Nodemailer
const transport = nodemailer.createTransport({
  service: mailConfig.mailService,
  port: mailConfig.mailPort,
  auth: {
    user: mailConfig.mailName,
    pass: mailConfig.mailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.database.dbUrl,
      ttl: 15,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.session.secret,
    cookie: { maxAge: 1600000 },
  })
);

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  handlebars.create({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layout"),
  }).engine
);

// Database
db.connect();

// Endpoints
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
// Nodemailer endpoint
app.get("/mail", async (req, res) => {
  const userLoggedEmail = req.user.email;
  let result = await transport.sendMail({
    from: process.env.USER_MAIL,
    to: userLoggedEmail,
    subject: "Probando Nodemailer desde App Coder!",
    html: `
    <div>
      <h1>This is a second test!</h1>
    </div>
    `,
    attachments: [],
  });
  res.send({ status: "success", result: "Email sent." });
});

// Socket
socket.connect(httpServer);

// Middleware error
app.use(errorHandlerMiddleware);
