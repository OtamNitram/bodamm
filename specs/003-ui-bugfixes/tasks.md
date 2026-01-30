# Tasks: UI Bugfixes - Design System Alignment

**Input**: Design documents from `/specs/003-ui-bugfixes/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Tests**: Not explicitly requested - visual regression tests exist and will be updated in Polish phase.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- All paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Prepare environment for styling changes

- [ ] T001 Ensure local dev environment is running with `npm run dev`
- [ ] T002 [P] Open Figma file for reference: https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento
- [ ] T003 [P] Open browser DevTools for responsive testing at 375px, 800px, 1200px

---

## Phase 2: Foundational (Global Typography)

**Purpose**: Typography changes affect all user stories and should be applied first

**⚠️ CRITICAL**: Complete before user story phases to ensure consistent H1/H2 styling

- [ ] T004 Add H1 bold font-weight (700) and 2% letter-spacing in src/styles/global.css
- [ ] T005 Add H2 bold font-weight (700) and 2% letter-spacing in src/styles/global.css
- [ ] T006 Verify all H1/H2 headings render with bold + letter-spacing across site

**Checkpoint**: Typography foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Mobile Hero Section Display (Priority: P1) 🎯 MVP

**Goal**: Hero section displays correctly on mobile with centered image and positioned text

**Independent Test**: View at 375px width - hero image centered, "Save the Date" at top

### Implementation for User Story 1

- [ ] T007 [US1] Center hero image horizontally on mobile in src/components/Hero.tsx
- [ ] T008 [US1] Position "Save the Date" text at top using absolute positioning in src/components/Hero.tsx
- [ ] T009 [US1] Review and correct text content in Save the Date section in src/components/Hero.tsx
- [ ] T010 [US1] Verify hero section at 375px viewport matches Figma node 11:1021

**Checkpoint**: User Story 1 complete - mobile hero displays correctly

---

## Phase 4: User Story 2 - Responsive Spacing System (Priority: P1)

**Goal**: All sections use correct spacing tokens from Figma design system

**Independent Test**: Measure safe-margins at 375px (16px) and 1200px (48px)

### Implementation for User Story 2

- [ ] T011 [US2] Add spacing tokens to tailwind.config.mjs if not present (safe, xl, l variants)
- [ ] T012 [P] [US2] Update safe-margin padding in src/pages/index.astro (px-4 mobile, px-12 desktop)
- [ ] T013 [P] [US2] Update section spacing in src/components/Hero.tsx to use design system values
- [ ] T014 [P] [US2] Update section spacing in src/components/Detalles.tsx to use design system values
- [ ] T015 [US2] Reduce excessive spacing between QR photos and Asistencia sections in src/pages/index.astro
- [ ] T016 [US2] Verify spacing at 375px, 800px, and 1200px matches Figma margins table

**Checkpoint**: User Story 2 complete - spacing consistent across all breakpoints

---

## Phase 5: User Story 3 - Navigation Bar Layout (Priority: P1)

**Goal**: Navbar layout with logo/hamburger at edges, date filling center space

**Independent Test**: Logo at left edge, hamburger at right edge, date left-aligned in middle

### Implementation for User Story 3

- [ ] T017 [US3] Position logo at left edge respecting safe-margin in src/components/Nav.tsx
- [ ] T018 [US3] Position hamburger menu at right edge respecting safe-margin in src/components/Nav.tsx
- [ ] T019 [US3] Make date text flex-grow with left alignment in src/components/Nav.tsx
- [ ] T020 [US3] Verify navbar layout at mobile and desktop viewports

**Checkpoint**: User Story 3 complete - navbar layout matches Figma

---

## Phase 6: User Story 4 - Mobile Menu Styling (Priority: P2)

**Goal**: Mobile menu has correct colors, 48px touch targets, and consistent icons

**Independent Test**: Open menu - check background color, item height ≥48px, close icon is linen

### Implementation for User Story 4

- [ ] T021 [US4] Set mobile menu background to bg-brand-burgundy in src/components/Nav.tsx
- [ ] T022 [US4] Add min-h-[48px] to menu items for touch accessibility in src/components/Nav.tsx
- [ ] T023 [US4] Change close (X) icon color to text-brand-linen in src/components/Nav.tsx
- [ ] T024 [US4] Ensure navbar maintains bg-brand-burgundy on scroll in src/components/Nav.tsx
- [ ] T025 [US4] Verify mobile menu styling matches Figma Nav component

**Checkpoint**: User Story 4 complete - mobile menu fully styled

---

## Phase 7: User Story 5 - Gift List Section Text (Priority: P2)

**Goal**: Gift list text has max-width and flows naturally without hardcoded breaks

**Independent Test**: Desktop view shows text ≤800px wide, wrapping naturally

### Implementation for User Story 5

- [ ] T026 [US5] Add max-w-[800px] mx-auto to gift list text container in src/components/GiftList.tsx
- [ ] T027 [US5] Remove any hardcoded <br> tags from gift list text in src/components/GiftList.tsx
- [ ] T028 [US5] Verify text flows naturally at all breakpoints

**Checkpoint**: User Story 5 complete - gift list text properly constrained

---

## Phase 8: User Story 6 - Asset Quality (Priority: P2)

**Goal**: Spotify logo is high-quality SVG without pixelation

**Independent Test**: Zoom to 200% - Spotify logo crisp with no pixelation

### Implementation for User Story 6

- [ ] T029 [US6] Export Spotify icon as SVG from Figma file
- [ ] T030 [US6] Replace low-quality Spotify logo in src/assets/icons/spotify.svg
- [ ] T031 [US6] Update import in component if filename changed
- [ ] T032 [US6] Verify Spotify logo renders crisply at 2x zoom

**Checkpoint**: User Story 6 complete - Spotify logo high quality

---

## Phase 9: User Story 7 - WhatsApp Button Consistency (Priority: P2)

**Goal**: Both WhatsApp buttons have identical size and colors per Figma

**Independent Test**: Compare buttons side by side - identical dimensions and colors

### Implementation for User Story 7

- [ ] T033 [US7] Ensure both WhatsApp buttons use identical width/height (257px x 40px) in src/components/Asistencia.tsx
- [ ] T034 [US7] Verify button colors match Figma (bg-brand-darkGreen, text-brand-linen)
- [ ] T035 [US7] Compare buttons side by side to confirm visual consistency

**Checkpoint**: User Story 7 complete - WhatsApp buttons consistent

---

## Phase 10: User Story 8 - Section Spacing Corrections (Priority: P2)

**Goal**: Correct excessive spacing between QR photos and Asistencia sections

**Independent Test**: Scroll through page - spacing between sections follows design system

**Note**: Partially addressed in US2, this phase handles any remaining section-specific gaps

### Implementation for User Story 8

- [ ] T036 [US8] Audit all section margins in src/pages/index.astro for design system compliance
- [ ] T037 [US8] Fix any remaining excessive gaps between sections
- [ ] T038 [US8] Verify section transitions are visually consistent with Figma

**Checkpoint**: User Story 8 complete - section spacing normalized

---

## Phase 11: User Story 9 - Typography Updates (Priority: P2)

**Goal**: All H1/H2 headings have bold weight and 2% letter-spacing

**Note**: Global styles applied in Foundational phase - this phase verifies component compliance

### Implementation for User Story 9

- [ ] T039 [US9] Verify all H1 elements inherit global bold + letter-spacing styles
- [ ] T040 [US9] Verify all H2 elements inherit global bold + letter-spacing styles
- [ ] T041 [US9] Fix any component-level overrides that conflict with global typography in src/components/

**Checkpoint**: User Story 9 complete - typography consistent site-wide

---

## Phase 12: User Story 10 - Footer Design Updates (Priority: P3)

**Goal**: Footer (Gracias section) matches current Figma design

**Independent Test**: Compare with Figma node 11:762 - H2 bold, letter-spacing, two-line text

### Implementation for User Story 10

- [ ] T042 [US10] Update H2 to font-bold in src/components/Gracias.tsx
- [ ] T043 [US10] Add tracking-[0.02em] to H2 for 2% letter-spacing in src/components/Gracias.tsx
- [ ] T044 [US10] Add missing second line "(sí, en la foto teníamos 20 años)" in src/components/Gracias.tsx
- [ ] T045 [US10] Verify footer matches Figma node 11:762

**Checkpoint**: User Story 10 complete - footer matches Figma

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and visual regression test updates

- [ ] T046 [P] Run visual regression tests with `npm run test:visual`
- [ ] T047 [P] Update visual regression snapshots after confirming Figma match
- [ ] T048 Perform full-page scroll test at 375px, 800px, 1200px viewports
- [ ] T049 Verify Lighthouse performance score ≥ 90 (no regression)
- [ ] T050 Run quickstart.md testing checklist validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-12)**: All depend on Foundational completion
  - P1 stories (US1-US3) should complete before P2 stories
  - Stories can proceed in parallel within same priority
- **Polish (Phase 13)**: Depends on all user stories complete

### User Story Dependencies

| Story | Priority | Can Start After | Dependencies |
|-------|----------|-----------------|--------------|
| US1 | P1 | Phase 2 | None |
| US2 | P1 | Phase 2 | None |
| US3 | P1 | Phase 2 | None |
| US4 | P2 | Phase 2 | US3 (same file Nav.tsx) |
| US5 | P2 | Phase 2 | None |
| US6 | P2 | Phase 2 | None |
| US7 | P2 | Phase 2 | None |
| US8 | P2 | US2 | Spacing tokens from US2 |
| US9 | P2 | Phase 2 | Foundational typography |
| US10 | P3 | Phase 2 | None |

### Parallel Opportunities

**Within Phase 2 (Foundational)**:
- T004 and T005 modify same file - execute sequentially

**P1 Stories (can run in parallel)**:
- US1 (Hero.tsx) ‖ US2 (index.astro, tailwind.config.mjs) ‖ US3 (Nav.tsx)

**P2 Stories (can run in parallel, with exceptions)**:
- US5 (GiftList.tsx) ‖ US6 (assets/icons) ‖ US7 (Asistencia.tsx)
- US4 must wait for US3 (both modify Nav.tsx)
- US8 should wait for US2 (depends on spacing tokens)

---

## Parallel Example: P1 Stories

```bash
# After Phase 2 complete, launch all P1 stories in parallel:
Developer A: US1 - Hero.tsx (T007-T010)
Developer B: US2 - index.astro, tailwind.config.mjs (T011-T016)
Developer C: US3 - Nav.tsx (T017-T020)
```

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational Typography
3. Complete Phase 3-5: User Stories 1, 2, 3 (P1)
4. **STOP and VALIDATE**: Test all P1 stories at 375px, 800px, 1200px
5. Deploy if P1 is sufficient

### Incremental Delivery

1. Setup + Foundational → Typography ready
2. Add US1 (Hero) → Test → Can demo mobile hero
3. Add US2 (Spacing) → Test → Spacing consistent
4. Add US3 (Nav Layout) → Test → Nav correct
5. Add US4-US9 (P2) → Test → Polish complete
6. Add US10 (P3) → Test → Footer done
7. Polish phase → Final validation

### Single Developer Strategy

Execute phases sequentially in priority order:
1. Setup → Foundational → US1 → US2 → US3 (P1 complete)
2. US4 → US5 → US6 → US7 → US8 → US9 (P2 complete)
3. US10 (P3 complete) → Polish

---

## Notes

- All changes are CSS/styling only - no new JavaScript
- Figma is source of truth per Constitution
- Design system values documented in research.md
- Implementation details in quickstart.md
- Commit after each user story checkpoint
- Visual regression tests will need snapshot updates

---

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 50 |
| Setup Tasks | 3 |
| Foundational Tasks | 3 |
| US1 Tasks | 4 |
| US2 Tasks | 6 |
| US3 Tasks | 4 |
| US4 Tasks | 5 |
| US5 Tasks | 3 |
| US6 Tasks | 4 |
| US7 Tasks | 3 |
| US8 Tasks | 3 |
| US9 Tasks | 3 |
| US10 Tasks | 4 |
| Polish Tasks | 5 |
| Parallel Opportunities | 15 tasks marked [P] |
| Estimated Time | 2-3 hours |
