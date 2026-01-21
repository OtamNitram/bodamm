# Contracts: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment

## Overview

This feature is infrastructure-focused and does not introduce any application-level API contracts.

All interactions are with external services (Cloudflare Pages, GitHub) via their existing APIs and dashboards—no custom endpoints are created.

## External Service Interfaces

### Cloudflare Pages (Managed Service)

- **Trigger**: Git push to GitHub repository
- **Output**: Deployed static site at `https://bodamm.pages.dev`
- **Status**: Reported via GitHub commit status checks

### GitHub Integration

- **Webhook**: Cloudflare receives push events automatically
- **Status Checks**: Cloudflare posts build status to commits
- **PR Comments**: Preview deployment URLs posted automatically

## Future Contracts (Out of Scope)

The following will be defined in future features:

- `POST /api/rsvp` — RSVP form submission (future feature)
- `GET /api/photos` — Photo gallery endpoint (future feature, architecture-ready per constitution)

## No Custom Contracts Required

This deployment infrastructure feature requires no OpenAPI specs, GraphQL schemas, or custom API definitions.
