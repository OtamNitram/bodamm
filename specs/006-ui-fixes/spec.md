# Feature Specification: UI Fixes — V2 Design Alignment & UX Polish

**Feature Branch**: `006-ui-fixes`  
**Created**: 2026-02-10  
**Status**: Draft  
**Input**: User description: "UI fixes — Spotify button too small, RSVP modal scroll lock, calendar native app integration, button sizing consistency, transport confirmation aesthetics, bank account updates, responsive breakpoints, zona chips mobile"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - RSVP Modal Scroll Lock (Priority: P1)

A user fills out the RSVP form and clicks "Enviar confirmación". The confirmation modal ("Confirmar Asistencia") appears as a full-screen overlay that sits above all other content and prevents background scrolling. The same behavior applies during the "Enviando confirmación..." loading state.

**Why this priority**: The modal currently does not prevent background scrolling, which breaks the UX and makes the modal feel broken. Users may accidentally scroll away from the confirmation dialog. This directly impacts the RSVP completion flow — the most critical user journey on the site.

**Independent Test**: Open the RSVP form, fill in data, click "Enviar confirmación", and verify the background does not scroll while the modal or loading overlay is visible.

**Acceptance Scenarios**:

1. **Given** the user has filled the RSVP form, **When** they click "Enviar confirmación" and the confirmation modal appears, **Then** the page background MUST NOT scroll (body scroll is locked)
2. **Given** the confirmation modal is visible, **When** the modal content itself overflows, **Then** only the modal inner content scrolls, not the page behind it
3. **Given** the user confirms and the "Enviando confirmación..." loading overlay appears, **Then** the page background MUST NOT scroll
4. **Given** either modal or loading overlay is dismissed, **Then** body scroll is restored to normal

---

### User Story 2 - RSVP Success Screen: Button Consistency & Copy (Priority: P1)

After a successful RSVP submission, the user sees the "Confirmación Recibida" screen with two action buttons: "Agregar al calendario" and "Modificar confirmación". Both buttons MUST have consistent sizing and styling that matches the Figma v2 button component. The copy must read "¡Confirmación recibida!" (verify casing/punctuation against Figma v2).

**Why this priority**: This is the immediate post-submission screen. Inconsistent button sizes and incorrect copy undermine the polished feel of the completed RSVP experience.

**Independent Test**: Complete an RSVP flow to reach the success screen and verify both buttons are identically sized and match Figma v2 button specs.

**Acceptance Scenarios**:

1. **Given** the success screen is displayed, **When** comparing "Agregar al calendario" and "Modificar confirmación" buttons, **Then** both MUST have the same height, padding, font-size, and border-radius as defined by the Figma v2 button component (min-h 40px, px 16px, py 8px, rounded 12px, font-size 14px Lato SemiBold)
2. **Given** the success screen, **When** reading the heading, **Then** it MUST display the correct copy matching the Figma v2 design
3. **Given** the success screen, **When** checking all buttons against Figma v2, **Then** "Agregar al calendario" uses the Default filled button variant (dark green bg, linen text) and "Modificar confirmación" uses the Outlined button variant (border dark green, dark green text, transparent bg)

---

### User Story 3 - Spotify Button Size (Priority: P1)

A user viewing the "Temaikenes" section sees the Spotify button. The button MUST match the Figma v2 button component size — currently it renders too small compared to the design.

**Why this priority**: The Spotify button is a key interactive element on the page and its small size makes it hard to tap on mobile and visually inconsistent with other buttons on the site.

**Independent Test**: Compare the Spotify button against the Figma v2 button component specs (node 11:1141) across all breakpoints.

**Acceptance Scenarios**:

1. **Given** a user views the Temaikenes section, **When** looking at the Spotify button, **Then** it MUST have min-height 40px, horizontal padding 16px, vertical padding 8px, border-radius 12px, and font-size 14px (Lato SemiBold) matching the Figma v2 Button component
2. **Given** the Spotify button, **When** checking the Spotify icon, **Then** the icon MUST render at 16px size with the correct Spotify green (#1BD75F)
3. **Given** any viewport (mobile, tablet, desktop), **When** viewing the Spotify button, **Then** it maintains the same proportions and tap target as other site buttons

---

### User Story 4 - Calendar: Native App Integration (Priority: P2)

After confirming RSVP, the user taps "Agregar al calendario". The system SHOULD attempt to open the device's native calendar application to add the event. If the native calendar app cannot be launched (e.g., desktop browser without calendar protocol support), the system falls back to downloading the .ics file.

**Why this priority**: Using the native calendar app provides a more seamless experience on mobile devices, where most users interact. The .ics download fallback ensures all users can still add the event.

**Independent Test**: Tap "Agregar al calendario" on a mobile device and verify it opens the native calendar app. On desktop, verify it downloads the .ics file.

**Acceptance Scenarios**:

1. **Given** a user on a mobile device taps "Agregar al calendario", **When** the device has a native calendar app, **Then** the system attempts to open the calendar app with pre-filled event details (date: April 25, 2026, 20:30; location: Bodega Spinoglio)
2. **Given** a user on desktop clicks "Agregar al calendario", **When** no native calendar protocol is available, **Then** the system downloads the .ics file as it does today
3. **Given** any platform, **When** the native calendar launch fails or is not supported, **Then** the .ics file download occurs as fallback

---

### User Story 5 - Transport Confirmation: Persistent Success & Consistent Aesthetics (Priority: P2)

After a user submits the transport form ("Traslado"), the success confirmation MUST remain visible (not auto-dismiss after 5 seconds) and MUST follow the same visual style as the RSVP confirmation. The user SHOULD be able to go back and re-fill the form if they want to update their data.

**Why this priority**: The current auto-dismiss after 5 seconds is confusing — users may miss the confirmation. Matching the RSVP confirmation aesthetics provides visual consistency across the site.

**Independent Test**: Submit the traslado form and verify the success message persists until the user explicitly dismisses it, and that it visually matches the RSVP success screen style.

**Acceptance Scenarios**:

1. **Given** the user submits the traslado form, **When** the submission succeeds, **Then** the success confirmation MUST remain visible indefinitely (no auto-dismiss timer)
2. **Given** the success confirmation is visible, **When** the user wants to update their data, **Then** a button allows them to return to the form and re-fill it
3. **Given** the traslado success confirmation, **When** comparing to the RSVP success confirmation, **Then** both MUST share the same visual language: similar card style, checkmark icon, heading typography (Dancing Script bold), body text style, and button variants

---

### User Story 6 - Bank Account Numbers Update (Priority: P1)

The Gift List "Cuentas" card displays bank account numbers. These MUST be updated to the correct values.

**Why this priority**: Incorrect bank accounts mean guests cannot transfer gifts. This is a data correctness issue with direct financial impact.

**Independent Test**: View the Gift List section and verify the displayed account numbers match the provided values.

**Acceptance Scenarios**:

1. **Given** a user views the Gift List section, **When** reading the "Cuentas" card, **Then** the UYU account number MUST display `0062001200748170`
2. **Given** a user views the "Cuentas" card, **When** reading the USD account, **Then** the USD account number MUST display `0062005200888865`

---

### User Story 7 - Responsive Breakpoint Verification (Priority: P2)

The site MUST render correctly at all three Figma breakpoints: Desktop/Web (1200px), Tablet (800px), and Mobile (375px). All sections, buttons, typography, and spacing must match the corresponding Figma frames.

**Why this priority**: Breakpoint issues affect all users who access the site on devices other than desktop. The site's audience likely skews mobile.

**Independent Test**: Resize browser to each breakpoint (375px, 800px, 1200px) and compare each section against the corresponding Figma frame.

**Acceptance Scenarios**:

1. **Given** a viewport of 375px width, **When** viewing all sections, **Then** layout, spacing, typography, and components match the Figma Home Mobile frame (11:1017)
2. **Given** a viewport of 800px width, **When** viewing all sections, **Then** layout matches the Figma Home Tablet frame (11:1176)
3. **Given** a viewport of 1200px width, **When** viewing all sections, **Then** layout matches the Figma Home Web frame (10:197)
4. **Given** breakpoint transitions, **When** resizing between 375px–800px–1200px, **Then** no layout breaks, overlapping elements, or content overflow occurs

---

### User Story 8 - Transport Zone Chips: Mobile Snapping (Priority: P2)

On mobile, the "¿De qué zona salís?" chips (Montevideo, Costa de Oro, Otro) MUST be displayed in a snapped/inline layout so they remain easily tappable and visually grouped. They should not wrap awkwardly or have excessive spacing on small screens.

**Why this priority**: The transport form is a key optional feature and the zone selection is the first interaction. Poor chip layout on mobile discourages completion.

**Independent Test**: View the traslado form on a mobile viewport (375px) and verify the zone chips are tightly grouped, inline, and easy to tap.

**Acceptance Scenarios**:

1. **Given** a mobile user (viewport ≤ 375px) views the traslado form, **When** looking at the zone chips, **Then** all three chips are visible in a single row as a flush segmented control (1-2px gap max, no wrapping)
2. **Given** mobile viewport, **When** tapping zone chips, **Then** each chip has a minimum touch target of 44px height
3. **Given** the zone chips, **When** comparing to the rest of the form's mobile layout, **Then** chips align with the form's horizontal margins (16px safe-margin)

---

### Edge Cases

- What happens when the user has a very long list of group members in the RSVP confirmation modal — does scroll lock still work correctly?
- How does the calendar native app integration behave on browsers that partially support the webcal:// protocol?
- What happens if the native calendar app opens but the user cancels — is there a way to fall back to .ics?
- How do the zone chips render on very narrow screens (< 320px)?
- What if the transport form success state is visible and the user navigates away and back?

## Requirements _(mandatory)_

### Functional Requirements

**RSVP Modal & Overlays**

- **FR-001**: The confirmation modal ("Confirmar Asistencia") MUST lock body scroll when visible
- **FR-002**: The "Enviando confirmación..." loading overlay MUST lock body scroll when visible
- **FR-003**: Body scroll MUST be restored when modal/overlay is dismissed or closed
- **FR-004**: Modal inner content MUST still be scrollable when its content overflows the viewport

**RSVP Success Screen**

- **FR-005**: "Agregar al calendario" button MUST use the Figma v2 Default button variant (filled, dark green bg, linen text, min-h 40px, px 16px, rounded 12px, 14px Lato SemiBold)
- **FR-006**: "Modificar confirmación" button MUST use the Figma v2 Outlined button variant (border dark green, dark green text, transparent bg, same sizing as FR-005)
- **FR-007**: Both buttons MUST have identical outer dimensions (same height, horizontal padding, and border-radius)
- **FR-008**: The success heading copy MUST match the Figma v2 design exactly

**Spotify Button**

- **FR-009**: The Spotify button MUST match the Figma v2 Button component (node 11:1141): min-height 40px, px 16px, py 8px, rounded 12px, font-size 14px Lato SemiBold, dark green bg, linen text
- **FR-010**: The Spotify icon within the button MUST render at 16px with color #1BD75F

**Calendar Integration**

- **FR-011**: "Agregar al calendario" MUST serve the .ics file with the correct MIME type (`text/calendar`) so that mobile devices open the native calendar app automatically
- **FR-012**: On desktop browsers where the .ics file downloads as a file rather than opening a calendar app, this is acceptable behavior (no additional fallback needed)
- **FR-013**: Event data MUST include: title "Casamiento Martín & Mariana", date April 25 2026 20:30, end April 26 2026 04:00, location "Bodega Spinoglio"

**Transport Confirmation**

- **FR-014**: Transport form success message MUST NOT auto-dismiss (remove the 5-second timeout)
- **FR-015**: Transport success screen MUST include a button to return to the form for re-submission (re-submission appends a new row; no overwrite logic needed)
- **FR-016**: Transport success screen visual style MUST match the RSVP success screen aesthetics (card style, checkmark icon, Dancing Script heading, consistent button variants)

**Bank Accounts**

- **FR-017**: Gift List "Cuentas" card UYU account MUST display `0062001200748170`
- **FR-018**: Gift List "Cuentas" card USD account MUST display `0062005200888865`

**Responsive Breakpoints**

- **FR-019**: All sections MUST match Figma at Mobile (375px), Tablet (800px), and Desktop (1200px) breakpoints
- **FR-020**: No layout breaks, content overflow, or element overlapping at any viewport between 320px and 1440px

**Zone Chips (Mobile)**

- **FR-021**: Zone chips MUST display as a flush/tight segmented control group on mobile (1-2px gap max), forming a unified button-group appearance
- **FR-022**: Zone chips MUST maintain a minimum touch target of 44px height on mobile

### Key Entities

- **Button Component Variants**: Default (filled dark green), Hover (filled eucalyptus), Outlined (border dark green, transparent bg), Outlined Hover (border dark green, light eucalyptus bg) — all sharing min-h 40px, px 16px, rounded 12px, 14px Lato SemiBold
- **Modal/Overlay States**: confirming (confirmation modal), submitting (loading overlay) — both require body scroll lock
- **Calendar Event**: Title, date/time, end date/time, location, description — used for both native calendar and .ics fallback
- **Bank Accounts**: UYU and USD account numbers displayed in the Gift List section

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Background page does not scroll when RSVP confirmation modal or loading overlay is visible (verified on mobile and desktop)
- **SC-002**: "Agregar al calendario" and "Modificar confirmación" buttons have identical rendered height and width proportions on the success screen
- **SC-003**: Spotify button rendered dimensions match the Figma v2 Button component spec (min-h 40px) on all breakpoints
- **SC-004**: On mobile devices with native calendar support, tapping "Agregar al calendario" opens the calendar app with correct event data
- **SC-005**: Transport success message remains visible until user explicitly taps "back" or re-fill button (no auto-dismiss)
- **SC-006**: Transport success screen passes visual comparison with RSVP success screen for layout consistency
- **SC-007**: Bank account numbers on the site match the provided values exactly: UYU `0062001200748170`, USD `0062005200888865`
- **SC-008**: Site passes visual regression at 375px, 800px, and 1200px viewports against corresponding Figma frames
- **SC-009**: Zone chips on mobile (375px) are all visible and tappable without awkward wrapping or overflow
- **SC-010**: All buttons across the site match their corresponding Figma v2 button variant in size, color, and typography

## Clarifications

### Session 2026-02-10

- Q: What calendar native app strategy should be used? → A: Keep .ics approach with correct MIME type — this already opens the native calendar on most mobile devices. No need for Google Calendar deep links or platform detection.
- Q: When a user re-submits the transport form, should it overwrite or append? → A: Append-only (new row). Duplicates are acceptable; no backend matching logic needed.
- Q: What does "magnetized" (imantados) mean for zone chips on mobile? → A: Flush/tight group with 1-2px gap max, forming a unified segmented control look (not spaced-out pills).

## Assumptions

- Figma file `qwrm6VDQhaEODfbkZfQ6Kk` is the source of truth for all visual specs
- The Figma v2 Button component (nodes 11:623, 11:576, 11:624) defines the canonical button sizing: min-h 40px, px 16px, py 8px, rounded 12px, 14px Lato SemiBold
- Mobile breakpoint < 768px, Tablet ≥ 768px, Desktop ≥ 1024px (as per existing constitution)
- Native calendar integration relies on the .ics file with correct `text/calendar` MIME type; on mobile devices this natively opens the calendar app; no additional URL schemes or deep links are needed
- The bank name for both UYU and USD accounts remains as currently displayed (verify whether "Bco. Santander" is still correct or should be updated to match the new account numbers)
- The 003-ui-bugfixes spec has already been implemented — this spec addresses issues found after that implementation
