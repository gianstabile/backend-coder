import { Router } from "express";
import { uploader } from "../utils.js";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

const carts = await cartManager.listCarts();
const products = await productManager.getProducts();

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const cart = carts.find((cart) => cart.id === parseInt(req.params.cid));
    if (!cart)
      return res.status({
        status: `Error`,
        error: `Cart not found.`,
      });
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${err}`,
    });
  }
});

// POST /api/carts
router.post("/", uploader.single("file"), async (req, res) => {
  try {
    const cart = {
      products: [],
    };

    if (carts.length === 0) {
      cart.id = 1;
    } else {
      const lastCart = carts[carts.length - 1];
      if (lastCart.id === undefined) {
        return res
          .status(400)
          .send("The last cart in the list does not have an ID.");
      }
      cart.id = lastCart.id + 1;
    }
    cartManager.addCart(cart);

    return res
      .status(200)
      .send({ status: `Success`, response: `Cart created successfully.` });
  } catch (err) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${err}`,
    });
  }
});

// POST /api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const qty =  req.body.qty;

    const cart = carts.find((cart) => cart.id === cid);
    const product = products.find((prod) => prod.id === pid);

    if (!cart)
      return res
        .status(404)
        .send({ status: `Error`, error: `Cart not found.` });
    if (!product)
      return res
        .status(404)
        .send({ status: `Error`, error: `Product not found` });

    const updateCart = {
      id: pid,
      quantity: qty,
    };

    cartManager.addProductToCart(updateCart, cid);

    return res
      .status(200)
      .send({ status: `Success`, message: `Product added to cart.` });
  } catch (err) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${err}`,
    });
  }
});

export default router;
