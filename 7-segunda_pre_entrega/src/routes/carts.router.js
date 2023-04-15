import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

// GET /api/carts
router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();

    if (!carts) {
      return res
        .status(404)
        .send({ status: `Error`, error: `Carts not found.` });
    }

    return res.send({ status: "success", payload: carts });
  } catch (error) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);

    if (!cart) {
      return res
        .status(404)
        .send({ status: `Error`, error: `Cart not found.` });
    }

    return res.send({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// POST /api/carts
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const cart = await cartManager.addCart(body);

    return res.status(200).send({
      status: `Success`,
      payload: cart,
      response: `Cart created successfully.`,
    });
  } catch (error) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// POST /api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.qty;

    const cart = await cartManager.getCartsById(cid);
    const product = await productManager.getProductsById(pid);

    if (!cart || !product) {
      return res
        .status(404)
        .send({ status: `Error`, error: `Cart or product not found.` });
    }

    if (!qty) {
      await cartManager.addProductToCart(cid, pid);
    } else {
      await cartManager.addProductToCart(cid, pid, qty);
    }

    return res
      .status(200)
      .send({ status: `Success`, message: `Product added to cart.` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Please try again later.`,
    });
  }
});

// PUT /api/carts/:cid
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { body } = req;

    // Verificar si el carrito existe
    const cart = await cartManager.getCartsById(cid);
    if (!cart) {
      return res
        .status(404)
        .send({ status: `Error`, error: `Cart not found.` });
    }

    const updatedCart = await cartManager.updateCart(cid, body);

    return res.send({ status: "success", payload: updatedCart });
  } catch (error) {
    return res.send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.qty;

    const cart = await cartManager.getCartsById(cid);
    const product = await productManager.getProductsById(pid);

    if (!cart || !product) {
      return res
        .status(404)
        .send({ status: `Error`, error: `Cart or product not found.` });
    }

    await cartManager.updateProductQuantity(cid, pid, qty);

    return res
      .status(200)
      .send({
        status: `Success`,
        message: `Product quantity updated in cart.`,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Please try again later.`,
    });
  }
});

// EMPTY CART /api/carts/:cid
router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartManager.emptyCart(cartId);
    return res.status(200).send({
      status: "Success",
      payload: result,
      response: "Cart emptied successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// DELETE PRODUCT OF CART /api/carts/:cid/product/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const result = await cartManager.deleteProductToCart(cartId, productId);
    return res.status(200).send({
      status: "Success",
      payload: result,
      response: "Product deleted successfully from cart",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

export default router;
