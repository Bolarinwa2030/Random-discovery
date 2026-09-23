import { HttpError } from './httpError.js';

const MAX_TEXT_LENGTH = 100;

// Reads an optional text query parameter. Returns undefined when it is absent or blank.
export function readOptionalText(query, name) {
  const value = query[name];
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'string') {
    throw new HttpError(400, `Query parameter "${name}" must be provided once`);
  }
  const trimmed = value.trim();
  if (trimmed.length > MAX_TEXT_LENGTH) {
    throw new HttpError(400, `Query parameter "${name}" must be at most ${MAX_TEXT_LENGTH} characters`);
  }
  return trimmed === '' ? undefined : trimmed;
}

// Parses a positive integer such as an item id.
export function parsePositiveInteger(rawValue, name) {
  if (typeof rawValue !== 'string' || !/^[1-9]\d{0,8}$/.test(rawValue)) {
    throw new HttpError(400, `"${name}" must be a positive integer`);
  }
  return Number(rawValue);
}

export function readOptionalId(query, name) {
  const text = readOptionalText(query, name);
  return text === undefined ? undefined : parsePositiveInteger(text, name);
}
