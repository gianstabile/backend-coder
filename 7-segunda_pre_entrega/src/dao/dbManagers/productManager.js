import { productModel } from "../models/products.model.js";

export default class ProductManager {
  constructor() {}

  getProducts = async (
    page = 1,
    limit = 10,
    skip = 0,
    sortBy = "price",
    sortOrder = "asc",
    category = null,
    status = null
  ) => {
    try {
      const pageSize = 10;
      const skip = (page - 1) * pageSize;
      const matchStage = {
        $match: {
          ...(category && { category: category }), // Filtrado por categoría
          ...(status && { status: status }), // Filtrado por estado
        },
      };
      const sortStage = {};
      if (sortBy) {
        sortStage.$sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
      }
      const products = await productModel.aggregate([
        matchStage, // Etapa de filtrado por categoría y estado
        sortStage,
        { $skip: skip },
        { $limit: pageSize },
      ]);

      // Calcular el total de páginas y si hay páginas previas y siguientes
      const totalProducts = await productModel.countDocuments(
        matchStage.$match
      );
      const totalPages = Math.ceil(totalProducts / pageSize);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;

      // Construir la respuesta con la estructura requerida
      const response = {
        status: "success",
        payload: products,
        totalPages: totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage ? `/products?page=${page - 1}` : null,
        nextLink: hasNextPage ? `/products?page=${page + 1}` : null,
      };

      return response;
    } catch (error) {
      throw new Error(`Error getting products: ${error}`);
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
