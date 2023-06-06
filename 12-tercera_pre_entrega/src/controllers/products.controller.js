import { productService } from "../dao/services/products.service.js";

export default class ProductController {
  getProducts = async (req, res) => {
    try {
      const { limit, page, category, status, sortBy } = req.query;
      const products = await productService.getProducts(limit, page, category, status, sortBy);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const { body } = req;

      const updatedProduct = await productService.updateProduct(pid);
      if (!updatedProduct) {
        res.status(404).json({ error: "Product not found." });
      } else {
        await productManager.updateProduct(pid, body);
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await productService.deleteProduct(pid);
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
