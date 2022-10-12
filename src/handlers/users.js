"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const userStore = new user_1.UserStore();
const index = async function (_req, res) {
    try {
        const users = await userStore.index();
        return res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async function (req, res) {
    const id = req.params.id;
    try {
        const user = await userStore.show(parseInt(id));
        return res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async function (req, res) {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const newUser = await userStore.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        return res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const usersRoutes = (app) => {
    app.get("/users", auth_1.default.verifyToken, index);
    app.get("/users/:id", auth_1.default.verifyToken, show);
    app.post("/users", auth_1.default.verifyToken, create);
};
exports.default = usersRoutes;
