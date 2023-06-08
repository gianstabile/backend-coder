import { orderRepository } from "../repositories/orders.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import { productRepository } from "../repositories/products.repository.js";
import { v4 as uuid4 } from "uuid";

const userRepository = new UsersRepository();

class OrderService {
  constructor() {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
    this.userRepository = userRepository;
  }

  async getOrders() {
    try {
      return await this.orderRepository.getOrders();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch orders.");
    }
  }

  async getOrderById(id) {
    try {
      return await this.orderRepository.getOrderById(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting order by ID.");
    }
  }

  async createOrder(cartId) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      if (!cart) {
        throw new Error("Cart does not exist.");
      }

      const user = await userRepository.findByCartId(cartId);
      if (!user) {
        throw new Error("User does not exist.");
      }

      let totalAmount = 0;
      const code = uuid4();
      const purchaseDatetime = Date.now();
      const products = [];
      const unsuccessfulProducts = [];

      for (const item of cart.products) {
        const product = await productRepository.getProductById(item.product._id);
        const quantity = item.quantity;
        const price = item.product.price;

        if (!product) {
          unsuccessfulProducts.push(item.product);
          continue;
        }

        if (product.stock < quantity) {
          unsuccessfulProducts.push({
            product: item.product,
            quantity: quantity,
          });
          continue;
        }

        product.stock -= quantity;
        await productRepository.updateProduct(product._id, { stock: product.stock });

        products.push({
          product: product,
          quantity: quantity,
        });

        totalAmount += price * quantity;
      }

      const purchaser = user.email;

      const order = {
        code: code,
        purchaseDatetime: purchaseDatetime,
        successProducts: products,
        unsuccessfulProducts: unsuccessfulProducts,
        totalAmount: totalAmount,
        purchaser: purchaser,
      };

      if (unsuccessfulProducts.length > 0) {
        throw {
          error: "Products without enough stock to make the purchase.",
          unsuccessfulProducts: unsuccessfulProducts,
        };
      }

      if (products.length === 0) {
        throw {
          error: "The cart is empty.",
        };
      }

      const createdOrder = await orderRepository.createOrder(order);

      if (unsuccessfulProducts.length > 0) {
        const unsuccessfulProductIds = unsuccessfulProducts.map((item) => item.product._id.toString());
        cart.products = cart.products.filter((item) => !unsuccessfulProductIds.includes(item.product.toString()));
        await userRepository.saveUser(user);
      } else {
        await cartRepository.emptyCart(cartId);
      }

      if (createdOrder) {
        return order;
      } else {
        throw new Error("Could not create order.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error creating order.");
    }
  }

  async resolveOrder(id, updatedOrder) {
    try {
      return await this.orderRepository.resolveOrder(id, updatedOrder);
    } catch (error) {
      console.error(error);
      throw new Error("Error resolving order.");
    }
  }
}

export const orderService = new OrderService();
