import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";
import __dirname from "./utils.js";

const app = express();
const port = 8080;

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

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", viewsRouter);
app.get("/realtimeproducts", viewsRouter);
