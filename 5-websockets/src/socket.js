import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";

const productManager = new ProductManager();
const products = await productManager.getProducts();

const socket = {};
socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);
  let { io } = socket;

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    io.emit("products", products);

    socket.on("submitProduct", async (product) => {
      try {
        await productManager.addProduct(product);
        socket.emit("productCreated", { success: true });
      } catch (error) {
        socket.emit("productCreated", { success: false, error: error.message });
      }
    });

    socket.on("deleteProduct", async (product) => {
      try {
        await productManager.deleteProduct(product.id);
        socket.emit("productDeleted", { success: true });
      } catch (error) {
        socket.emit("productDeleted", { success: false, error: error.message });
      }
    });
  });
};

export default socket;
