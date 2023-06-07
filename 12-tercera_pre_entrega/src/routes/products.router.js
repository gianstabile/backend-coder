import { Router } from "express";
import { uploader } from "../utils.js";
import ProductController from "../controllers/products.controller.js";
import { authorizeRole } from "../middlewares/auth.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", uploader.array("thumbnails", 5), authorizeRole(["admin"]), productController.createProduct);
router.put("/:pid", authorizeRole(["admin"]), productController.updateProduct);
router.delete("/:pid", authorizeRole(["admin"]), productController.deleteProduct);

export default router;
