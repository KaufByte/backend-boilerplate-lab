
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../services/ProductService';
import { ProductResponseDTO } from '../../dto/ProductResponseDTO';

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = new ProductService();

    const product = await service.create({
      name: req.body.name,
      price: Number(req.body.price)
    });

    res.status(201).json(
      new ProductResponseDTO(product)
    );
  } catch (error) {
    next(error);
  }
}
