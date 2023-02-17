class ProductManager {
  constructor() {
    this.products = [];
  };

  //metodo para generar nuevos productos
  addProduct = (title, description, price, thumbnail, stock) => {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code: this.products.length + 1,
      stock: stock ?? 50,
    }

    //validacion de existencias
    const productId = this.products.find(element => element.code === product.code)

    if (!productId) {
      this.products.push(product);
      console.log("Product add succefully.")
    } else {
      console.log("Product already added!")
    };
  };

  getProducts = () => {
    console.log(this.products);
    return;
  }

  getProductsById = (productId) => {
    if (!this.products.includes(this.products[productId])) {
      console.log("Not found.")
    } else {
      console.log("It's found.")
    }
  };
};

const product1 = new ProductManager();

product1.addProduct("Oreo", "Galletitas dulces", 280, "http://www.google.com/imagen.jpg", 23);
product1.addProduct("Coca", "Gaseosa de cola", 400, "http://www.google.com/imagen.jpg");

product1.getProducts();
product1.getProductsById(1);
product1.getProductsById(3);