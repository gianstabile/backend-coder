import { cartRepository } from "../repositories/cart.repository.js";
import { productRepository } from "../repositories/products.repository.js";

class CartService {
  async getCarts() {
    return await cartRepository.getCarts();
  }

  async getCartById(cid) {
    return await cartRepository.getCartById(cid);
  }

  async getCartByUserId(userId) {
    return await cartRepository.getCartByUserId(userId);
  }

  async getProductInCart(cid, pid) {
    return await cartRepository.getProductInCart(cid, pid);
  }

  async createCart(userId) {
    return await cartRepository.createCart(userId);
  }

  async addCart(cart) {
    return await cartRepository.addCart(cart);
  }

  async addProductToCart(cid, pid, quantity) {
    const cart = await cartRepository.getCartById(cid);
    const product = await productRepository.getProductById(pid);

    if (!cart || !product) {
      throw new Error("Cart or product not found.");
    }

    const productInCart = await cartRepository.getProductInCart(cid, pid);
    if (productInCart) {
      const updatedQuantity = productInCart.quantity + quantity;
      await cartRepository.updateProductQuantity(cid, pid, updatedQuantity);
    } else {
      await cartRepository.addProductToCart(cid, pid, quantity);
    }

    return await cartRepository.getCartById(cid);
  }

  async updateCart(cartId, cartData) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }

      const updatedCart = await cartRepository.updateCart(cartId, cartData);
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartRepository.getCartById(cid);
    const product = await productRepository.getProductById(pid);

    if (!cart || !product) {
      throw new Error("Cart or product not found.");
    }

    await cartRepository.updateProductQuantity(cid, pid, quantity);
  }

  async emptyCart(cid) {
    const cart = await cartRepository.getCartById(cid);
    if (!cart) {
      throw new Error("Cart not found.");
    }

    return await cartRepository.emptyCart(cid);
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }

      const productInCart = await cartRepository.getProductInCart(cartId,productId);
      console.log(productInCart)
      if (!productInCart) {
        throw new Error(`Product not found in cart with ID ${cartId}`);
      }

      if(productInCart.quantity === 1){
        await cartRepository.deleteProductFromCart(cartId, productId);
      } else {
        await cartRepository.updateProductQuantity(cartId, productId, productInCart.quantity - 1);
      }

      const updatedCart = await cartRepository.getCartById(cartId);

      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to delete product from cart: ${error.message}`);
    }
  }
}

export const cartService = new CartService();
