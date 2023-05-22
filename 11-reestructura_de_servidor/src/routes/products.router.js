import { Router } from "express";
import { uploader } from "../utils.js";
import ProductController from "../controllers/products.controller.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", uploader.array("thumbnails", 5), productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;
