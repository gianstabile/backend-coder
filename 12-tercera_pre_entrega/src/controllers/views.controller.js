import { orderService } from "../dao/services/orders.service.js";
import { cartService } from "../dao/services/cart.service.js";
import ViewsService from "../dao/services/views.service.js";
import GetCurrentUserDTO from "../dto/currentuser.dto.js";

const viewsService = new ViewsService();

export default class ViewsController {
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, category, status, sortBy } = req.query;

      let username = null;
      if (req.session.user || req.session.user.name) {
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
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
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
        nameShopping: "DOMINGOU",
        sectionPage: product.title,
        sessionUser: username,
        title: product.title,
        product,
        cartId,
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
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
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
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
      const user = new GetCurrentUserDTO(req.session.user);
      const thumbnails = req.session.user.thumbnails ? req.session.user.thumbnails : [];

      res.render("profile", {
        user: user,
        thumbnails,
        style: "./css/index.css",
        nameShopping: "DOMINGOU",
        sectionPage: "Profile",
        sessionUser: req.session.user,
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
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

  async getCurrentUser(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const currentUser = new GetCurrentUserDTO(req.session.user);

      res.render("current", { style: "./css/index.css", sectionPage: "Current", sessionUser: currentUser, nameShopping: "DOMINGOU" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async purchase(req, res) {
    try {
      const cartId = req.session.user.cart;
      const order = await orderService.createOrder(cartId);

      res.render("purchase", {
        order,
        sectionPage: "Purchase",
        nameShopping: "DOMINGOU",
        sessionUser: req.session.user,
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
  }
}
