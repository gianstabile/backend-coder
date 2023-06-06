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

//EMPTY CART
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

//PROCESS ORDER
function processOrder(cartId) {
  if (!cartId) {
    console.error("Invalid cart ID");
    return;
  }
  try {
    fetch(`/api/carts/${cartId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          toastr.success("Order complete.");
          console.log("Order complete");
          setTimeout(() => {
            location.href = "/purchase";
          }, 1000);
        } else {
          toastr.error("Error processing the purchase.");
          console.error("Error processing the purchase.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
