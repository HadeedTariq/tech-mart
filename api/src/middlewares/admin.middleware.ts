import { NextFunction, Request, Response } from "express";
import { ENV } from "../envVariables/envVariable";

const adminChecker = (req: Request, res: Response, next: NextFunction) => {
  const { adminPassword } = req.query;
  if (adminPassword !== ENV.ADMIN_PASSWORD) {
    return next({ message: "Incorrect admin password" });
  }
  next();
};

export { adminChecker };
