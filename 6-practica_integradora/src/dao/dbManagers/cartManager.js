import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  constructor() {}
  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      if (carts) {
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await this.findById(id);
      if (cart) {
        return cart;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async (cart) => {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $addToSet: { product: productId } },
        { quantity }
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}
