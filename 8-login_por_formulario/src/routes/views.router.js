import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

// PRODUCTS
router.get("/products", async (req, res, next) => {
  try {
    const { limit = 10, page = 1, category, status, sortBy } = req.query;

    let username = null;
    if (req.session.user && req.session.user.name) {
      username = req.session.user.name;
    }

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
      sectionPage: "List of tobaccos",
      nameShopping: "DOMINGOU",
      messageUser: username ? "Bienvenido/a, " + username + "!" : "",
      sessionUser: username,
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

router.get("/product/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductsById(productId);

    let username = null;
    if (req.session.user && req.session.user.name) {
      username = req.session.user.name;
    }

    res.render("product", {
      style: "./css/index.css",
      sectionPage: product.title,
      sessionUser: username,
      title: product.title,
      nameShopping: "DOMINGOU",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// CARTS
router.get("/cart", async (req, res, next) => {
  try {
    const cartId = "643e828d8c0d83dbf81cc118";
    const cart = await cartManager.getCartsById(cartId);

    let username = null;
    if (req.session.user && req.session.user.name) {
      username = req.session.user.name;
    }

    res.render("cart", {
      sectionPage: "Cart",
      nameShopping: "DOMINGOU",
      sessionUser: username,
      cart,
      products: cart.products,
      product: cart.products.product,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// USER
router.get("/login", checkLogged, (req, res) => {
  res.render("login", {
    style: "./css/index.css",
    sectionPage: "Login",
    nameShopping: "DOMINGOU",
  });
});

router.get("/register", checkLogged, (req, res) => {
  res.render("register", {
    style: "./css/index.css",
    sectionPage: "Register",
    nameShopping: "DOMINGOU",
  });
});

router.get("/profile", checkLogin, (req, res) => {
  let user = req.session.user;
  try {
    const thumbnails = user.thumbnails ? user.thumbnails : [];

    res.render("profile", {
      user: user,
      thumbnails: thumbnails,
      style: "./css/index.css",
      sectionPage: "Profile",
      sessionUser: req.session.user.name,
      nameShopping: "DOMINGOU",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "error", error: "Internal Server Error" });
    }
    res.redirect("/login");
  });
});

export default router;
