
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/products/$productId"
)({
  component: EditProductPage,
});

function EditProductPage() {
  const { productId } = Route.useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Редагування товару №{productId}
      </h1>
    </div>
  );
}
