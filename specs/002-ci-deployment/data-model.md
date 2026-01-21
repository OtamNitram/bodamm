# Data Model: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment  
**Date**: 2026-01-21

## Overview

This feature is infrastructure-focused with no application-level data entities. All deployment state is managed by Cloudflare Pages (external service).

## External Entities (Managed by Cloudflare)

### Deployment

Cloudflare Pages manages deployment records internally. No application code interacts with these directly.

| Attribute      | Type      | Description                                                |
| -------------- | --------- | ---------------------------------------------------------- |
| id             | string    | Unique deployment identifier                               |
| status         | enum      | `queued`, `building`, `success`, `failed`                  |
| created_at     | timestamp | When deployment was triggered                              |
| commit_hash    | string    | Git commit SHA that triggered deployment                   |
| commit_message | string    | Git commit message                                         |
| branch         | string    | Git branch (`main` for production, PR branch for previews) |
| url            | string    | Deployed site URL                                          |
| is_production  | boolean   | True if deployed from `main` branch                        |

### Project

Cloudflare Pages project configuration.

| Attribute         | Type   | Description                   |
| ----------------- | ------ | ----------------------------- |
| name              | string | Project name (e.g., `bodamm`) |
| subdomain         | string | `bodamm.pages.dev`            |
| production_branch | string | `main`                        |
| build_command     | string | `npm run build`               |
| output_directory  | string | `dist`                        |
| framework         | string | `astro` (auto-detected)       |

## Application Data

**None** — This feature adds no application-level data models.

Future features (RSVP, photo upload) will introduce data models; they are out of scope for this deployment infrastructure feature.

## State Transitions

```
[Push to main] → Deployment: queued → building → success/failed
                                         ↓
                              [If success] → Site live at production URL
                              [If failed]  → Previous deployment remains live
```

## No Database Changes

This feature requires no database, no migrations, and no schema changes.
