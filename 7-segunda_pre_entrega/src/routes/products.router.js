import { Router } from "express";
import { uploader } from "../utils.js";
import { productModel } from "../dao/models/products.model.js";
import ProductManager from "../dao/dbManagers/productManager.js";
// import ProductManager from "../dao/fileManagers/productsManager.js";

const router = Router();
const URL = "http://localhost:8080/images/";

const productManager = new ProductManager();

// GET api/products
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET api/products/:id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(pid);

    if (!product) throw new Error("Product not found.");

    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST api/products
router.post("/", uploader.array("thumbnails", 3), async (req, res, next) => {
  try {
    const thumbnails = req.files
      ? req.files.map((file) => `${URL}${file.filename}`)
      : null;
    if (!thumbnails) {
      return res
        .status(400)
        .send({ status: "Error", error: "Could not load any files." });
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const status = req.body.status;
    const code = req.body.code;
    const stock = req.body.stock;
    const category = req.body.category;

    const product = {
      title,
      description,
      price,
      status,
      code,
      stock,
      category,
      thumbnails,
    };

    if (
      !title ||
      !description ||
      !price ||
      !status ||
      !code ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      return res.send({ status: "error", error: "Incomplete values" });
    } else {
      await productModel.create(product);
      res.status(200).send({
        status: "Success",
        payload: product,
        response: "Add product successfully!",
      });
    }
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
