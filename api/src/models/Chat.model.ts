import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Account" },
    seller: { type: Schema.Types.ObjectId, ref: "Account" },
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "Account" },
        content: String,
      },
    ],
  },
  { timestamps: true }
);

export const Chat = model("Chat", chatSchema);
