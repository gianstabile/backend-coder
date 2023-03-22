import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./files/products.json";
  }

  //método para leer un producto
  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } else {
      return [];
    }
  };

  //método para buscar productos por el id
  getProductsById = async (id) => {
    let products = await this.getProducts();
    let product = products.find((prod) => prod.id === id);

    if (!product) {
      return "Product not found.";
    } else {
      return product;
    }
  };

  //metodo para agregar nuevos productos
  addProduct = async (product) => {
    let products = await this.getProducts();
    const { code, title, description, price, stock, category, thumbnails } =
      product;

    // validacion de campos requeridos
    if (
      !code ||
      !title ||
      !description ||
      !price ||
      !category ||
      !thumbnails ||
      !stock
    ) {
      return "Incomplete fields!";
    }

    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }

    //validacion de existencias
    const productCode = products.find((prod) => prod.code === product.code);
    if (!productCode) {
      console.log("Product add succefully.");
      products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      console.log("Product already added!");
      return;
    }
  };

  updateProduct = async (id, newData) => {
    let products = await this.getProducts();

    const index = products.findIndex((item) => item.id === id);
    let product = products[index];

    //validación por si no encuentra la ID
    if (!product) {
      throw "Product ID not found";
    } else {
      products = products.filter((item) => item.id != id);
      product = { ...product, ...newData };
      products.splice(index, 0, product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return product;
    }
  };

  deleteProduct = async (id) => {
    let products = await this.getProducts();

    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index < 0) return null;
    products.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return id;
  };
}
