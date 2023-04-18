//DELETE BUTTON
function deleteProduct(productId) {
  const cartId = "643e828d8c0d83dbf81cc118";

  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product successfully deleted.");
        location.reload();
      } else {
        console.error("Error deleting the product");
      }
    })
    .catch((err) => {
      console.error("Error deleting the product:", err);
    });
}
