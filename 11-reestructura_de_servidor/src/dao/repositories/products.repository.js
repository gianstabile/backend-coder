import { productModel } from "../models/products.model.js";

class ProductRepository {
  constructor() {
    this.model = productModel;
  }

  async getProducts(limit, page, category, status, sortBy) {
    try {
      const query = {};

      // Filtro category
      if (category) {
        query.category = category;
      }

      // Filtro status
      if (status) {
        query.status = status;
      }

      const products = await this.model.paginate(query, {
        limit,
        page,
        lean: true,
        sort: sortBy,
      });

      return products;
    } catch (error) {
      throw new Error(
        `Failed to fetch products from the database. Error: ${error.message}`
      );
    }
  }

  async getProductById(id) {
    try {
      const product = await this.model.findById(id).lean();
      return product;
    } catch (error) {
      throw new Error(`Error getting product by ID: ${error}`);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await this.model.create(product);
      return createdProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  async updateProduct(pid, body) {
    try {
      const updatedProduct = await this.model.updateOne({ _id: pid }, body);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async deleteProduct(pid) {
    try {
      const deletedProduct = await this.model.deleteOne({ _id: pid });
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}

export const productRepository = new ProductRepository();
