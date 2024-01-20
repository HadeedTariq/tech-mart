import { authChecker } from "../middlewares/auth.middleware";
import { Product as ProductProps } from "../types/product";
import { Account } from "../types/auth";
import { NextFunction, Request, Response, Router } from "express";
import { isSeller } from "../utils/isSeller";
import { Product } from "../models/Product.model";
import { Chat } from "../models/Chat.model";

const router = Router();
router.use(authChecker);

router.get("/", async (req, res, next) => {
  const account: Account = req.body.user;
  const { seller } = req.query;
  if (!seller) {
    return next({ status: 404, message: "Seller is required" });
  }
  isSeller(account, seller as string, next);
  const products = await Product.find({ productSeller: seller });
  if (products) {
    return res.status(200).json(products);
  } else {
    next({});
  }
});
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

router.get("/chats", async (req, res, next) => {
  const account = req.body.user;
  const { seller } = req.query;
  if (!seller) {
    return next({ status: 404, message: "Seller is required" });
  }
  isSeller(account, seller as string, next);
  const chats = await Chat.find({ seller }).populate({
    path: "user",
    select: "-password",
  });
  if (chats) {
    return res.status(200).json(chats);
  } else {
    next({});
  }
});

export { router as sellerRouter };
