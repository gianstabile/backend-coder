import { Router } from "express";
import {getCarts,getCartById,createCart,addProductToCart,updateCart,updateProductQuantity,emptyCart,deleteProductFromCart,} from "../controllers/cart.controller.js";

const router = Router();

// find all
router.get("/", getCarts);

// find one
router.get("/:cid", getCartById);

// create cart
router.post("/", createCart);

// add product a cart
router.post("/:cartId/products/:productId", addProductToCart);

// update product a cart
router.put("/:cartId", updateCart);

// update product quantity
router.put("/:cartId/products/:productId", updateProductQuantity);

// empty cart
router.delete("/:cartId", emptyCart);

// delete product a cart
router.delete("/:cartId/products/:productId", deleteProductFromCart);

export default router;
