import { orderService } from "../dao/services/orders.service.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json({ status: "success", orders });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.oid;
    const order = await orderService.getOrderById(id);

    if (!order) return res.status(404).send({ status: "error", error: "Order does not exist" });

    res.json({ status: "success", order });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, cartId, products } = req.body;

    if (!userId || !cartId || !products) {
      return res.status(400).json({
        status: "error",
        error: "Missing required fields.",
      });
    }

    const order = {
      userId: userId,
      cartId: cartId,
      products: products,
    };

    const createdOrder = await orderService.createOrder(order);
    return res.status(201).json({
      status: "success",
      order: createdOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  }
};

export const resolveOrder = async (req, res) => {
  try {
    const { oid } = req.params;
    const { resolve } = req.query;
    const order = await orderService.getOrderById(oid);
    order.status = resolve;
    await orderService.resolveOrder(order._id, order);
    res.json({ status: "success", result: "Order resolved" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};
