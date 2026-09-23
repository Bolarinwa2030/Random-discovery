import { config } from '../config.js';

const LEVEL_WEIGHT = { debug: 10, info: 20, warn: 30, error: 40 };
const threshold = LEVEL_WEIGHT[config.logLevel];

// One JSON object per line: easy to read locally and easy for log collectors
// (CloudWatch, Loki, Fluent Bit) to parse later.
function write(level, message, fields = {}) {
  if (LEVEL_WEIGHT[level] < threshold) {
    return;
  }
  const line = JSON.stringify({
    time: new Date().toISOString(),
    level,
    message,
    ...fields,
  });
  const stream = level === 'error' ? process.stderr : process.stdout;
  stream.write(`${line}\n`);
}

export const logger = {
  debug: (message, fields) => write('debug', message, fields),
  info: (message, fields) => write('info', message, fields),
  warn: (message, fields) => write('warn', message, fields),
  error: (message, fields) => write('error', message, fields),
};
