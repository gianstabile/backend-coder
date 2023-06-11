import generateError from "../utils/errorHandler.js";
import { productService } from "../dao/services/products.service.js";

export default class ProductController {
  getProducts = async (req, res) => {
    try {
      const { limit, page, category, status, sortBy } = req.query;
      const products = await productService.getProducts(limit, page, category, status, sortBy);
      res.json(products);
    } catch (error) {
      const customError = generateError("PRODUCTS_FETCH_FAILED", error.message);
      res.status(500).json({ error: customError.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (error) {
      const customError = generateError("PRODUCT_FETCH_FAILED", error.message);
      res.status(500).json({ error: customError.message });
    }
  };

  createProduct = async (req, res) => {
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
      res.json(createdProduct);
    } catch (error) {
      const customError = generateError("PRODUCT_CREATION_FAILED", "Product creation failed.");
      res.status(500).json({ error: customError.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const { body } = req;

      const updatedProduct = await productService.updateProduct(pid, body);
      if (!updatedProduct) {
        const customError = generateError("PRODUCT_NOT_FOUND");
        res.status(404).json({ error: customError.message });
      } else {
        await productManager.updateProduct(pid, body);
      }
      res.json(updatedProduct);
    } catch (error) {
      const customError = generateError("PRODUCT_NOT_FOUND", "Product not found.");
      res.status(500).json({ error: customError.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await productService.deleteProduct(pid);

      if (!deletedProduct) {
        const customError = generateError("PRODUCT_NOT_FOUND");
        res.status(404).json({ error: customError.message });
      } else {
        res.json(deletedProduct);
      }
    } catch (error) {
      const customError = generateError("INTERNAL_SERVER_ERROR", "Internal server error.");
      res.status(500).json({ error: customError.message });
    }
  };
}
