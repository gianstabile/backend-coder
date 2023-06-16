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
        response.json().then((data) => {
          toastr.error(data.error);
          console.error(data.error);
        });
      }
    });
  } catch (error) {
    toastr.error("An error occurred while deleting the product.");
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
        response.json().then((data) => {
          toastr.error(data.error);
          console.error(data.error);
        });
      }
    });
  } catch (error) {
    toastr.error("An error occurred while empty cart.");
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
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toastr.error(data.error);
          console.error(data.error);
        } else {
          toastr.success("Purchase completed");
          console.log("Order complete");
          if (data.productsOutStock && data.productsOutStock.length > 0) {
            toastr.warning(`Some products are out of stock`);
          }
          setTimeout(() => {
            location.href = "/purchase";
          }, 1000);
        }
      })
      .catch((error) => {
        toastr.error("An error occurred while processing the purchase.");
        console.error("An error occurred while processing the purchase.", error);
      });
  } catch (error) {
    toastr.error(error);
    console.log(error);
  }
}
