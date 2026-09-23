// Order of precedence: runtime config (public/config.js) > build-time VITE_API_BASE_URL > same origin.
const runtimeConfig = window.__APP_CONFIG__ ?? {};

export const API_BASE_URL = (runtimeConfig.API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '').replace(
  /\/+$/,
  '',
);
