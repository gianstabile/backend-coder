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
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error; // Lanzar la excepción para manejarla en un nivel superior
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

  addProductToCart = async (cartId, productId) => {
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId }, 
        { $addToSet: { products: productId } } 
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}
