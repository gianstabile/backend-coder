import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
// import ProductManager from "../dao/fileManagers/productsManager.js";

const productManager = new ProductManager();
const router = Router();

//vista estática
router.get("/", async (req, res) => {
  const products = await productManager.getProducts()
  res.render("index", {
    style: "index.css",
    title: "List of products",
    nameShopping: "SuperMax",
    products,
  });
});

//vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    style: "index.css",
    title: "List of products",
    nameShopping: "SuperMax",
  });
});

export default router;
