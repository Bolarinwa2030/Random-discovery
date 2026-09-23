import {
  findItemById,
  findItems,
  listCategories,
  pickRandomItem,
} from '../services/items.service.js';
import { HttpError } from '../utils/httpError.js';
import { parsePositiveInteger, readOptionalId, readOptionalText } from '../utils/query.js';

export function listItems(req, res) {
  const category = readOptionalText(req.query, 'category');
  const query = readOptionalText(req.query, 'q');

  const items = findItems({ category, query });
  res.json({ count: items.length, items });
}

export function searchItems(req, res) {
  const query = readOptionalText(req.query, 'q');
  if (!query) {
    throw new HttpError(400, 'Query parameter "q" is required');
  }
  const category = readOptionalText(req.query, 'category');

  const items = findItems({ category, query });
  res.json({ count: items.length, items });
}

export function getRandomItem(req, res) {
  const category = readOptionalText(req.query, 'category');
  const excludeId = readOptionalId(req.query, 'exclude');

  // A random answer must never be cached by browsers or proxies.
  res.set('Cache-Control', 'no-store');
  res.json(pickRandomItem({ category, excludeId }));
}

export function getItem(req, res) {
  const id = parsePositiveInteger(req.params.id, 'id');
  res.json(findItemById(id));
}

export function getCategories(req, res) {
  res.json({ categories: listCategories() });
}
