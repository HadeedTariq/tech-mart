import express, { Express } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDb } from "./connection/connectToDb";
import { ENV } from "./envVariables/envVariable";
import { clientError, notFound } from "./middlewares/error.middleware";
import { accountRouter } from "./routes/account.route";
import { productRouter } from "./routes/product.route";
import { adminRouter } from "./routes/admin.route";
import { socket } from "./sockets/socket";
import { sellerRouter } from "./routes/seller.route";
import { chatRouter } from "./routes/chat.route";

connectToDb(ENV.MONGO_URI);
const PORT = ENV.PORT || 3500;
const app: Express = express();
const server = http.createServer(app);
socket(server);
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//~ routes
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/seller", sellerRouter);
app.use("/chats", chatRouter);
app.use("/admin", adminRouter);
// ~
app.get("/", (req, res) => {
  return res.send("Hello");
});

app.use(notFound);
app.use(clientError);
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
