import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { cartService } from "../dao/services/cart.service.js";
import { productService } from "../dao/services/products.service.js";

export async function getCarts(req, res, next) {
  try {
    const carts = await cartService.getCarts();

    if (!carts || carts.length === 0) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    res.send({ status: "Success", payload: carts });
  } catch (error) {
    next(error);
  }
}

export async function getCartById(req, res, next) {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    res.send({ status: "Success", payload: cart });
  } catch (error) {
    next(error);
  }
}

export async function getCartByUserId(req, res, next) {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(
      new CustomError({
        name: errorsName.INTERNAL_SERVER_ERROR,
        message: errorsMessage.INTERNAL_SERVER_ERROR,
        cause: errorsCause.INTERNAL_SERVER_ERROR,
        originalError: error.message,
      })
    );
  }
}

export async function getProductInCart(req, res, next) {
  const { cid, pid } = req.params;
  try {
    const productInCart = await cartService.getProductInCart(cid, pid);
    if (!productInCart) {
      throw new CustomError({
        name: errorsName.PRODUCT_NOT_FOUND,
        message: errorsMessage.PRODUCT_NOT_FOUND,
        cause: errorsCause.PRODUCT_NOT_FOUND,
      });
    }
    res.status(200).json(productInCart);
  } catch (error) {
    next(
      new CustomError({
        name: errorsName.PRODUCT_IN_CART,
        message: errorsMessage.PRODUCT_IN_CART,
        cause: errorsCause.PRODUCT_IN_CART,
        originalError: error.message,
      })
    );
  }
}

export async function createCart(req, res, next) {
  const { userId } = req.body;
  try {
    const cart = await cartService.createCart(userId);
    return res.status(201).send({
      status: "Success",
      payload: cart,
      message: "Cart created successfully.",
    });
  } catch (error) {
    next(
      new CustomError({
        name: errorsName.CART_NOT_CREATED,
        message: errorsMessage.CART_NOT_CREATED,
        cause: errorsCause.CART_NOT_CREATED,
        originalError: error.message,
      })
    );
  }
}

export async function addCart(req, res, next) {
  const { cart } = req.body;
  try {
    const createdCart = await cartService.addCart(cart);
    res.status(201).json(createdCart);
  } catch (error) {
    next(
      new CustomError({
        name: errorsName.INTERNAL_SERVER_ERROR,
        message: errorsMessage.INTERNAL_SERVER_ERROR,
        cause: errorsCause.INTERNAL_SERVER_ERROR,
        originalError: error.message,
      })
    );
  }
}

export async function addProductToCart(req, res, next) {
  const { cid, pid } = req.params;
  const quantity = req.body.qty;

  try {
    if (!cid) {
      throw new CustomError({
        name: errorsName.INVALID_CART_ID,
        message: errorsMessage.INVALID_CART_ID,
        cause: errorsCause.INVALID_CART_ID,
      });
    }

    if (!quantity || quantity <= 0) {
      throw new CustomError({
        name: errorsName.INVALID_CART_QTY,
        message: errorsMessage.INVALID_CART_QTY,
        cause: errorsCause.INVALID_CART_QTY,
      });
    }

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      throw new CustomError({
        name: errorsName.CART_OR_PRODUCT_NOT_FOUND,
        message: errorsMessage.CART_OR_PRODUCT_NOT_FOUND,
        cause: errorsCause.CART_OR_PRODUCT_NOT_FOUND,
      });
    }

    const productInCart = await cartService.getProductInCart(cid, pid);
    if (productInCart) {
      const updatedQuantity = productInCart.quantity + quantity;
      await cartService.updateProductQuantity(cid, pid, updatedQuantity);
    } else {
      await cartService.addProductToCart(cid, pid, quantity);
    }

    const updatedCart = await cartService.getCartById(cid);
    const numProductsInCart = updatedCart.products.length;

    return res.status(200).send({
      status: "Success",
      message: `${quantity} product(s) added to cart.`,
      cart: updatedCart,
      numProductsInCart: numProductsInCart,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCart(req, res, next) {
  try {
    const { cid } = req.params;
    const cartData = req.body;

    const cart = await cartService.getCartById(cid);
    if (!cart) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    const updatedCart = await cartService.updateCart(cid, cartData);

    return res.send({ status: "Success", payload: updatedCart });
  } catch (error) {
    next(error);
  }
}

export async function updateProductQuantity(req, res, next) {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.qty;

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      throw new CustomError({
        name: errorsName.CART_OR_PRODUCT_NOT_FOUND,
        message: errorsMessage.CART_OR_PRODUCT_NOT_FOUND,
        cause: errorsCause.CART_OR_PRODUCT_NOT_FOUND,
      });
    }

    await cartService.updateProductQuantity(cid, pid, quantity);

    return res.send({
      status: "Success",
      message: "Product quantity updated in cart.",
    });
  } catch (error) {
    next(error);
  }
}

export async function emptyCart(req, res, next) {
  try {
    const { cid } = req.params;
    const result = await cartService.emptyCart(cid);

    return res.send({
      status: "Success",
      payload: result,
      response: "Cart emptied successfully",
    });
  } catch (error) {
    const customError = new CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });
    next(customError);
  }
}

export async function deleteProductFromCart(req, res, next) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const updatedCart = await cartService.deleteProductFromCart(cid, pid);

    return res.send({
      status: "Success",
      payload: updatedCart,
      response: "Product deleted successfully from cart",
    });
  } catch (error) {
    const customError = new CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });
    next(customError);
  }
}

export async function purchaseCart(req, res, next) {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);

    if (!cart || cart.products.length === 0) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    let message = "";
    const productsOutStock = [];
    for (const item of cart.products) {
      const product = await productService.getProductById(item.product._id);
      if (product.stock < item.quantity) {
        productsOutStock.push(item);
        message = "Some products are out of stock";
      }
    }
    message = "Purchase completed";

    return res.json({
      status: "success",
      message,
      cart,
      productsOutStock,
    });
  } catch (error) {
    next(error);
  }
}
