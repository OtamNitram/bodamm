# Implementation Plan: RSVP — Confirmación de Asistencia

**Branch**: `004-rsvp` | **Date**: 2026-02-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-rsvp/spec.md`

## Summary

Inline RSVP form integrated into the main page replacing the current `Asistencia` section. Guests search by full name+surname (exact match, no typeahead), confirm attendance for their group, and indicate dietary restrictions per individual (toggle + free text). A confirmation modal previews all selections before submission. Data persists via Netlify Function → Google Sheets (Apps Script). After the deadline (March 25, 2026), the form is hidden and only WhatsApp contact remains. A session pop-up guides first-time visitors to the RSVP section.

## Technical Context

**Language/Version**: TypeScript (strict mode), Astro 5.x, React 19.x  
**Primary Dependencies**: Astro, React (islands), Tailwind CSS 3.x  
**Storage**: Google Sheets via Apps Script (per constitution); guest seed data as JSON in repo  
**Testing**: Vitest (unit), Playwright (e2e)  
**Target Platform**: Web — static Astro build on Netlify, Netlify Functions for API  
**Project Type**: Web (single project — frontend + serverless functions)  
**Performance Goals**: Lighthouse ≥ 90, form submission < 2s  
**Constraints**: Static-first (Astro `output: "static"`), React islands only, no SPA behavior, no raw hex in components  
**Scale/Scope**: ~100-200 guests, single page with inline RSVP section

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                    | Status     | Notes                                                                                                                                                                                                                                         |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Figma Source of Truth     | ✅ PASS    | RSVP section design from node 97:143. New components (modal, pop-up, error states) use existing Figma tokens per FR-010.                                                                                                                      |
| II. Static-First Performance | ✅ PASS    | Astro static build. RSVP form is a React island (`client:load`). API via Netlify Function — no SPA.                                                                                                                                           |
| III. RSVP UX Simplicity      | ⚠️ EVOLVED | Constitution specified minimal fields + `?code=XXXX`. Spec evolves to: name+surname search, group checkboxes, dietary toggle. Code parameter dropped (exact name match replaces it). Still completable in < 30s. WhatsApp fallback preserved. |
| IV. Graceful Degradation     | ✅ PASS    | WhatsApp fallback always visible. Error states include WhatsApp CTA. Post-deadline shows only WhatsApp.                                                                                                                                       |
| V. Design Token Consistency  | ✅ PASS    | All new UI uses brand tokens from `tailwind.config.mjs`. No raw hex.                                                                                                                                                                          |
| VI. V1 Scope Discipline      | ⚠️ EVOLVED | Constitution V1 had `/rsvp` as separate page with Google Sheets. Spec moves form inline to main page. Storage remains Google Sheets.                                                                                                          |

**Evolved items justification**: The RSVP feature has been refined through clarification sessions with the user. The core architecture (static Astro + Netlify Function + Google Sheets) remains unchanged. The UX changes (inline form, name search instead of code) improve the guest experience while maintaining simplicity. No new external dependencies added.

### Post-Design Re-Check (Phase 1)

All design decisions confirmed compliant:

- **Storage**: Google Sheets via Apps Script ✅ (matches constitution Backend/Integrations table)
- **API**: Netlify Functions at `/.netlify/functions/*` ✅ (matches constitution RSVP API layer)
- **Static-first**: Astro `output: "static"` preserved; React island for form only ✅
- **Design tokens**: All new components (modal, pop-up, messages) use brand tokens only ✅
- **Graceful degradation**: Every error state includes WhatsApp CTA ✅
- **No new external dependencies**: Only existing stack (Astro, React, Tailwind, Netlify) ✅

## Project Structure

### Documentation (this feature)

```text
specs/004-rsvp/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Asistencia.tsx           # REPLACE: current WhatsApp+QR → full RSVP form
│   ├── RsvpForm.tsx             # NEW: search + group checkboxes + dietary
│   ├── RsvpConfirmModal.tsx     # NEW: pre-submit confirmation modal
│   ├── RsvpSuccessMessage.tsx   # NEW: success message + calendar download
│   ├── RsvpDeadlineMessage.tsx  # NEW: post-deadline message with WhatsApp only
│   ├── RsvpPopup.tsx            # NEW: session-based welcome pop-up
│   ├── Button.tsx               # EXISTING: reuse for form buttons
│   └── ...                      # Other existing components unchanged
├── config/
│   └── links.ts                 # UPDATE: add RSVP API endpoint, WhatsApp numbers
├── data/
│   └── guests.json              # NEW: seed guest list (groups + members)
├── lib/
│   ├── rsvp-search.ts           # NEW: exact match search logic (accent/case tolerant)
│   ├── rsvp-types.ts            # NEW: TypeScript types for Guest, Group, RSVP data
│   └── calendar.ts              # NEW: ICS file generation utility
├── pages/
│   ├── index.astro              # UPDATE: Asistencia component now renders RSVP form
│   └── rsvp.astro               # UPDATE: redirect to /#asistencia or remove
└── styles/
    └── global.css               # EXISTING: may add RSVP-specific animations

netlify/
└── functions/
    ├── rsvp-search.ts           # NEW: GET — search guest by name+surname
    └── rsvp-submit.ts           # NEW: POST — submit RSVP data to Google Sheets

tests/
├── unit/
│   ├── rsvp-search.test.ts      # NEW: search matching logic tests
│   └── calendar.test.ts         # NEW: ICS generation tests
└── visual/
    └── ...                      # Existing visual tests
```

**Structure Decision**: Single project with Astro static frontend + Netlify Functions for server-side API. No backend directory — functions live in `netlify/functions/` per Netlify convention. Guest seed data in `src/data/` for build-time reference. All new components follow existing pattern (React TSX islands).

## Complexity Tracking

| Violation                           | Why Needed                                          | Simpler Alternative Rejected Because                              |
| ----------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| Confirmation modal (not in Figma)   | Prevent submission errors; user requirement         | No modal = more erroneous submissions = more WhatsApp corrections |
| Inline form instead of `/rsvp` page | User requirement; better conversion (no navigation) | Separate page adds friction and contradicts Figma layout          |
