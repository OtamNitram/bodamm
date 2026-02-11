# Implementation Plan: UI Fixes — V2 Design Alignment & UX Polish

**Branch**: `006-ui-fixes` | **Date**: 2026-02-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-ui-fixes/spec.md`

## Summary

A batch of UI fixes to align the wedding site with Figma v2 design specifications. Changes span 8 areas: RSVP modal scroll locking, button sizing consistency (Spotify, success screen), calendar .ics MIME type, transport form success persistence/aesthetics, bank account data correction, responsive breakpoint verification, and zone chip layout on mobile. All changes are frontend-only except the transport re-submission behavior (append-only, no backend change needed since existing endpoint already appends).

## Technical Context

**Language/Version**: TypeScript (strict) on Astro 5.x  
**Primary Dependencies**: Astro, React 19, Tailwind CSS 3.4, @astrojs/react, @astrojs/tailwind  
**Storage**: N/A (bank account numbers are hardcoded in component; transport uses existing Netlify Function)  
**Testing**: Vitest (unit), Playwright (e2e)  
**Target Platform**: Web — Desktop (1200px), Tablet (800px), Mobile (375px)  
**Project Type**: Web (static Astro site with React islands)  
**Performance Goals**: Lighthouse ≥ 90, no layout shift from changes  
**Constraints**: No new JS dependencies; no SPA behavior; Figma is source of truth  
**Scale/Scope**: ~10 files modified, 0 new components, 0 new endpoints

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                    | Status  | Notes                                                                                                    |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| I. Figma Source of Truth     | ✅ PASS | All visual changes reference Figma v2 node IDs; button specs from nodes 11:623, 11:576, 11:624, 11:1141  |
| II. Static-First Performance | ✅ PASS | No new JS bundles. Scroll lock is a small body-class toggle. No SPA additions                            |
| III. RSVP UX Simplicity      | ✅ PASS | Scroll lock improves RSVP flow; button consistency improves post-submit UX; calendar .ics already exists |
| IV. Graceful Degradation     | ✅ PASS | .ics fallback preserved on all platforms; WhatsApp fallback buttons unchanged                            |
| V. Design Token Consistency  | ✅ PASS | All button changes use brand tokens from Tailwind config; no raw hex additions                           |
| VI. V1 Scope Discipline      | ✅ PASS | Bug fixes and design alignment only; no new features added                                               |

**Gate result**: ALL PASS — proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/006-ui-fixes/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (files affected)

```text
src/
├── components/
│   ├── Fotos.tsx                # FR-009/010: Spotify button sizing
│   ├── RsvpConfirmModal.tsx     # FR-001/003/004: Scroll lock on modal
│   ├── RsvpForm.tsx             # FR-002: Scroll lock on submitting overlay
│   ├── RsvpSuccessMessage.tsx   # FR-005/006/007/008: Button consistency, copy, calendar
│   ├── TrasladoForm.tsx         # FR-014/015/016: Persistent success, aesthetics, zone chips (FR-021/022)
│   └── GiftList.tsx             # FR-017/018: Bank account numbers
├── lib/
│   └── calendar.ts             # FR-011/012: .ics MIME type for calendar
├── hooks/
│   └── useScrollLock.ts         # NEW: Reusable scroll lock hook (FR-001/002/003)
└── styles/
    └── (no changes expected — Tailwind utility classes used)

tailwind.config.mjs              # No changes expected (tokens already defined)
```

**Structure Decision**: Existing Astro + React islands structure. One new hook (`useScrollLock`) to encapsulate body scroll locking logic shared between the confirmation modal and submitting overlay. No new components — all changes modify existing files. No data-model.md or contracts/ needed since this is a pure UI fix batch with no API changes.

## Complexity Tracking

No constitution violations. No complexity justification needed.
