import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

const verifyToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401);
  }
};
export default { verifyToken };
