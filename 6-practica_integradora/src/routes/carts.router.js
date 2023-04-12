import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js";
import CartManager from "../dao/dbManagers/cartManager.js";
// import CartManager from "../dao/fileManagers/cartManager.js";
// import ProductManager from "../dao/fileManagers/productManager.js";

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

// DELETE /api/carts/:cid
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartManager.deleteCart({ _id: cid });
    return res.status(200).send({
      status: "Success",
      payload: result,
      response: "Cart deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: `Error`,
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

export default router;
