import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";

const socket = {};
const productManager = new ProductManager();

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);
  let { io } = socket;

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("client:addproduct", async (data) => {
      const newProduct = await productManager.addProduct(data);
      console.log(newProduct);
    });
  });
};

export default socket;
