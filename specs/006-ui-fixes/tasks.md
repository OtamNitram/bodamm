# Tasks: UI Fixes — V2 Design Alignment & UX Polish

**Input**: Design documents from `/specs/006-ui-fixes/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Not explicitly requested — no test tasks included. Manual verification checklist provided in quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the one new shared utility needed across multiple stories

- [x] T001 Create `useScrollLock` hook in `src/hooks/useScrollLock.ts` — a React hook that sets `document.body.style.overflow = 'hidden'` on mount and restores on unmount. Must handle iOS Safari scroll-through bug (add `position: fixed` + `top` offset trick). Return cleanup function. ~20 lines.

**Checkpoint**: Scroll lock hook ready for use in RSVP modal and submitting overlay.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational blocking tasks for this feature — all user stories modify independent files and can proceed after Phase 1.

**Checkpoint**: Foundation ready — user story implementation can begin.

---

## Phase 3: User Story 1 - RSVP Modal Scroll Lock (Priority: P1) 🎯 MVP

**Goal**: Lock background scroll when RSVP confirmation modal or submitting overlay is visible.

**Independent Test**: Open RSVP form → fill data → click "Enviar confirmación" → try scrolling background → should be locked. Same for "Enviando confirmación..." state.

### Implementation for User Story 1

- [x] T002 [US1] Import and activate `useScrollLock` in `src/components/RsvpConfirmModal.tsx` — call the hook at the top of the component so scroll locks when modal mounts and unlocks on unmount. Ensure modal inner content (`max-h-[90vh] overflow-y-auto`) remains scrollable.
- [x] T003 [US1] Add scroll lock to submitting overlay in `src/components/RsvpForm.tsx` — use `useScrollLock` conditionally when `formState === "submitting"`. Since hooks can't be called conditionally, either extract the overlay into a small sub-component that mounts/unmounts, or use `useEffect` with the formState dependency to toggle scroll lock.

**Checkpoint**: RSVP confirmation modal and submitting overlay both lock background scroll. Modal inner content still scrolls when overflowing.

---

## Phase 4: User Story 2 - RSVP Success Screen Button Consistency & Copy (Priority: P1)

**Goal**: Normalize "Agregar al calendario" and "Modificar confirmación" buttons to match Figma v2 button component. Verify heading copy.

**Independent Test**: Complete RSVP flow → success screen → both buttons same size, correct variants, correct heading text.

### Implementation for User Story 2

- [x] T004 [US2] Update "Agregar al calendario" button in `src/components/RsvpSuccessMessage.tsx` — change classes from current `px-6 py-3 min-h-[44px] text-[16px]` to Figma v2 spec: `px-4 py-2 min-h-[40px] rounded-[12px] text-[14px] font-semibold bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200`. Keep calendar icon SVG and `gap-2`.
- [x] T005 [US2] Update "Modificar confirmación" button in `src/components/RsvpSuccessMessage.tsx` — change classes from current `px-6 py-2 min-h-[40px] text-[14px] border-2 border-brand-darkGreen` to Figma v2 Outlined spec: `px-4 py-2 min-h-[40px] rounded-[12px] text-[14px] font-semibold border border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen/10 transition-colors duration-200`. Remove `border-2`, use `border`.
- [x] T006 [US2] Verify and update heading copy in `src/components/RsvpSuccessMessage.tsx` — compare current "¡Confirmación recibida!" against Figma v2 design. Update text, font-size, and styling if they differ from Figma.

**Checkpoint**: Both buttons on success screen are identically sized and match Figma v2 button variants. Heading copy matches design.

---

## Phase 5: User Story 3 - Spotify Button Size (Priority: P1)

**Goal**: Resize the Spotify button to match Figma v2 Button component specs.

**Independent Test**: View Temaikenes section → Spotify button matches other site buttons in size (min-h 40px, same padding/rounding).

### Implementation for User Story 3

- [x] T007 [P] [US3] Update Spotify button in `src/components/Fotos.tsx` — change the `<a>` tag classes from current `px-4 py-2 rounded-xl text-[14px] font-semibold` to exact Figma v2 spec: `min-h-[40px] px-4 py-2 rounded-[12px] text-[14px] font-semibold bg-brand-darkGreen text-brand-linen hover:bg-brand-eucalyptus transition-colors duration-200`. Add `inline-flex items-center justify-center` if not present.
- [x] T008 [P] [US3] Update Spotify icon size in `src/components/Fotos.tsx` — change icon from `w-4 h-4` to `w-4 h-4` (16px, verify current size). Ensure the Spotify green (#1BD75F) color is applied correctly. Remove the CSS `filter` hack if SVG already has correct colors; otherwise keep filter but verify output matches #1BD75F.

**Checkpoint**: Spotify button visually matches all other buttons on the site in size and proportions.

---

## Phase 6: User Story 4 - Calendar .ics MIME Type (Priority: P2)

**Goal**: Ensure the .ics file uses correct MIME type so mobile devices open native calendar.

**Independent Test**: Tap "Agregar al calendario" on mobile → native calendar app opens with event details.

### Implementation for User Story 4

- [x] T009 [P] [US4] Verify MIME type in `src/lib/calendar.ts` — confirm the Blob is created with `type: "text/calendar;charset=utf-8"` (it already is). Verify the `a.download` attribute is set (it is). No code change expected — mark as verified. If the download attribute prevents mobile calendar app opening, consider removing it and using `window.open(url)` instead.

**Checkpoint**: .ics download works on desktop; on mobile, calendar app opens with correct event data (April 25, 2026, 20:30, Bodega Spinoglio).

---

## Phase 7: User Story 5 - Transport Confirmation Persistence & Aesthetics (Priority: P2)

**Goal**: Remove auto-dismiss, match RSVP success screen aesthetics, allow re-fill.

**Independent Test**: Submit traslado form → success stays visible indefinitely → click re-fill → form reappears.

### Implementation for User Story 5

- [x] T010 [US5] Remove auto-dismiss timer in `src/components/TrasladoForm.tsx` — delete the `setTimeout(() => { resetForm(); }, 5000)` block (around line 87-89 in the success handler). Keep `setStatus("success")` but remove the timeout.
- [x] T011 [US5] Redesign transport success view in `src/components/TrasladoForm.tsx` — replace the current inline success `<div>` (lines ~180-187) with a styled success screen matching RSVP pattern: card container with `bg-white/20 border border-brand-darkGreen/20 rounded-xl` styling, checkmark icon in eucalyptus circle (copy SVG pattern from RsvpSuccessMessage), Dancing Script heading "¡Datos guardados!", body text "Nos pondremos en contacto para coordinar el traslado.", and a "Enviar otros datos" outlined button that calls `resetForm()`.
- [x] T012 [US5] Ensure "Enviar otros datos" button in `src/components/TrasladoForm.tsx` uses Figma v2 Outlined button variant: `px-4 py-2 min-h-[40px] rounded-[12px] text-[14px] font-semibold border border-brand-darkGreen text-brand-darkGreen hover:bg-brand-darkGreen/10 transition-colors duration-200`.

**Checkpoint**: Transport success screen persists until user clicks "Enviar otros datos". Visual style matches RSVP success screen.

---

## Phase 8: User Story 6 - Bank Account Numbers Update (Priority: P1)

**Goal**: Update UYU and USD account numbers to correct values.

**Independent Test**: View Gift List section → Cuentas card shows correct account numbers.

### Implementation for User Story 6

- [x] T013 [P] [US6] Update bank account numbers in `src/components/GiftList.tsx` — change UYU account from `123343456` to `0062001200748170` (around line 108) and USD account from `123343456` to `0062005200888865` (around line 111). Keep "Bco. Santander" as the bank name for both.

**Checkpoint**: Bank accounts display correctly: UYU `0062001200748170`, USD `0062005200888865`.

---

## Phase 9: User Story 7 - Responsive Breakpoint Verification (Priority: P2)

**Goal**: Verify site renders correctly at 375px, 800px, and 1200px against Figma frames.

**Independent Test**: Resize browser to each breakpoint and compare against Figma.

### Implementation for User Story 7

- [x] T014 [US7] Visual audit at 375px (Mobile) — compare each section against Figma Home Mobile frame (node 11:1017). Document any deviations in component files. Focus on sections affected by other fixes in this batch: Temaikenes/Spotify, Asistencia, Traslado, Gift List.
- [x] T015 [US7] Visual audit at 800px (Tablet) — compare each section against Figma Home Tablet frame (node 11:1176). Document and fix deviations. Check that Traslado form, zone chips, and Gift List render correctly at this breakpoint.
- [x] T016 [US7] Visual audit at 1200px (Desktop/Web) — compare each section against Figma Home Web frame (node 10:197). Document and fix deviations. Verify button sizes, spacing, and typography at desktop width.
- [x] T017 [US7] Fix any breakpoint deviations found in T014-T016 — apply CSS/Tailwind corrections to affected component files. Each fix should reference the specific Figma node and breakpoint.

**Checkpoint**: Site passes visual comparison at all three Figma breakpoints with no layout breaks between 320px–1440px.

---

## Phase 10: User Story 8 - Zone Chips Mobile Segmented Control (Priority: P2)

**Goal**: Transform zone chips into flush segmented control on mobile.

**Independent Test**: View traslado form at 375px → zone chips are flush, forming unified button-group.

### Implementation for User Story 8

- [x] T018 [US8] Refactor zone chip layout in `src/components/TrasladoForm.tsx` — change the chip container from `flex flex-wrap gap-3` to `flex gap-[1px]` (or `gap-0` with a 1px border separator). Update individual chip classes: remove `rounded-full` from all chips. Add `rounded-l-full` to first chip ("Montevideo"), no rounding on middle chip ("Costa de Oro"), `rounded-r-full` to last chip ("Otro"). Ensure min-h of 44px for touch targets. Chips should stretch equally to fill available width on mobile.
- [x] T019 [US8] Verify zone chip styling on desktop in `src/components/TrasladoForm.tsx` — ensure the segmented control still looks appropriate at tablet/desktop widths. Chips should not stretch to full container width on desktop; use `w-auto` or max-width constraint so the segmented control remains compact.

**Checkpoint**: Zone chips display as flush segmented control on mobile (375px). Tappable with 44px min touch targets. Looks appropriate at all breakpoints.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all stories

- [x] T020 Run full manual verification checklist from `specs/006-ui-fixes/quickstart.md` — test all 8 areas sequentially on mobile (375px) and desktop (1200px)
- [x] T021 Verify no TypeScript errors — run `npx astro check` and fix any type issues introduced by changes
- [x] T022 Verify Lighthouse score ≥ 90 — run Lighthouse audit on the deployed preview or local build to ensure no performance regression from changes
- [x] T023 Verify no raw hex colors in modified components — grep all modified files for hex color literals that should use brand tokens instead

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: N/A — no blocking prerequisites
- **User Stories (Phase 3–10)**: Phase 1 must be complete (useScrollLock hook) before US1. All other stories are independent of each other.
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (RSVP Modal Scroll Lock)**: Depends on T001 (useScrollLock hook)
- **US2 (Success Buttons & Copy)**: No dependencies — can start immediately
- **US3 (Spotify Button)**: No dependencies — can start immediately
- **US4 (Calendar .ics)**: No dependencies — can start immediately
- **US5 (Transport Confirmation)**: No dependencies — can start immediately
- **US6 (Bank Accounts)**: No dependencies — can start immediately
- **US7 (Breakpoint Verification)**: Should run AFTER US2, US3, US5, US6, US8 so it verifies the final state
- **US8 (Zone Chips)**: No dependencies — can start immediately

### Parallel Opportunities

- **T007, T008** (US3 — Spotify) can run in parallel (same file but different concerns)
- **T009** (US4 — Calendar) can run in parallel with everything
- **T013** (US6 — Bank accounts) can run in parallel with everything
- US2, US3, US4, US5, US6, US8 are all independent and can run in parallel
- US7 (breakpoint audit) should be last before polish

---

## Parallel Example: Quick Wins

```bash
# These can all run simultaneously (different files, no dependencies):
T007: Update Spotify button sizing in src/components/Fotos.tsx
T009: Verify calendar MIME type in src/lib/calendar.ts
T013: Update bank accounts in src/components/GiftList.tsx
```

## Parallel Example: After useScrollLock hook (T001)

```bash
# US1 can start, while these run in parallel:
T002: Add scroll lock to RsvpConfirmModal.tsx
T004: Update calendar button in RsvpSuccessMessage.tsx
T010: Remove auto-dismiss in TrasladoForm.tsx
T018: Refactor zone chips in TrasladoForm.tsx
```

**Note**: T010 and T018 both modify TrasladoForm.tsx — execute T010 first (success view), then T011/T012 (success redesign), then T018/T019 (zone chips) to avoid conflicts.

---

## Implementation Strategy

### MVP First (User Stories 1 + 6)

1. Complete Phase 1: Setup (T001 — useScrollLock hook)
2. Complete Phase 8: US6 (T013 — bank accounts, instant win)
3. Complete Phase 3: US1 (T002–T003 — scroll lock)
4. **STOP and VALIDATE**: Test scroll lock + bank accounts

### Incremental Delivery

1. T001 + T013 → Hook + bank accounts (2 tasks, instant value)
2. T002–T003 → Scroll lock working (critical UX fix)
3. T004–T006 → Success screen buttons normalized
4. T007–T008 → Spotify button sized correctly
5. T009 → Calendar verified
6. T010–T012 → Transport success redesigned
7. T018–T019 → Zone chips as segmented control
8. T014–T017 → Breakpoint audit (verifies everything)
9. T020–T023 → Polish and final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US7 (breakpoint audit) intentionally last — it verifies the cumulative effect of all other fixes
- T010, T011, T012, T018, T019 all modify `TrasladoForm.tsx` — must be executed sequentially
- T004, T005, T006 all modify `RsvpSuccessMessage.tsx` — must be executed sequentially
- Commit after each phase checkpoint
- No test tasks included (not requested). Use quickstart.md manual checklist for verification.
