export const errorDictionary = {
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "Product not found. Please try again.",
  PRODUCT_IN_CART: "Problems with get products in cart.",
  PRODUCT_FETCH_FAILED: "Failed to fetch product. Please try again later.",
  PRODUCT_CREATION_FAILED:"Failed to create product. Please try again later.",
  PRODUCT_ALREADY_EXISTS: "The product already exists.",
  INSUFFICIENT_STOCK: "Insufficient stock. Unable to proceed with the purchase.",

  // CARTS

  CART_NOT_CREATED: "Problems for create a cart",
  CART_NOT_FOUND: "Cart not found.",
  INVALID_CART_ID: "Invalid cart ID.",
  INVALID_CART_QTY: "Invalid quantity. Quantity must be greater than zero.",
  CART_OR_PRODUCT_NOT_FOUND: "Cart or product not found.",
  PRODUCT_CART_QTY: "Error updating the product in the cart.",
  CART_UPDATE: "Error updating the cart.",
  CART_EMPTY: "Error emptying the cart.",
  DELETE_PRODUCT_CART: "Error removing product from the cart.",
  PURCHASE_CART: "Error processing the cart. Please try again.",

  // USERS
  AUTHENTICATION_ERROR:"Authentication error.",
  USER_NOT_FOUND: "User not found.",
  DUPLICATE_EMAIL: "Email already exists. Please choose a different email.",
  INVALID_USER_ID: "Invalid user ID.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check your email and password.",
  PASSWORD_RESET_TOKEN_EXPIRED: "Password reset token has expired.",
  PASSWORD_RESET_TOKEN_INVALID: "Invalid password reset token.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in.",

  // ORDERS
  ORDER_NOT_FOUND: "Order not found.",
  MISSING_FIELDS: "Missing required fields.",
  INVALID_ORDER_ID: "Invalid order ID.",
  ORDER_CREATION_FAILED: "Failed to create the order. Please try again.",
  ORDER_RESOLUTION_FAILED: "Failed to resolve the order. Please try again later.",
  INVALID_SHIPPING_ADDRESS: "Invalid shipping address. Please provide a valid address.",
};
