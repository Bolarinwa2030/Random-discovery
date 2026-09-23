// Runtime configuration, loaded before the app starts.
// Because this is a plain static file, a deployment can replace it (for example with a
// mounted ConfigMap) to point the same build at a different API without rebuilding.
window.__APP_CONFIG__ = {
  // Base URL of the backend API, without a trailing slash.
  // Leave empty to call the same origin ("/api/...").
  // Example: "https://api.example.com"
  API_BASE_URL: "",
};
