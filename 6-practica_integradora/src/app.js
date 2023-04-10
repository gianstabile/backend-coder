import dotenv from "dotenv";
dotenv.config();

import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import messagesRouter from "./routes/messages.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";
import __dirname from "./utils.js";

const app = express();

//dotenv
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 8080;

//mongoose
const environment = async () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@practica-integradora.d7s7guz.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );
};

//socket.io
const httpServer = app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server ready in port", port);
});
socket.connect(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//handlebars
app.set("views", `${__dirname}/views`);
app.set("view engine", ".hbs");
app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: `${__dirname}/views/layout`,
  })
);

//routers
app.use("/api/products", productsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/carts", cartsRouter);

app.get("/", viewsRouter);
app.get("/realtimeproducts", viewsRouter);

environment();
