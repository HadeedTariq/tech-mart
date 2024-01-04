import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Account = model("Account", accountSchema);
