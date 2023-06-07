import dotenv from "dotenv";
dotenv.config();

import express from "express";
import socket from "./socket.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import db from "./config/db.js";
import config from "./config/config.js";
import __dirname from "./utils.js";
import initializePassport from "./auth/passport.js";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ordersRouter from "./routes/orders.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// Inicialización
const app = express();

// Config
const { server } = config;

// Server
const httpServer = app.listen(server.port, (err) => {
  if (err) console.log(err);
  console.log("Server ready on port", server.port);
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

// Routes
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Socket
socket.connect(httpServer);
