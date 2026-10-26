import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../orm/entities/categories/Category';

export const listCategories = async (req: Request, res: Response) => {
  const repo = getRepository(Category);
  const categories = await repo.find({ relations: ['products'] });
  return res.status(200).json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const repo = getRepository(Category);
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const category = repo.create({ name, description });
  await repo.save(category);
  return res.status(201).json(category);
};