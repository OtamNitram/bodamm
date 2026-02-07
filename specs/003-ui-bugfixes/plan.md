# Implementation Plan: UI Bugfixes - Design System Alignment

**Branch**: `003-ui-bugfixes` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-ui-bugfixes/spec.md`

## Summary

Fix 24 UI bugfixes to align implementation with Figma design system. Changes are purely CSS/styling with no new features, APIs, or data models. Key areas: mobile hero positioning, responsive spacing system (16px mobile / 48px desktop), navigation layout, mobile menu styling (48px touch targets, correct colors), typography updates (H1/H2 bold + 2% letter-spacing), asset quality (Spotify SVG), and footer text updates.

## Technical Context

**Language/Version**: TypeScript (strict mode)  
**Primary Dependencies**: Astro, React (islands), Tailwind CSS  
**Storage**: N/A (styling changes only)  
**Testing**: Playwright visual regression tests, manual Figma comparison  
**Target Platform**: Web (static site on Netlify)  
**Project Type**: Web application (Astro static site)  
**Performance Goals**: Lighthouse ≥ 90, no performance regression from styling changes  
**Constraints**: Must match Figma exactly per Constitution; no new JavaScript  
**Scale/Scope**: Single page with 6 sections, 3 breakpoints (375px, 800px, 1200px)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                    | Status  | Notes                                            |
| ---------------------------- | ------- | ------------------------------------------------ |
| I. Figma Source of Truth     | ✅ PASS | All changes derived from Figma comparison        |
| II. Static-First Performance | ✅ PASS | CSS-only changes, no new JS                      |
| III. RSVP UX Simplicity      | ✅ N/A  | No RSVP changes                                  |
| IV. Graceful Degradation     | ✅ N/A  | No functionality changes                         |
| V. Design Token Consistency  | ✅ PASS | Using existing Tailwind tokens from constitution |
| VI. V1 Scope Discipline      | ✅ PASS | Bugfixes only, no new features                   |

**Gate Result**: ✅ PASSED - All applicable principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/003-ui-bugfixes/
├── plan.md              # This file
├── research.md          # Phase 0: Design system values reference
├── quickstart.md        # Phase 1: Step-by-step implementation guide
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

_Note: No data-model.md or contracts/ needed - this is a CSS/styling bugfix with no data or API changes._

### Source Code (files to modify)

```text
src/
├── components/
│   ├── Hero.tsx           # FR-001, FR-002, FR-003 (hero positioning)
│   ├── Nav.tsx            # FR-007-013 (navbar layout, mobile menu)
│   ├── GiftList.tsx       # FR-014, FR-015 (text max-width)
│   ├── Gracias.tsx        # FR-022-024 (footer updates)
│   └── Button.tsx         # FR-017, FR-018 (WhatsApp button sizing)
├── assets/
│   └── icons/
│       └── spotify.svg    # FR-016 (replace low-quality logo)
├── styles/
│   └── global.css         # FR-019-021 (H1/H2 typography)
└── pages/
    └── index.astro        # FR-004-006 (section spacing)

tailwind.config.mjs        # Spacing token additions if needed

tests/
└── visual/
    └── home.spec.ts       # Visual regression tests
```

**Structure Decision**: Existing Astro web application structure. Changes are scoped to existing components and styles - no new files except possibly SVG asset replacement.

## Complexity Tracking

> No violations - all changes use existing patterns and tokens.
