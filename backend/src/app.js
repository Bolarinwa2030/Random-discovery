import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import categoriesRoutes from './routes/categories.routes.js';
import healthRoutes from './routes/health.routes.js';
import itemsRoutes from './routes/items.routes.js';

// Built separately from server.js so tests can start it on any port.
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(requestLogger);

  // CORS is only needed when the browser calls the API from a different origin.
  if (config.corsOrigins.length > 0) {
    app.use(
      cors({
        origin: config.corsOrigins.includes('*') ? '*' : config.corsOrigins,
        methods: ['GET', 'HEAD', 'OPTIONS'],
      }),
    );
  }

  app.use('/api', healthRoutes);
  app.use('/api/items', itemsRoutes);
  app.use('/api/categories', categoriesRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
