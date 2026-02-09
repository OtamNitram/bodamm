# Tasks: RSVP — Confirmación de Asistencia

**Input**: Design documents from `/specs/004-rsvp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/rsvp-api.md, quickstart.md

**Tests**: Not explicitly requested in spec. Unit tests for core logic (search, calendar) included in Polish phase.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, environment configuration, Netlify Functions directory

- [x] T001 Create Netlify Functions directory structure at netlify/functions/
- [x] T002 [P] Create environment variables template at .env.example with APPS_SCRIPT_URL and RSVP_SECRET placeholders
- [x] T003 [P] Update src/config/links.ts — replace mock WhatsApp URLs with real wa.me links for Martín (+59899318813) and Mariana (+59899158944), add rsvp.apiSearchUrl and rsvp.apiSubmitUrl pointing to /.netlify/functions/rsvp-search and /.netlify/functions/rsvp-submit

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, search logic, API functions, and seed data that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create TypeScript types for Guest, Group, SearchResponse, SubmitRequest, SubmitResponse, and API error types in src/lib/rsvp-types.ts per data-model.md entities and contracts/rsvp-api.md response shapes
- [x] T005 [P] Create name normalization utility in src/lib/rsvp-search.ts — implement normalizeForSearch(str) using String.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() per research.md R3
- [x] ~~T006 [P] Create zone data constants in src/data/zones.ts~~ — _Removed: transport/zone moved to separate spec_
- [x] T007 [P] Create seed guest data file at src/data/guests.json with sample groups and members per research.md R5 format (at least 2 groups for testing)
- [x] T008 [P] Create deadline utility in src/lib/deadline.ts — export isDeadlinePassed() comparing current date against 2026-03-25T23:59:59-03:00, usable on both client and server
- [x] T009 Create Google Apps Script code for doGet (search by name+surname) and doPost (submit RSVP, overwrite) with X-RSVP-SECRET validation — output as specs/004-rsvp/apps-script.js for manual deployment to Google
- [x] T010 Implement Netlify Function GET rsvp-search in netlify/functions/rsvp-search.ts — parse firstName/lastName query params, validate, call Apps Script doGet with X-RSVP-SECRET header, return SearchResponse per contracts/rsvp-api.md. Include deadline check (return 410 if passed).
- [x] T011 Implement Netlify Function POST rsvp-submit in netlify/functions/rsvp-submit.ts — parse JSON body, validate SubmitRequest (dietaryDescription required if hasDietaryRestriction), call Apps Script doPost with X-RSVP-SECRET header, return SubmitResponse per contracts/rsvp-api.md. Include deadline check (return 410 if passed).

**Checkpoint**: Foundation ready — types, API, search logic, seed data all in place. User story implementation can begin.

---

## Phase 3: User Story 1 — Buscar nombre y confirmar asistencia (Priority: P1) 🎯 MVP

**Goal**: Guest searches full name+surname, sees group members with checkboxes, selects who attends, reviews in confirmation modal, submits. Re-registration overwrites.

**Independent Test**: Search "Martín Mato" → see group → check attendees → modal shows summary → confirm → success persisted. Search unknown name → "No encontramos tu nombre" with WhatsApp CTA.

### Implementation for User Story 1

- [x] T012 [US1] Rewrite src/components/Asistencia.tsx as RSVP section container — replace current QR+WhatsApp layout with section shell matching Figma node 97:143 (bg-brand-linen, decorative pattern, title "Confirmación de Asistencia", subtitle "Tenés tiempo hasta el 25 de marzo", form container with semi-transparent background and rounded border). Import and render RsvpForm as child.
- [x] T013 [US1] Create src/components/RsvpForm.tsx — implement search bar with firstName and lastName text inputs and "Buscar" button matching Figma search bar style (bg-[#fffcf8], border, rounded, magnifying glass icon). No typeahead/autocomplete (autocomplete="off"). On submit, call GET rsvp-search API.
- [x] T014 [US1] Add group member display to RsvpForm.tsx — when search returns found=true, render each member with a checkbox (matching Figma checkbox style: brand-eucalyptus square-check icon, Lato font). Section heading "Seleccioná quiénes vienen :)". Checkboxes control attending boolean per member.
- [x] T015 [US1] Create src/components/RsvpConfirmModal.tsx — modal overlay with summary of all selections: list of members with attending status. Use brand tokens (bg-brand-linen, text-brand-darkGreen, border-brand-eucalyptus). "Confirmar" and "Volver" buttons using existing Button component. Triggered before form submission per FR-016.
- [x] T016 [US1] Wire form submission flow in RsvpForm.tsx — on "Enviar" click, show RsvpConfirmModal with summary. On modal confirm, POST to rsvp-submit API with groupId and members array. Handle loading state ("Enviando..."), success (transition to success view), and error (show error message with WhatsApp CTA per FR-006).
- [x] T017 [US1] Implement "not found" state in RsvpForm.tsx — when search returns found=false, display "No encontramos tu nombre" message with suggestion to contact via WhatsApp. Include WhatsApp buttons for Martín and Mariana. Style with brand tokens per FR-010.
- [x] T018 [US1] Implement re-registration in RsvpForm.tsx — when search returns a group with existing RSVP data (attending != null), pre-populate checkboxes with previous selections per FR-011. User can modify and re-submit; new data overwrites.
- [x] T019 [US1] Update src/pages/index.astro — ensure Asistencia component renders with client:load directive for React island hydration. Verify section has id="asistencia" for anchor navigation.

**Checkpoint**: User Story 1 complete — guest can search, see group, confirm attendance, review modal, submit. Core RSVP flow functional.

---

## Phase 4: User Story 2 — Indicar restricciones alimentarias (Priority: P1)

**Goal**: Per-member dietary restriction toggle (yes/no) with conditional free-text field. Data included in submission.

**Independent Test**: Toggle "sí" on a member → text field appears → type restriction → submit → data persisted. Toggle "no" → no text field → submit works without restriction.

### Implementation for User Story 2

- [x] T020 [US2] Add dietary restriction toggle per guest member in RsvpForm.tsx — below each member's attendance checkbox, add a toggle (sí/no) labeled "¿Restricción alimentaria?". Default "no". When "sí", show a text input for description. Style toggle with brand-eucalyptus. Per FR-003.
- [x] T021 [US2] Include dietary data in RsvpConfirmModal.tsx — extend modal summary to show dietary restrictions per member (name + restriction text if any). Only show dietary info for members who toggled "sí".
- [x] T022 [US2] Include dietary fields (hasDietaryRestriction, dietaryDescription) in API submission payload in RsvpForm.tsx. Validate: if hasDietaryRestriction=true, dietaryDescription must be non-empty (show inline error).
- [x] T023 [US2] Pre-populate dietary data on re-registration in RsvpForm.tsx — when search returns existing data, set toggle state and text field from hasDietaryRestriction/dietaryDescription per FR-011.

**Checkpoint**: User Stories 1+2 complete — full attendance + dietary flow working. Core P1 functionality delivered.

---

## Phase 5: User Story 3 — Mensaje de éxito y agregar al calendario (Priority: P2)

**Goal**: After successful submission, show success message with option to download ICS calendar event.

**Independent Test**: Submit RSVP → see success message → click "Agregar al calendario" → .ics file downloads with correct date (25/04/2026 20:30), location (Bodega Spinoglio), and event name.

### Implementation for User Story 3

- [x] T024 [P] [US3] Create ICS calendar generation utility in src/lib/calendar.ts — export generateICS() returning ICS string per research.md R4 template (DTSTART:20260425T203000, LOCATION:Bodega Spinoglio, SUMMARY:Casamiento Martín & Mariana) and downloadICS() triggering browser download via Blob URL. Per FR-013.
- [x] T025 [US3] Create src/components/RsvpSuccessMessage.tsx — success view with confirmation message (styled with brand tokens, Dancing Script heading), "Agregar al calendario" button calling downloadICS(), and "Volver al inicio" link. Per FR-005.
- [x] T026 [US3] Integrate RsvpSuccessMessage into RsvpForm.tsx — after successful POST rsvp-submit (200 OK), transition form to success state rendering RsvpSuccessMessage. Include transition animation.

**Checkpoint**: Full submission flow complete with success feedback and calendar integration.

---

## Phase 6: User Story 4 — Contacto directo por WhatsApp (Priority: P2)

**Goal**: WhatsApp buttons for Martín and Mariana always visible below the form.

**Independent Test**: Verify "WhatsApp a Martín" opens wa.me/59899318813 and "WhatsApp a Mariana" opens wa.me/59899158944.

### Implementation for User Story 4

- [x] T027 [US4] Implement "Contacto Directo" section in Asistencia.tsx — below the RsvpForm, add a subsection with heading "Contacto Directo" and two WhatsApp buttons using existing Button component. Martín button links to wa.me/59899318813, Mariana button links to wa.me/59899158944. Match Figma layout for contact section. Per FR-006.

**Checkpoint**: WhatsApp fallback always available alongside form.

---

## Phase 7: User Story 7 — Acceso privado a la lista de invitados (Priority: P2)

**Goal**: Couple (Martín & Mariana) can view all RSVP data privately via Google Sheets. No unauthorized access.

**Independent Test**: Open Google Sheet → see all guest data with RSVP responses. Verify API endpoints require X-RSVP-SECRET header (tested in T010/T011).

### Implementation for User Story 7

- [x] T028 [US7] Verify X-RSVP-SECRET validation in Apps Script code (specs/004-rsvp/apps-script.js) — ensure doGet and doPost reject requests without valid secret header. Return 403 for invalid/missing secret.
- [x] T029 [US7] Document Google Sheets access and sharing setup in specs/004-rsvp/quickstart.md — add section explaining how to share sheet with couple only, set permissions, and verify data visibility. Per FR-009.

**Checkpoint**: Private data access verified — couple sees data in Sheets, API protected by secret.

---

## Phase 8: User Story 5 — Pop-up de bienvenida para RSVP (Priority: P3)

**Goal**: First-time session visitors see a discreet pop-up asking if they came to confirm attendance. Accepts → scroll to RSVP. Dismisses → never shows again in session.

**Independent Test**: Open page in new tab → pop-up appears → accept → smooth scroll to #asistencia. Reload → no pop-up. Close tab, reopen → pop-up appears again.

### Implementation for User Story 5

- [x] T030 [US5] Create src/components/RsvpPopup.tsx — discreet but attention-grabbing pop-up (bottom-right or center overlay) using brand tokens. Text: "¿Viniste a confirmar asistencia?" with "Sí, llevame" and "No, gracias" buttons. Check sessionStorage('rsvp-popup-dismissed') on mount; if set, don't render. On accept: smooth scroll to #asistencia, set sessionStorage, close. On dismiss: set sessionStorage, close. Per FR-007 and research.md R6.
- [x] T031 [US5] Integrate RsvpPopup into src/pages/index.astro — add RsvpPopup component with client:idle directive (non-blocking hydration). Ensure it renders above other content (z-index).

**Checkpoint**: Pop-up guides first-time visitors to RSVP section, respects session.

---

## Phase 9: ~~User Story 6 — Coordinación de transporte y zona de origen~~

_Removed — Transport coordination moved to a separate spec. Tasks T032-T036 removed._

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Deadline enforcement, responsive design, cleanup, tests, accessibility

- [x] T037 Create src/components/RsvpDeadlineMessage.tsx — post-deadline view showing "El plazo para confirmar ha vencido" message with WhatsApp buttons only. Styled with brand tokens. Per FR-015.
- [x] T038 Integrate deadline check in Asistencia.tsx — use isDeadlinePassed() from src/lib/deadline.ts. If deadline passed, render RsvpDeadlineMessage instead of RsvpForm. Per FR-015.
- [x] T039 Update or remove src/pages/rsvp.astro — either redirect to /#asistencia with a meta refresh/JS redirect, or remove the page and update any references. Per FR-014 (no separate page).
- [x] T040 Responsive design pass on all RSVP components — verify Figma fidelity at mobile (375px), tablet (800px), and desktop (1200px+) breakpoints per tailwind.config.mjs screen values. Adjust spacing, font sizes, form container width. Per FR-010 and SC-003.
- [x] T041 [P] Accessibility pass — add aria-labels to form inputs, role="dialog" to modal, keyboard navigation (Escape to close modal/popup), focus management. Ensure search form is screen-reader friendly.
- [x] T042 [P] Create unit tests for search normalization in tests/unit/rsvp-search.test.ts — test normalizeForSearch with accented Spanish names (Martín→martin, María→maria), case variations, edge cases (empty string, special chars)
- [x] T043 [P] Create unit tests for ICS generation in tests/unit/calendar.test.ts — test generateICS() produces valid ICS with correct DTSTART, LOCATION, SUMMARY
- [x] T044 Run quickstart.md validation — follow all steps in specs/004-rsvp/quickstart.md end-to-end: env setup, netlify dev, search guest, submit RSVP, verify in Google Sheet

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — core MVP
- **US2 (Phase 4)**: Depends on Phase 3 (extends RsvpForm.tsx built in US1)
- **US3 (Phase 5)**: Depends on Phase 3 (needs form submission flow)
- **US4 (Phase 6)**: Depends on Phase 2 only (WhatsApp section is independent of form)
- **US7 (Phase 7)**: Depends on Phase 2 only (Apps Script + Sheets setup)
- **US5 (Phase 8)**: Depends on Phase 3 (needs #asistencia anchor to exist)
- ~~**US6 (Phase 9)**: _Removed — moved to separate spec_~~
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

```
Phase 1 (Setup)
  └─> Phase 2 (Foundational)
        ├─> Phase 3 (US1: Search + Attendance) 🎯 MVP
        │     ├─> Phase 4 (US2: Dietary Restrictions)
        │     ├─> Phase 5 (US3: Success + Calendar)
        │     └─> Phase 8 (US5: Welcome Pop-up)
        ├─> Phase 6 (US4: WhatsApp Contact) — independent
        └─> Phase 7 (US7: Private Access) — independent
              └─> Phase 10 (Polish)
```

### Within Each User Story

- Models/types before services
- Services before UI components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel
- **Phase 2**: T005, T006, T007, T008 can all run in parallel (different files)
- **Phase 2**: T010 and T011 can run in parallel after T004 (both depend on types)
- **Phase 3**: None — sequential (all modify RsvpForm.tsx or depend on previous)
- **Phase 5**: T024 can run in parallel with Phase 4 tasks (different file)
- **Phase 6 + 7**: Can run in parallel with each other and with Phase 3
- **Phase 10**: T041, T042, T043 can all run in parallel

---

## Parallel Example: User Story 1

```text
# After Phase 2 complete, launch US1 sequentially:
T012: Rewrite Asistencia.tsx as section container
T013: Create RsvpForm.tsx with search bar
T014: Add group member display with checkboxes
T015: Create RsvpConfirmModal.tsx
T016: Wire form submission flow
T017: Implement "not found" state
T018: Implement re-registration
T019: Update index.astro

# Meanwhile, these can run in parallel (different stories/files):
T027: [US4] WhatsApp contact section (Phase 6)
T028-T029: [US7] Private access verification (Phase 7)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T011) — CRITICAL
3. Complete Phase 3: User Story 1 (T012-T019)
4. **STOP and VALIDATE**: Search a guest, confirm attendance, verify data in Google Sheet
5. Deploy to Netlify preview if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Search + Attendance) → Test → **MVP deployed** 🎯
3. Add US2 (Dietary Restrictions) → Test → Full P1 complete
4. Add US3 (Success + Calendar) + US4 (WhatsApp) + US7 (Private Access) → Test → P2 complete
5. Add US5 (Pop-up) → Test → P3 complete
6. Polish → Final validation → **Feature complete**

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- US1 and US2 are both P1 but US2 extends the form built in US1, so US2 depends on US1
- US4 (WhatsApp) and US7 (Private Access) are lightweight and can be done alongside US1
- All new UI components MUST use brand tokens only — no raw hex values
