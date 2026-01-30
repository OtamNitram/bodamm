# Tasks: CI/CD Deployment Pipeline

**Input**: Design documents from `/specs/002-ci-deployment/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: No automated tests requested for this infrastructure feature. Verification is manual via Cloudflare dashboard and browser.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **[MANUAL]**: Requires manual action in external service (cannot be automated)

## Special Note: Infrastructure Feature

This feature is primarily infrastructure setup with manual steps in Cloudflare dashboard. Most tasks are **[MANUAL]** and involve external service configuration rather than code changes.

---

## Phase 1: Setup (Prerequisites)

**Purpose**: Ensure local environment and repository are ready for deployment

- [x] T001 Verify local build works by running `npm run build` in repository root
- [x] T002 Verify `package-lock.json` is committed to repository
- [x] T003 [P] Verify `main` branch exists and is up to date with remote

**Checkpoint**: Local build succeeds, repository is ready for Netlify connection

---

## Phase 2: Foundational (Netlify Account Setup)

**Purpose**: Create and configure Netlify account - BLOCKS all user stories

**⚠️ CRITICAL**: No deployment can occur until Netlify account is connected to GitHub

- [x] T004 [MANUAL] Create Netlify account at https://app.netlify.com (if not exists)
- [x] T005 [MANUAL] Click "Add new site" → "Import an existing project" → "Deploy with GitHub"
- [x] T006 [MANUAL] Authorize Netlify to access GitHub account
- [x] T007 [MANUAL] Select repository `OtamNitram/bodamm` from repository list

**Checkpoint**: Netlify is connected to GitHub repository, ready for project configuration

---

## Phase 3: User Story 1 - Automatic Deployment on Code Changes (Priority: P1) 🎯 MVP

**Goal**: Site automatically deploys when code is pushed to main branch

**Independent Test**: Push a small text change to main branch and verify it appears on live site within 5 minutes

### Implementation for User Story 1

- [x] T008 [MANUAL] [US1] Configure build settings in Netlify setup wizard:
  - Site name: `bodamm` (or auto-generated)
  - Branch to deploy: `main`
  - Build command: `npm run build`
  - Publish directory: `dist`
- [x] T009 [MANUAL] [US1] Click "Deploy site" to trigger initial deployment
- [x] T010 [MANUAL] [US1] Monitor build progress in Netlify dashboard until completion
- [x] T011 [US1] Verify GitHub commit shows deployment status check (✓ or ✗)
- [x] T012 [US1] Test CI/CD by pushing a minor change to main branch in README.md
- [x] T013 [US1] Verify the change appears on live site within 5 minutes

**Checkpoint**: Automatic deployment working - pushing to main triggers build and deploy

---

## Phase 4: User Story 2 - Live Website Accessibility (Priority: P1) 🎯 MVP

**Goal**: Wedding guests can access the site via public URL from any device

**Independent Test**: Visit deployed URL from multiple devices and verify site loads correctly

### Implementation for User Story 2

- [x] T014 [US2] Record the deployed site URL (https://bodamm.netlify.app) in project documentation
- [x] T015 [US2] Verify site loads at https://bodamm.netlify.app in desktop browser
- [x] T016 [P] [US2] Verify site loads correctly on mobile device (iOS or Android)
- [x] T017 [P] [US2] Verify HTTPS certificate is active (lock icon in browser)
- [x] T018 [US2] Verify page load time is under 3 seconds using browser DevTools
- [x] T019 [US2] Update README.md with production URL at repository root

**Checkpoint**: Site is publicly accessible, responsive, and fast

---

## Phase 5: User Story 3 - Build Failure Notification (Priority: P2)

**Goal**: Developer is notified when deployment fails

**Independent Test**: Intentionally break the build and verify notification is received

### Implementation for User Story 3

- [ ] T020 [MANUAL] [US3] Enable email notifications in Netlify → Site settings → Build & deploy → Deploy notifications
- [ ] T021 [US3] Verify GitHub commit status checks are working (already enabled by default)
- [ ] T022 [US3] Test failure notification by temporarily breaking build (e.g., TypeScript error)
- [ ] T023 [US3] Verify email notification received for failed build
- [ ] T024 [US3] Verify GitHub commit shows failed status (✗)
- [ ] T025 [US3] Revert the intentional break and confirm successful deployment

**Checkpoint**: Build failures trigger notifications and show in GitHub status

---

## Phase 6: User Story 4 - Preview Deployments for Pull Requests (Priority: P3)

**Goal**: PRs get unique preview URLs for testing before merge

**Independent Test**: Create a PR and verify a unique preview URL is generated

### Implementation for User Story 4

- [ ] T026 [US4] Create a test branch from main with a minor change
- [ ] T027 [US4] Open a pull request from test branch to main
- [ ] T028 [US4] Verify Netlify creates preview deployment (check PR comments or status)
- [ ] T029 [US4] Access the preview URL and verify it shows the PR changes
- [ ] T030 [US4] Close or merge the PR
- [ ] T031 [US4] Verify preview deployment is cleaned up (URL no longer accessible after some time)

**Checkpoint**: Preview deployments working for all PRs

---

## Phase 7: Polish & Documentation

**Purpose**: Final documentation and verification

- [ ] T032 [P] Update README.md with deployment instructions at repository root
- [ ] T033 [P] Document Netlify dashboard access in specs/002-ci-deployment/quickstart.md
- [ ] T034 Run full verification checklist from quickstart.md:
  - [ ] Site accessible at https://bodamm.netlify.app
  - [ ] HTTPS certificate active
  - [ ] Push to main triggers new deployment
  - [ ] PR creates preview deployment
  - [ ] Failed build shows error in GitHub commit status
- [ ] T035 Commit all documentation changes to repository

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────┐
                                                             │
Phase 2 (Foundational) ──────────────────────────────────────┤
         │                                                   │
         ▼                                                   │
Phase 3 (US1: Auto Deploy) ──► Phase 4 (US2: Accessibility)  │
         │                              │                    │
         │                              ▼                    │
         └──────────────────► Phase 5 (US3: Notifications)   │
                                        │                    │
                                        ▼                    │
                              Phase 6 (US4: Previews)        │
                                        │                    │
                                        ▼                    │
                              Phase 7 (Polish) ◄─────────────┘
```

### User Story Dependencies

| Story               | Depends On             | Can Start After                |
| ------------------- | ---------------------- | ------------------------------ |
| US1 (Auto Deploy)   | Phase 2 (Foundational) | Cloudflare connected to GitHub |
| US2 (Accessibility) | US1                    | Initial deployment complete    |
| US3 (Notifications) | US1                    | Initial deployment complete    |
| US4 (Previews)      | US1                    | Initial deployment complete    |

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel
- **Phase 4**: T016 and T017 can run in parallel (different verification tasks)
- **Phase 7**: T032 and T033 can run in parallel (different files)
- **After US1**: US2, US3, and US4 can proceed in parallel (if desired)

---

## Parallel Example: After Phase 3 (US1)

```bash
# Once US1 is complete, these can run in parallel:

# Developer A: User Story 2 (Accessibility verification)
Task: T014-T019

# Developer B: User Story 3 (Notifications setup)
Task: T020-T025

# Developer C: User Story 4 (Preview deployments)
Task: T026-T031
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (verify local build)
2. Complete Phase 2: Foundational (Cloudflare account + GitHub connection)
3. Complete Phase 3: User Story 1 (automatic deployment)
4. Complete Phase 4: User Story 2 (verify accessibility)
5. **STOP and VALIDATE**: Site is live and auto-deploying
6. Share URL with stakeholders

**MVP Scope**: T001-T019 (19 tasks)

### Full Implementation

1. Complete MVP (Phases 1-4)
2. Add Phase 5: User Story 3 (notifications)
3. Add Phase 6: User Story 4 (preview deployments)
4. Complete Phase 7: Polish & documentation

**Full Scope**: T001-T035 (35 tasks)

### Time Estimate

| Phase                  | Estimated Time  | Notes                           |
| ---------------------- | --------------- | ------------------------------- |
| Phase 1 (Setup)        | 5 minutes       | Local verification              |
| Phase 2 (Foundational) | 10 minutes      | Account creation + GitHub auth  |
| Phase 3 (US1)          | 15 minutes      | Initial deployment + CI/CD test |
| Phase 4 (US2)          | 10 minutes      | Accessibility verification      |
| Phase 5 (US3)          | 15 minutes      | Notification setup + test       |
| Phase 6 (US4)          | 15 minutes      | Preview deployment test         |
| Phase 7 (Polish)       | 10 minutes      | Documentation                   |
| **Total**              | **~80 minutes** | First-time setup                |

---

## Notes

- **[MANUAL]** tasks require action in Netlify dashboard (cannot be scripted)
- Most tasks are verification/configuration, not code changes
- No source code modifications required for this feature
- Netlify auto-detects Astro framework settings
- Free tier is sufficient for all features
- Custom domain setup is out of scope (can be added later)
