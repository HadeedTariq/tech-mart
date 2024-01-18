import { Router } from "express";
import { Account } from "../models/Account.model";
import { adminChecker } from "../middlewares/admin.middleware";
import { AdminNotification } from "../models/AdminNotification.model";
import { Product } from "../models/Product.model";

const router = Router();

router.use(adminChecker);

router.get("/notifications", async (req, res, next) => {
  const allNotifications = await AdminNotification.find({}).populate({
    path: "user",
    select: "-password",
  });
  if (allNotifications) {
    return res.status(200).json(allNotifications);
  } else {
    return next({});
  }
});

router.get("/allUsers", async (req, res, next) => {
  const allUsers = await Account.find({}).select("-password");
  if (allUsers) {
    return res.status(200).json(allUsers);
  } else {
    next({});
  }
});

router.post("/deleteUsers", async (req, res, next) => {
  const { users } = req.body;
  const deleteUsers = await Account.deleteMany({ _id: { $in: users } });
  await AdminNotification.deleteMany({ user: { $in: users } });
  if (deleteUsers) {
    return res.status(200).json({ message: "Users deleted successfully" });
  } else {
    next({});
  }
});

router.post("/make-user-seller", async (req, res, next) => {
  const { user } = req.body;
  const seller = await Account.findByIdAndUpdate(
    user,
    { role: "seller" },
    { new: true }
  );
  console.log(user);
  await AdminNotification.findOneAndUpdate(
    { user: user },
    { isAccepted: true, isReaded: true }
  );
  if (!seller) {
    return next({ message: "Seller cannot be created" });
  } else {
    return res.status(200).json({ message: "Seller created successfully" });
  }
});

router.delete("/deleteProduct", async (req, res, next) => {
  const { productId: id } = req.query;
  console.log(req.body);

  if (!id) {
    return next({ status: 404, message: "Id is required" });
  }
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (deleteProduct) {
    return res.status(200).json({ message: "Product deleted successfully" });
  } else {
    next({});
  }
});

export { router as adminRouter };
