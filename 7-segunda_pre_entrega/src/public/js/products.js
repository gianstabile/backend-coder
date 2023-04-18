// FORM
const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const product = {};

  // Obtener los datos del formulario y agregarlos al objeto product
  for (const [key, value] of formData.entries()) {
    product[key] = value;
  }

  // Realizar la solicitud POST
  let response = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  let result = await response.json();
  console.log(result);
});

//DELETE BUTTON
async function handleDeleteButtonClick(e) {
  const deleteButton = e.target;
  const productId = deleteButton.getAttribute("data-id");
  e.preventDefault();
  console.log(productId);

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Product successfully removed.");
    } else {
      console.error("Error deleting the product");
    }
  } catch (err) {
    console.error("Error deleting the product:", err);
  }
}