# bodamm Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-28

## Active Technologies
- TypeScript (strict) on Astro 5.x + Astro, React 19, Tailwind CSS 3.4, @astrojs/react, @astrojs/tailwind (006-ui-fixes)
- N/A (bank account numbers are hardcoded in component; transport uses existing Netlify Function) (006-ui-fixes)

- TypeScript (strict mode), Node.js 18+ for build + Astro 5.x, React 19.x (islands), Tailwind CSS 3.x (002-ci-deployment)
- N/A (static site; future RSVP uses Google Sheets via Cloudflare Functions) (002-ci-deployment)
- TypeScript (strict mode) + Astro, React (islands), Tailwind CSS (003-ui-bugfixes)
- N/A (styling changes only) (003-ui-bugfixes)
- TypeScript (strict mode), Astro 5.x, React 19.x + Astro, React (islands), Tailwind CSS 3.x (004-rsvp)
- Google Sheets via Apps Script (per constitution); guest seed data as JSON in repo (004-rsvp)
- TypeScript (strict mode), Astro 5.x, React 19.x + Astro, React (islands), Tailwind CSS 3.x (005-traslado)
- Google Sheets via Apps Script (shared deployment with RSVP); zone data as static TS in repo (005-traslado)

- TypeScript (strict mode) + Astro (static site generator), React (islands only), Tailwind CSS (001-wedding-landing)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript (strict mode): Follow standard conventions

## Recent Changes
- 006-ui-fixes: Added TypeScript (strict) on Astro 5.x + Astro, React 19, Tailwind CSS 3.4, @astrojs/react, @astrojs/tailwind

- 005-traslado: Added TypeScript (strict mode), Astro 5.x, React 19.x + Astro, React (islands), Tailwind CSS 3.x; Google Sheets via shared Apps Script deployment
- 004-rsvp: Added TypeScript (strict mode), Astro 5.x, React 19.x + Astro, React (islands), Tailwind CSS 3.x

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
