import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { orderService } from "../dao/services/orders.service.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    res.json({ status: "success", orders });
  } catch (error) {
    next(
      new CustomError({
        name: errorsName.ORDER_NOT_FOUND,
        message: errorsMessage.ORDER_NOT_FOUND,
        cause: errorsCause.ORDER_NOT_FOUND,
        originalError: error.message,
      })
    );
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.oid;
    const order = await orderService.getOrderById(id);

    if (!order) {
      throw new CustomError({
        name: errorsName.ORDER_NOT_FOUND,
        message: errorsMessage.ORDER_NOT_FOUND,
        cause: errorsCause.ORDER_NOT_FOUND,
      });
    }

    res.json({ status: "success", order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { userId, cartId, products } = req.body;

    if (!userId || !cartId || !products) {
      throw new CustomError({
        name: errorsName.MISSING_FIELDS,
        message: errorsMessage.MISSING_FIELDS,
        cause: errorsCause.MISSING_FIELDS,
      });
    }

    const order = {
      userId,
      cartId,
      products,
    };

    const createdOrder = await orderService.createOrder(order);
    res.status(201).json({
      status: "success",
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const resolveOrder = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { resolve } = req.query;
    const order = await orderService.getOrderById(oid);

    if (!order) {
      throw new CustomError({
        name: errorsName.ORDER_NOT_FOUND,
        message: errorsMessage.ORDER_NOT_FOUND,
        cause: errorsCause.ORDER_NOT_FOUND,
      });
    }

    order.status = resolve;
    await orderService.resolveOrder(order._id, order);

    res.json({ status: "success", result: "Order resolved" });
  } catch (error) {
    next(error);
  }
};
