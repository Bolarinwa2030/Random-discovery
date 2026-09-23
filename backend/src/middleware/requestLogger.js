import { logger } from '../utils/logger.js';

const HEALTH_PATH = '/api/health';

export function requestLogger(req, res, next) {
  const startedAt = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    // Probes hit the health endpoint every few seconds; keep them out of the info logs.
    const level = req.path === HEALTH_PATH ? 'debug' : 'info';
    logger[level]('request completed', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 10) / 10,
    });
  });

  next();
}
