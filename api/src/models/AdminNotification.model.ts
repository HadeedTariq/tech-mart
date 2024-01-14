import { Schema, model } from "mongoose";

const adminNotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    isReaded: {
      type: Boolean,
      default: false,
    },
    isAccepted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const AdminNotification = model(
  "AdminNotification",
  adminNotificationSchema
);
