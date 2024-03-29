import { productRepository } from "../repositories/products.repository.js";
import userRepository from "../repositories/users.repository.js";

class ProductService {
  constructor() {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
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

  async createProduct(product, userId) {
    try {
      let owner = null;
      if (userId) {
        const user = await this.userRepository.findById(userId);
        if (user.role === "premium") {
          owner = user._id;
        }
      }

      product.owner = owner;

      return await this.productRepository.createProduct(product);
    } catch (error) {
      throw new Error(`Error creating product. Error: ${error}`);
    }
  }

  async updateProduct(pid, body, userId) {
    try {
      let owner = null;

      if (userId) {
        const user = await this.userRepository.findById(userId);
        if (user.role === "premium") {
          owner = user._id;
        } else {
          owner = null;
        }
      }

      product.owner = owner;

      return await this.productRepository.updateProduct(pid, body);
    } catch (error) {
      throw new Error(`Error updating product. Error: ${error}`);
    }
  }

  async deleteProduct(pid, userId) {
    try {
      if (userId) {
        const user = await this.userRepository.findById(userId);
        if (user.role === "premium" && existingProduct.owner !== user._id) {
          CustomError.generateCustomError({
            name: errorsName.GENERAL_ERROR_NAME,
            message: errorsMessage.USER_NOT_OWNER_MESSAGE,
            cause: errorsCause.USER_NOT_OWNER_CAUSE,
          });
        }
      } else {
        CustomError.generateCustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.NOT_GET_USER_ID_MESSAGE,
          cause: errorsCause.NOT_GET_USER_ID_CAUSE,
        });
      }
      return await this.productRepository.deleteProduct(pid);
    } catch (error) {
      throw new Error(`Error deleting product. Error: ${error}`);
    }
  }
}

export const productService = new ProductService();
