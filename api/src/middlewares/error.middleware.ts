import { NextFunction, Request, Response } from "express";
import { Error } from "../types/error";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const route = req.url;
  console.log(route);

  return res.send(`Route ${route} not found`);
};

const clientError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ message });
};

export { clientError, notFound };
