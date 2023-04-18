import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";

export default class CartManager {
  constructor() {}
  getCarts = async () => {
    try {
      const carts = await cartModel.find().lean();
      if (carts.length > 0) {
        return carts;
      } else {
        throw new Error("No carts found.");
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await cartModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean();
      if (cart) {
        return cart;
      } else {
        throw new Error("Cart not found.");
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  addCart = async (cart) => {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      throw error;
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $push: { products: [{ product: productId, quantity }] } }
      );

      return updatedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  updateCart = async (cartId, body) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: body.products } }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } }
      );
      return updatedCart;
    } catch (error) {
      throw new Error(
        `Failed to update product quantity in cart: ${error.message}`
      );
    }
  };

  emptyCart = async (cartId) => {
    // Corrección en el parámetro
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: [] } } // Establece el arreglo de productos como vacío
      );

      return updatedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteProductFromCart = async (cartId, productId) => {
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

      // Elimina el producto del arreglo de productos del carrito
      cart.products.splice(productIndex, 1);
      await cart.save(); // Guarda el carrito actualizado

      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
