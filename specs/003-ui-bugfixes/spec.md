# Feature Specification: UI Bugfixes - Design System Alignment

**Feature Branch**: `003-ui-bugfixes`  
**Created**: 2026-01-30  
**Status**: Draft  
**Input**: Fix UI bugfixes found across mobile, tablet, and desktop views to align implementation with Figma design system specifications.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Mobile Hero Section Display (Priority: P1)

A mobile user visits the wedding website and sees the "Save the Date" hero section with properly centered imagery and correctly positioned text overlay.

**Why this priority**: The hero section is the first impression for all visitors. Most wedding guests will access via mobile devices, making this critical for user experience.

**Independent Test**: Open the site on a mobile viewport (375px width) and verify the hero image is centered, "Save the Date" text is positioned at the top using absolute positioning.

**Acceptance Scenarios**:

1. **Given** a user on a mobile device (viewport < 768px), **When** they load the homepage, **Then** the hero image is horizontally centered within its container
2. **Given** a user on a mobile device, **When** they view the Save the Date section, **Then** the "Save the Date" text is positioned at the top of the section using absolute positioning
3. **Given** a user on a mobile device, **When** they view the Save the Date section, **Then** all text content is readable and properly reviewed/corrected

---

### User Story 2 - Responsive Spacing System (Priority: P1)

Users on any device experience consistent spacing that follows the Figma design system margins table.

**Why this priority**: Spacing consistency affects every section of the site and directly impacts visual polish and professionalism.

**Independent Test**: Measure safe-margins at mobile (16px) and web (48px) breakpoints across multiple sections.

**Acceptance Scenarios**:

1. **Given** a user on mobile (< 768px), **When** viewing any section, **Then** safe-margins are 16px
2. **Given** a user on tablet/desktop (≥ 768px), **When** viewing any section, **Then** safe-margins are 48px
3. **Given** any breakpoint, **When** viewing spacing between sections, **Then** spacing follows the design system values (XL: 56px mobile/96px web, L: 40px mobile/48px web, M: 32px, S: 24px, XS: 16px)

---

### User Story 3 - Navigation Bar Layout (Priority: P1)

Users see a properly aligned navigation bar with the logo and hamburger menu at screen extremes, and date text filling available space with left alignment.

**Why this priority**: Navigation is visible on every page and affects overall site usability.

**Independent Test**: View navbar on mobile and verify logo hugs left edge, hamburger hugs right edge, and date fills remaining space with left alignment.

**Acceptance Scenarios**:

1. **Given** a user on any device, **When** viewing the navigation bar, **Then** the logo is positioned against the left edge (respecting safe-margin)
2. **Given** a user on mobile, **When** viewing the navigation bar, **Then** the hamburger menu is positioned against the right edge (respecting safe-margin)
3. **Given** a user on any device, **When** viewing the navigation bar, **Then** the date text fills the available space between logo and hamburger, aligned to the left

---

### User Story 4 - Mobile Menu Styling (Priority: P2)

Users opening the mobile menu see a properly styled overlay with correct colors, adequate touch targets, and consistent iconography.

**Why this priority**: Menu usability on mobile is essential for navigation but is secondary to content display issues.

**Independent Test**: Open mobile menu and verify background color, item spacing (48px minimum), close icon color matches other icons, and scroll behavior.

**Acceptance Scenarios**:

1. **Given** a user opens the mobile menu, **When** the menu is displayed, **Then** the background color matches the Figma design (not the current incorrect color)
2. **Given** a user views menu items, **When** checking spacing, **Then** each menu item has at least 48px height for adequate touch targets
3. **Given** a user sees the close (X) icon, **When** comparing to other icons, **Then** the close icon color matches the rest of the UI (not green)
4. **Given** a user scrolls the page with menu open, **When** scrolling occurs, **Then** the navigation bar maintains its correct color (does not become light/transparent)

---

### User Story 5 - Gift List Section Text (Priority: P2)

Users viewing the gift list section see properly formatted text that flows naturally without manual line breaks.

**Why this priority**: Text formatting affects readability but is a contained issue in one section.

**Independent Test**: View gift list section on desktop and verify text stays on one line (or flows naturally) with max-width constraint of 800px.

**Acceptance Scenarios**:

1. **Given** a user on desktop, **When** viewing the gift list section, **Then** the descriptive text container has a max-width of 800px
2. **Given** the max-width constraint, **When** text flows, **Then** it wraps naturally without hardcoded line breaks
3. **Given** any breakpoint, **When** viewing the text, **Then** it remains readable and properly formatted

---

### User Story 6 - Asset Quality (Priority: P2)

Users see high-quality icons and images throughout the site, particularly the Spotify logo.

**Why this priority**: Visual quality affects perceived professionalism but is a quick fix.

**Independent Test**: Inspect Spotify logo and verify it's an SVG (or high-resolution image) without pixelation.

**Acceptance Scenarios**:

1. **Given** a user views the Spotify integration section, **When** looking at the Spotify logo, **Then** the logo is crisp and clear (SVG format from Figma)
2. **Given** any zoom level, **When** viewing the Spotify logo, **Then** no pixelation or quality degradation is visible

---

### User Story 7 - WhatsApp Button Consistency (Priority: P2)

Users see consistently sized WhatsApp contact buttons that match the Figma design specifications.

**Why this priority**: Button consistency affects visual polish and usability in the contact section.

**Independent Test**: Compare both WhatsApp buttons side by side and verify identical sizing, colors per Figma.

**Acceptance Scenarios**:

1. **Given** a user views the WhatsApp contact buttons, **When** comparing button sizes, **Then** both buttons have identical dimensions
2. **Given** a user views the WhatsApp buttons, **When** checking colors, **Then** colors match the Figma design exactly

---

### User Story 8 - Section Spacing Corrections (Priority: P2)

Users experience appropriate visual separation between sections, particularly between the photo QR section and attendance confirmation.

**Why this priority**: Excessive spacing creates awkward visual gaps that affect overall page flow.

**Independent Test**: Measure spacing between QR photo section and attendance confirmation section, compare to design system values.

**Acceptance Scenarios**:

1. **Given** a user scrolls through the page, **When** passing from photo QR section to attendance confirmation, **Then** spacing follows the design system specification (not excessively large)
2. **Given** any viewport, **When** reviewing section transitions, **Then** all section spacing is consistent with the design system

---

### User Story 9 - Typography Updates (Priority: P2)

Users see improved heading legibility with bold weight and proper letter spacing.

**Why this priority**: Typography affects readability across all headings but is a systematic change.

**Independent Test**: Inspect H1 and H2 elements to verify font-weight is bold and letter-spacing is 2%.

**Acceptance Scenarios**:

1. **Given** any H1 heading, **When** inspecting styles, **Then** font-weight is bold
2. **Given** any H2 heading, **When** inspecting styles, **Then** font-weight is bold
3. **Given** any H1 or H2 heading, **When** inspecting styles, **Then** letter-spacing is 2%

---

### User Story 10 - Footer Design Updates (Priority: P3)

Users see a footer that reflects the latest Figma design updates.

**Why this priority**: Footer is at the bottom of the page and seen after main content, making it lower priority.

**Independent Test**: Compare implemented footer with current Figma design and verify all elements match.

**Acceptance Scenarios**:

1. **Given** a user scrolls to the footer, **When** viewing the footer, **Then** all visual elements match the current Figma design
2. **Given** the footer Figma design has changed, **When** comparing to implementation, **Then** all changes are reflected in the implementation

---

### Edge Cases

- What happens when text content in the Save the Date section is longer than expected?
- How does the navigation bar behave at the exact breakpoint boundaries (767px vs 768px)?
- What happens when menu items exceed the viewport height on very small screens?
- How do WhatsApp buttons handle very long contact names?

## Requirements _(mandatory)_

### Functional Requirements

**Hero Section (Mobile)**

- **FR-001**: Hero image MUST be horizontally centered within its container on mobile viewports
- **FR-002**: "Save the Date" text MUST use absolute positioning to appear at the top of the hero section
- **FR-003**: All text content in Save the Date section MUST be reviewed and corrected

**Spacing System**

- **FR-004**: Safe-margins MUST be 16px on mobile (< 768px) and 48px on tablet/desktop (≥ 768px)
- **FR-005**: Spacing values MUST follow the design system: XL (56/96px), L (40/48px), M (32px), S (24px), XS (16px)
- **FR-006**: Spacing between QR photos section and attendance confirmation MUST be reduced to match design system

**Navigation**

- **FR-007**: Logo MUST be positioned at the left edge of the navbar (respecting safe-margin)
- **FR-008**: Hamburger menu MUST be positioned at the right edge of the navbar (respecting safe-margin)
- **FR-009**: Date text MUST fill remaining space with left alignment

**Mobile Menu**

- **FR-010**: Mobile menu background color MUST match Figma design specification
- **FR-011**: Menu items MUST have minimum 48px height for touch accessibility
- **FR-012**: Close (X) icon MUST use the same color as other UI icons (not green)
- **FR-013**: Navigation bar MUST maintain correct color when user scrolls (not become light/transparent)

**Content Sections**

- **FR-014**: Gift list text container MUST have max-width of 800px on desktop
- **FR-015**: Gift list text MUST NOT have manual/hardcoded line breaks

**Assets**

- **FR-016**: Spotify logo MUST be replaced with SVG version from Figma
- **FR-017**: WhatsApp buttons MUST have identical dimensions
- **FR-018**: WhatsApp button colors MUST match Figma design

**Typography**

- **FR-019**: H1 headings MUST use bold font-weight
- **FR-020**: H2 headings MUST use bold font-weight
- **FR-021**: H1 and H2 headings MUST have 2% letter-spacing

**Footer**

- **FR-022**: Footer H2 heading MUST use bold font-weight (700)
- **FR-023**: Footer H2 heading MUST have 2% letter-spacing (1.12px at 56px size)
- **FR-024**: Footer body text MUST include second line "(sí, en la foto teníamos 20 años)"

### Key Entities

- **Design System Margins**: Spacing tokens used across all breakpoints (Safe-Margins, XL, L, M, S, XS with mobile/web variants)
- **Typography Scale**: Font size definitions for H1-H4, P, and Button text with mobile/web variants
- **Breakpoints**: Mobile (< 768px), Tablet/Desktop (≥ 768px)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of spacing values match the Figma design system margins table
- **SC-002**: All touch targets in mobile menu are at least 48px for accessibility compliance
- **SC-003**: Hero section visual elements match Figma design on mobile viewport (375px)
- **SC-004**: Spotify logo renders crisply at 2x resolution without pixelation
- **SC-005**: WhatsApp buttons are visually identical in size when displayed side by side
- **SC-006**: H1 and H2 headings pass visual inspection for bold weight and 2% letter-spacing
- **SC-007**: Footer implementation matches current Figma design with no visual discrepancies
- **SC-008**: Navigation bar maintains consistent color during scroll (no transparency changes)
- **SC-009**: Mobile menu close icon color matches other icons in the UI

## Clarifications

### Session 2026-01-30

- Q: What specific footer changes need to be implemented from Figma? → A: Three changes identified from Figma comparison: (1) H2 heading must be bold (font-weight 700), not normal; (2) H2 must have 2% letter-spacing (1.12px at 56px); (3) Body text missing second line "(sí, en la foto teníamos 20 años)"

- Q: What are the correct Figma design system values? → A: Extracted from Figma variables:
  - **Colors**: Dark Green #0A3428, Eucalyptus #106552, Burgundy #640405, Linen #F9F2E8, Terracotta #C6572A, Navy Blue #2A3354
  - **Typography**: H1/H2 use Dancing Script Bold (700) with 2% letter-spacing; H3/H4/Button use Lato SemiBold (600)
  - **Spacing (Web)**: Safe-Margins 48px, XL 96px, L 48px, M 32px, S 24px, XS 16px
  - **Spacing (Mobile)**: Safe-Margins 16px, XL 56px, L 40px, M 32px, S 24px, XS 16px

- Q: Mobile menu close icon color? → A: Must use brand-linen (#F9F2E8) to match other UI elements, NOT green

## Assumptions

- Figma design is the source of truth for all visual specifications
- "Mobile" breakpoint is defined as viewport width < 768px
- "Tablet/Desktop" breakpoint is defined as viewport width ≥ 768px
- The existing codebase uses a responsive design approach
- SVG assets are available in Figma for export
- Footer Figma changes are already finalized and ready for implementation
