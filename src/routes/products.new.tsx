
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProduct } from "../features/products/api";

import {
  createProductSchema,
  type CreateProductFormData,
} from "../features/products/schema";

export const Route = createFileRoute("/products/new")({
  component: CreateProductPage,
});

function CreateProductPage() {
  const navigate = useNavigate();
  const createMutation = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: 1,
    },
  });

  const onSubmit = (data: CreateProductFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        void navigate({ to: "/products" });
      },
    });
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Створення товару
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label htmlFor="title">Назва товару</label>
          <input
            id="title"
            {...register("title")}
            className="w-full rounded border p-3"
          />
          {errors.title && (
            <p className="text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price">Ціна</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded border p-3"
          />
          {errors.price && (
            <p className="text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="categoryId">
            ID категорії
          </label>
          <input
            id="categoryId"
            type="number"
            {...register("categoryId", {
              valueAsNumber: true,
            })}
            className="w-full rounded border p-3"
          />
          {errors.categoryId && (
            <p className="text-red-500">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          {createMutation.isPending
            ? "Збереження..."
            : "Створити товар"}
        </button>

        {createMutation.isError && (
          <p className="text-red-500">
            Помилка сервера: {createMutation.error.message}
          </p>
        )}
      </form>
    </main>
  );
}
