import { z } from "zod";
import { categories } from "../utils/categories";
const productValidator = z.object({
  productTitle: z.string().min(15, { message: "Must be 15 characters long" }),
  productDescription: z
    .string()
    .min(100, { message: "Must be 100 characters long" }),
  productCategory: z.enum(categories),
  productImage: z.string(),
  productPrice: z.string(),
  productType: z.enum(["New", "Used"]),
});

export type Product = z.infer<typeof productValidator>;

export { productValidator };
