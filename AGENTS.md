# Repository Guidelines

## Project Structure & Module Organization
The Nuxt 3 app lives in `pages/`, `layouts/`, `components/`, and `composables/`. Shared state sits in `stores/` (Pinia). Static assets and SEO files go under `public/`. Data imported from Directus is written to `content/` as JSON—do not edit these by hand; update the source or the importer instead. Integration scripts live in `directus/` and are invoked through `contentImporter.js`. Server routes and middleware reside in `server/`.

## Build, Test, and Development Commands
`npm run dev` executes `contentImporter.js` then starts Nuxt at `http://localhost:3000/`; run it whenever you need fresh Directus content. `npm run build` produces a production bundle. `npm run generate` emits static output for edge deployments. `npm run preview` serves the built bundle for smoke testing.

## Coding Style & Naming Conventions
Use Vue single-file components with `<script setup>` and 2-space indentation. Name components in PascalCase (`NcHero.vue`) and expose them with kebab-case tags (`<nc-hero>`). Keep composables and stores in camelCase. Styles use SCSS; scope them where possible and favor design tokens already defined in `components/` and `layouts/`. Run `npx eslint .` before opening a PR; extend `.nuxt/eslint.config.mjs` if you need custom rules.

## Testing Guidelines
We do not ship an automated suite yet. When adding features, prefer Vitest tests via `@nuxt/test-utils` under `tests/` with filenames like `feature.spec.ts`. Document any new `npm` scripts in your PR and include manual test notes (pages visited, data imported). Snapshot UX changes and verify Directus-driven JSON regenerated as expected.

## Commit & Pull Request Guidelines
Write concise, title-case commit messages in the imperative mood (`Add hero animation`). Group related changes and avoid mixing formatting with logic. PRs should describe intent, list validation steps, link to relevant issues, and attach screenshots or recordings for UI updates. Flag any schema or environment variable changes so reviewers can refresh `.env` values.

## Configuration & Data Import
Configure `BASE_URL`, `API_KEY`, and optional `DEV` status filters in `.env`. Never commit secrets. If Directus schemas shift, adjust the helpers in `directus/*.js` instead of mutating generated JSON. Regenerate content with `node contentImporter.js` before committing to keep `content/` in sync.
