import dotenv from "dotenv";
dotenv.config();

import express from "express";
import handlebars from "express-handlebars";
import socket from "./socket.js";
import morgan from "morgan";
import db from "./db.js";
import config from "./config.js";
import productsRouter from "./routes/products.router.js";
import messagesRouter from "./routes/messages.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import path from "path";
import __dirname from "./utils.js";

// Inicialización
const app = express();

// Config
const { server } = config;

// Socket.io
const httpServer = app.listen(server.port, (err) => {
  if (err) console.log(err);
  console.log("Server ready on port", server.port);
});
socket.connect(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

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
app.use("/api/products", productsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);
