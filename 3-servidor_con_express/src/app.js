import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

let port = 8080;
let manager = new ProductManager("./files/products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h3>Welcome to Express server!</h3>`);
});

app.get("/products", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.json(allProducts);
});

// app.get('/users',function(req,res){
//   req.query.limit = req.query.limit || 10;
//   const limit = parseInt(req.query.limit,10);
//   if(Number.isNaN(limit)){
//    return res.status(400).end();
//    //만약에 NAN 이면 400이란 코드를 내보내고 종료해라.
//   }
//   res.json(users.slice(0,limit));
//  });

app.get("/products/:pid", async (req, res) => {
  let id = req.params.pid;
  const product = await manager.getProductsById(id);
  console.log(id);

  if (!product) return res.send({ error: "Not found." });
  res.json(req.params.pid);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server ready in port", port);
});
