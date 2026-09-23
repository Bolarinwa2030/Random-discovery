import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import items from '../src/data/items.js';
import {
  findItemById,
  findItems,
  listCategories,
  pickRandomItem,
} from '../src/services/items.service.js';
import { HttpError } from '../src/utils/httpError.js';

describe('seed data', () => {
  test('every item has the fields the frontend relies on', () => {
    for (const item of items) {
      assert.equal(typeof item.id, 'number');
      for (const field of ['title', 'description', 'category', 'fact', 'emoji']) {
        assert.equal(typeof item[field], 'string', `${field} of item ${item.id}`);
        assert.notEqual(item[field].trim(), '', `${field} of item ${item.id}`);
      }
      assert.ok(item.hue >= 0 && item.hue <= 360, `hue of item ${item.id}`);
    }
  });

  test('ids are unique', () => {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  });
});

describe('findItems', () => {
  test('returns everything without filters', () => {
    assert.equal(findItems().length, items.length);
  });

  test('filters by category, ignoring case', () => {
    const results = findItems({ category: 'sPaCe' });
    assert.ok(results.length > 0);
    assert.ok(results.every((item) => item.category === 'Space'));
  });

  test('rejects unknown categories with a 400', () => {
    assert.throws(
      () => findItems({ category: 'Cooking' }),
      (error) => error instanceof HttpError && error.status === 400,
    );
  });

  test('searches titles case-insensitively', () => {
    const results = findItems({ query: 'OCTOPUS' });
    assert.deepEqual(
      results.map((item) => item.title),
      ['The octopus'],
    );
  });

  test('searches descriptions too', () => {
    assert.ok(findItems({ query: 'hydrogen' }).some((item) => item.title.startsWith('Saturn')));
  });

  test('combines category and text filters', () => {
    const results = findItems({ category: 'Nature', query: 'butterflies' });
    assert.equal(results.length, 1);
    assert.equal(results[0].title, 'Monarch migration');
  });

  test('returns an empty list when nothing matches', () => {
    assert.deepEqual(findItems({ query: 'zzzzzz' }), []);
  });
});

describe('findItemById', () => {
  test('returns the matching item', () => {
    assert.equal(findItemById(1).title, 'Olympus Mons');
  });

  test('throws a 404 for a missing id', () => {
    assert.throws(
      () => findItemById(9999),
      (error) => error instanceof HttpError && error.status === 404,
    );
  });
});

describe('pickRandomItem', () => {
  test('never returns the excluded item', () => {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      assert.notEqual(pickRandomItem({ excludeId: 3 }).id, 3);
    }
  });

  test('respects the category filter', () => {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      assert.equal(pickRandomItem({ category: 'Culture' }).category, 'Culture');
    }
  });

  test('uses the injected random source', () => {
    assert.equal(pickRandomItem({ random: () => 0 }).id, items[0].id);
    assert.equal(pickRandomItem({ random: () => 0.999999 }).id, items[items.length - 1].id);
  });
});

describe('listCategories', () => {
  test('counts add up to the number of items', () => {
    const total = listCategories().reduce((sum, category) => sum + category.count, 0);
    assert.equal(total, items.length);
  });
});
