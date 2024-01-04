import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import bcrypt from "bcryptjs";
import { Account } from "../models/Account.model";
import { NextFunction, Request, Response } from "express";
import { User } from "../types/auth";
import { ENV } from "../envVariables/envVariable";
const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  const user: User = req.body.user;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.NODE_MAILER_USER,
      pass: ENV.NODE_MAILER_PASSWORD,
    },
  });
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };
  transporter.use(
    "compile",
    hbs(handlebarOptions as NodemailerExpressHandlebarsOptions)
  );
  const mailOptions = {
    from: "Tech Mart @computeranalog351@gmail.com",
    template: "email",
    to: user.email,
    subject: `Welcome to Tech Mart, ${user.username}`,
    context: {
      name: user.username,
      company: "Tech Mart",
      password,
      securityKey: user.password,
      email: user.email,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(`Nodemailer error sending email to ${user.email}`, error);
    next({
      status: 404,
      message: `Nodemailer error sending email to ${user.email}`,
    });
  }

  return res
    .status(200)
    .json({ message: "Please check your mail and verify your account" });
};
const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role, name, email } = req.params;
  const { securityKey, pass } = req.query;
  const isUserAlreadyExist = await Account.findOne({ email });
  if (isUserAlreadyExist) {
    return next({ message: "User already exist with this email" });
  }
  const isVerified = await bcrypt.compare(
    pass as string,
    securityKey as string
  );
  if (!isVerified) {
    return next({ message: "Wrong security key" });
  }
  const createdUser = await Account.create({
    username: name,
    email,
    password: securityKey,
    role,
  });
  if (!createdUser) {
    return next({});
  }
  return res
    .status(200)
    .json({ message: "User verified and created successfully" });
};
const authorizeAccount = async (req: Request, res: Response) => {
  const { token } = req.body;
  return res
    .status(200)
    .json({ message: "User logged in successfully", token });
};
const authenticateAccount = async (req: Request, res: Response) => {
  const user = req.body.user;
  return res.status(200).json(user);
};

export { createAccount, authenticateAccount, authorizeAccount, verifyAccount };
