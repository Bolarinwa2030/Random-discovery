import { HttpError } from '../utils/httpError.js';
import { logger } from '../utils/logger.js';

export function notFoundHandler(req, res, next) {
  next(new HttpError(404, `Route ${req.method} ${req.path} not found`));
}

// Express recognises error handlers by their four-argument signature.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600 ? err.status : 500;

  if (status >= 500) {
    logger.error('unhandled error', {
      method: req.method,
      path: req.originalUrl,
      error: err.message,
      stack: err.stack,
    });
  }

  const body = {
    error: {
      status,
      // Never leak internal error messages to clients.
      message: status >= 500 ? 'Internal server error' : err.message,
    },
  };
  if (err instanceof HttpError && err.details) {
    body.error.details = err.details;
  }

  return res.status(status).json(body);
}
