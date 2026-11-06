
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useProducts,
  useDeleteProduct,
} from "../features/products/api";

export const Route = createFileRoute("/products/")({
  component: ProductsListPage,
});

function ProductsListPage() {
  const { data: products, isLoading, isError, error } = useProducts();

  const deleteMutation = useDeleteProduct();

  if (isLoading) {
    return <p className="p-8">Завантаження товарів...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-500">
        Помилка: {error.message}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Список товарів
      </h1>

      <Link
        to="/products/new"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        + Додати товар
      </Link>

      <div className="mt-8 space-y-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4"
          >
            <h2 className="text-xl font-bold">
              {product.productName ?? product.title}
            </h2>

            <p className="my-2">
              Ціна: {Number(product.price)} EUR
            </p>

            <div className="flex gap-4">
              <Link
                to="/products/$productId"
                params={{
                  productId: String(product.id),
                }}
                className="text-blue-500"
              >
                Редагувати
              </Link>

              <button
                type="button"
                className="text-red-500"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (window.confirm("Видалити товар?")) {
                    deleteMutation.mutate(product.id);
                  }
                }}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <p className="mt-8">Товарів поки немає.</p>
      )}
    </main>
  );
}
