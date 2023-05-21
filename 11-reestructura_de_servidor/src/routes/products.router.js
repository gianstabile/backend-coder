import { Router } from "express";
import { uploader } from "../utils.js";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

// Obtener todos los productos
router.get("/", productController.getProducts);

// Obtener un producto por ID
router.get("/:pid", productController.getProductById);

// Crear un producto
router.post("/", uploader.array("thumbnails", 5), productController.createProduct);

// Actualizar un producto
router.put("/:pid", productController.updateProduct);

// Eliminar un producto
router.delete("/:pid", productController.deleteProduct);

export default router;
