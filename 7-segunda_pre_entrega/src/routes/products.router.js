import { Router } from "express";
import { uploader } from "../utils.js";
import { productModel } from "../dao/models/products.model.js";
import ProductManager from "../dao/dbManagers/productManager.js";

const router = Router();
const productManager = new ProductManager();

// Ruta para listar todos los productos
router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || null;
    const status = req.query.status || null;
    const sortBy = req.query.sortBy || "price";

    if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
      return res.status(400).json({ error: "Invalid limit or page value." });
    }

    const products = await productManager.getProducts(
      limit,
      page,
      category,
      status,
      sortBy
    );

    res.status(200).json({
      status: "success",
      payload: products,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error. ${error.message}` });
  }
});

// Ruta para listar un producto específico
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(pid);

    if (!product) throw new Error("Product not found.");

    res.status(200).json({
      status: "success",
      message: "Product found!",
      payload: product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para crear un producto
router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    const product = req.body;
    const files = req.files;

    if (!product) {
      return res.status(400).send({
        status: "Error",
        error: "Error, the product could not be added",
      });
    }

    product.thumbnails = [];

    if (files) {
      files.forEach((file) => {
        const imageUrl = `http://localhost:8080/images/${file.filename}`;
        product.thumbnails.push(imageUrl);
      });
    }

    await productManager.createProduct(product);
    res.status(200).json({
      status: "Success",
      payload: product,
      response: "Product added successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

// Ruta para actualizar un producto
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { body } = req;

    const updatedProduct = await productManager.getProductsById(pid);

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found." });
    } else {
      await productManager.updateProduct(pid, body);
      res.status(200).json({
        status: "success",
        payload: updatedProduct,
        response: "Product updated.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Product not found or invalid body content." });
  }
});

// Ruta para eliminar un producto
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);

    if (deletedProduct) {
      res.status(200).json({
        status: "success",
        payload: deletedProduct,
        response: "Product successfully removed.",
      });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
