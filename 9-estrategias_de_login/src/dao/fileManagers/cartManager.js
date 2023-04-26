import fs from "fs";
import __dirname from "../../utils.js";

export default class CartManager {
  constructor() {
    this.path = `${__dirname}/files/Carts.json`;
    this.carts = {
      products: [],
    };
  }

  //método para leer un producto
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      } else {
        await this.writeCarts([]);
        return "Since there are no carts yet, a new one will be created.";
      }
    } catch (error) {
      return `Error reading the file. Exception: ${error}`;
    }
  };

  getCartsById = async (id) => {
    try {
      let carts = await this.getCarts();
      let cart = carts.find((cart) => cart.id === id);

      if (!cart) {
        console.log("Cart not found.");
      } else {
        console.log(cart);
        return cart;
      }
    } catch (error) {
      return `Error reading the file. Exception: ${error}`;
    }
  };

  //método para escribir el archivo de carts
  writeCarts = async (carts) => {
    return await fs.promises.writeFile(
      this.path,
      JSON.stringify(carts, null, "\t")
    );
  };

  //metodo para ver los carritos
  listCarts = async (product) => {
    try {
      const carts = await this.getCarts();
      return carts;
    } catch (error) {
      return `There was an error getting the products. Exception: ${error}`;
    }
  };

  addCart = async (cart) => {
    try {
      const cart = {
        products: [],
      };
      const carts = await this.getCarts();

      if (carts.length === 0) {
        cart.id = 1;
      } else {
        const lastCart = carts[carts.length - 1];
        if (lastCart.id === undefined) {
          return "The last cart in the list does not have an ID.";
        }
        cart.id = lastCart.id + 1;
      }
      carts.push(cart);
      this.writeCarts(carts);
      return cart;
    } catch (error) {
      return `There was an error adding a new cart. Exception: ${error}`;
    }
  };

  //método para agregar un producto al carrito
  addProductToCart = async (product, id) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === id);
      const cart = carts[cartIndex];
      const productIndex = cart.products.findIndex(
        (prod) => prod.id === product.id
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += product.quantity;
      } else {
        cart.products.push({
          id: product.id,
          quantity: product.quantity,
        });
      }
      carts[cartIndex] = cart;

      await this.writeCarts(carts);
    } catch (error) {
      return `There was an error adding a product to the cart. Exception ${error}`;
    }
  };

  //método para eliminar un carrito
  deleteCart = async (id) => {
    const carts = await this.getCarts();
    const index = carts.findIndex((cart) => cart.id === parseInt(id));

    if (index < 0) return null;
    carts.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return id;
  };
}
