# Random Showcase

A small public website for discovering surprising facts. Press **Discover Something** for a random
item, browse the collection, filter by category, or search by title.

It exists as a realistic workload for DevOps practice (containers, Kubernetes, EKS, CI/CD, GitOps).
The application is deliberately simple, stateless and dependency-light. There is no CI/CD,
Docker Hub, Terraform, AWS or Kubernetes code in this repository.

- **Frontend:** React + Vite, plain CSS. No image hosting: each item's visual is generated from an
  emoji and a hue.
- **Backend:** Node.js + Express. Seed data lives in `backend/src/data/items.js`; there is no database.

## Project structure

```
random-showcase/
├── backend/
│   ├── src/
│   │   ├── config.js               environment-based configuration
│   │   ├── app.js                  Express app (no listen, so tests can reuse it)
│   │   ├── server.js               entry point: listens on HOST:PORT, graceful shutdown
│   │   ├── routes/                 URL -> controller mapping
│   │   ├── controllers/            HTTP concerns: parse/validate input, shape responses
│   │   ├── services/               business logic (filtering, search, random pick)
│   │   ├── data/items.js           seed data (24 items, 6 categories)
│   │   ├── middleware/             request logging, 404 and error handlers
│   │   └── utils/                  logger, HttpError, query parsing helpers
│   ├── test/                       node:test suites (service + HTTP API)
│   ├── .env.example
│   ├── .dockerignore
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── config.js               runtime configuration (API base URL)
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/client.js           fetch wrapper for the backend
│   │   ├── components/             UI components
│   │   ├── hooks/                  debounce + URL-hash item selection
│   │   └── App.jsx, main.jsx, config.js, styles.css
│   ├── index.html
│   ├── vite.config.js              dev server + /api proxy
│   ├── .env.example
│   ├── .dockerignore
│   └── package.json
├── .env.example                    variables for docker-compose
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 20.19 or newer (22 LTS recommended) and npm
- Docker with the Compose plugin (only for the Compose setup)

## Run the backend locally

```bash
cd backend
npm install
npm run dev          # restarts on file changes; use `npm start` for a plain run
```

The API listens on `http://localhost:3000`.

```bash
curl http://localhost:3000/api/health
# {"status":"ok"}
```

To change the port: `PORT=4000 npm run dev` (macOS/Linux) or `$env:PORT=4000; npm run dev` (PowerShell).

Run the tests with `npm test`.

## Run the frontend locally

Start the backend first, then in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server forwards `/api/*` to `http://localhost:3000`, so no
CORS setup is needed. If your backend runs elsewhere:

```bash
VITE_DEV_PROXY_TARGET=http://localhost:4000 npm run dev
```

Other commands: `npm run build` (output in `frontend/dist`) and `npm run preview`.

## Run both with Docker Compose

```bash
docker compose up
```

- Frontend: <http://localhost:5173>
- Backend health: <http://localhost:3000/api/health>

Compose uses the stock `node:22-alpine` image with your source folders mounted, so code changes reload
live and no Dockerfile is required. The first start runs `npm install` inside the containers, which is why
the backend health check has a generous start period. Stop with `Ctrl+C`, then `docker compose down`.

To change ports or log level, copy `.env.example` to `.env` and edit it. On some Windows/WSL setups the
frontend does not notice file edits; set `VITE_USE_POLLING=true` in `.env` if that happens.

## API

All responses are JSON. Errors use one shape:

```json
{ "error": { "status": 404, "message": "Item 9999 not found" } }
```

An item looks like this:

```json
{
  "id": 5,
  "title": "The octopus",
  "category": "Nature",
  "description": "Soft-bodied, eight-armed and endlessly inventive, ...",
  "fact": "They have three hearts and blue blood, ...",
  "emoji": "🐙",
  "hue": 145
}
```

| Method and path | Description | Success | Errors |
| --- | --- | --- | --- |
| `GET /api/health` | Liveness/readiness check. Returns `{"status":"ok"}`. | 200 | |
| `GET /api/items` | All items: `{ "count": n, "items": [...] }`. | 200 | |
| `GET /api/items?category=Space` | Items in a category (case-insensitive). | 200 | 400 unknown category |
| `GET /api/items?q=text` | Text filter on title and description. `category` and `q` can be combined. | 200 | 400 invalid value |
| `GET /api/items/search?q=text` | Search by title/description. `q` is required; optional `category`. | 200 (empty list if nothing matches) | 400 missing `q` |
| `GET /api/items/random` | One random item. Optional `category` and `exclude=<id>` (never returns that item). Sent with `Cache-Control: no-store`. | 200 | 400 invalid `exclude` or category |
| `GET /api/items/:id` | One item. | 200 | 400 id is not a positive integer, 404 not found |
| `GET /api/categories` | `{ "categories": [{ "name": "Space", "count": 4 }, ...] }`. Used by the filter chips. | 200 | |

Unknown routes return a JSON 404. Query parameters are trimmed and limited to 100 characters, and
repeating a parameter (`?q=a&q=b`) returns 400.

## Environment variables

### Backend

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | Listening port. The process exits at startup if the value is not a valid port. |
| `HOST` | `0.0.0.0` | Bind address. Keep it as is for containers and Kubernetes. |
| `NODE_ENV` | `development` | Reported in the startup log. |
| `LOG_LEVEL` | `info` | `debug`, `info`, `warn` or `error`. Health-check requests are logged at `debug`. |
| `CORS_ORIGINS` | empty | Comma-separated allowed browser origins, or `*`. Empty means no CORS headers (same-origin only). |

### Frontend

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_DEV_PROXY_TARGET` | `http://localhost:3000` | Dev/preview server only: where `/api` is forwarded. |
| `VITE_USE_POLLING` | `false` | Dev server only: poll for file changes. |
| `VITE_API_BASE_URL` | empty | Build-time API base URL, baked into the bundle. |

The API base URL is resolved in this order: `window.__APP_CONFIG__.API_BASE_URL` from
`frontend/public/config.js` (runtime), then `VITE_API_BASE_URL` (build time), then the same origin.
Runtime config lets one build serve any environment: the file is a plain static asset, so a deployment can
replace it without rebuilding the frontend.

### Docker Compose (`.env`)

`FRONTEND_PORT` (5173), `BACKEND_PORT` (3000), `LOG_LEVEL` (info), `CORS_ORIGINS` (empty),
`VITE_USE_POLLING` (false).

No secrets are required anywhere. `.env` files are git-ignored; only `.env.example` files are committed.

## Notes for when you write the Dockerfiles

- **Backend:** run `node src/server.js` directly as the container command, not `npm start`, so
  `SIGTERM` reaches the process. It stops accepting connections and exits cleanly, with a 10 second cap.
  Install with `npm ci --omit=dev`. Default port is 3000; health check is `GET /api/health`.
- **Frontend:** `npm run build` produces static files in `dist/`, so any static web server can serve them.
  Item links use the URL hash (`#/items/5`), so no "rewrite everything to index.html" rule is needed.
- **Routing `/api`:** in production the browser must reach the backend somehow. Either route `/api` to the
  backend at the ingress or reverse proxy (same origin, nothing to configure), or set `API_BASE_URL` in
  `config.js` and set `CORS_ORIGINS` on the backend.
- **Lockfiles:** `package-lock.json` is not included. Run `npm install` once in each folder and commit the
  generated lockfiles so `npm ci` and reproducible builds work.
- **Probes:** `/api/health` is static and dependency-free, which suits liveness, readiness and load
  balancer checks. The frontend footer also calls it, showing "Service online" or "Service unreachable",
  which makes broken routing easy to spot after a deployment.
- **Stateless:** nothing is written to disk or kept in memory between requests, so replicas can be scaled freely.

## Tests

```bash
cd backend && npm test
```

Uses Node's built-in test runner, so there are no extra dependencies. The suites cover seed data, filtering,
search, random selection, and every HTTP endpoint including error cases.
