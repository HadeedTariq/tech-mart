import express, { Express } from "express";
import { config } from "dotenv";

config();
const PORT = process.env.PORT;

const app: Express = express();

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
