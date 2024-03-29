//DELETE BUTTON
function deleteProduct(productId) {
  //cartId hardcodeado
  const cartId = "643e828d8c0d83dbf81cc118";
  try {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    }).then((response) => {
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
    });
  } catch (error) {
    console.error("Error deleting the product:", error);
  }
}

function emptyCart() {
  //cartId hardcodeado
  const cartId = "643e828d8c0d83dbf81cc118";
  try {
    fetch(`/api/carts/${cartId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        toastr.success("Cart empty.");
        console.log("Cart empty.");
        setTimeout(() => {
          location.href = "/cart";
        }, 1000);
      } else {
        toastr.error("Error deleting the product.");
        console.error("Error deleting the product");
      }
    });
  } catch (error) {
    console.error("Error empty cart:", error);
  }
}
