import OrderModel from "../models/order.model.js";

export default class OrderDAO {
  constructor() {
    this.orderModel = OrderModel;
  }
  getOrders = async () => {
    try {
      let result = await this.orderModel.find();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getOrderById = async (id) => {
    try {
      let result = await this.orderModel.findOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createOrder = async (order) => {
    try {
      const createdOrder = await this.orderModel.create(order);
      return createdOrder;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  resolveOrder = async (id, order) => {
    try {
      let result = await this.orderModel.updateOne({ _id: id }, { $set: order });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
