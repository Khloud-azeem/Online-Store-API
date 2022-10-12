"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../middlewares/auth"));
const order_1 = require("../models/order");
const orderStore = new order_1.OrderStore();
const showCurrentOrder = async function (req, res) {
    const id = req.params.user_id;
    try {
        const order = await orderStore.showCurrentOrder(parseInt(id));
        return res.json(order);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const showCompletedOrders = async function (req, res) {
    const id = req.params.user_id;
    try {
        const orders = await orderStore.showCompletedOrders(parseInt(id));
        return res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async function (req, res) {
    const order = {
        prod_id: parseInt(req.body.prod_id),
        user_id: parseInt(req.body.user_id),
        quantity: parseInt(req.body.quantity),
        status: req.body.status,
    };
    try {
        const newOrder = await orderStore.create(order);
        console.log(newOrder);
        return res.json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const orderRoutes = (app) => {
    app.get("/orders/:user_id", auth_1.default.verifyToken, showCurrentOrder);
    app.get("/orders/completed/:user_id", auth_1.default.verifyToken, showCompletedOrders);
    app.post("/orders", auth_1.default.verifyToken, create);
};
exports.default = orderRoutes;
