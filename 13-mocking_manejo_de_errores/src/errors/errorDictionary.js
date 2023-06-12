export const errorsName = {
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "product_not_found",
  PRODUCT_IN_CART: "product_in_cart",
  PRODUCT_FETCH_FAILED: "product_fetch_failed",
  PRODUCT_CREATION_FAILED: "product_creation_failed",
  PRODUCT_ALREADY_EXISTS: "product_already_exists",
  INSUFFICIENT_STOCK: "insufficient_stock",

  // CARTS
  CART_NOT_CREATED: "cart_not_created",
  CART_NOT_FOUND: "cart_not_found",
  INVALID_CART_ID: "invalid_cart_id",
  INVALID_CART_QTY: "invalid_cart_quantity",
  CART_OR_PRODUCT_NOT_FOUND: "cart_or_product_not_found",
  PRODUCT_CART_QTY: "product_cart_quantity",
  CART_UPDATE: "cart_update_failed",
  CART_EMPTY: "cart_empty_failed",
  DELETE_PRODUCT_CART: "delete_product_cart_failed",
  PURCHASE_CART: "purchase_cart_failed",

  // USERS
  AUTHENTICATION_ERROR: "authentication_error",
  USER_NOT_FOUND: "user_not_found",
  DUPLICATE_EMAIL: "duplicate_email",
  INVALID_USER_ID: "invalid_user_id",
  INVALID_CREDENTIALS: "invalid_credentials",
  PASSWORD_RESET_TOKEN_EXPIRED: "password_reset_token_expired",
  PASSWORD_RESET_TOKEN_INVALID: "invalid_password_reset_token",
  UNAUTHORIZED_ACCESS: "unauthorized_access",

  // ORDERS
  ORDER_NOT_FOUND: "order_not_found",
  MISSING_FIELDS: "missing_fields",
  INVALID_ORDER_ID: "invalid_order_id",
  ORDER_CREATION_FAILED: "order_creation_failed",
  ORDER_RESOLUTION_FAILED: "order_resolution_failed",
  INVALID_SHIPPING_ADDRESS: "invalid_shipping_address",
};

export const errorsMessage = {
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "Product not found. Please try again.",
  PRODUCT_IN_CART: "Problems with getting products in the cart.",
  PRODUCT_FETCH_FAILED: "Failed to fetch product. Please try again later.",
  PRODUCT_CREATION_FAILED: "Failed to create product. Please try again later.",
  PRODUCT_ALREADY_EXISTS: "The product already exists.",
  INSUFFICIENT_STOCK: "Insufficient stock. Unable to proceed with the purchase.",

  // CARTS
  CART_NOT_CREATED: "Problems occurred while creating the cart.",
  CART_NOT_FOUND: "Cart not found.",
  INVALID_CART_ID: "Invalid cart ID.",
  INVALID_CART_QTY: "Invalid quantity. Quantity must be greater than zero.",
  CART_OR_PRODUCT_NOT_FOUND: "Cart or product not found.",
  PRODUCT_CART_QTY: "Error updating the product quantity in the cart.",
  CART_UPDATE: "Error updating the cart.",
  CART_EMPTY: "Error emptying the cart.",
  DELETE_PRODUCT_CART: "Error removing the product from the cart.",
  PURCHASE_CART: "Error processing the cart. Please try again.",

  // USERS
  AUTHENTICATION_ERROR: "Authentication error.",
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

export const errorsCause = {
  INTERNAL_SERVER_ERROR: "An unexpected error occurred on the server.",
  // PRODUCTS
  PRODUCT_NOT_FOUND: "The requested product could not be found in the database.",
  PRODUCT_IN_CART: "There was an issue with getting the products in the cart.",
  PRODUCT_FETCH_FAILED: "Failed to fetch the product from the database.",
  PRODUCT_CREATION_FAILED: "Failed to create the product.",
  PRODUCT_ALREADY_EXISTS: "The product already exists in the database.",
  INSUFFICIENT_STOCK: "There is insufficient stock to proceed with the purchase.",

  // CARTS
  CART_NOT_CREATED: "There was an issue while attempting to create the cart.",
  CART_NOT_FOUND: "The requested cart could not be found.",
  INVALID_CART_ID: "The provided cart ID is invalid.",
  INVALID_CART_QTY: "The provided quantity is invalid. Quantity must be greater than zero.",
  CART_OR_PRODUCT_NOT_FOUND: "The cart or the product could not be found.",
  PRODUCT_CART_QTY: "There was an error updating the product quantity in the cart.",
  CART_UPDATE: "There was an error updating the cart.",
  CART_EMPTY: "There was an error emptying the cart.",
  DELETE_PRODUCT_CART: "There was an error removing the product from the cart.",
  PURCHASE_CART: "There was an error processing the cart. Please try again.",

  // USERS
  AUTHENTICATION_ERROR: "Authentication error occurred.",
  USER_NOT_FOUND: "The requested user could not be found.",
  DUPLICATE_EMAIL: "The provided email already exists. Please choose a different email.",
  INVALID_USER_ID: "The provided user ID is invalid.",
  INVALID_CREDENTIALS: "Invalid credentials. Please check your email and password.",
  PASSWORD_RESET_TOKEN_EXPIRED: "The password reset token has expired.",
  PASSWORD_RESET_TOKEN_INVALID: "The provided password reset token is invalid.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in.",

  // ORDERS
  ORDER_NOT_FOUND: "The requested order could not be found.",
  MISSING_FIELDS: "Some required fields are missing.",
  INVALID_ORDER_ID: "The provided order ID is invalid.",
  ORDER_CREATION_FAILED: "Failed to create the order.",
  ORDER_RESOLUTION_FAILED: "Failed to resolve the order.",
  INVALID_SHIPPING_ADDRESS: "The provided shipping address is invalid. Please provide a valid address.",
};
