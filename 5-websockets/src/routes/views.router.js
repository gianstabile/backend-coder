import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  let products = await productManager.getProducts();

  res.render("home", {
    style: "index.css",
    title: "List of products",
    nameShopping: "SuperMax",
    products,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  let products = await productManager.getProducts();

  res.render("realTimeProducts", {
    style: "index.css",
    title: "List of products",
    nameShopping: "SuperMax",
    products,
  });
});

export default router;
