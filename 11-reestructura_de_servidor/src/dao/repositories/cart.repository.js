import { cartModel } from "../models/cart.model.js";

class CartRepository {
  constructor() {}

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(`Failed to get carts: ${error.message}`);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean();
      return cart;
    } catch (error) {
      throw new Error(`Failed to get cart by ID: ${error.message}`);
    }
  }

  async getCartByUserId(userId) {
    try {
      const cart = await cartModel
        .findOne({ user: userId })
        .populate("products.product");
      return cart;
    } catch (error) {
      throw new Error(`Failed to get cart by user ID: ${error.message}`);
    }
  }

  async getProductInCart(cartId, productId) {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }
      const productInCart = cart.products.find(
        (product) => product.product.toString() === productId
      );
      return productInCart || null; // Devuelve null si no se encuentra el producto
    } catch (error) {
      throw new Error(`Failed to get product in cart: ${error.message}`);
    }
  }

  async createCart(userId) {
    try {
      const cart = new cartModel({
        user: userId,
      });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  }

  async addCart(cart) {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      throw new Error(`Failed to add cart: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $push: { products: [{ product: productId, quantity }] } }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to add product to cart: ${error.message}`);
    }
  }

  async updateCart(cartId, body) {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: body.products } }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $set: { "products.$.quantity": quantity } }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(
        `Failed to update product quantity in cart: ${error.message}`
      );
    }
  }

  async emptyCart(cartId) {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: [] } } // Establece el arreglo de productos como vacío
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to empty cart: ${error.message}`);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId); // Obtén el carrito por su ID
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }

      // Busca el índice del producto en el arreglo de productos del carrito
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error(`Product not found in cart with ID ${cartId}`);
      }

      // Reduce la cantidad del producto en 1
      const product = cart.products[productIndex];
      product.quantity -= 1;

      // Si la cantidad del producto es 0, elimina el producto del arreglo de productos del carrito
      if (product.quantity === 0) {
        cart.products.splice(productIndex, 1);
      }

      await cart.save(); // Guarda el carrito actualizado

      return cart;
    } catch (error) {
      throw new Error(`Failed to delete product from cart: ${error.message}`);
    }
  }
}

export const cartRepository = new CartRepository();
