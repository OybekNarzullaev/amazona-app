import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems === 0) {
      res.status(400).send({ message: "Cart is Empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: "Order created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  })
);

export default orderRouter;
