const Contenedor = require("./Contenedor");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}.`);
});
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));

const productos = new Contenedor("productos.txt");

//mensaje de bienvenida
app.get("/", async (req, res) =>
  res.send(`<h2>Bienvenidos al servidor.</h2><p>Escriba en la barra de direcciones <strong>/productos</strong> para ver la lista de productos, y <strong>/productoRandom</strong> para ver un producto al azar.</p>`)
);

//presenta un array de productos
app.get("/productos", async (req, res) => {
  const allProducts = await productos.getAll();
  res.send(allProducts);
});

//presenta un producto aleatorio
app.get("/productoRandom", async (req, res) => {
  const product = await productos.getAll();
  const randomNumber = Math.floor(Math.random() * product.length);
  res.send(product[randomNumber]);
});
