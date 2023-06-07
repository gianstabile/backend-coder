import { orderRepository } from "../repositories/orders.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import { productRepository } from "../repositories/products.repository.js";
import { v4 as uuid4 } from "uuid";
import CreateOrderDto from "../../dto/createorder.dto.js";

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

      let totalAmmount = 0;
      const code = uuid4();
      const purchase_datetime = Date.now();
      let products = [];
      let unsuccessfulProducts = [];

      for (const item of cart.products) {
        const product = await this.productRepository.getProductById(item.product._id);
        const quantity = item.quantity;
        const price = item.product.price;

        if (!product) {
          // si producto no existe, agregarlo a los productos no exitosos
          unsuccessfulProducts.push(item.product);
          continue;
        }

        if (product.stock < quantity) {
          // Agregar productos si  no hay suficiente stock
          unsuccessfulProducts.push({
            product: item.product,
            quantity: quantity,
          });
          continue;
        }

        // Restar cantidad del stock del producto
        product.stock -= quantity;
        await product.save();

        // Agregar producto a la lista de productos comprados
        products.push({
          product: product,
          quantity: quantity,
        });

        totalAmmount += price * quantity;
      }
      const purchaser = user.email;

      const order = {
        code,
        purchase_datetime,
        successProducts: products,
        unsuccessfulProducts: unsuccessfulProducts,
        totalAmmount,
        purchaser,
      };

      if (ticket.unsuccessfulProducts.length > 0) {
        return {
          error: `Products without enough stock to make the purchase.`,
          unsuccessfulProducts: unsuccessfulProducts,
        };
      }

      if (ticket.successProducts.length <= 0) {
        return {
          error: `The cart is empty.`,
        };
      }

      const createdOrder = await this.orderRepository.createOrder(order);
      if (unsuccessfulProducts.length > 0) {
        const unsuccessfulProductIds = unsuccessfulProducts.map((item) => item.product._id.toString());

        cart.products = cart.products.filter((item) => !unsuccessfulProductIds.includes(item.product.toString()));
        await this.userRepository.saveUser(user);
      } else {
        cart.products = [];
        await this.cartRepository.saveCart(cart);
      }

      if (createdOrder) {
        return order;
      } else {
        return { error: `Could not create order.` };
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
