import { NextFunction, Request, Response, Router } from "express";
import { authChecker } from "../middlewares/auth.middleware";
import { Product as ProductProps } from "../types/product";
import { Account } from "../types/auth";
import { Product } from "../models/Product.model";
import { isSeller } from "../utils/isSeller";
const router = Router();
// ~ only seller accissble route
router.post(
  "/create",
  authChecker,
  async (req: Request, res: Response, next: NextFunction) => {
    const account: Account = req.body.user;
    const {
      productTitle,
      productDescription,
      productCategory,
      productImage,
      productSeller,
      productPrice,
      productType,
    }: ProductProps = req.body;
    if (
      !(
        productTitle ||
        productDescription ||
        productCategory ||
        productImage ||
        productSeller ||
        productPrice ||
        productType
      )
    ) {
      return next({ status: 404, message: "Please fill all the fields" });
    }
    isSeller(account, productSeller, next);

    const createdProduct = await Product.create({
      productTitle,
      productDescription,
      productCategory,
      productImage,
      productSeller,
      productPrice,
      productType,
    });
    if (createdProduct) {
      return res.status(201).json({ message: "Product Created successfully" });
    } else {
      return next({});
    }
  }
);
router.delete(
  "/delete/:id/:productSeller",
  authChecker,
  async (req: Request, res: Response, next: NextFunction) => {
    const account: Account = req.body.user;
    const { id, productSeller } = req.params;
    if (!id || !productSeller) {
      return next({ status: 404, message: "Product id is required" });
    }
    isSeller(account, productSeller, next);
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    if (deletedProduct) {
      return res.status(203).json({ message: "Product deleted successfully" });
    } else {
      return next({});
    }
  }
);
router.put(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.query;
    const product: ProductProps = req.body;
    if (!productId) {
      return next({ status: 404, message: "Product id is required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { ...product }
    );
    if (updatedProduct) {
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      return next({});
    }
  }
);
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
