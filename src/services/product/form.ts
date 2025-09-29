import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  price: z.string().min(1, "Price is required!"),
});

export type ProductSchema = z.infer<typeof productSchema>;
