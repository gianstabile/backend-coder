import { orderRepository } from "../repositories/order.repository.js";

class OrderService {
  constructor() {
    this.orderRepository = orderRepository;
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
      return await this.orderRepository.getOrderById({ _id: id });
    } catch (error) {
      console.error(error);
      throw new Error("Error getting order by ID.");
    }
  }

  async createOrder(order) {
    try {
      return await this.orderRepository.createOrder(order);
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

export default OrderService;
