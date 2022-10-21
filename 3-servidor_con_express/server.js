const Contenedor = require("./Contenedor");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}.`);
});
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));

const productos = new Contenedor("productos.txt");

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
