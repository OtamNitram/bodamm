# Implementation Plan: Traslado — La Van Comunitaria

**Branch**: `005-traslado` | **Date**: 2026-02-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-traslado/spec.md`

## Summary

New "Traslado: La Van Comunitaria" section added to the main page between Asistencia and Gift List. Guests select a zone category (Montevideo, Costa de Oro, Otro) via chips, pick a specific location from a dropdown (or free text for "Otro"), and enter their WhatsApp number and full name. Data persists to a separate "Traslado" Google Sheet via Netlify Function → Apps Script (same deployment as RSVP). Form resets on success with a temporary alert. Honeypot field provides basic spam protection. After the deadline (March 25, 2026), the form hides and only WhatsApp contact remains.

Additionally, a comprehensive UI audit aligns the entire page with Figma v2: restructuring section order, updating Nav links, breaking apart `FotosAsistenciaWrapper`, and correcting backgrounds/spacing across all sections.

## Technical Context

**Language/Version**: TypeScript (strict mode), Astro 5.x, React 19.x  
**Primary Dependencies**: Astro, React (islands), Tailwind CSS 3.x  
**Storage**: Google Sheets via Apps Script (same deployment as RSVP); zone data as static TS in repo  
**Testing**: Vitest (unit), Playwright (e2e)  
**Target Platform**: Web — static Astro build on Netlify, Netlify Functions for API  
**Project Type**: Web (single project — frontend + serverless functions)  
**Performance Goals**: Lighthouse ≥ 90, form submission < 2s  
**Constraints**: Static-first (Astro `output: "static"`), React islands only, no SPA behavior, no raw hex in components  
**Scale/Scope**: ~100-200 guests, single page, append-only data collection

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                    | Status     | Notes                                                                                                |
| ---------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| I. Figma Source of Truth     | ✅ PASS    | Traslado section from Figma nodes 95:192 (desktop) and 101:968 (mobile). UI audit uses Figma v2.    |
| II. Static-First Performance | ✅ PASS    | Astro static build. Traslado form is a React island. API via Netlify Function — no SPA.              |
| III. RSVP UX Simplicity      | N/A        | Traslado is independent from RSVP. Same UX simplicity philosophy applies (< 1 min to complete).     |
| IV. Graceful Degradation     | ✅ PASS    | WhatsApp fallback on error. Post-deadline shows only WhatsApp. Honeypot is silent.                   |
| V. Design Token Consistency  | ✅ PASS    | All UI uses brand tokens from `tailwind.config.mjs`. No raw hex. Figma v2 colors map to brand tokens.|
| VI. V1 Scope Discipline      | ⚠️ EVOLVED | UI audit (US3) expands scope beyond traslado to all page sections. Justified: traslado requires correct section ordering, and Figma v2 is the current design source of truth. |

**Evolved items justification**: The UI audit is bundled because the traslado section cannot be correctly integrated without restructuring the page layout to match Figma v2. The audit scope is bounded to the main page only.

### Post-Design Re-Check (Phase 1)

All design decisions confirmed compliant:

- **Storage**: Google Sheets "Traslado" tab via existing Apps Script deployment ✅
- **API**: Netlify Function at `/.netlify/functions/traslado-submit` ✅
- **Static-first**: Astro `output: "static"` preserved; React island for form only ✅
- **Design tokens**: All new components use brand tokens only ✅
- **Graceful degradation**: Error state includes WhatsApp CTA ✅
- **No new external dependencies**: Only existing stack (Astro, React, Tailwind, Netlify) ✅
- **Reuses existing infra**: Same Apps Script URL, same secret, same Netlify Functions pattern ✅

## Project Structure

### Documentation (this feature)

```text
specs/005-traslado/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── traslado-api.md
├── apps-script.js       # Apps Script extension (to be created in tasks)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code Changes

```text
src/
├── components/
│   ├── TrasladoForm.tsx             # NEW: transport form (chips, dropdown, inputs, submit)
│   ├── Nav.tsx                      # UPDATE: reorder links, add "Traslado", unhide "Fotos"
│   ├── Asistencia.tsx               # UPDATE: extract from FotosAsistenciaWrapper, standalone
│   ├── FotosAsistenciaWrapper.tsx   # UPDATE: remove Asistencia, keep Fotos+Temaikenes wrapper
│   └── ...                          # Other components: per-section background audit
├── config/
│   └── links.ts                     # UPDATE: add traslado API endpoint
├── data/
│   └── zones.ts                     # NEW: static zone data (MONTEVIDEO_BARRIOS, COSTA_CIUDADES)
├── lib/
│   ├── traslado-types.ts            # NEW: TypeScript types (TrasladoSubmitRequest, etc.)
│   └── deadline.ts                  # EXISTING: reuse for traslado deadline check
├── pages/
│   └── index.astro                  # UPDATE: restructure section order per Figma v2
└── styles/
    └── global.css                   # EXISTING: may add scroll-snap utilities

netlify/
└── functions/
    └── traslado-submit.ts           # NEW: POST — submit traslado data to Google Sheets

tests/
├── unit/
│   ├── zones.test.ts                # NEW: zone data validation tests
│   └── traslado-validation.test.ts  # NEW: form validation logic tests
└── visual/
    └── ...                          # Existing visual tests
```

**Structure Decision**: Same single-project pattern as RSVP. New Netlify Function follows existing convention. Zone data in `src/data/` as TypeScript for type safety. Traslado form is a single React component (simpler than RSVP — no search, no groups, no modal).

## Complexity Tracking

| Violation                                         | Why Needed                                                      | Simpler Alternative Rejected Because                                          |
| ------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| UI audit bundled with traslado                    | Page restructuring required for traslado integration            | Separate branch adds coordination overhead; audit is prerequisite for traslado |
| FotosAsistenciaWrapper refactor                   | Figma v2 separates Asistencia from Fotos/Temaikenes             | Keeping wrapper contradicts Figma v2 section order                            |
| Honeypot field (not in Figma)                     | Basic spam protection for unauthenticated form                  | No protection risks junk data in Google Sheet                                 |
| Apps Script shared deployment with new action     | Avoids second web app URL + secret                              | Separate deployment doubles setup work for the couple                         |
