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
      console.log(error);
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await cartModel.findById(id).lean();
      if (cart) {
        return cart;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async (cart) => {
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
