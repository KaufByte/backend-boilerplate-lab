
import { useEffect } from "react";

import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useProduct,
  useUpdateProduct,
} from "../features/products/api";

import {
  editProductSchema,
  type EditProductFormData,
} from "../features/products/schema";

export const Route = createFileRoute(
  "/products/$productId"
)({
  component: EditProductPage,
});

function EditProductPage() {
  const { productId } = Route.useParams();
  const id = Number(productId);

  const navigate = useNavigate();

  // Отримання товару з Backend
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(id);

  // Оновлення товару
  const updateMutation = useUpdateProduct();

  // Форма та валідація Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      title: "",
      price: 0,
    },
  });

  // Заповнення форми даними товару
  useEffect(() => {
    if (product) {
      reset({
        title:
          product.title ??
          product.productName ??
          "",
        price: Number(product.price),
      });
    }
  }, [product, reset]);

  // Відправлення PUT-запиту
  const onSubmit = (data: EditProductFormData) => {
    updateMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          void navigate({ to: "/products" });
        },
      }
    );
  };

  if (!Number.isInteger(id) || id <= 0) {
    return <p>Неправильний ID товару</p>;
  }

  if (isLoading) {
    return <p>Завантаження товару...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-500">
        Помилка завантаження: {error.message}
      </p>
    );
  }

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Редагування товару №{id}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label htmlFor="title">
            Назва товару
          </label>

          <input
            id="title"
            {...register("title")}
            className="w-full rounded border bg-white p-3 text-black"
          />

          {errors.title && (
            <p className="text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price">
            Ціна товару
          </label>

          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded border bg-white p-3 text-black"
          />

          {errors.price && (
            <p className="text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          {updateMutation.isPending
            ? "Збереження..."
            : "Зберегти зміни"}
        </button>

        {updateMutation.isError && (
          <p className="text-red-500">
            Помилка оновлення:
            {" "}
            {updateMutation.error.message}
          </p>
        )}
      </form>
    </main>
  );
}
