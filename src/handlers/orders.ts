import express, { Request, Response } from "express";
import auth from "../middlewares/auth";
import { Order, OrderStore } from "../models/order";

const orderStore = new OrderStore();

const showCurrentOrder = async function (req: Request, res: Response) {
  const id = req.params.user_id;
  try {
    const order = await orderStore.showCurrentOrder(parseInt(id));
    return res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async function (req: Request, res: Response) {
  const order: Order = {
    user_id: parseInt(req.body.user_id),
    status: req.body.status,
  };
  try {
    const newOrder = await orderStore.create(order);
    return res.json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addProduct = async function (req: Request, res: Response) {
  const order_id = req.params.order_id;
  const product_id = req.body.product_id;
  const quantity = req.body.quantity;
  try {
    const result = await orderStore.addProduct(
      product_id,
      parseInt(order_id),
      quantity
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders/:user_id/current", auth.verifyToken, showCurrentOrder);
  app.post("/orders", auth.verifyToken, create);
  app.post("/orders/:order_id/products", auth.verifyToken, addProduct);
};

export default ordersRoutes;
