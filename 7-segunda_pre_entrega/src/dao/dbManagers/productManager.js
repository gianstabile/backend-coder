import { productModel } from "../models/products.model.js";

export default class ProductManager {
  constructor() {}

  getProducts = async () => {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductsById = async (id) => {
    try {
      const product = await productModel.findById(id).lean();
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      const createdProduct = await productModel.create(product);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (pid, body) => {
    try {
      const updatedProduct = await productModel.updateOne(
        { _id: pid },
        { body }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (pid) => {
    try {
      const deletedProduct = await productModel.deleteOne({ _id: pid });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}
