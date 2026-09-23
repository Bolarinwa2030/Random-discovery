import { createApp } from './app.js';
import { config } from './config.js';
import { logger } from './utils/logger.js';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const app = createApp();

const server = app.listen(config.port, config.host, () => {
  logger.info('server listening', {
    host: config.host,
    port: config.port,
    nodeEnv: config.nodeEnv,
  });
});

server.on('error', (error) => {
  logger.error('server failed to start', { error: error.message });
  process.exit(1);
});

// Kubernetes sends SIGTERM before stopping a pod. Finish in-flight requests, then exit.
function shutdown(signal) {
  logger.info('shutdown signal received', { signal });

  const forceExitTimer = setTimeout(() => {
    logger.error('graceful shutdown timed out, forcing exit');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExitTimer.unref();

  server.close((error) => {
    if (error) {
      logger.error('error while closing server', { error: error.message });
      process.exit(1);
    }
    logger.info('server closed');
    process.exit(0);
  });
  server.closeIdleConnections();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
