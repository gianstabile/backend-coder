import generateError from "../utils/errorHandler.js";
import { orderService } from "../dao/services/orders.service.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    res.json({ status: "success", orders });
  } catch (error) {
    next(generateError("ORDER_NOT_FOUND", error.message));
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.oid;
    const order = await orderService.getOrderById(id);

    if (!order) {
      const customError = generateError("ORDER_NOT_FOUND");
      return next(customError);
    }

    res.json({ status: "success", order });
  } catch (error) {
    next(generateError("ORDER_NOT_FOUND", error.message));
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { userId, cartId, products } = req.body;

    if (!userId || !cartId || !products) {
      const customError = generateError("MISSING_FIELDS");
      return next(customError);
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
    next(generateError("ORDER_CREATION_FAILED", error.message));
  }
};

export const resolveOrder = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { resolve } = req.query;
    const order = await orderService.getOrderById(oid);

    if (!order) {
      throw generateError("ORDER_NOT_FOUND");
    }

    order.status = resolve;
    await orderService.resolveOrder(order._id, order);

    res.json({ status: "success", result: "Order resolved" });
  } catch (error) {
    next(generateError("ORDER_RESOLUTION_FAILED", error.message));
  }
};
