# Implementation Plan: CI/CD Deployment Pipeline

**Branch**: `002-ci-deployment` | **Date**: 2026-01-21 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-ci-deployment/spec.md`

## Summary

Deploy the wedding website to **Cloudflare Pages** with automatic CI/CD from the GitHub `main` branch. The site is a static Astro build requiring zero server-side configuration. Cloudflare Pages provides native GitHub integration, automatic HTTPS, preview deployments for PRs, and supports future serverless functions for RSVP.

**Note**: The spec originally recommended Netlify, but the project constitution mandates Cloudflare Pages. This plan aligns with the constitution.

## Technical Context

**Language/Version**: TypeScript (strict mode), Node.js 18+ for build  
**Primary Dependencies**: Astro 5.x, React 19.x (islands), Tailwind CSS 3.x  
**Storage**: N/A (static site; future RSVP uses Google Sheets via Cloudflare Functions)  
**Testing**: Vitest (unit), Playwright (e2e)  
**Target Platform**: Cloudflare Pages (global CDN edge network)  
**Project Type**: Web (static frontend only for this feature)  
**Performance Goals**: <3s page load on 3G, Lighthouse ≥90  
**Constraints**: Free tier limits (500 builds/month, unlimited bandwidth)  
**Scale/Scope**: <1000 visitors/month, single static site

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                    | Status  | Notes                                                 |
| ---------------------------- | ------- | ----------------------------------------------------- |
| I. Figma Source of Truth     | ✅ N/A  | Deployment infra doesn't affect visual design         |
| II. Static-First Performance | ✅ PASS | Cloudflare Pages serves pre-rendered static HTML      |
| III. RSVP UX Simplicity      | ✅ N/A  | RSVP not in scope for this feature                    |
| IV. Graceful Degradation     | ✅ N/A  | Deployment infra doesn't affect fallbacks             |
| V. Design Token Consistency  | ✅ N/A  | No UI changes in this feature                         |
| VI. V1 Scope Discipline      | ✅ PASS | Cloudflare Pages deployment is explicitly in V1 scope |

**Hosting Constraint**: Constitution specifies "Cloudflare Pages" (line 124). Original spec recommended Netlify—**overridden by constitution**.

**Gate Result**: ✅ PASSED — No violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-ci-deployment/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal for infra feature)
├── quickstart.md        # Phase 1 output (setup instructions)
├── contracts/           # Phase 1 output (N/A for this feature)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
# Existing structure (no changes required for deployment)
src/
├── assets/
├── components/
├── config/
├── layouts/
└── pages/

tests/
├── unit/
└── visual/

# New files for this feature
wrangler.toml            # Cloudflare Pages configuration (optional, for functions)
```

**Structure Decision**: No source code changes required. Cloudflare Pages auto-detects Astro and uses `npm run build` with output directory `dist/`. A `wrangler.toml` may be added later for Cloudflare Functions (RSVP), but is not required for static deployment.

## Complexity Tracking

> No violations requiring justification. Deployment uses the simplest possible approach: Cloudflare Pages with zero-config Astro detection.
