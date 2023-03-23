import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();
const products = await productManager.getProducts();

//vista estática
router.get("/", async (req, res) => {
  res.render("home", {
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
