import express, { Request, Response } from "express";
import auth from "../middlewares/auth";
import { ProductStore } from "../models/product";
import { Dashboard } from "../services/dashboard";

const dashBoard = new Dashboard()
const showProductsByCategory = async function (req: Request, res: Response) {
    const category = req.params.category;
    try {
        const newProduct = await dashBoard.showProductsByCategory(category);
        return res.json(newProduct);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
};
const showTop5Products = async function name(_req: Request, res: Response) {
    try {
        const products = await dashBoard.showTop5Products()
        return res.json(products)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }

}
const showCompletedOrders = async function (req: Request, res: Response) {
    const id = req.params.user_id;
    try {
        const orders = await dashBoard.showCompletedOrders(parseInt(id));
        return res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.get("/products/category/:category", showProductsByCategory);
    app.get("/products/top", showTop5Products);
    app.get("/orders/:user_id/completed", auth.verifyToken, showCompletedOrders);

};

export default dashboardRoutes