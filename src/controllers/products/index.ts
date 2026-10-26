import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../../orm/entities/products/Product';

// GET /products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Product);
    const products = await repo.find({ relations: ['category'] });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error });
  }
};

// GET /products/:id
export const showProduct = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Product);
    const product = await repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ['category'],
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error });
  }
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Product);
    const { title, price, categoryId } = req.body;

    if (!title || price === undefined || !categoryId) {
      return res.status(400).json({ message: 'Fields title, price, and categoryId are required' });
    }

    const product = repo.create({
      title,
      price,
      categoryId: Number(categoryId),
    });

    await repo.save(product);

    const savedWithCategory = await repo.findOne({
      where: { id: product.id },
      relations: ['category'],
    });

    return res.status(201).json(savedWithCategory);
  } catch (error: any) {
    console.error('Create product error:', error);
    return res.status(500).json({ 
      message: 'Database error creating product', 
      detail: error.message 
    });
  }
}

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Product);
    const product = await repo.findOne({ where: { id: Number(req.params.id) } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    repo.merge(product, req.body);
    await repo.save(product);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error });
  }
};

// DELETE /products/:id
export const destroyProduct = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Product);
    const result = await repo.delete(req.params.id);

    if (result.affected === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error });
  }
};