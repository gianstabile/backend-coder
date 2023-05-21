import { productService } from "../dao/services/products.service.js";

export default class ProductController {
  constructor() {}

  getProducts = async (req, res) => {
    try {
      const { limit, page, category, status, sortBy } = req.query;
      const products = await productService.getProducts(
        limit,
        page,
        category,
        status,
        sortBy
      );
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
      const createdProduct = await productService.createProduct(product);
      res.json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await productService.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.deleteProduct(id);
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
