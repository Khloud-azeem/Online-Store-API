import express, { Request, Response } from "express";
import { UserStore, User } from "../models/user";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth";

const userStore = new UserStore();

const index = async function (_req: Request, res: Response) {
  try {
    const users = await userStore.index();
    return res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
const show = async function (req: Request, res: Response) {
  const id = req.params.id;
  try {
    const user = await userStore.show(parseInt(id));
    return res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
const create = async function (req: Request, res: Response) {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const newUser = await userStore.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    return res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", auth.verifyToken, index);
  app.get("/users/:id", auth.verifyToken, show);
  app.post("/users", create);
};

export default usersRoutes;
