
//index para el Home sin websocket
const formProduct = document.querySelector("#productForm");
const productTitle = document.querySelector("#product_title");
const productCode = document.querySelector("#product_code");
const productPrice = document.querySelector("#product_price");
const productCategory = document.querySelector("#product_category");
const productStock = document.querySelector("#product_stock");
const productThumbnails = document.querySelector("#product_thumbnails");
const productDescription = document.querySelector("#product_description");
const submitButton = document.getElementById("submitForm");
// const deleteProduct = document.getElementsByClassName("btn-delete-product");

formProduct.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    title: productTitle.value,
    description: productDescription.value,
    price: Number(productPrice.value),
    stock: Number(productStock.value),
    category: productCategory.value,
    code: Number(productCode.value),
    thumbnails: productThumbnails.value,
  };

  await productManager.addProduct(product);
});
