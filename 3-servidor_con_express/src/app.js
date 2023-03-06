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

//endpint que muestra todos los productos o la cantidad especificada por query
app.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();
    let { limit } = req.query;

    if (limit) {
      if (isNaN(limit)) {
        throw new Error("Invalid query.");
      }
      let filterProducts = products.slice(0, limit);
      res.send(filterProducts);
    } else {
      res.send(products);
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//endpoint que filtra por params por Id de producto
app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await manager.getProductsById(Number(pid));

    if (!product) throw new Error("Product not found.");

    res.send(product);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server ready in port", port);
});
