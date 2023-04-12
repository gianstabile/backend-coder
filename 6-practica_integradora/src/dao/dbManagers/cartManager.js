import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  constructor() {}
  getCarts = async () => {
    try {
      const carts = await cartModel.find().lean();
      if (carts) {
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await cartModel.findById(id).lean();
      if (cart) {
        return cart;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
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
        { $addToSet: { products: { productId, quantity } } }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteCart = async (id) => {
    try {
      const deletedCart = await cartModel.deleteOne(id);
      return deletedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
