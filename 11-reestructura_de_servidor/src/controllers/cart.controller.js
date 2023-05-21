import { cartService } from "../dao/services/cart.service.js";

export async function getCarts(req, res) {
  try {
    const carts = await cartService.getCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCartById(req, res) {
  const { id } = req.params;
  try {
    const cart = await cartService.getCartById(id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const { cartId, productId } = req.params;
  try {
    const productInCart = await cartService.getProductInCart(cartId, productId);
    res.status(200).json(productInCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCart(req, res) {
  const { userId } = req.body;
  try {
    const cart = await cartService.createCart(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const { cartId, productId, quantity } = req.body;
  try {
    const updatedCart = await cartService.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCart(req, res) {
  const { cartId } = req.params;
  const { body } = req;
  try {
    const updatedCart = await cartService.updateCart(cartId, body);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProductQuantity(req, res) {
  const { cartId, productId, quantity } = req.body;
  try {
    const updatedCart = await cartService.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function emptyCart(req, res) {
  const { cartId } = req.params;
  try {
    const updatedCart = await cartService.emptyCart(cartId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductFromCart(req, res) {
  const { cartId, productId } = req.params;
  try {
    const cart = await cartService.deleteProductFromCart(cartId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
