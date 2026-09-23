const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

function readPort(rawValue, fallback) {
  if (rawValue === undefined || rawValue === '') {
    return fallback;
  }
  const port = Number(rawValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT "${rawValue}". Expected an integer between 1 and 65535.`);
  }
  return port;
}

function readList(rawValue) {
  if (!rawValue) {
    return [];
  }
  return rawValue
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function readLogLevel(rawValue) {
  const level = (rawValue || 'info').toLowerCase();
  return LOG_LEVELS.includes(level) ? level : 'info';
}

export const config = Object.freeze({
  port: readPort(process.env.PORT, 3000),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: readLogLevel(process.env.LOG_LEVEL),
  corsOrigins: readList(process.env.CORS_ORIGINS),
});
