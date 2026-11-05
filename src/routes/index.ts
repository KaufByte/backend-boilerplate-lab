
import { listCategories, createCategory } from '../controllers/categories';

import {
  listProducts,
  showProduct,
  createProduct,
  updateProduct,
  destroyProduct,
} from '../controllers/products';

import { Router } from 'express';
import v1 from './v1';

import { validatorCreateProduct } from '../middleware/validation/Product/validatorCreateProduct';

const router = Router();

router.use('/v1', v1);

// Маршрути категорій
router.get('/categories', listCategories);
router.post('/categories', createCategory);

// CRUD-маршрути товарів
router.get('/products', listProducts);
router.get('/products/:id', showProduct);

router.post(
  '/products',
  validatorCreateProduct,
  createProduct
);

router.put('/products/:id', updateProduct);
router.delete('/products/:id', destroyProduct);

export default router;
