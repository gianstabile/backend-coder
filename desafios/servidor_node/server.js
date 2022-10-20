const http = require("http");

const server = http.createServer((req, res) => {
  const time = new Date().getHours();
  if (time >= 6 && time <= 12) {
    res.end("Hola, buenos días!");
  } else if (time >= 13 && time <= 19) {
    res.end("Hola, buenas tardes!");
  } else {
    res.end("Hola, buenas noches!");
  }
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${connectedServer.address().port}.`
  );
});
