
export interface Product {
  id: number;
  title?: string;
  productName?: string;
  price: number | string;
  categoryId?: number;
}

export interface CreateProductData {
  title: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductData {
  title: string;
  price: number;
}
