import express from 'express';
import routerProducts from './routes/routerProducts.js';
import routerCarts from './routes/routerCart.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/cart', routerCarts);
app.use('*', (req, res) => {
  const path = req.params;
  const method = req.method;
  res.send({
    error: -2,
    descripcion: `ruta '${path[0]}' método '${method}' no implementada`,
  });
});

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);
server.on('error', (err) => console.log(err));
