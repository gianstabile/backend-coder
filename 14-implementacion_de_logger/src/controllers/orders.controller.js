import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { orderService } from "../dao/services/orders.service.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    logger.info("Retrieved orders successfully");

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

    logger.error("Error retrieving orders", error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.oid;
    const order = await orderService.getOrderById(id);

    if (!order) {
      logger.error("Order not found.");

      throw new CustomError({
        name: errorsName.ORDER_NOT_FOUND,
        message: errorsMessage.ORDER_NOT_FOUND,
        cause: errorsCause.ORDER_NOT_FOUND,
      });
    }

    logger.info(`Retrieved order by ID: ${id}`);

    res.json({ status: "success", order });
  } catch (error) {
    next(error);

    logger.error(`Error retrieving order by ID: ${id}`, error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { userId, cartId, products } = req.body;

    if (!userId || !cartId || !products) {
      logger.warning("Missing fields. Please try again.");
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

    logger.info("Order created successfully");

    res.status(201).json({
      status: "success",
      order: createdOrder,
    });
  } catch (error) {
    next(error);

    logger.error("Error creating order", error);
  }
};

export const resolveOrder = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { resolve } = req.query;
    const order = await orderService.getOrderById(oid);

    if (!order) {
      logger.error("Order not found");

      throw new CustomError({
        name: errorsName.ORDER_NOT_FOUND,
        message: errorsMessage.ORDER_NOT_FOUND,
        cause: errorsCause.ORDER_NOT_FOUND,
      });
    }

    order.status = resolve;
    await orderService.resolveOrder(order._id, order);

    logger.info("Order resolved.");

    res.json({ status: "success", result: "Order resolved" });
  } catch (error) {
    next(error);
    logger.error("Error resolving order", error);
  }
};
