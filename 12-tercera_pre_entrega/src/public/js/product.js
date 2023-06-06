//ADD BUTTON
async function addToCart(productId, cartId) {
  try {
    const addToCartProduct = await fetch(
      `/api/carts/${cartId}/products/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty: 1 }),
      }
    );

    if (addToCartProduct.ok) {
      toastr.success("Product added successfully!");
      console.log("Product successfully added.");
    } else {
      toastr.error("Error adding the product.");
      console.error("Error adding the product");
    }
  } catch (err) {
    console.error("Error adding the product:", err);
  }
}
