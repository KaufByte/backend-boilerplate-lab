
import { Request, Response, NextFunction } from 'express';
import isEmpty from 'validator/lib/isEmpty';
import isFloat from 'validator/lib/isFloat';
import { AppError } from '../../../errors/AppError';

export async function validatorCreateProduct(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
   const { title, price } = req.body;
   if (
      typeof title !== 'string' ||
      isEmpty(title.trim())
   ) {
      throw new AppError('Product title is required', 400);
    }

    if (
      price === undefined ||
      price === null ||
      !isFloat(String(price), { gt: 0 })
    ) {
      throw new AppError('Price must be greater than 0', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
}
