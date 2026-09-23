import items from '../data/items.js';
import { HttpError } from '../utils/httpError.js';

const CATEGORY_NAMES = [...new Set(items.map((item) => item.category))].sort();

const normalize = (text) => text.trim().toLowerCase();

// Matches a category name case-insensitively and returns its canonical spelling.
function resolveCategory(category) {
  if (category === undefined) {
    return undefined;
  }
  const match = CATEGORY_NAMES.find((name) => normalize(name) === normalize(category));
  if (!match) {
    throw new HttpError(400, `Unknown category "${category}"`, { validCategories: CATEGORY_NAMES });
  }
  return match;
}

function matchesText(item, needle) {
  return (
    item.title.toLowerCase().includes(needle) || item.description.toLowerCase().includes(needle)
  );
}

export function listCategories() {
  return CATEGORY_NAMES.map((name) => ({
    name,
    count: items.filter((item) => item.category === name).length,
  }));
}

// Both filters are optional and can be combined.
export function findItems({ category, query } = {}) {
  const resolvedCategory = resolveCategory(category);
  const needle = query ? normalize(query) : '';

  return items.filter(
    (item) =>
      (!resolvedCategory || item.category === resolvedCategory) && (!needle || matchesText(item, needle)),
  );
}

export function findItemById(id) {
  const item = items.find((candidate) => candidate.id === id);
  if (!item) {
    throw new HttpError(404, `Item ${id} not found`);
  }
  return item;
}

// Picks a random item, optionally within a category. When excludeId is given (for example the
// item the visitor is looking at) it is skipped so "Discover Something" never repeats itself,
// unless it is the only choice.
export function pickRandomItem({ category, excludeId, random = Math.random } = {}) {
  const pool = findItems({ category });
  const candidates = pool.length > 1 ? pool.filter((item) => item.id !== excludeId) : pool;

  if (candidates.length === 0) {
    throw new HttpError(404, 'No items available');
  }
  return candidates[Math.floor(random() * candidates.length)];
}
