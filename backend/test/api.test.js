import assert from 'node:assert/strict';
import { once } from 'node:events';
import { after, before, describe, test } from 'node:test';

let server;
let baseUrl;

before(async () => {
  // Keep test output quiet; must be set before the app (and its logger) is loaded.
  process.env.LOG_LEVEL = 'error';
  const { createApp } = await import('../src/app.js');

  server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeAllConnections();
  server.close();
  await once(server, 'close');
});

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`);
  return { status: response.status, body: await response.json(), headers: response.headers };
}

describe('GET /api/health', () => {
  test('reports ok', async () => {
    const { status, body } = await get('/api/health');
    assert.equal(status, 200);
    assert.deepEqual(body, { status: 'ok' });
  });
});

describe('GET /api/items', () => {
  test('returns all items', async () => {
    const { status, body } = await get('/api/items');
    assert.equal(status, 200);
    assert.equal(body.count, body.items.length);
    assert.ok(body.count >= 20);
  });

  test('filters by category', async () => {
    const { status, body } = await get('/api/items?category=science');
    assert.equal(status, 200);
    assert.ok(body.items.length > 0);
    assert.ok(body.items.every((item) => item.category === 'Science'));
  });

  test('rejects an unknown category', async () => {
    const { status, body } = await get('/api/items?category=cooking');
    assert.equal(status, 400);
    assert.ok(Array.isArray(body.error.details.validCategories));
  });

  test('rejects repeated query parameters', async () => {
    const { status } = await get('/api/items?category=space&category=nature');
    assert.equal(status, 400);
  });
});

describe('GET /api/items/random', () => {
  test('returns one item and is not cacheable', async () => {
    const { status, body, headers } = await get('/api/items/random');
    assert.equal(status, 200);
    assert.equal(typeof body.id, 'number');
    assert.equal(headers.get('cache-control'), 'no-store');
  });

  test('honours category and exclude', async () => {
    const { status, body } = await get('/api/items/random?category=Culture&exclude=21');
    assert.equal(status, 200);
    assert.equal(body.category, 'Culture');
    assert.notEqual(body.id, 21);
  });

  test('rejects an invalid exclude value', async () => {
    const { status } = await get('/api/items/random?exclude=abc');
    assert.equal(status, 400);
  });
});

describe('GET /api/items/search', () => {
  test('finds items by title', async () => {
    const { status, body } = await get('/api/items/search?q=voyager');
    assert.equal(status, 200);
    assert.equal(body.count, 1);
    assert.equal(body.items[0].title, 'Voyager 1');
  });

  test('requires q', async () => {
    const { status } = await get('/api/items/search');
    assert.equal(status, 400);
  });

  test('returns an empty list for no matches', async () => {
    const { status, body } = await get('/api/items/search?q=zzzzzz');
    assert.equal(status, 200);
    assert.deepEqual(body, { count: 0, items: [] });
  });
});

describe('GET /api/items/:id', () => {
  test('returns one item', async () => {
    const { status, body } = await get('/api/items/1');
    assert.equal(status, 200);
    assert.equal(body.title, 'Olympus Mons');
  });

  test('returns 404 for an unknown id', async () => {
    const { status, body } = await get('/api/items/9999');
    assert.equal(status, 404);
    assert.equal(body.error.status, 404);
  });

  test('returns 400 for a malformed id', async () => {
    const { status } = await get('/api/items/not-a-number');
    assert.equal(status, 400);
  });
});

describe('GET /api/categories', () => {
  test('lists categories with counts', async () => {
    const { status, body } = await get('/api/categories');
    assert.equal(status, 200);
    assert.ok(body.categories.every((category) => category.name && category.count > 0));
  });
});

describe('unknown routes', () => {
  test('return a JSON 404', async () => {
    const { status, body } = await get('/api/nope');
    assert.equal(status, 404);
    assert.equal(body.error.status, 404);
  });
});
