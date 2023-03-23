import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const URL = "http://localhost:8080/images/";

const productManager = new ProductManager();
const products = await productManager.getProducts();

// GET api/products
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;

    if (limit) {
      let filterProducts = products.slice(0, Number(limit));
      res.status(200).send(filterProducts);
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

// GET api/products/:id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(Number(pid));

    if (!product) throw new Error("Product not found.");

    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ Error: error.message });
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
        .send({ status: `Error`, error: `Could not load any files.` });
    }

    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      status: req.body.status,
      code: req.body.code,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: thumbnails,
    };

    await productManager.addProduct(product);
    res.status(200).send({ status: `Success`, response: `Add product succesfully!` });
  } catch (err) {
    return res.status(500).send(next(err));
  }
});

// PUT api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const ifExsist = await productManager.getProductsById(Number(id));

    if (!ifExsist) {
      throw new Error("Product not found.");
    } else {
      await productManager.updateProduct(id, body);
      res.status(200).json({ Success: "Product updated." });
    }
  } catch (error) {
    res
      .status(404)
      .json({ Error: "Product not found or invalid body content." });
  }
});

// DELETE /api/products/id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodDeleted = await productManager.deleteProduct(id);

    if (prodDeleted) {
      res.status(200).json({ Success: "Product successfully removed." });
    }
  } catch (error) {
    res.status(404).json({ Error: "Product not found." });
  }
});

export default router;
