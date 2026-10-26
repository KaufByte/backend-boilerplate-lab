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

const router = Router();

router.use('/v1', v1);
// Роуты категорий
router.get('/categories', listCategories);
router.post('/categories', createCategory);

// CRUD роуты товаров
router.get('/products', listProducts);
router.get('/products/:id', showProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', destroyProduct);

export default router;