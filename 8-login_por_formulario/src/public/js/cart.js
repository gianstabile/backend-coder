//DELETE BUTTON
function deleteProduct(productId) {
  const cartId = "643e828d8c0d83dbf81cc118";

  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        toastr.success("Product successfully removed.");
        console.log("Product successfully removed.");
        setTimeout(() => {
          location.href = "/cart";
        }, 1000);
      } else {
        toastr.error("Error deleting the product.");
        console.error("Error deleting the product");
      }
    })
    .catch((err) => {
      console.error("Error deleting the product:", err);
    });
}
