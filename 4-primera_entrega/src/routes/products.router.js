import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// GET api/products
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    let { limit } = req.query;

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
router.post("/", async (req, res) => {
  const { body } = req;
  const newProduct = await productManager.addProduct(body);

  newProduct
    ? res
        .status(200)
        .json({ Success: "Product added with ID " + newProduct.id })
    : res.status(400).json({
        Error:
          "There was an error, please verify the body content match the schema.",
      });
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
  const { id } = req.params;
  const prodDeleted = await productManager.deleteProduct(id);
  console.log(prodDeleted);

  prodDeleted
    ? res.status(200).json({ Success: "Product successfully removed." })
    : res.status(404).json({ Error: "Product not found." });
});

export default router;
