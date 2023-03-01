import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./files/products.json");

const env = async () => {
  const product1 = {
    title: "Quilmes Cristal",
    description: "Cerveza rubia de 1l",
    price: 380,
    thumbnail: "http://www.quimes.com.ar/imagen1.jpg",
    code: 2025,
    stock: 100,
  };

  const product2 = {
    title: "Coca Cola 1.5l",
    description: "Gaseosa Coca Cola",
    price: 420,
    thumbnail: "http://www.coca.com.ar/imagen1.jpg",
    code: 2028,
    stock: 150,
  };

  const product3 = {
    title: "Sprite 1.5l",
    description: "Gaseosa de lima",
    price: 380,
    thumbnail: "http://www.sprite.com.ar/imagen1.jpg",
    code: 2025,
    stock: 130,
  };

  let firtQuery = await manager.getProducts();
  let secQuery = await manager.addProduct(product1);
  let thrdQuery = await manager.addProduct(product2);
  let fourQuery = await manager.addProduct(product3);

  console.log(firtQuery);
  console.log(secQuery);
  console.log(thrdQuery);
  console.log(fourQuery);

  let fiveQuery = await manager.getProducts();
  console.log("List of products:");
  console.log(fiveQuery);

  let sixQuery = await manager.getProductsById(6);

  let sevQuery = await manager.deleteProduct(15);

  const prodUpdate = {
    price: 500,
    stock: 200,
  };

  let eightQuery = await manager.updateProduct(2, prodUpdate);
  console.log(eightQuery);
};

env();
