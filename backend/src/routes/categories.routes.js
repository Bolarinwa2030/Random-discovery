import { Router } from 'express';
import { getCategories } from '../controllers/items.controller.js';

const router = Router();

router.get('/', getCategories);

export default router;
