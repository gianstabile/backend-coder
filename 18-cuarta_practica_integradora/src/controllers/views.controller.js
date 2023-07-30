import { logger } from "../utils/logger.js";
import { orderService } from "../services/orders.service.js";
import { restoreService } from "../services/restore.service.js";
import documentService from "../services/documents.service.js";
import ViewsService from "../services/views.service.js";
import GetCurrentUserDTO from "../dto/currentuser.dto.js";
import { faker } from "@faker-js/faker";

const viewsService = new ViewsService();

export default class ViewsController {
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, category, status, sortBy } = req.query;
      const role = req.session.user.role;

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
        user: username,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        isAdmin: role === "admin" || (role === "premium" && role !== "user"),
      });
      logger.info("Products rendered successfully.");
    } catch (error) {
      logger.error("Error rendering products.", error);
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
      logger.info("Product rendered successfully.");
    } catch (error) {
      logger.error("Error rendering product.", error);
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
        user: username,
        cart,
        cartId,
        products,
        product: cart.products[0],
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
      });
      logger.info("Cart rendered successfully.");
    } catch (error) {
      logger.error("Error rendering cart.", error);
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
      logger.error("Error rendering Login.", error);
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
      logger.info("Register rendered successfully.");
    } catch (error) {
      logger.error("Error rendering Register.", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = new GetCurrentUserDTO(req.session.user);
      const userId = req.session.user.id;
      const role = req.session.user.role;
      const profilePicture = req.session.user.profilePicture;
      const documents = await documentService.findDocsById({ user: userId });

      res.render("profile", {
        user,
        userId,
        role,
        documents,
        profilePicture,
        style: "./css/index.css",
        nameShopping: "DOMINGOU",
        sectionPage: "Profile",
        isAdmin: req.session.user.role === "admin",
        isNotAdmin: req.session.user.role === "user",
      });
      logger.info("Profile rendered successfully.");
    } catch (error) {
      logger.error("Error rendering Profile.", error);
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ status: "error", error: "Internal Server Error" });
        }
        res.redirect("/login");
      });
    } catch (error) {
      logger.error("Error in logout.", error);
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
      logger.error("Error rendering Current User.", error);
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
      logger.info("Purchase rendered successfully.");
    } catch (error) {
      logger.error("Error rendering Purchase.", error);
      res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
  }

  async getMockingProducts(req, res) {
    try {
      const products = [];
      const numProducts = 100;

      for (let i = 0; i < numProducts; i++) {
        const product = {
          id: faker.database.mongodbObjectId(),
          code: faker.string.alphanumeric(8),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          department: faker.commerce.department(),
          stock: faker.number.int({ min: 0, max: 100 }),
          image: faker.image.url(),
        };

        products.push(product);
      }
      logger.info("Mocking Products rendered successfully.");
      res.json(products);
    } catch (error) {
      logger.error("Error rendering Mocking Products.", error);
      res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
  }

  async restorePassword(req, res) {
    try {
      const { token } = req.query;

      const restore = await restoreService.restorePassword(token);
      if (!restore) {
        logger.info("No restore found for the provided token.");
        return res.render("restore", {
          style: "./css/index.css",
          sectionPage: "Restore Password",
          nameShopping: "DOMINGOU",
        });
      } else {
        logger.info("Restore found for the provided token.");
        return res.render("restorePassword", {
          style: "./css/index.css",
          sectionPage: "Restore Password",
          nameShopping: "DOMINGOU",
        });
      }
    } catch (error) {
      logger.error("Error", error);
      res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
  }
}
