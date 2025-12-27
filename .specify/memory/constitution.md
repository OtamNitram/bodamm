# <!--

# SYNC IMPACT REPORT

Version change: 0.0.0 → 1.0.0 (Initial ratification)

Modified principles: N/A (initial creation)

Added sections:

- Core Principles (6 principles)
- Technology Stack & Constraints
- Definition of Done

Removed sections: N/A (initial creation)

Templates status:

- .specify/templates/plan-template.md: ✅ Compatible (Constitution Check section exists)
- .specify/templates/spec-template.md: ✅ Compatible (no constitution-specific changes needed)
- .specify/templates/tasks-template.md: ✅ Compatible (no constitution-specific changes needed)

# Follow-up TODOs: None

-->

# Casamiento Website Constitution

## Core Principles

### I. Figma Source of Truth (NON-NEGOTIABLE)

Figma is the single source of truth for all visual design decisions. Implementation MUST match Figma exactly.

- **Layout, typography, colors, spacing, components, states, and breakpoints** are defined in Figma
- **Discrepancy rule**: If implementation ≠ Figma → it is a BUG in the implementation, not a design change
- **Missing states** (e.g., form error states): Compose using existing Figma tokens/typography, then document the exception
- **Figma file**: `https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento`
- **Key frames**: Home Web (10:197), Home Tablet (11:1176), Home Mobile (11:1017), Nav (8:44), Buttons (11:623, 11:576, 11:624)

### II. Static-First Performance (NON-NEGOTIABLE)

The site MUST be primarily static with minimal JavaScript. Performance is not optional.

- **Astro static build** is the default; pages are pre-rendered HTML
- **JavaScript is loaded ONLY for**: mobile menu toggle (if needed), RSVP form submission
- **No SPA behavior**: React is used as islands only, never as full-page hydration
- **Images**: Optimized formats + lazy loading where appropriate
- **Target**: Fast first contentful paint, minimal time-to-interactive

### III. RSVP UX Simplicity (NON-NEGOTIABLE)

The RSVP process MUST be completable in under 30 seconds. Zero friction is the goal.

- **No account creation, login, or app installation required**
- **Minimal fields**: Name, attending (yes/no), guest count (if yes), dietary (optional), message (optional)
- **Immediate feedback**: "Enviando…" → "¡Listo! Gracias" or clear error message
- **Error recovery**: Every error state MUST include a direct CTA to WhatsApp/Telegram
- **Code parameter**: `?code=XXXX` is captured for traceability but NEVER required or asked from user

### IV. Graceful Degradation with Human Fallback

Every digital interaction MUST have a human alternative. WhatsApp/Telegram are official fallback channels.

- **RSVP fallback**: "Si preferís, confirmá por WhatsApp/Telegram" is always visible
- **QR code fallback**: Every QR includes a visible, clickable text link alternative
- **Error fallback**: Form errors direct users to message directly via WhatsApp/Telegram
- **Rationale**: Not all guests are tech-comfortable; the human channel is always available

### V. Design Token Consistency

Code MUST use design tokens that mirror Figma values exactly to prevent visual drift.

- **Colors** (from Figma palette):
  - `brand.darkGreen`: #0A3428
  - `brand.eucalyptus`: #106552
  - `brand.burgundy`: #640405
  - `brand.linen`: #F9F2E8
  - `brand.terracotta`: #C6572A
  - `brand.navy`: #2A3354
- **Typography**: Lato (primary) with proper fallback stack; weights per Figma (Regular, SemiBold)
- **Components**: Nav, Button (default/hover states) as defined in Figma—no invented variants
- **Tailwind config**: MUST define these tokens; raw hex values in components are forbidden

### VI. V1 Scope Discipline (NON-NEGOTIABLE)

V1 scope is fixed. Features outside V1 are explicitly deferred—no scope creep.

**V1 includes:**

- `/` Home with sections per Figma (Hero, Details, Gift List, Fotos & Temaikenes, Asistencia, Gracias)
- `/rsvp` form with Google Sheets integration via Cloudflare Function + Apps Script
- External links: Google Maps embed, Spotify playlist, WhatsApp, Telegram, photo QR/link
- Deploy on Cloudflare Pages from GitHub

**V1 explicitly excludes (do NOT build):**

- Photo upload from web
- Dynamic photo gallery
- PWA / camera access
- Admin panel (use Google Sheets directly)
- User authentication
- Native mobile apps

**Future (architecture-ready, not implemented):**

- GET /api/photos endpoint slot reserved; UI can be designed but data source stays pluggable

## Technology Stack & Constraints

### Frontend

| Layer      | Technology           | Constraint                                    |
| ---------- | -------------------- | --------------------------------------------- |
| Framework  | Astro                | Static output; islands for interactivity      |
| Language   | TypeScript           | Strict mode preferred                         |
| Styling    | Tailwind CSS         | Tokens from constitution; no arbitrary values |
| Components | React (islands only) | Only for menu/form if needed; no SPA          |

### Backend / Integrations

| Layer        | Technology                    | Constraint                                   |
| ------------ | ----------------------------- | -------------------------------------------- |
| Hosting      | Cloudflare Pages              | Deploy from GitHub main branch               |
| RSVP API     | Cloudflare Pages Functions    | `/api/rsvp` POST endpoint                    |
| RSVP Storage | Google Sheets via Apps Script | Shared secret via `X-RSVP-SECRET` header     |
| Maps         | Google Maps iframe embed      | No API key; simple embed                     |
| Spotify      | External link                 | Single config value in `src/config/links.ts` |
| Contact      | WhatsApp/Telegram links       | Configurable numbers/handles                 |

### Configuration Centralization

All external URLs and contact info MUST be defined in a single config file (e.g., `src/config/links.ts`):

- `SPOTIFY_PLAYLIST_URL`
- `WHATSAPP_URL` (with pre-filled message)
- `TELEGRAM_URL`
- `GOOGLE_MAPS_EMBED_URL`
- `GOOGLE_MAPS_DIRECTIONS_URL`
- `PHOTOS_QR_DESTINATION_URL`

## Definition of Done

A feature is complete when ALL of the following are true:

### Visual Fidelity

- [ ] UI matches Figma frames: Web (1200px), Tablet (800px), Mobile (375px)
- [ ] Nav component replicates Figma (desktop + responsive variants)
- [ ] Button component replicates Figma (default + hover states)
- [ ] Colors and typography use defined tokens only

### Functionality

- [ ] Google Maps embed loads and "Cómo llegar" button opens directions
- [ ] Spotify button opens playlist in new tab (`target="_blank" rel="noopener noreferrer"`)
- [ ] WhatsApp and Telegram links work with correct numbers/handles
- [ ] Photo QR displays with visible fallback link
- [ ] `/rsvp` form submits to Google Sheets successfully
- [ ] `/rsvp` handles errors and shows WhatsApp/Telegram fallback

### Technical Quality

- [ ] Zero TypeScript errors in strict mode
- [ ] Lighthouse performance score ≥ 90
- [ ] No raw hex colors in components (tokens only)
- [ ] External links open in new tab with security attributes

### Deployment & Documentation

- [ ] Cloudflare Pages auto-deploys from GitHub
- [ ] README documents: local dev, deployment, Apps Script setup, secret configuration
- [ ] README documents where to change all configurable links

## Governance

This constitution supersedes ad-hoc decisions. All implementation work MUST verify compliance.

- **Amendments**: Require explicit documentation of what changed and why
- **Figma changes**: If Figma is updated, implementation follows; constitution Design Tokens section is updated if colors/typography change
- **Scope expansion**: Any V2/V3 feature discussion MUST NOT delay V1 completion
- **Complexity justification**: Any deviation from "simplest solution" requires documented rationale

**Version**: 1.0.0 | **Ratified**: 2024-12-27 | **Last Amended**: 2024-12-27
