const fs = require("fs").promises;

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(product) {
    try {
      let data = await fs.readFile(this.fileName, "utf-8");
      let products = JSON.parse(data);
      if (products.some((prod) => prod.title === product.title)) {
        console.log("Error: ya hay otro producto de ese tipo.");
      } else {
        let dataProd = {
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          id: products.length + 1,
        };
        products.push(dataProd);
        try {
          await fs.writeFile(this.fileName, JSON.stringify(products, null, 2));
          return dataProd.id;
        } catch (err) {
          console.log(err);
        }
      }
    } catch {
      let dataProd = {
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        id: 1,
      };
      try {
        await fs.writeFile(this.fileName, JSON.stringify([dataProd], null, 2));
        return id;
      } catch (err) {
        console.log("No se pudo crear el producto: " + err);
      }
    }
  }

  async getById(id) {
    try {
      let data = await fs.readFile(this.fileName, "utf-8");
      let products = JSON.parse(data);
      let product = products.find((v) => v.id === id);
      if (product) {
        return product;
      } else {
        return null;
      }
    } catch (err) {
      console.log("no se pudo leer el archivo: " + err);
    }
  }

  async getAll() {
    try {
      let data = await fs.readFile(this.fileName, "utf-8");
      let products = JSON.parse(data);
      if (products) {
        return products;
      } else {
        return null;
      }
    } catch (err) {
      console.log("No se pudo leer el archivo: " + err);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.readFile(this.fileName, "utf-8");
      let products = JSON.parse(data);
      if (products.some((product) => product.id === id)) {
        let product = products.filter((product) => product.id !== id);
        try {
          await fs.writeFile(this.fileName, JSON.stringify(product, null, 2));
          console.log("Producto borrado exitosamente!");
        } catch (err) {
          console.log("Error: no se pudo eliminar el producto: " + err);
        }
      } else {
        console.log("No hay productos con esa ID");
      }
    } catch (err) {
      console.log("Error: no se pudo leer el archivo" + err);
    }
  }

  async deleteAll() {
    try {
      let product = [];
      let jsonString = JSON.stringify(product);
      await fs.writeFile(this.fileName, jsonString);
      console.log("Productos borrados exitosamente!");
    } catch (err) {
      console.log("Error: no se pudo borrar el archivo: " + err);
    }
  }
}

module.exports = Contenedor;
