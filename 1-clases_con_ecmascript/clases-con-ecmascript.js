class ProductManager {
  constructor() {
    this.products = [];
  };

  //metodo para generar nuevos productos
  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }

    // validacion de campos requeridos
    for (const p in product) {
      if (product[p] === undefined) {
        console.log("Incomplete fields!")
        return;
      }
    }

    //validacion de existencias
    const productCode = this.products.find(e => e.code === product.code)

    if (!productCode) {
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
    const productExist = this.products.find(element => element.id === productId)

    if (!productExist) {
      console.log("Not found.")
    } else {
      console.log(productExist)
    }
  };
};

const product1 = new ProductManager();

product1.addProduct("Quilmes", "Cerveza rubia", 299, "http://www.google.com/imagen.jpg", 0323, 35);
product1.addProduct("Coca", "Gaseosa de cola", 400, "http://www.google.com/imagen.jpg", 0345);
product1.addProduct("Agua", "Agua mineral", 200, "http://www.google.com/imagen.jpg", 0323, 44);

product1.getProducts();
product1.getProductsById(1);
product1.getProductsById(3);