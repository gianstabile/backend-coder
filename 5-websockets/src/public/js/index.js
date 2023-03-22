const socket = io();

const formProduct = document.querySelector("#addProduct");
const productTitle = document.querySelector("#product_title");
const productCode = document.querySelector("#product_code");
const productPrice = document.querySelector("#product_price");
const productCategory = document.querySelector("#product_category");
const productStock = document.querySelector("#product_stock");
const productThumbnails = document.querySelector("#product_thumbnails");
const productDescription = document.querySelector("#product_description");
document.getElementById("fileNameLabel").innerHTML = productThumbnails;
// const deleteButtons = document.querySelectorAll(".btn-delete-product");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("client:addproduct", {
    title: productTitle.value,
    description: productDescription.value,
    price: Number(productPrice.value),
    stock: Number(productStock.value),
    category: productCategory.value,
    code: Number(productCode.value),
    thumbnails: productThumbnails.value,
  });
});

// deleteButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();
//     // Obtener el ID del producto que se desea eliminar
//     const productId = e.target.dataset.id;

//     // Aquí se llama a una función para eliminar el producto por su ID
//     deleteProduct(productId);
//   });
// });

// function deleteProduct(productId) {
//   console.log("Eliminado: " + productId);
// }
