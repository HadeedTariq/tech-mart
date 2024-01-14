import { Router } from "express";
import { Account } from "../models/Account.model";
import { adminChecker } from "../middlewares/admin.middleware";
import { AdminNotification } from "../models/AdminNotification.model";

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

router.post("/make-user-seller", async (req, res, next) => {
  const { user } = req.body;
  const seller = await Account.findOneAndUpdate(
    { _id: user },
    { role: "seller" },
    { new: true }
  );
  await AdminNotification.findByIdAndUpdate(
    { user },
    { isAccepted: true, isReaded: true }
  );
  if (!seller) {
    return next({ message: "Seller cannot be created" });
  } else {
    return res.status(200).json({ message: "Seller created successfully" });
  }
});

export { router as adminRouter };
