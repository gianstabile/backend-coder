import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./files/products.json";
    this.products = [];
  }

  async readProducts() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      console.log(result);
      return result;
    } else {
      return this.products;
    }
  }

  async writeProduct(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async addProduct(product) {
    let newProduct = {};
    let data = await this.readProducts();

    if (!data) {
      product.id = 1;
      newProduct = [product];
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
      newProduct = product;
    }

    this.products.push(newProduct);

    await this.writeProduct(newProduct);
  }

  async getProducts() {
    let data = await this.readProducts();
    return data;
  }

  async getById(productId) {
    let data = await this.readProducts();
    let result = JSON.parse(data);

    let productExist = result.filter((prod) => prod.id === productId);
    return productExist;
  }
}
