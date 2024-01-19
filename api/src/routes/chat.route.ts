import { Router } from "express";
import { Chat } from "../models/Chat.model";
import { authChecker } from "../middlewares/auth.middleware";

const router = Router();

router.use(authChecker);

router.get("/", async (req, res, next) => {
  const { user, seller } = req.query;
  if (!(user || seller)) {
    return next({ status: 404, message: "Please fill all the fields" });
  }
  const chat = await Chat.find({
    user,
    seller,
  }).populate({
    path: "user seller",
    select: "-password",
  });
  if (!chat) {
    return next({ status: 404, message: "Chat not " });
  } else {
    return res.status(200).json(chat);
  }
});

export { router as chatRouter };
