
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../services/ProductService';
import { ProductResponseDTO } from '../../dto/ProductResponseDTO';

export async function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const service = new ProductService();
    const product = await service.findOne(req.params.id);

    res.json(new ProductResponseDTO(product));
  } catch (error) {
    next(error);
  }
}
