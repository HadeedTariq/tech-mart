import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../types/auth";
import { Account } from "../models/Account.model";
import jwt from "jsonwebtoken";
import { ENV } from "../envVariables/envVariable";
const createUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    email,
    password,
    role,
    sellerPassword,
    adminPassword,
  }: User & { sellerPassword: string; adminPassword: string } = req.body;
  if (!username || !email || !password || !role) {
    return next({ message: "Please fill all the fields" });
  }
  if (role === "seller" && sellerPassword !== ENV.SELLER_PASSWORD) {
    return next({ status: 404, message: "Incorrect seller password" });
  }
  if (role === "admin" && adminPassword !== ENV.ADMIN_PASSWORD) {
    return next({ status: 404, message: "Incorrect admin password" });
  }
  const hashedPassword = await bcrypt.hash(password, 16);
  req.body.user = { username, email, role, password: hashedPassword };
  next();
};
const accountLoginChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 404, message: "Please fill all the fields" });
  }
  const user = await Account.findOne({ email });
  if (!user) {
    return next({ status: 404, message: "User not found" });
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!isCorrectPassword) {
    return next({ status: 404, message: "Incorrect Password" });
  }
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user._id,
      role: user.role,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  res.cookie("accountToken", token, { httpOnly: true });
  req.body.token = token;
  next();
};
const authChecker = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accountToken || req.body.accountToken;
  if (!token) {
    return next({ status: 404, message: "Token not found" });
  }
  const user = jwt.verify(token, ENV.JWT_SECRET);
  if (!user) {
    return next({ status: 404, message: "Invalid token" });
  }
  req.body.user = user;
  next();
};

export { createUserMiddleware, accountLoginChecker, authChecker };
