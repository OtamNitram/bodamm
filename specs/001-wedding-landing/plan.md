# Implementation Plan: Wedding Landing Page (V1 Static)

**Branch**: `001-wedding-landing` | **Date**: 2025-12-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-wedding-landing/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a static wedding landing page that faithfully replicates Figma designs across web/tablet/mobile viewports. The site includes navigation between sections, external integrations (Spotify playlist, WhatsApp/Telegram contact, Google Maps iframe embed), and a placeholder /rsvp page. All visual design decisions are dictated by Figma (file qwrm6VDQhaEODfbkZfQ6Kk). Performance is critical: FCP <1.5s on 3G, Lighthouse 90+/95+. V1 explicitly excludes real RSVP functionality (deferred to future spec).

## Technical Context

**Language/Version**: TypeScript (strict mode)  
**Primary Dependencies**: Astro (static site generator), React (islands only), Tailwind CSS  
**Storage**: N/A (static site, no persistence in V1)  
**Testing**: Playwright (visual regression), Vitest (unit tests for config/utils)  
**Target Platform**: Static HTML/CSS/JS deployed to Cloudflare Pages  
**Project Type**: Web (static site)  
**Performance Goals**: FCP <1.5s on 3G, Lighthouse 90+ mobile / 95+ desktop, minimal JavaScript bundle  
**Constraints**: Must match Figma pixel-perfect, static-first (no SPA), minimal JS (only mobile menu toggle if needed)  
**Scale/Scope**: Single-page site with 6 sections + 1 placeholder page, ~10-15 components, expected traffic <1000 concurrent guests

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Figma Source of Truth (NON-NEGOTIABLE)

- **Status**: PASS
- **Evidence**: Spec explicitly references Figma file (qwrm6VDQhaEODfbkZfQ6Kk) with specific node IDs for Web (10:197), Tablet (11:1176), Mobile (11:1017)
- **Implementation**: All visual elements will be extracted from Figma and served as local assets. FR-001, FR-011, FR-014 enforce pixel-perfect matching.

### ✅ Static-First Performance (NON-NEGOTIABLE)

- **Status**: PASS
- **Evidence**: Spec requires static HTML/CSS/JS (FR-013), minimal JavaScript (FR-015), FCP <1.5s (SC-006), Lighthouse 90+/95+ (SC-007)
- **Implementation**: Astro static build with React islands only for mobile menu toggle (if needed). No SPA behavior.

### ✅ RSVP UX Simplicity (NON-NEGOTIABLE)

- **Status**: PASS (with V1 exception)
- **Evidence**: V1 uses placeholder /rsvp page (FR-009, FR-010) with clear "próximamente" messaging and WhatsApp/Telegram fallback (SC-010)
- **Implementation**: Real RSVP deferred to future spec. V1 provides clear communication and fallback channels per constitution principle IV.

### ✅ Graceful Degradation with Human Fallback

- **Status**: PASS
- **Evidence**: FR-007 (WhatsApp/Telegram buttons), FR-005 (QR + text link alternative), FR-009 (RSVP placeholder with fallback CTAs)
- **Implementation**: Every digital interaction has human alternative per constitution.

### ✅ Design Token Consistency

- **Status**: PASS
- **Evidence**: Constitution defines exact color tokens (darkGreen #0A3428, eucalyptus #106552, burgundy #640405, linen #F9F2E8, terracotta #C6572A, navy #2A3354) and typography (Lato)
- **Implementation**: Tailwind config will define these tokens. FR-014 requires documentation of any deviations.

### ✅ V1 Scope Discipline (NON-NEGOTIABLE)

- **Status**: PASS
- **Evidence**: Spec explicitly excludes real RSVP, photo upload, gallery, admin panel, auth, PWA (lines 173-182)
- **Implementation**: V1 scope is fixed per spec. Constitution V1 includes list aligns with spec requirements.

## Project Structure

### Documentation (this feature)

```text
specs/001-wedding-landing/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Spec quality checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/          # React components (islands only)
│   ├── Nav.tsx         # Navigation component (mobile menu toggle)
│   ├── Hero.tsx        # Hero section
│   ├── Detalles.tsx    # Details section (Cuándo/Dónde/Dress Code)
│   ├── GiftList.tsx    # Gift list section
│   ├── Fotos.tsx       # Fotos & Temaikenes section (Spotify integration)
│   ├── Asistencia.tsx  # Asistencia section (RSVP/contact)
│   ├── Gracias.tsx     # Gracias section
│   └── Button.tsx      # Reusable button component (Figma states)
├── pages/
│   ├── index.astro     # Home page (all sections)
│   └── rsvp.astro      # Placeholder RSVP page
├── layouts/
│   └── Layout.astro    # Base layout with meta tags, fonts
├── config/
│   └── links.ts        # Centralized external URLs (Spotify, WhatsApp, Telegram, Maps, Photos)
├── styles/
│   └── global.css      # Global styles, Tailwind imports
└── assets/
    ├── images/         # Extracted Figma images (served locally)
    └── icons/          # Extracted Figma icons (served locally)

public/
├── fonts/              # Lato font files (if self-hosted)
└── qr-codes/           # QR code images for Spotify, RSVP, Photos

tests/
├── visual/             # Playwright visual regression tests
│   ├── home.spec.ts    # Test all sections match Figma
│   └── rsvp.spec.ts    # Test placeholder page
└── unit/
    └── config.test.ts  # Test config values are valid URLs

tailwind.config.mjs     # Tailwind config with design tokens
astro.config.mjs        # Astro config (static output, React integration)
tsconfig.json           # TypeScript strict mode config
package.json            # Dependencies: astro, react, tailwindcss, playwright
```

**Structure Decision**: Astro static site with component-based architecture. Each major section (Hero, Detalles, Gift List, etc.) is a separate component for maintainability. React is used only as islands for interactive elements (mobile menu toggle if needed). All external URLs centralized in `src/config/links.ts` per FR-012. Design tokens defined in `tailwind.config.mjs` per constitution. Assets extracted from Figma and served from `src/assets/` and `public/` per FR-011.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution gates pass.
