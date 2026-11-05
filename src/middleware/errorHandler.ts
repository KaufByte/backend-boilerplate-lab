
import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode =
    typeof error.statusCode === 'number'
      ? error.statusCode
      : typeof error.status === 'number'
        ? error.status
        : 500;

  res.status(statusCode).json({
    message: error.message || 'Internal Server Error'
  });
}
