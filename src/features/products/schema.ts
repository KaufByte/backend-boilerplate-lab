
import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().trim().min(
    3,
    "Назва повинна мати мінімум 3 символи"
  ),

  price: z.number().positive(
    "Ціна повинна бути більшою за 0"
  ),

  categoryId: z.number().int().positive(
    "Введіть правильний ID категорії"
  ),
});

export const editProductSchema = z.object({
  title: z.string().trim().min(
    3,
    "Назва повинна мати мінімум 3 символи"
  ),

  price: z.number().positive(
    "Ціна повинна бути більшою за 0"
  ),
});

export type CreateProductFormData =
  z.infer<typeof createProductSchema>;

export type EditProductFormData =
  z.infer<typeof editProductSchema>;
