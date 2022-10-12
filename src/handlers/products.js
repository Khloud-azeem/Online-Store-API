"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../middlewares/auth"));
const product_1 = require("../models/product");
const productStore = new product_1.ProductStore();
const index = async function (_req, res) {
    try {
        const products = await productStore.index();
        return res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async function (req, res) {
    const id = req.params.id;
    try {
        const product = await productStore.show(parseInt(id));
        return res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async function (req, res) {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await productStore.create(product);
        return res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const showByCategory = async function (req, res) {
    const category = req.params.category;
    try {
        const newProduct = await productStore.showByCategory(category);
        return res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", auth_1.default.verifyToken, create);
    app.get("/products/category/:category", showByCategory);
};
exports.default = productRoutes;
