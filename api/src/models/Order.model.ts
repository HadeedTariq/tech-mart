import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    isPaid: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
