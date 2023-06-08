import { cartService } from "../dao/services/cart.service.js";
import { productService } from "../dao/services/products.service.js";
import { orderService } from "../dao/services/orders.service.js";

export async function getCarts(req, res) {
  try {
    const carts = await cartService.getCarts();

    if (!carts || carts.length === 0) {
      return res.status(404).send({ status: "Error", error: "Carts not found." });
    }

    return res.send({ status: "Success", payload: carts });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
}

export async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      return res.status(404).send({ status: "Error", error: "Cart not found." });
    }

    return res.send({ status: "Success", payload: cart });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
}

export async function getCartByUserId(req, res) {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductInCart(req, res) {
  const { cid, pid } = req.params;
  try {
    const productInCart = await cartService.getProductInCart(cid, pid);
    res.status(200).json(productInCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCart(req, res) {
  const { userId } = req.body;
  try {
    const cart = await cartService.createCart(userId);
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
}

export async function addCart(req, res) {
  const { cart } = req.body;
  try {
    const createdCart = await cartService.addCart(cart);
    res.status(201).json(createdCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addProductToCart(req, res) {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.qty;

  try {
    if (!cid) {
      return res.status(400).send({
        status: "Error",
        error: "Invalid cart ID.",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).send({
        status: "Error",
        error: "Invalid quantity. Quantity must be greater than zero.",
      });
    }

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      return res.status(404).send({
        status: "Error",
        error: "Cart or product not found.",
      });
    }

    const productInCart = await cartService.getProductInCart(cid, pid);
    if (productInCart) {
      const updatedQuantity = productInCart.quantity + quantity;
      await cartService.updateProductQuantity(cid, pid, updatedQuantity);
    } else {
      await cartService.addProductToCart(cid, pid, quantity);
    }

    const updatedCart = await cartService.getCartById(cid);
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
}

export async function updateCart(req, res) {
  try {
    const { cid } = req.params;
    const cartData = req.body;

    const cart = await cartService.getCartById(cid);
    if (!cart) {
      return res.status(404).send({ status: "Error", error: "Cart not found." });
    }

    const updatedCart = await cartService.updateCart(cid, cartData);

    return res.send({ status: "Success", payload: updatedCart });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error}`,
    });
  }
}

export async function updateProductQuantity(req, res) {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.qty;

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      return res.status(404).send({
        status: "Error",
        error: "Cart or product not found.",
      });
    }

    await cartService.updateProductQuantity(cid, pid, quantity);

    return res.send({
      status: "Success",
      message: "Product quantity updated in cart.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Error",
      error: "Internal server error. Please try again later.",
    });
  }
}

export async function emptyCart(req, res) {
  try {
    const { cid } = req.params;
    const result = await cartService.emptyCart(cid);

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
}

export async function deleteProductFromCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const updatedCart = await cartService.deleteProductFromCart(cid, pid);

    return res.send({
      status: "Success",
      payload: updatedCart,
      response: "Product deleted successfully from cart",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Error",
      error: `Internal server error. Exception: ${error.message}`,
    });
  }
}

export async function purchaseCart(req, res) {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found or empty" });
    }

    return res.json({ status: "success", message: "Purchase completed", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
