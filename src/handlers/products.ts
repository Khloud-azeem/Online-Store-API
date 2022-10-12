import express, { Request, Response } from "express";
import auth from "../middlewares/auth";
import { Product, ProductStore } from "../models/product";

const productStore = new ProductStore();

const index = async function (_req: Request, res: Response) {
  try {
    const products = await productStore.index();
    return res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};
const show = async function (req: Request, res: Response) {
  const id = req.params.id;
  try {
    const product = await productStore.show(parseInt(id));
    return res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
const create = async function (req: Request, res: Response) {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await productStore.create(product);
    return res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};
const showByCategory = async function (req: Request, res: Response) {
  const category = req.params.category;
  try {
    const newProduct = await productStore.showByCategory(category);
    return res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", auth.verifyToken, create);
  app.get("/products/category/:category", showByCategory);
};

export default productRoutes;
