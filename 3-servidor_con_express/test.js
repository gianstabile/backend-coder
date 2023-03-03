import ProductManager from "./src/ProductManager.js";

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

  const product4 = {
    title: "Mini OREO",
    description: "Galletitas dulces",
    price: 250,
    thumbnail: "http://www.oreo.com.ar/imagen1.jpg",
    code: 1025,
    stock: 300,
  };

  const product5 = {
    title: "Cerealitas Mix Semillas",
    description: "Galletitas saladas de semillas",
    price: 400,
    thumbnail: "http://www.galletas.com.ar/imagen1.jpg",
    code: 1028,
    stock: 250,
  };

  const product6 = {
    title: "Elementos Malbec",
    description: "Vino tinto Malbec",
    price: 620,
    thumbnail: "http://www.vino.com.ar/imagen1.jpg",
    code: 3015,
    stock: 130,
  };

  const product7 = {
    title: "Toro Blanco Dulce",
    description: "Vino blanco dulce de mesa",
    price: 480,
    thumbnail: "http://www.vino.com.ar/imagen1.jpg",
    code: 3025,
    stock: 180,
  };

  const product8 = {
    title: "Agua Mineral ECO 1l",
    description: "Agua mineral sin gas ",
    price: 380,
    thumbnail: "http://www.agua.com.ar/imagen1.jpg",
    code: 4001,
    stock: 150,
  };

  const product9 = {
    title: "Soda 1.5l",
    description: "Agua gasificada",
    price: 280,
    thumbnail: "http://www.soda.com.ar/imagen1.jpg",
    code: 4020,
    stock: 130,
  };

  const product10 = {
    title: "Surtidas Balgey",
    description: "Galletitas dulces surtidas",
    price: 450,
    thumbnail: "http://www.galletas.com.ar/imagen1.jpg",
    code: 1085,
    stock: 200,
  };

  let firtQuery = await manager.getProducts();
  let secQuery = await manager.addProduct(product1);
  let thrdQuery = await manager.addProduct(product2);
  let fourQuery = await manager.addProduct(product3);
  let nineQuery = await manager.addProduct(product4);
  let tenQuery = await manager.addProduct(product5);
  let elevenQuery = await manager.addProduct(product6);
  let twuelveQuery = await manager.addProduct(product7);
  let thirteenQuery = await manager.addProduct(product8);
  let fourteenQuery = await manager.addProduct(product9);
  let fiveteenQuery = await manager.addProduct(product10);

  let fiveQuery = await manager.getProducts();
  console.log("List of products:");
  console.log(fiveQuery);

  let sixQuery = await manager.getProductsById(6);

  let sevQuery = await manager.deleteProduct(15);

  const prodUpdate1 = {
    price: 500,
    stock: 200,
  };

  const prodUpdate2 = {
    title: "Surtidas Bagley",
  };

  let eightQuery = await manager.updateProduct(2, prodUpdate1);
  console.log(eightQuery);
  let sixteenQuery = await manager.updateProduct(9, prodUpdate2);
  console.log(sixteenQuery);
};

env();
