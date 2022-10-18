const Contenedor = require("./Contenedor.js");

const products = new Contenedor("./productos.txt");

products
  .save({
    title: "Gaseosa Sprite 1.5lts",
    price: 235.0,
    thumbnail: "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/144/141/products/whatsapp-image-2021-08-25-at-11-08-571-f2321c146eb51f1dac16299005725116-640-0.jpeg",
  })
  .then((result) => {
    console.log(result);
  });

products.deleteById(2);

products.getById(1).then((result) => {
  console.log(result);
});

products.deleteAll().then((result) => {
  console.log(result);
});
