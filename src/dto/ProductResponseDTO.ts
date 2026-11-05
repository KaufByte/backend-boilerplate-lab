
import { Product } from '../orm/entities/products/Product';

export class ProductResponseDTO {
  id: number;
  productName: string;
  price: number;

  constructor(product: Product) {
    this.id = product.id;
    this.productName = product.title;
    this.price = Number(product.price);
  }
}
