import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const test = async () => {
  let consulta1 = await productManager.getProducts();
  console.log(consulta1);

  let product2 = {
    title: "Coca",
    description: "Gaseosa de 1.5l",
    price: 400,
    thumbnail: "https://thumbnail.com/0123.jpg",
    code: 4355,
    stock: 100,
  };

  let result = await productManager.addProduct(product2);
  return result;
};

test();
