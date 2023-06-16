import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { productService } from "../dao/services/products.service.js";

export default class ProductController {
  getProducts = async (req, res, next) => {
    try {
      const { limit, page, category, status, sortBy } = req.query;
      const products = await productService.getProducts(limit, page, category, status, sortBy);

      logger.info("Products fetch successfully.");
      res.json(products);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCTS_FETCH_FAILED,
          message: errorsMessage.PRODUCTS_FETCH_FAILED,
          cause: errorsCause.PRODUCTS_FETCH_FAILED,
          originalError: error.message,
        })
      );
      logger.error("Failed to fetch products");
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCT_FETCH_FAILED,
          message: errorsMessage.PRODUCT_FETCH_FAILED,
          cause: errorsCause.PRODUCT_FETCH_FAILED,
          originalError: error.message,
        })
      );
      logger.error("Failed to fetch product");
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const product = req.body;
      const files = req.files;

      product.thumbnails = [];

      if (files) {
        files.forEach((file) => {
          const imageUrl = `http://localhost:8080/images/${file.filename}`;
          product.thumbnails.push(imageUrl);
        });
      }

      const createdProduct = await productService.createProduct(product);
      logger.info("Product created successfully.");

      res.json(createdProduct);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCT_CREATION_FAILED,
          message: errorsMessage.PRODUCT_CREATION_FAILED,
          cause: errorsCause.PRODUCT_CREATION_FAILED,
          originalError: error.message,
        })
      );
      logger.error("Failed to create product");
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { body } = req;

      const updatedProduct = await productService.updateProduct(pid, body);
      if (!updatedProduct) {
        const customError = new CustomError({
          name: errorsName.PRODUCT_NOT_FOUND,
          message: errorsMessage.PRODUCT_NOT_FOUND,
          cause: errorsCause.PRODUCT_NOT_FOUND,
        });

        logger.error("Product not found", customError);
        res.status(404).json({ error: customError.message });
      } else {
        await productManager.updateProduct(pid, body);
      }

      logger.info("Product updated successfully");
      res.json(updatedProduct);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCT_NOT_FOUND,
          message: errorsMessage.PRODUCT_NOT_FOUND,
          cause: errorsCause.PRODUCT_NOT_FOUND,
          originalError: error.message,
        })
      );
      logger.error("Failed to update product");
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await productService.deleteProduct(pid);

      if (!deletedProduct) {
        const customError = new CustomError({
          name: errorsName.PRODUCT_NOT_FOUND,
          message: errorsMessage.PRODUCT_NOT_FOUND,
          cause: errorsCause.PRODUCT_NOT_FOUND,
        });
        next(customError);
        logger.error("Product not found", customError);
        return res.status(404).json({ error: customError.message });
      } else {
        res.json(deletedProduct);
      }
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.INTERNAL_SERVER_ERROR,
          message: errorsMessage.INTERNAL_SERVER_ERROR,
          cause: errorsCause.INTERNAL_SERVER_ERROR,
          originalError: error.message,
        })
      );
      logger.error("Failed to delete product");
    }
  };
}
