import { Router } from "express";
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  updateCart,
  updateProductQuantity,
  emptyCart,
  deleteProductFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/products/:pid", addProductToCart);
router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.delete("/:cid", emptyCart);
router.delete("/:cid/products/:pid", deleteProductFromCart);

export default router;
