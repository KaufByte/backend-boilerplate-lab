
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import apiClient from "../../lib/axios";

import type {
  Product,
  CreateProductData,
  UpdateProductData,
} from "./types";

// GET — усі товари
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get("/products");
      return response.data;
    },
  });
}

// GET — один товар
export function useProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product> => {
      const response = await apiClient.get(
        `/products/${id}`
      );
      return response.data;
    },
    enabled: Number.isInteger(id) && id > 0,
  });
}

// POST — створення
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await apiClient.post(
        "/products",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

// PUT — редагування
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateProductData;
    }) => {
      const response = await apiClient.put(
        `/products/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

// DELETE — видалення
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
