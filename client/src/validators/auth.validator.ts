import { z } from "zod";

const registerValidator = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
});
export type RegisterUser = z.infer<typeof registerValidator>;
const loginValidator = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export type LoginUser = z.infer<typeof loginValidator>;
export { registerValidator, loginValidator };
