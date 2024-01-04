import { NextFunction } from "express";
import { Account } from "../types/auth";

const isSeller = (
  account: Account,
  productSeller: string,
  next: NextFunction
) => {
  if (account.id !== productSeller) {
    return next({
      status: 404,
      message: "The token seller and the provided seller id doesn't match",
    });
  }
  if (account.role !== "seller") {
    return next({
      status: 404,
      message: "Only seller can perform this task",
    });
  }
};
export { isSeller };
