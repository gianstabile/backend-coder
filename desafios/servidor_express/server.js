const express = require("express");
const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

//presenta un mensaje de bienvenida con estilos
app.get("/", (req, res) => res.send(`<h1 style="color:blue;">Bienvenidos al servidor express</h1>`));

//cuenta la cantidad de visitas en la app
let visitas = 5;
app.get("/visitas", (req, res) => res.send(`La cantidad de visitas hasta ahora es de ${visitas++}`));

//envía la fecha y hora actuales
let fyh = new Date().toLocaleString();
app.get("/fyh", (req, res) => res.send({ fyh }));
