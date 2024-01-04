import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      enum: [
        "mobile",
        "laptop",
        "cpu",
        "ram",
        "gpu",
        "ssd",
        "monitor",
        "mouse",
        "keyboard",
        "ssd",
      ],
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productSeller: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    productPrice: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      enum: ["New", "Used"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
