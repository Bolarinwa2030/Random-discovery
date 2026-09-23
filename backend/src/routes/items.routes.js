import { Router } from 'express';
import {
  getItem,
  getRandomItem,
  listItems,
  searchItems,
} from '../controllers/items.controller.js';

const router = Router();

router.get('/', listItems);
// Fixed paths must be registered before "/:id" so they are not treated as ids.
router.get('/random', getRandomItem);
router.get('/search', searchItems);
router.get('/:id', getItem);

export default router;
