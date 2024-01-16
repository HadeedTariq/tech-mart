import { authChecker } from "../middlewares/auth.middleware";
import { Product as ProductProps } from "../types/product";
import { Account } from "../types/auth";
import { NextFunction, Request, Response, Router } from "express";
import { isSeller } from "../utils/isSeller";
import { Product } from "../models/Product.model";

const router = Router();
router.use(authChecker);
router.post(
  "/create",
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

export { router as sellerRouter };
