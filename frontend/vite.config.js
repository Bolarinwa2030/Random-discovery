import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// In development the browser talks to the Vite server, which forwards /api/* to the backend.
// That keeps the frontend code free of hardcoded hosts and avoids CORS during local work.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxy = {
    '/api': {
      target: env.VITE_DEV_PROXY_TARGET || 'http://localhost:3000',
      changeOrigin: true,
    },
  };

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: apiProxy,
      // Set VITE_USE_POLLING=true if file changes are not picked up (some Windows/WSL Docker setups).
      watch: env.VITE_USE_POLLING === 'true' ? { usePolling: true } : undefined,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      proxy: apiProxy,
    },
  };
});
