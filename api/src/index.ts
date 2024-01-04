import express, { Express } from "express";
import { connectToDb } from "./connection/connectToDb";
import { ENV } from "./envVariables/envVariable";
import cookieParser from "cookie-parser";
import { clientError, notFound } from "./middlewares/error.middleware";
import { accountRouter } from "./routes/account.route";
import { productRouter } from "./routes/product.route";
connectToDb(ENV.MONGO_URI);
const PORT = ENV.PORT || 3500;
const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//~ routes
app.use("/account", accountRouter);
app.use("/product", productRouter);
// ~
app.get("/", (req, res) => {
  return res.send("Hello");
});

app.use(notFound);
app.use(clientError);
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
