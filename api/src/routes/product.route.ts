import { NextFunction, Request, Response, Router } from "express";

import { Product } from "../models/Product.model";
const router = Router();
// ~user gets products through this route
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({});
  if (products) {
    return res.status(200).json(products);
  } else {
    return next({});
  }
});

export { router as productRouter };
