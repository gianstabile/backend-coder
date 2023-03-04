import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

let port = 8080;
let manager = new ProductManager("./files/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h3>Welcome to Express server!</h3>`);
});

//endpint que muestra todos los productos
app.get("/products", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.json(allProducts);
});

//endpoint que filtra por query por cantidad solicitada
//no me permitía partir de products?limit , por eso agregué una "q" a la url
app.get("/products/q", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();

  if (Number.isNaN(limit)) {
    return res.send({ Error: "Not found." });
  }

  const filterProducts = await products.slice(0, limit);
  res.send(filterProducts);
});

//endpoint que filtra por params por Id de producto
app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductsById(Number(pid));

  if (!product) return res.send({ Error: "Product not found." });
  res.send(product);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server ready in port", port);
});
