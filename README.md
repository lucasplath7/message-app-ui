# Template App

This repository is a reusable React + Vite template that demonstrates the
core patterns used to build small-to-medium frontend applications.

## What this template includes

- `components/` for presentational UI pieces
- `containers/` for stateful or connected components
- `store/` for state management, actions, reducers, and services
- `services/` for API access and serialization logic

## API route configuration

The frontend reads a single Vite variable: `VITE_API_BASE_URL`.

- Local development uses `http://localhost:3001/api`
- Production uses `/api`

This keeps component code simple and allows requests such as:

```js
fetch(`${API_BASE_URL}/health`)
```

## Environment files

- `.env.development` → `VITE_API_BASE_URL=http://localhost:3001/api`
- `.env.production` → `VITE_API_BASE_URL=/api`

## Docker build

Because Vite injects env values at build time, the Docker image sets the
production default during the build:

```dockerfile
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
```

You can override it when building the image if needed.

`docker-compose.yml` also passes the build arg with `/api` as the default:

```yaml
args:
  VITE_API_BASE_URL: ${VITE_API_BASE_URL:-/api}
```

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
