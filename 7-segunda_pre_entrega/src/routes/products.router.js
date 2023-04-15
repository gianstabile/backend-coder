import { Router } from "express";
import { uploader } from "../utils.js";
import { productModel } from "../dao/models/products.model.js";
import ProductManager from "../dao/dbManagers/productManager.js";

const router = Router();
const productManager = new ProductManager();
const URL = "http://localhost:8080/images/";

// GET api/products
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "price";
    const sortOrder = req.query.sortOrder || "asc";
    const category = req.query.category || null;
    const status = req.query.status || null;

    const products = await productManager.getProducts(
      page,
      limit,
      sortBy,
      sortOrder,
      category,
      status
    );

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// GET api/products/:id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(pid);

    if (!product) throw new Error("Product not found.");

    res.status(200).send({
      status: "success",
      message: "Product found!",
      payload: product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST api/products
router.post("/", uploader.array("thumbnails", 3), async (req, res, next) => {
  try {
    const product = req.body;
    const thumbnails = req.files;

    if (!product) {
      return res.status(400).send({
        status: "Error",
        error: "Product could not be added",
      });
    }

    product.thumbnails = [];

    if (thumbnails) {
      thumbnails.forEach((file) => {
        const thumbUrl = `http://localhost:8080/images/${file.filename}`;
        product.thumbnails.push(thumbUrl);
      });
    }

    await productModel.create(product);
    return res.status(200).send({
      status: "Success",
      payload: product,
      response: "Add product successfully!",
    });
  } catch (err) {
    return res.status(500).send(next(err));
  }
});

// PUT api/products/:id
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { body } = req;

    const updatedProduct = await productManager.getProductsById(pid);

    if (!updatedProduct) {
      throw new Error("Product not found.");
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
      .status(404)
      .json({ error: "Product not found or invalid body content." });
  }
});

// DELETE /api/products/id
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
