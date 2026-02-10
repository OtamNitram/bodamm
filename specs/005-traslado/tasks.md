# Tasks: Traslado — La Van Comunitaria

**Branch**: `005-traslado` | **Date**: 2026-02-10 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

## Phase 1: Setup

> Goal: Create data files, types, and configuration needed by all subsequent phases.

- [ ] T001 [P] Create static zone data file with Montevideo barrios, Costa de Oro cities, and zone category types in `src/data/zones.ts`
- [ ] T002 [P] Create TypeScript types for traslado submission (TrasladoSubmitRequest, TrasladoSubmitResponse, ZoneCategory) in `src/lib/traslado-types.ts`
- [ ] T003 [P] Update external links config to add traslado API endpoint (`apiTrasladoSubmitUrl`) in `src/config/links.ts`
- [ ] T004 [P] Create Apps Script extension code for the "Traslado" sheet (handleTrasladoSubmit function + doPost routing) in `specs/005-traslado/apps-script.js`

## Phase 2: Foundational

> Goal: Build the API endpoint and restructure the page layout to match Figma v2. These are blocking prerequisites for user story phases.

- [ ] T005 Create Netlify Function for traslado submission with validation, honeypot check, deadline check, and Apps Script forwarding in `netlify/functions/traslado-submit.ts`
- [ ] T006 Update Nav component: reorder links to Detalles → Asistencia → Traslado → Gift List → Temaikenes → Fotos, add "Traslado" (#traslado), unhide "Fotos" in `src/components/Nav.tsx`
- [ ] T007 Extract Asistencia from FotosAsistenciaWrapper so it renders as a standalone section with its own background in `src/components/Asistencia.tsx` and `src/components/FotosAsistenciaWrapper.tsx`
- [ ] T008 Restructure page section order in `src/pages/index.astro` to: Nav → Hero → Detalles → Asistencia → Traslado (placeholder) → GiftList → FotosTemaikenes → Gracias

## Phase 3: User Story 1 — Enviar datos de contacto para traslado compartido (P1)

> Goal: Guest can select zone, enter WhatsApp + name, submit, and see success alert. Data persists in Google Sheet.
>
> Independent test: Select "Montevideo" → pick barrio → enter WhatsApp + name → submit → see success alert → verify row in Google Sheet.

- [ ] T009 [US1] Create TrasladoForm component with section title ("Traslado: La Van Comunitaria"), subtitle ("Opcional"), and explanatory paragraph in `src/components/TrasladoForm.tsx`
- [ ] T010 [US1] Implement zone category chips (Montevideo, Costa de Oro, Otro) with exclusive selection, active/inactive styling per Figma (active: bg-eucalyptus text-linen, inactive: bg-eucalyptus/20 text-darkGreen) in `src/components/TrasladoForm.tsx`
- [ ] T011 [US1] Implement conditional dropdown for Montevideo barrios and Costa de Oro cities, and free text input for "Otro" — all chips start deselected, dropdown appears only after chip selection in `src/components/TrasladoForm.tsx`
- [ ] T012 [US1] Implement WhatsApp and Nombre Completo input fields (side-by-side on desktop, stacked on mobile) with validation in `src/components/TrasladoForm.tsx`
- [ ] T013 [US1] Implement honeypot hidden field (visually hidden input, name="website") in `src/components/TrasladoForm.tsx`
- [ ] T014 [US1] Implement form submission logic: client-side validation → honeypot check (fake success if filled) → POST to API → show success alert (temporary, fades) → reset form in `src/components/TrasladoForm.tsx`
- [ ] T015 [US1] Style section background with van image + 85% linen overlay, form container with bg-white/20 border-darkGreen/20 rounded-12, inputs with bg-[#fffcf8] per Figma in `src/components/TrasladoForm.tsx`
- [ ] T016 [US1] Implement mobile scroll-snap for chips container (overflow-x: auto, scroll-snap-type: x mandatory, hidden scrollbar) in `src/components/TrasladoForm.tsx`
- [ ] T017 [US1] Integrate TrasladoForm into page layout replacing the placeholder from T008 in `src/pages/index.astro`

## Phase 4: User Story 2 — Contacto WhatsApp como fallback (P2)

> Goal: On submission error, show WhatsApp buttons for Martín and Mariana. After deadline, hide form and show WhatsApp-only message.
>
> Independent test: Simulate server error → verify error message with WhatsApp buttons appears. After March 25 → verify form hidden, WhatsApp shown.

- [ ] T018 [US2] Implement error state: on API failure show error message with WhatsApp buttons for Martín (+598 99 318 813) and Mariana (+598 99 158 944) in `src/components/TrasladoForm.tsx`
- [ ] T019 [US2] Implement deadline enforcement: reuse `src/lib/deadline.ts` to hide form after March 25 2026, show deadline-passed message with WhatsApp buttons in `src/components/TrasladoForm.tsx`

## Phase 5: User Story 3 — Auditoría de UI contra Figma v2 (P1)

> Goal: Every section on the main page matches Figma v2 in backgrounds, spacing, typography, and component structure for both desktop (1200px) and mobile (375px).
>
> Independent test: Side-by-side visual comparison of each section against Figma v2 nodes in both breakpoints.

- [ ] T020 [P] [US3] Audit and fix Hero section (backgrounds, text positioning, responsive) against Figma v2 node 95:113 in `src/components/Hero.tsx`
- [ ] T021 [P] [US3] Audit and fix Detalles section (layout, icons, map, spacing) against Figma v2 node 95:122 in `src/components/Detalles.tsx`
- [ ] T022 [P] [US3] Audit and fix Asistencia section (backgrounds, floral pattern, form container, contact section) against Figma v2 node 97:143 in `src/components/Asistencia.tsx`
- [ ] T023 [P] [US3] Audit and fix Gift List section (backgrounds, card layout, spacing) against Figma v2 node 95:196 in `src/components/GiftList.tsx`
- [ ] T024 [P] [US3] Audit and fix Temaikenes y Fotos section (backgrounds, watercolor pattern, Spotify button, text) against Figma v2 node 95:233 in `src/components/Fotos.tsx` and `src/components/FotosAsistenciaWrapper.tsx`
- [ ] T025 [P] [US3] Audit and fix Gracias/Footer section (backgrounds, text, spacing) against Figma v2 node 95:262 in `src/components/Gracias.tsx`
- [ ] T026 [US3] Verify complete page flow matches Figma v2 section order and visual coherence in desktop (1200px) and mobile (375px) — screenshot comparison

## Phase 6: Polish & Cross-Cutting

> Goal: Ensure build passes, tests pass, and responsive design is correct across breakpoints.

- [ ] T027 Verify build succeeds with `npm run build` and no TypeScript errors
- [ ] T028 Verify all existing tests pass with `npm test`
- [ ] T029 Verify lint passes with `npm run lint`
- [ ] T030 Manual smoke test: complete traslado form flow end-to-end on `netlify dev` (submit, verify success alert, check form reset)

---

## Dependencies

```text
Phase 1 (T001-T004) ──→ Phase 2 (T005-T008) ──→ Phase 3 (T009-T017) ──→ Phase 4 (T018-T019)
                                                                      ──→ Phase 5 (T020-T026)
                                                                                              ──→ Phase 6 (T027-T030)
```

### Story Dependencies

| Story | Depends On        | Can Parallel With |
| ----- | ----------------- | ----------------- |
| US1   | Phase 1, Phase 2  | US3 (after T017)  |
| US2   | US1 (T014)        | US3               |
| US3   | Phase 2 (T006-T008) | US1, US2         |

### Parallel Execution Opportunities

**Phase 1**: All 4 tasks (T001-T004) are fully parallel — different files, no dependencies.

**Phase 2**: T006 and T007 are parallel (Nav vs Asistencia extraction). T005 depends on T001-T003. T008 depends on T007.

**Phase 3**: T009-T016 are sequential within the component. T017 depends on T014.

**Phase 5**: T020-T025 are fully parallel — each audits a different component file independently. T026 depends on all prior US3 tasks.

## Implementation Strategy

**MVP (minimum viable)**: Phase 1 + Phase 2 + Phase 3 (US1) = working traslado form with data persistence.

**Incremental delivery**:
1. MVP: Form submits and data reaches Google Sheet ✅
2. +US2: Error handling and deadline enforcement
3. +US3: Full visual alignment with Figma v2
4. Polish: Build/test/lint verification
