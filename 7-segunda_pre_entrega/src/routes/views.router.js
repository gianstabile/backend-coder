import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

//vista de products
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
    } = await productManager.getProducts(limit, page, category, status, sortBy);

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

//vista de product
router.get("/product/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await productManager.getProductsById(productId);

    res.render("product", {
      style: "index.css",
      title: product.title,
      nameShopping: "SuperMax",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

//vista del cart
router.get("/cart", async (req, res, next) => {
  try {
    const cartId = "643e828d8c0d83dbf81cc118";

    const cart = await cartManager.getCartsById(cartId);

    res.render("cart", {
      style: "index.css",
      title: "Cart",
      nameShopping: "SuperMax",
      cart,
      products: cart.products,
      product: cart.products.product,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
