# mdl-site

Astro 6 app for [motivation.digital](https://motivation.digital). Migrated from the single-file `motivation-site` CF Worker to Astro 6 component architecture (LCE-10000383).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build        # Astro static build → dist/client/
npm run build:worker # Bundle to dist-worker/worker.js
```

## Deploy

Push to `main` → GitHub Actions → `deploy.yml` → CF API deploy to `mdl-site` worker.

See `CLAUDE.md` for full engineering context.
