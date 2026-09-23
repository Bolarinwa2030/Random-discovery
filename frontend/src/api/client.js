import { API_BASE_URL } from '../config.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, { params = {}, signal } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  }

  let response;
  try {
    response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    let message = `The server returned an error (${response.status}).`;
    try {
      const body = await response.json();
      message = body?.error?.message ?? message;
    } catch {
      // The body was not JSON; keep the generic message.
    }
    throw new ApiError(message, response.status);
  }

  return response.json();
}

export const api = {
  getHealth: ({ signal } = {}) => request('/api/health', { signal }),
  listCategories: ({ signal } = {}) => request('/api/categories', { signal }),
  listItems: ({ category, q, signal } = {}) => request('/api/items', { params: { category, q }, signal }),
  getItem: (id, { signal } = {}) => request(`/api/items/${id}`, { signal }),
  getRandomItem: ({ category, exclude, signal } = {}) =>
    request('/api/items/random', { params: { category, exclude }, signal }),
};
