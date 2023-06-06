import userService from "../dao/services/users.service.js";
import cartService from "../dao/services/cart.service.js";
import orderService from "../dao/services/order.service.js";

export const getOrders = async (req, res) => {
  try {
    let result = await orderService.getOrders();
    res.json({ status: "success", result });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { oid } = req.params;
    let order = await orderService.getOrderById(oid);
    res.json({ status: "success", result: order });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user, cart, products } = req.body;
    const resultUser = await userService.getUserById(user);
    const resultCart = await cartService.getCartById(cart);

    const actualOrders = resultCart.products.filter((product) => products.includes(product._id));
    const sum = actualOrders.reduce((acc, prev) => acc + prev.price, 0);

    let order = {
      amount: sum,
      purchaser: resultUser._id,
    };

    const createdOrder = await orderService.createOrder(order);
    resultUser.orders.push(createdOrder._id);
    await userService.updateUser(user, resultUser);
    res.json({ status: "success", createdOrder });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const resolveOrder = async (req, res) => {
  try {
    const { resolve } = req.query;
    let order = await orderService.getOrderById(req.params.oid);
    order.status = resolve;
    await orderService.resolveOrder(order._id, order);
    res.json({ status: "success", result: "Order resolved" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};
