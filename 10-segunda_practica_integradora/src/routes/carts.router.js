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

    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .send({ status: "Error", error: "Carts not found." });
    }

    return res.send({ status: "Success", payload: carts });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// GET /api/carts/:cartId
router.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartManager.getCartsById(cartId);

    if (!cart) {
      return res
        .status(404)
        .send({ status: "Error", error: "Cart not found." });
    }

    return res.send({ status: "Success", payload: cart });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// POST /api/carts
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const cart = await cartManager.addCart(body);

    return res.status(201).send({
      status: "Success",
      payload: cart,
      message: "Cart created successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// POST /api/carts/:cartId/products/:productId
router.post("/:cartId/products/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.qty;

    function isInvalidQuantity(qty) {
      return !qty || qty <= 0;
    }

    if (isInvalidQuantity(quantity)) {
      return res.status(400).send({
        status: "Error",
        error: "Invalid quantity. Quantity must be greater than zero.",
      });
    }

    const cart = await cartManager.getCartsById(cartId);
    const product = await productManager.getProductsById(productId);

    if (!cart || !product) {
      return res.status(404).send({
        status: "Error",
        error: "Cart or product not found.",
      });
    }

    const productInCart = await cartManager.getProductInCart(cartId, productId);
    if (productInCart) {
      const updatedQuantity = productInCart.quantity + quantity;
      await cartManager.updateProductQuantity(
        cartId,
        productId,
        updatedQuantity
      );
    } else {
      await cartManager.addProductToCart(cartId, productId, quantity);
    }

    const updatedCart = await cartManager.getCartsById(cartId);
    const numProductsInCart = updatedCart.products.length;

    return res.status(200).send({
      status: "Success",
      message: `${quantity} product(s) added to cart.`,
      cart: updatedCart,
      numProductsInCart: numProductsInCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Error",
      error: "Internal server error. Please try again later.",
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
    return res.status(500).send({
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

    return res.send({
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
    return res.send({
      status: "Success",
      payload: result,
      response: "Cart emptied successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

// DELETE PRODUCT OF CART /api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const result = await cartManager.deleteProductFromCart(cartId, productId);
    return res.send({
      status: "Success",
      payload: result,
      response: "Product deleted successfully from cart",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
});

export default router;
