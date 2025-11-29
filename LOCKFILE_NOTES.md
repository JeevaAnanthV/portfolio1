# Lockfile Management

## Local Development

For local development, use `apps/web/package-lock.json`:

```bash
cd apps/web
npm ci
```

## CI/CD

CI uses `apps/web/package-lock.json` as specified in `.github/workflows/ci.yml`:
- `cache-dependency-path: apps/web/package-lock.json`

## Root package-lock.json

The root `package.json` contains only dev dependencies for scripts. The root `package-lock.json` is kept for compatibility but `apps/web/package-lock.json` is the source of truth for the Next.js application.

