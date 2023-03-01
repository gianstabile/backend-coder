import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
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
      console.log("Not found.");
    } else {
      console.log(product);
      return product;
    }
  };

  //metodo para agregar nuevos productos
  addProduct = async (product) => {
    let products = await this.getProducts();
    const { code, title, description, price, thumbnail, stock } = product;

    // validacion de campos requeridos
    if (!code || !title || !description || !price || !thumbnail || !stock) {
      console.log("Incomplete fields!");
      return;
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
    } else {
      console.log("Product already added!");
      return;
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };

  updateProduct = async (id, newData) => {
    let products = await this.getProducts();

    const index = products.findIndex((item) => item.id == id);
    let product = products[index];
    products = products.filter((item) => item.id != id);

    product = { ...product, ...newData };
    products.splice(index, 0, product);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return product;
  };

  deleteProduct = async (id) => {
    let products = await this.getProducts();

    if (products.some((prod) => prod.id === id)) {
      let product = products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2));
      console.log("Product successfully deleted!");
    } else {
      console.log("There are no items with this ID.");
    }
  };
}
