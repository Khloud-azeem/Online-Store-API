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

const showCompletedOrders = async function (req: Request, res: Response) {
  const id = req.params.user_id;
  try {
    const orders = await orderStore.showCompletedOrders(parseInt(id));
    return res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async function (req: Request, res: Response) {
  const order: Order = {
    prod_id: parseInt(req.body.prod_id),
    user_id: parseInt(req.body.user_id),
    quantity: parseInt(req.body.quantity),
    status: req.body.status,
  };
  try {
    const newOrder = await orderStore.create(order);
    console.log(newOrder);
    return res.json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:user_id", auth.verifyToken, showCurrentOrder);
  app.get("/orders/completed/:user_id", auth.verifyToken, showCompletedOrders);
  app.post("/orders", auth.verifyToken, create);
};

export default orderRoutes;
