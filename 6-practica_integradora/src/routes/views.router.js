import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
// import ProductManager from "../dao/fileManagers/productsManager.js";

const productManager = new ProductManager();
const router = Router();

// Vista estática
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("index", {
      style: "index.css",
      title: "List of products",
      nameShopping: "SuperMax",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts", {
      style: "index.css",
      title: "List of products",
      nameShopping: "SuperMax",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
