import { Server as HttpServer, IncomingMessage, ServerResponse } from "http";
import { Server, Socket } from "socket.io";
import { AdminNotification } from "../models/AdminNotification.model";
import { Account } from "../models/Account.model";
import { Chat } from "../models/Chat.model";
export const socket = (
  server: HttpServer<typeof IncomingMessage, typeof ServerResponse>
) => {
  type User = {
    userId: string;
    socketId: string;
    role: string | null;
  };
  let users: User[] = [];
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket: Socket) => {
    socket.on("addUser", (user: User) => {
      if (!user.userId) return;
      const isUserAlreadyExist = users.find((u) => u.userId === user.userId);
      if (isUserAlreadyExist) return;
      users.push({ ...user, socketId: socket.id });
      console.log(users);
    });
    socket.on("sellerRequest", async (request: User & { adminId: string }) => {
      const requester = users.find((u) => u.userId === request.userId);
      // ^ checking admin is online or not
      const admin = users.find((u) => u.userId === request.adminId);
      const isAlreadyApplied = await AdminNotification.findOne({
        user: requester?.userId,
      });
      if (isAlreadyApplied) {
        io.to(requester?.socketId!).emit("alreadyapplied", {
          id: requester?.userId,
          message: "You already applied for seller",
        });
        return;
      }
      // console.log(requester, admin);
      if (!admin) {
        await AdminNotification.create({
          user: requester?.userId,
        });
        return;
      } else {
        const user = await Account.findOne({ _id: requester?.userId });
        if (!user) return;
        io.to(admin.socketId).emit(
          "requestNotification",
          `${user?.username} requested to become seller`
        );
        await AdminNotification.create({
          user: requester?.userId,
          isReaded: true,
        });
      }
    });
    // ~ chat functionality
    socket.on("createChat", async (data: any) => {
      const { seller, sender } = data;
      const senderSocket = users.find((user) => user.userId === sender);
      console.log(senderSocket?.socketId);

      const chats = await Chat.find({
        user: sender,
        seller: seller,
      }).populate({
        path: "user seller",
        select: "-password",
      });
      if (chats.length <= 0) {
        await Chat.create({
          user: sender,
          seller: seller,
          messages: [],
        });
        io.to(senderSocket?.socketId!).emit(
          "chatCreated",
          "Chat created successfully"
        );
      } else {
        console.log(chats);
        io.to(senderSocket?.socketId!).emit("chats", chats);
      }
    });
  });
};
