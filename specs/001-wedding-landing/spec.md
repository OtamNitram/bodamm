# Feature Specification: Wedding Landing Page (V1 Static)

**Feature Branch**: `001-wedding-landing`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Spec 001 — Wedding Landing (V1 estática) basada en Figma, sin RSVP real"

## Constitution Check

This specification adheres to the project constitution:

- ✅ **Figma Source of Truth**: All visual design decisions reference Figma file (qwrm6VDQhaEODfbkZfQ6Kk) with specific node IDs
- ✅ **Static-First Performance**: Specifies static site with minimal JavaScript
- ✅ **RSVP UX Simplicity**: V1 uses placeholder RSVP with clear fallback to WhatsApp/Telegram. Real RSVP with Google Sheets integration (per constitution) deferred to V2 per Scope Discipline principle VI.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Wedding Information (Priority: P1)

A guest receives the wedding website link and wants to learn essential details about the event: date, time, location, dress code, and how to get there.

**Why this priority**: This is the core value proposition of the landing page. Without this, the site has no purpose. Every guest needs this information.

**Independent Test**: Can be fully tested by navigating to the home page and verifying all sections (Hero, Detalles, Gift List, Fotos & Temaikenes, Asistencia, Gracias) are visible and match Figma designs across web/tablet/mobile viewports.

**Acceptance Scenarios**:

1. **Given** a guest visits the home page on desktop, **When** they scroll through the page, **Then** they see Hero, Detalles (Cuándo/Dónde/Dress Code), Gift List, Fotos & Temaikenes, Asistencia, and Gracias sections matching Figma node 10:197
2. **Given** a guest visits on tablet, **When** they view the page, **Then** layout adapts to match Figma node 11:1176
3. **Given** a guest visits on mobile, **When** they view the page, **Then** layout adapts to match Figma node 11:1017
4. **Given** a guest views the Detalles section, **When** they look for location information, **Then** they see a map (embedded or placeholder) matching Figma design

---

### User Story 2 - Navigate Between Sections (Priority: P1)

A guest wants to quickly jump to specific information (e.g., location, gift list, RSVP) without scrolling through the entire page.

**Why this priority**: Essential for usability. Guests need efficient access to specific information, especially on mobile devices where scrolling is tedious.

**Independent Test**: Can be fully tested by clicking each navigation link and verifying smooth scroll to the correct section anchor, plus testing "Volver al inicio" returns to top.

**Acceptance Scenarios**:

1. **Given** a guest is on the home page, **When** they click "Detalles" in the navigation, **Then** the page scrolls to the Detalles section
2. **Given** a guest is viewing the Gift List section, **When** they click "Volver al inicio", **Then** the page scrolls to the Hero/top
3. **Given** a guest clicks any navigation item, **When** the scroll completes, **Then** the correct section is visible in the viewport
4. **Given** a guest is on mobile, **When** they use the navigation, **Then** navigation functions identically to desktop

---

### User Story 3 - Access Spotify Playlist (Priority: P2)

A guest wants to view the wedding playlist and potentially add song suggestions.

**Why this priority**: Enhances guest engagement and allows them to participate in the celebration planning. Not critical for core information delivery but adds value.

**Independent Test**: Can be fully tested by clicking the Spotify button/link in the Fotos & Temaikenes section and verifying it opens the canonical playlist URL in a new tab.

**Acceptance Scenarios**:

1. **Given** a guest is viewing the Fotos & Temaikenes section, **When** they click the Spotify button/link, **Then** the Spotify playlist (https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5) opens in a new tab
2. **Given** a guest cannot scan the QR code, **When** they look for an alternative, **Then** they see a clickable "este link" text that opens the same playlist
3. **Given** a guest views the Spotify integration, **When** they examine the visual design, **Then** it matches the Figma design exactly

---

### User Story 4 - Contact via WhatsApp/Telegram (Priority: P2)

A guest prefers to confirm attendance or ask questions via direct messaging rather than using a form.

**Why this priority**: Provides essential fallback for guests who don't want to use web forms or QR codes. Critical for accessibility and user preference accommodation.

**Independent Test**: Can be fully tested by clicking WhatsApp and Telegram buttons in the Asistencia section and verifying they open the correct messaging apps with pre-configured contact information.

**Acceptance Scenarios**:

1. **Given** a guest is viewing the Asistencia section, **When** they click the WhatsApp button, **Then** WhatsApp opens with the configured contact
2. **Given** a guest is viewing the Asistencia section, **When** they click the Telegram button, **Then** Telegram opens with the configured contact
3. **Given** a guest clicks a contact button on mobile, **When** the app opens, **Then** they can immediately start a conversation
4. **Given** contact URLs are updated in configuration, **When** the site is rebuilt, **Then** buttons reflect the new URLs without code changes

---

### User Story 5 - Attempt RSVP (Priority: P3)

A guest wants to formally confirm their attendance through the website.

**Why this priority**: In V1, this is a placeholder only. The real RSVP functionality is deferred to a future spec. This story ensures the placeholder is clear and provides appropriate fallback.

**Independent Test**: Can be fully tested by navigating to /rsvp and verifying the placeholder message is clear and provides WhatsApp/Telegram CTAs.

**Acceptance Scenarios**:

1. **Given** a guest clicks the RSVP QR code or link, **When** they land on /rsvp, **Then** they see a clear "próximamente" message
2. **Given** a guest is on /rsvp, **When** they look for alternatives, **Then** they see prominent WhatsApp/Telegram CTAs
3. **Given** a guest tries to submit RSVP data, **When** they interact with the page, **Then** no data is persisted or sent (dummy only)
4. **Given** a guest views /rsvp, **When** they examine the design, **Then** it maintains visual consistency with the rest of the site

---

### Edge Cases

- **What happens when a guest visits on a very small mobile device (<320px)?** Layout should gracefully adapt using responsive design principles, maintaining readability even if some spacing is compressed.
- **What happens when the Spotify playlist link is broken or the playlist is deleted?** The link should still be clickable but will lead to a Spotify error page. This is acceptable for V1 as it's an external dependency.
- **What happens when a guest has JavaScript disabled?** All core content and navigation must still work since the site is primarily static HTML. Only the mobile menu toggle (if implemented with JS) might be affected.
- **What happens when Figma assets fail to load?** Assets are extracted and served locally, so this should not occur. If an asset is missing during build, the build should fail with a clear error.
- **What happens when a guest tries to access /rsvp before it's ready?** They see the placeholder page with clear messaging and fallback options.
- **What happens when contact URLs (WhatsApp/Telegram) are not yet configured?** Buttons should still render but may link to placeholder URLs. Configuration should be validated during build.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Site MUST render all home page sections (Hero, Detalles, Gift List, Fotos & Temaikenes, Asistencia, Gracias) matching Figma designs for web (node 10:197), tablet (node 11:1176), and mobile (node 11:1017) viewports
- **FR-002**: Navigation MUST provide anchor links to each major section (Detalles, Gift List, Fotos & Temaikenes, Asistencia) that scroll to the correct position
- **FR-003**: Navigation MUST include a "Volver al inicio" link that scrolls to the top of the page
- **FR-004**: Spotify integration MUST provide a clickable button/link that opens the canonical playlist URL (https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5) in a new tab
- **FR-005**: Fotos & Temaikenes section MUST display a QR code for the Spotify playlist and provide an alternative "este link" clickable text
- **FR-006**: Detalles section MUST include a map component (embedded iframe or placeholder) matching the Figma design layout
- **FR-007**: Asistencia section MUST provide clickable WhatsApp and Telegram buttons that open the respective messaging apps with pre-configured contact information
- **FR-008**: Asistencia section MUST display a QR code and/or link that directs to /rsvp
- **FR-009**: Route /rsvp MUST exist and display a placeholder page with "próximamente" messaging and prominent WhatsApp/Telegram CTAs
- **FR-010**: /rsvp page MUST NOT persist or transmit any user data (dummy implementation only)
- **FR-011**: All images and icons used in the UI MUST be extracted from Figma and served as local assets (no hotlinking to Figma URLs)
- **FR-012**: External links (Spotify, WhatsApp, Telegram, photo link alternative) MUST be defined in a centralized configuration file, not hardcoded in components
- **FR-013**: Site MUST be deployable as static HTML/CSS/JS without requiring a backend server or database
- **FR-014**: Any visual deviation from Figma designs MUST be documented as an exception with justification
- **FR-015**: Site MUST use minimal JavaScript, loading JS only for essential interactions (e.g., mobile menu toggle if needed, RSVP form placeholder)

### Key Entities

- **Page Sections**: Discrete content blocks (Hero, Detalles, Gift List, Fotos & Temaikenes, Asistencia, Gracias) that can be navigated to via anchors
- **External Links**: Configurable URLs for Spotify playlist, WhatsApp contact, Telegram contact, and alternative photo link
- **Design Assets**: Images, icons, and visual elements extracted from Figma and served locally
- **Navigation Items**: Links that map to section anchors or external URLs
- **RSVP Placeholder**: A dummy page that communicates future functionality without actual data handling

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A guest can view all essential wedding information (date, time, location, dress code) within 10 seconds of landing on the home page
- **SC-002**: Navigation links successfully scroll to the correct section within 1 second on all devices (web/tablet/mobile)
- **SC-003**: 100% of visual elements match Figma designs when compared side-by-side in the same viewport size (allowing for browser rendering differences in sub-pixel precision)
- **SC-004**: Spotify playlist link successfully opens the correct playlist in 100% of test cases across major browsers (Chrome, Safari, Firefox, Edge)
- **SC-005**: WhatsApp and Telegram buttons successfully open the respective apps with pre-configured contact information in 100% of test cases on mobile devices
- **SC-006**: Site loads with First Contentful Paint (FCP) under 1.5 seconds on a 3G connection
- **SC-007**: Site achieves a Lighthouse performance score of 90+ on mobile and 95+ on desktop
- **SC-008**: Zero images or assets are hotlinked from Figma URLs (verified by checking network requests)
- **SC-009**: External link URLs can be updated in a single configuration file and reflected across the entire site without code changes
- **SC-010**: /rsvp page clearly communicates "próximamente" status and provides working WhatsApp/Telegram fallback CTAs in 100% of user tests

### Assumptions

- Figma file (qwrm6VDQhaEODfbkZfQ6Kk) remains accessible for asset extraction during development
- Spotify playlist URL remains valid and accessible
- Final WhatsApp and Telegram contact URLs will be provided before deployment (placeholders acceptable during development)
- Map embed URL or placeholder approach will be confirmed during planning phase
- Alternative photo link URL will be provided before deployment (placeholder acceptable during development)
- Target browsers include modern versions of Chrome, Safari, Firefox, and Edge (no IE11 support required)
- Guests are expected to have basic internet connectivity (3G or better)

### Dependencies

- Figma design file access for asset extraction
- Spotify playlist must be publicly accessible
- WhatsApp and Telegram contact information must be provided
- Hosting platform for static site deployment (to be determined during planning)

### Out of Scope (Explicit Non-Goals)

- Real RSVP functionality with data persistence (deferred to future spec)
- Integration with Google Sheets or backend services
- Photo upload/gallery functionality
- Admin panel or content management system
- User authentication or login
- Progressive Web App (PWA) features
- Analytics or tracking (no trackers in V1 per constitution)
- Email notifications
- Calendar integration (.ics file generation)
- Multi-language support (assuming single language for V1)
