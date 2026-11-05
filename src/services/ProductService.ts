
import { getRepository } from 'typeorm';
import { Product } from '../orm/entities/products/Product';


export class ProductService {
    private get productRepository() {
    return getRepository(Product);
    }
  async create(data: {
    name: string;
    price: number;
  }): Promise<Product> {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id }
    });

    if (!product) {
      throw Object.assign(new Error('Product not found'), { statusCode: 404 });
    }

    return product;
  }

  async update(
    id: string,
    data: Partial<Pick<Product, 'title' | 'price'>>
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}


