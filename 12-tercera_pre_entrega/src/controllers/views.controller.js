import ViewsService from "../dao/services/views.service.js";

const viewsService = new ViewsService();

export default class ViewsController {
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, category, status, sortBy } = req.query;

      let username = null;
      if (req.session.user && req.session.user.name) {
        username = req.session.user.name;
      }

      // products
      const { docs: products, hasPrevPage, hasNextPage, nextPage, prevPage } = await viewsService.getProducts(limit, page, category, status, sortBy);

      // Renderizar la vista de productos
      res.render("products", {
        sectionPage: "List of tobaccos",
        nameShopping: "DOMINGOU",
        messageUser: username ? "Bienvenido/a, " + username + "!" : "",
        sessionUser: username,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        isAdmin: req.session.user && req.session.user.role === "admin",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.pid;
      const product = await viewsService.getProductById(productId);

      let username = null;
      if (req.session.user && req.session.user.name) {
        username = req.session.user.name;
      }

      // obtener cartId
      let cartId = null;
      if (req.session.user && req.session.user.cart) {
        cartId = req.session.user.cart;
      }

      res.render("product", {
        style: "./css/index.css",
        sectionPage: product.title,
        sessionUser: username,
        title: product.title,
        nameShopping: "DOMINGOU",
        product,
        cartId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCart(req, res) {
    try {
      let cartId = req.session.user && req.session.user.cart;
      const cart = await viewsService.getCartById(cartId);

      let username = null;
      if (req.session.user && req.session.user.name) {
        username = req.session.user.name;
      }

      const products = cart.products.map((product) => {
        return { ...product, cartId: cart._id };
      });

      res.render("cart", {
        sectionPage: "Cart",
        nameShopping: "DOMINGOU",
        sessionUser: username,
        cart,
        cartId: cart._id,
        products,
        product: cart.products[0],
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLogin(req, res) {
    try {
      res.render("login", {
        style: "./css/index.css",
        sectionPage: "Login",
        nameShopping: "DOMINGOU",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRegister(req, res) {
    try {
      res.render("register", {
        style: "./css/index.css",
        sectionPage: "Register",
        nameShopping: "DOMINGOU",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      let user = req.session.user;
      const thumbnails = user.thumbnails ? user.thumbnails : [];

      res.render("profile", {
        user,
        thumbnails,
        style: "./css/index.css",
        sectionPage: "Profile",
        sessionUser: req.session.user,
        nameShopping: "DOMINGOU",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ status: "error", error: "Internal Server Error" });
        }
        res.redirect("/login");
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRecovery(req, res) {
    try {
      res.render("restore", {
        style: "./css/index.css",
        sectionPage: "Recovery password",
        nameShopping: "DOMINGOU",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async showPurchaseOrder(req, res) {
    try {
      const { notPurchased, createdOrder } = req.body;
      console.log("estos son los no comprados: "+ notPurchased);
      console.log("estos son los comprados: "+createdOrder);

      res.render("order", { sectionPage: "Cart", nameShopping: "DOMINGOU", notPurchased, createdOrder });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
  }
}
