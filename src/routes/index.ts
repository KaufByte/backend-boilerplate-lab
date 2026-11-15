
import { createFileRoute } from "@tanstack/react-router";
import { ProductsListPage } from "./products.index";

export const Route = createFileRoute("/")({
  component: ProductsListPage,
});
