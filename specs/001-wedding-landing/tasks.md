---
description: "Implementation tasks for Wedding Landing Page (V1 Static)"
---

# Tasks: Wedding Landing Page (V1 Static)

**Input**: Design documents from `/specs/001-wedding-landing/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in specification. Visual regression tests included for Figma fidelity validation per constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/`, `public/` at repository root
- Paths use Astro static site structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Astro project with TypeScript in repository root
- [x] T002 [P] Install dependencies: astro, react, react-dom, @astrojs/react, @astrojs/tailwind, tailwindcss, typescript
- [x] T003 [P] Install dev dependencies: @playwright/test, vitest
- [x] T004 [P] Configure TypeScript strict mode in tsconfig.json
- [x] T005 [P] Configure Astro for static output and React integration in astro.config.mjs
- [x] T006 Create project directory structure: src/components/, src/pages/, src/layouts/, src/config/, src/styles/, src/assets/images/, src/assets/icons/, public/fonts/, public/qr-codes/, tests/visual/, tests/unit/
- [x] T007 [P] Configure Tailwind with design tokens in tailwind.config.mjs (colors: brand.darkGreen #0A3428, brand.eucalyptus #106552, brand.burgundy #640405, brand.linen #F9F2E8, brand.terracotta #C6572A, brand.navy #2A3354; fontFamily: lato; screens: mobile 375px, tablet 800px, web 1200px)
- [x] T008 [P] Create global styles with smooth scroll behavior in src/styles/global.css
- [x] T009 [P] Create centralized external links configuration in src/config/links.ts with ExternalLinks interface (spotify.playlistUrl, contact.whatsappUrl, contact.telegramUrl, maps.embedUrl, maps.directionsUrl, photos.qrDestinationUrl, photos.alternativeLinkUrl, rsvp.pageUrl)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Extract images from Figma (file qwrm6VDQhaEODfbkZfQ6Kk, nodes 10:197, 11:1176, 11:1017) and save to src/assets/images/ in WebP format at 1x, 2x, 3x resolutions [MANUAL - See src/assets/images/README.md]
- [ ] T011 [P] Extract icons from Figma and save to src/assets/icons/ in SVG format [MANUAL - See src/assets/icons/README.md]
- [ ] T012 [P] Generate QR codes for Spotify playlist (https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5), /rsvp page, and photos link; save to public/qr-codes/ as spotify-qr.png, rsvp-qr.png, photos-qr.png [MANUAL - See public/qr-codes/README.md]
- [x] T013 [P] Create base Layout component in src/layouts/Layout.astro with meta tags, font loading, and global styles import
- [x] T014 [P] Create reusable Button component in src/components/Button.tsx matching Figma button states (default, hover) with target="\_blank" rel="noopener noreferrer" for external links
- [x] T015 Configure Playwright for visual regression testing in tests/visual/ with baseline screenshots from Figma

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Wedding Information (Priority: P1) 🎯 MVP

**Goal**: Display all wedding information sections (Hero, Detalles, Gift List, Fotos & Temaikenes, Asistencia, Gracias) matching Figma designs across web/tablet/mobile viewports

**Independent Test**: Navigate to home page and verify all 6 sections are visible and match Figma designs at 375px (mobile), 800px (tablet), and 1200px+ (web) viewports

### Implementation for User Story 1

- [x] T016 [P] [US1] Create Hero section component in src/components/Hero.tsx matching Figma node 10:197 (web), 11:1176 (tablet), 11:1017 (mobile) with responsive images using Astro Image component
- [x] T017 [P] [US1] Create Detalles section component in src/components/Detalles.tsx with Cuándo/Dónde/Dress Code subsections and Google Maps iframe embed using maps.embedUrl from config
- [x] T018 [P] [US1] Create GiftList section component in src/components/GiftList.tsx matching Figma design
- [x] T019 [P] [US1] Create Fotos & Temaikenes section component in src/components/Fotos.tsx with Spotify button (using spotify.playlistUrl from config), QR code image, and "este link" alternative text link
- [x] T020 [P] [US1] Create Asistencia section component in src/components/Asistencia.tsx with WhatsApp/Telegram buttons (using contact URLs from config), RSVP QR code, and link to /rsvp
- [x] T021 [P] [US1] Create Gracias section component in src/components/Gracias.tsx matching Figma design
- [x] T022 [US1] Create home page in src/pages/index.astro composing all 6 section components with proper anchor IDs (hero, detalles, gift-list, fotos, asistencia, gracias)
- [x] T023 [US1] Add Playwright visual regression test in tests/visual/home.spec.ts comparing rendered output to Figma screenshots at mobile/tablet/web breakpoints
- [ ] T024 [US1] Verify all images use Astro Image component with appropriate loading strategy (eager for hero, lazy for below-fold)
- [ ] T025 [US1] Verify all external links use target="\_blank" rel="noopener noreferrer"

**Checkpoint**: At this point, User Story 1 should be fully functional - home page displays all sections matching Figma

---

## Phase 4: User Story 2 - Navigate Between Sections (Priority: P1)

**Goal**: Enable guests to jump to specific sections via navigation links with smooth scrolling

**Independent Test**: Click each navigation link and verify smooth scroll to correct section anchor, test "Volver al inicio" returns to top

### Implementation for User Story 2

- [x] T026 [US2] Create Nav component in src/components/Nav.tsx as React island with navigation items (Detalles #detalles, Gift List #gift-list, Fotos & Temaikenes #fotos, Asistencia #asistencia, Volver al inicio #hero)
- [x] T027 [US2] Implement mobile menu toggle in Nav.tsx using useState for isMenuOpen state with hamburger button and responsive menu display
- [x] T028 [US2] Add Nav component to Layout.astro with client:idle hydration directive
- [x] T029 [US2] Verify smooth scroll behavior works via CSS scroll-behavior: smooth in global.css
- [ ] T030 [US2] Test navigation on mobile viewport (375px) to ensure menu toggle works and links scroll correctly
- [ ] T031 [US2] Verify navigation links scroll to correct section within 1 second per SC-002

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - home page displays all sections with working navigation

---

## Phase 5: User Story 3 - Access Spotify Playlist (Priority: P2)

**Goal**: Enable guests to view and access the wedding playlist via Spotify button and QR code

**Independent Test**: Click Spotify button in Fotos & Temaikenes section and verify it opens canonical playlist URL (https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5) in new tab

### Implementation for User Story 3

- [ ] T032 [US3] Verify Fotos & Temaikenes component (created in T019) includes Spotify button using Button component with spotify.playlistUrl from config
- [ ] T033 [US3] Verify Fotos & Temaikenes component displays Spotify QR code image from public/qr-codes/spotify-qr.png
- [ ] T034 [US3] Verify Fotos & Temaikenes component includes "este link" clickable text alternative that opens same Spotify URL
- [ ] T035 [US3] Test Spotify button opens correct playlist in new tab across Chrome, Safari, Firefox, Edge per SC-004
- [ ] T036 [US3] Verify Fotos & Temaikenes section visual design matches Figma exactly per FR-001

**Checkpoint**: User Story 3 complete - Spotify integration functional with button, QR code, and text link alternative

---

## Phase 6: User Story 4 - Contact via WhatsApp/Telegram (Priority: P2)

**Goal**: Enable guests to confirm attendance or ask questions via direct messaging

**Independent Test**: Click WhatsApp and Telegram buttons in Asistencia section and verify they open correct messaging apps with pre-configured contact information

### Implementation for User Story 4

- [ ] T037 [US4] Verify Asistencia component (created in T020) includes WhatsApp button using Button component with contact.whatsappUrl from config
- [ ] T038 [US4] Verify Asistencia component includes Telegram button using Button component with contact.telegramUrl from config
- [ ] T039 [US4] Test WhatsApp button opens WhatsApp with correct contact on mobile devices per SC-005
- [ ] T040 [US4] Test Telegram button opens Telegram with correct contact on mobile devices per SC-005
- [ ] T041 [US4] Update contact URLs in src/config/links.ts and verify buttons reflect new URLs after rebuild per acceptance scenario 4
- [x] T042 [US4] Create unit test in tests/unit/config.test.ts to validate all URLs in externalLinks are valid HTTPS format

**Checkpoint**: User Story 4 complete - WhatsApp/Telegram contact buttons functional with configurable URLs

---

## Phase 7: User Story 5 - Attempt RSVP (Priority: P3)

**Goal**: Provide placeholder RSVP page with clear "próximamente" messaging and WhatsApp/Telegram fallback

**Independent Test**: Navigate to /rsvp and verify placeholder message is clear and provides WhatsApp/Telegram CTAs

### Implementation for User Story 5

- [x] T043 [US5] Create placeholder RSVP page in src/pages/rsvp.astro with Layout component
- [x] T044 [US5] Add "Confirmación de Asistencia" heading and "Próximamente disponible" message to rsvp.astro
- [x] T045 [US5] Add "Mientras tanto, podés confirmar por:" text with WhatsApp and Telegram Button components using contact URLs from config
- [x] T046 [US5] Verify rsvp.astro maintains visual consistency with rest of site (same Layout, design tokens)
- [x] T047 [US5] Verify /rsvp page does NOT include any form elements or data submission functionality per FR-010
- [x] T048 [US5] Add Playwright test in tests/visual/rsvp.spec.ts to verify placeholder message and fallback CTAs are visible
- [ ] T049 [US5] Test RSVP QR code (created in T012) correctly links to /rsvp page

**Checkpoint**: All user stories complete - site has all sections, navigation, external integrations, and placeholder RSVP

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, validation, and final quality checks

- [ ] T050 [P] Run Lighthouse audit on production build and verify mobile score ≥90, desktop score ≥95 per SC-007
- [ ] T051 [P] Verify First Contentful Paint <1.5s on 3G connection using Chrome DevTools network throttling per SC-006
- [ ] T052 [P] Verify zero images or assets are hotlinked from Figma URLs by checking network requests per SC-008
- [ ] T053 [P] Verify all visual elements match Figma designs side-by-side at mobile/tablet/web viewports per SC-003
- [ ] T054 [P] Test site with JavaScript disabled to ensure core content and navigation still work per edge case
- [ ] T055 [P] Test site on very small mobile device (<320px) to verify graceful degradation per edge case
- [ ] T056 [P] Create README.md documenting local dev setup, Figma asset extraction process, QR code generation, external URL configuration, deployment to Cloudflare Pages, and where to change configurable links
- [ ] T057 [P] Verify TypeScript strict mode has zero errors by running type check
- [ ] T058 [P] Verify Tailwind config uses only defined design tokens (no arbitrary values like text-[#0A3428]) by code review
- [ ] T059 [P] Test all external links open in new tab with security attributes (target="\_blank" rel="noopener noreferrer")
- [ ] T060 [P] Verify site is deployable as static HTML/CSS/JS without backend per FR-013 by running build and checking dist/ output
- [ ] T061 Document any visual deviations from Figma designs with justification per FR-014
- [ ] T062 Run quickstart.md validation by following setup steps on clean environment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational - No dependencies on other stories
  - User Story 2 (P1): Can start after Foundational - Integrates with US1 but independently testable
  - User Story 3 (P2): Can start after Foundational - Uses Fotos component from US1
  - User Story 4 (P2): Can start after Foundational - Uses Asistencia component from US1
  - User Story 5 (P3): Can start after Foundational - Independent placeholder page
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation only - Creates all section components
- **User Story 2 (P1)**: Foundation + US1 components exist - Adds navigation to existing sections
- **User Story 3 (P2)**: Foundation + US1 Fotos component - Validates Spotify integration
- **User Story 4 (P2)**: Foundation + US1 Asistencia component - Validates contact integration
- **User Story 5 (P3)**: Foundation only - Independent RSVP placeholder page

### Within Each User Story

- Components can be built in parallel (marked [P])
- Page composition depends on components being complete
- Visual regression tests depend on pages being complete
- Validation tasks depend on implementation being complete

### Parallel Opportunities

- All Setup tasks (T002-T009) can run in parallel after T001
- All Foundational tasks (T010-T015) can run in parallel
- All US1 section components (T016-T021) can run in parallel
- US3, US4, US5 can run in parallel after US1 complete (if team capacity allows)
- All Polish tasks (T050-T062) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all section components for User Story 1 together:
Task: "Create Hero section component in src/components/Hero.tsx"
Task: "Create Detalles section component in src/components/Detalles.tsx"
Task: "Create GiftList section component in src/components/GiftList.tsx"
Task: "Create Fotos section component in src/components/Fotos.tsx"
Task: "Create Asistencia section component in src/components/Asistencia.tsx"
Task: "Create Gracias section component in src/components/Gracias.tsx"

# Then compose them:
Task: "Create home page in src/pages/index.astro composing all 6 section components"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T015) - CRITICAL
3. Complete Phase 3: User Story 1 (T016-T025) - All sections visible
4. Complete Phase 4: User Story 2 (T026-T031) - Navigation working
5. **STOP and VALIDATE**: Test home page with all sections and navigation
6. Run Lighthouse audit, verify Figma fidelity
7. Deploy to Cloudflare Pages for demo

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → All sections visible (MVP!)
3. Add User Story 2 → Test independently → Navigation working
4. Add User Story 3 → Test independently → Spotify integration
5. Add User Story 4 → Test independently → Contact buttons
6. Add User Story 5 → Test independently → RSVP placeholder
7. Polish → Final quality checks → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T015)
2. Once Foundational is done:
   - Developer A: User Story 1 (T016-T025) - Section components
   - Developer B: User Story 2 (T026-T031) - Navigation (waits for US1 components)
   - Developer C: User Story 5 (T043-T049) - RSVP placeholder (independent)
3. After US1 complete:
   - Developer A: User Story 3 (T032-T036) - Spotify validation
   - Developer B: User Story 4 (T037-T042) - Contact validation
4. Polish tasks (T050-T062) can be distributed across team

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently testable
- Figma is source of truth - any deviation must be documented per FR-014
- External URLs centralized in src/config/links.ts per FR-012
- Design tokens defined in tailwind.config.mjs per constitution
- Minimal JavaScript - only Nav menu toggle uses React island per FR-015
- Static-first - no SPA behavior, no backend, no persistence per FR-013
- Performance targets: FCP <1.5s, Lighthouse 90+/95+ per SC-006, SC-007
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Visual regression tests validate Figma fidelity per constitution

---

## Task Count Summary

- **Total Tasks**: 62
- **Phase 1 (Setup)**: 9 tasks
- **Phase 2 (Foundational)**: 6 tasks (BLOCKS all stories)
- **Phase 3 (US1 - View Information)**: 10 tasks
- **Phase 4 (US2 - Navigation)**: 6 tasks
- **Phase 5 (US3 - Spotify)**: 5 tasks
- **Phase 6 (US4 - Contact)**: 6 tasks
- **Phase 7 (US5 - RSVP Placeholder)**: 7 tasks
- **Phase 8 (Polish)**: 13 tasks

**Parallel Opportunities**: 35 tasks marked [P] can run in parallel within their phase

**MVP Scope**: Phases 1-4 (31 tasks) deliver functional home page with all sections and navigation

**Independent Stories**: US1, US2, US5 are independently implementable; US3 and US4 validate US1 components
