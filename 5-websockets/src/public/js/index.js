const socket = io();

const formProduct = document.querySelector("#addProduct");
const productTitle = document.querySelector("#product_title");
const productCode = document.querySelector("#product_code");
const productPrice = document.querySelector("#product_price");
const productCategory = document.querySelector("#product_category");
const productStock = document.querySelector("#product_stock");
const productThumbnail = document.querySelector("#product_thumbnail");
const productDescription = document.querySelector("#product_description");
const btnDelete = document.getElementsByClassName(".btnDelete");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("client:addproduct", {
    title: productTitle.value,
    description: productDescription.value,
    price: Number(productPrice.value),
    stock: Number(productStock.value),
    category: productCategory.value,
    code: Number(productCode.value),
    thumbnail: productThumbnail.value,
  });
});
