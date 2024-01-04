import { config } from "dotenv";

type Env = {
  MONGO_URI: string;
  PORT: string;
  JWT_SECRET: string;
  ADMIN_PASSWORD: string;
  SELLER_PASSWORD: string;
  NODE_MAILER_USER: string;
  NODE_MAILER_PASSWORD: string;
};
config();
const ENV: Env = {
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: process.env.PORT as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  SELLER_PASSWORD: process.env.SELLER_PASSWORD as string,
  NODE_MAILER_USER: process.env.NODE_MAILER_USER as string,
  NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD as string,
};

export { ENV };
