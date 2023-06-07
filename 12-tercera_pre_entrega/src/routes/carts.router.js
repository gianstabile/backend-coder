import { Router } from "express";
import { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, emptyCart, deleteProductFromCart, purchaseCart } from "../controllers/cart.controller.js";
import { authorizeRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/products/:pid", authorizeRole(["user"]), addProductToCart);
router.put("/:cid", authorizeRole(["user"]), updateCart);
router.put("/:cid/products/:pid", authorizeRole(["user"]), updateProductQuantity);
router.delete("/:cid", authorizeRole(["user"]), emptyCart);
router.delete("/:cid/products/:pid", authorizeRole(["user"]), deleteProductFromCart);
router.post("/:cid/purchase", authorizeRole(["user"]), purchaseCart);

export default router;
