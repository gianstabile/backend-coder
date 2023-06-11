import { productRepository } from "../repositories/products.repository.js";

class ProductService {
  constructor() {
    this.productRepository = productRepository;
  }

  async getProducts(limit, page, category, status, sortBy) {
    try {
      return await this.productRepository.getProducts(limit, page, category, status, sortBy);
    } catch (error) {
      throw new Error(`Failed to fetch products. Error: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      return await this.productRepository.getProductById(id);
    } catch (error) {
      throw new Error(`Error getting product by ID. Error: ${error}`);
    }
  }

  async createProduct(product) {
    try {
      return await this.productRepository.createProduct(product);
    } catch (error) {
      throw new Error(`Error creating product. Error: ${error}`);
    }
  }

  async updateProduct(pid, body) {
    try {
      return await this.productRepository.updateProduct(pid, body);
    } catch (error) {
      throw new Error(`Error updating product. Error: ${error}`);
    }
  }

  async deleteProduct(pid) {
    try {
      return await this.productRepository.deleteProduct(pid);
    } catch (error) {
      throw new Error(`Error deleting product. Error: ${error}`);
    }
  }
}

export const productService = new ProductService();
