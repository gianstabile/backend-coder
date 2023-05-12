//DELETE BUTTON
async function deleteProduct(cartId, productId) {
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

function emptyCart(cartId) {
  if (!cartId) {
    console.error("Invalid cart ID");
    return;
  }
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
