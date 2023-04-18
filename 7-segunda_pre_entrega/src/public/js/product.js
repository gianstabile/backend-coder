//ADD BUTTON
async function addToCart(productId) {
  try {
    const cartId = "643e828d8c0d83dbf81cc118";

    const addToCartProduct = await fetch(
      `/api/carts/${cartId}/products/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (addToCartProduct.ok) {
      console.log("Product successfully added.");
    } else {
      console.error("Error adding the product");
    }
  } catch (err) {
    console.error("Error adding the product:", err);
  }
}
