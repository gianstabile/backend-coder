import { cartRepository } from "../repositories/cart.repository.js";

class CartService {
  constructor() {}

  getCarts = async () => {
    try {
      return await cartRepository.getCarts();
    } catch (error) {
      throw new Error(`Failed to get carts: ${error.message}`);
    }
  };

  getCartById = async (id) => {
    try {
      return await cartRepository.getCartById(id);
    } catch (error) {
      throw new Error(`Failed to get cart by ID: ${error.message}`);
    }
  };

  getCartByUserId = async (userId) => {
    try {
      return await cartRepository.getCartByUserId(userId);
    } catch (error) {
      throw new Error(`Failed to get cart by user ID: ${error.message}`);
    }
  };

  getProductInCart = async (cartId, productId) => {
    try {
      return await cartRepository.getProductInCart(cartId, productId);
    } catch (error) {
      throw new Error(`Failed to get product in cart: ${error.message}`);
    }
  };

  createCart = async (userId) => {
    try {
      return await cartRepository.createCart(userId);
    } catch (error) {
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  };

  addCart = async (cart) => {
    try {
      return await cartRepository.addCart(cart);
    } catch (error) {
      throw new Error(`Failed to add cart: ${error.message}`);
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      return await cartRepository.addProductToCart(
        cartId,
        productId,
        quantity
      );
    } catch (error) {
      throw new Error(`Failed to add product to cart: ${error.message}`);
    }
  };

  updateCart = async (cartId, body) => {
    try {
      return await cartRepository.updateCart(cartId, body);
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      return await cartRepository.updateProductQuantity(
        cartId,
        productId,
        quantity
      );
    } catch (error) {
      throw new Error(
        `Failed to update product quantity in cart: ${error.message}`
      );
    }
  };

  emptyCart = async (cartId) => {
    try {
      return await cartRepository.emptyCart(cartId);
    } catch (error) {
      throw new Error(`Failed to empty cart: ${error.message}`);
    }
  };

  deleteProductFromCart = async (cartId, productId) => {
    try {
      return await cartRepository.deleteProductFromCart(cartId, productId);
    } catch (error) {
      throw new Error(`Failed to delete product from cart: ${error.message}`);
    }
  };
}

export const cartService = new CartService();
