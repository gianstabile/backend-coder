import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import { productModel } from "../dao/models/products.model.js";

const productManager = new ProductManager();
const router = Router();

// // // Vista estática
// router.get("/", async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.render("index", {
//       products,
//       style: "index.css",
//       title: "List of products",
//       nameShopping: "SuperMax",
//     });
//   } catch (error) {
//     res.render("error", { error: "Internal server error." });
//   }
// });

//vista de productos
router.get("/products", async (req, res, next) => {
  try {
    const { limit = 10, page = 1, category, status, sortBy } = req.query;

    // products
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    } = await productModel.paginate(
      {},
      { limit, page, category, status, sortBy, lean: true }
    );

    // Renderizar la vista de productos
    res.render("products", {
      style: "index.css",
      title: "List of products",
      nameShopping: "SuperMax",
      products,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

//vista de 1 producto
router.get("/product/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await productModel.findById(productId).lean();

    res.render("product", {
      style: "product.css",
      title: product.title, 
      nameShopping: "SuperMax",
      product, 
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
