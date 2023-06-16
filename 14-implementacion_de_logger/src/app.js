// Express y middleware
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
// Utilidades y configuraciones
import { logger } from "./utils/logger.js";
import db from "./config/db.js";
import config from "./config/config.js";
import __dirname from "./utils.js";
import errorHandlerMiddleware from "./errors/error.middleware.js";
import initializePassport from "./auth/passport.js";
// Paquetes adicionales
import path from "path";
import MongoStore from "connect-mongo";
import nodemailer from "nodemailer";
import passport from "passport";
// Rutas
import socket from "./socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ordersRouter from "./routes/orders.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// Inicialización
const app = express();

// Logger
// app.use(addLogger);
app.get("/loggerTest", (req, res) => {
  logger.debug("This is a debug message");
  logger.http("This is an HTTP message");
  logger.info("This is an info message");
  logger.warning("This is a warning message");
  logger.error("This is an error message");
  logger.fatal("This is a fatal message");

  res.send("Logger test completed");
});

// Config
const { server, mailConfig } = config;

// Server
const httpServer = app.listen(server.port, (err) => {
  if (err) {
    logger.error(err);
    throw new Error(err);
  }
  logger.info("Server ready on port " + server.port);
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
