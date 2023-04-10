import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";
// import CartManager from "../dao/fileManagers/cartManager.js";
// import ProductManager from "../dao/fileManagers/productManager.js";

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);

    if (!cart)
      res.status(404).send({ status: `Error`, error: `Cart not found.` });

    return res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${err}`,
    });
  }
});

// POST /api/carts
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const cart = await cartManager.createCart(body);

    res
      .status(200)
      .send({ status: `Success`, response: `Cart created successfully.` });
  } catch (error) {
    res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// POST /api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const qty = req.body.qty;
    let updateCart = {};

    const cart = await cartManager.getCartsById(Number(cid));
    const product = await productManager.getProductsById(Number(pid));

    if (!cart || !product)
      res
        .status(404)
        .send({ status: `Error`, error: `Cart or product not found.` });

    !qty
      ? ((updateCart.id = pid), (updateCart.quantity = +1))
      : ((updateCart.id = pid), (updateCart.quantity = qty));

    cartManager.addProductToCart(updateCart, cid);

    res
      .status(200)
      .send({ status: `Success`, message: `Product added to cart.` });
  } catch (error) {
    res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

export default router;
