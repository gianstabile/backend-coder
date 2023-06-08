import orderDAO from "../db/order.dao.js";

class OrderRepository {
  constructor() {
    this.orderDAO = new orderDAO();
  }

  getOrders = async () => {
    try {
      let result = await this.orderDAO.getOrders();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getOrderById = async (id) => {
    try {
      let result = await this.orderDAO.getOrderById(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createOrder = async (order) => {
    try {
      let result = await this.orderDAO.createOrder(order);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  resolveOrder = async (id, order) => {
    try {
      let result = await this.orderDAO.resolveOrder(id, { $set: order });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export const orderRepository = new OrderRepository();
