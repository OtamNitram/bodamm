# Research: UI Bugfixes - Design System Alignment

**Feature**: 003-ui-bugfixes  
**Date**: 2026-01-30  
**Status**: Complete

## Overview

This research documents the Figma design system values needed to implement the UI bugfixes. All values were extracted directly from the Figma file using the MCP Figma tools.

## Design System Values

### Colors (from Figma Variables)

| Token | Hex Value | Tailwind Class |
|-------|-----------|----------------|
| Dark Green | #0A3428 | `brand-darkGreen` |
| Eucalyptus | #106552 | `brand-eucalyptus` |
| Burgundy | #640405 | `brand-burgundy` |
| Linen | #F9F2E8 | `brand-linen` |
| Terracotta | #C6572A | `brand-terracotta` |
| Navy Blue | #2A3354 | `brand-navy` |

### Spacing System (from Figma Variables)

| Token | Web (≥768px) | Mobile (<768px) |
|-------|--------------|-----------------|
| Safe-Margins | 48px | 16px |
| XL | 96px | 56px |
| L | 48px | 40px |
| M | 32px | 32px |
| S | 24px | 24px |
| XS | 16px | 16px |

### Typography (from Figma Variables)

| Element | Font Family | Weight | Letter Spacing |
|---------|-------------|--------|----------------|
| H1 | Dancing Script | Bold (700) | 2% |
| H2 | Dancing Script | Bold (700) | 2% |
| H3 | Lato | SemiBold (600) | 0 |
| H4 | Lato | SemiBold (600) | 0 |
| P | Lato | Regular (400) | 0 |
| Button | Lato | SemiBold (600) | 0 |

### Typography Sizes

| Element | Web | Mobile |
|---------|-----|--------|
| H1 | 60px | 48px |
| H2 | 56px | 36px |
| H3 | 28px | 24px |
| H4 | 20px | 18px |
| P | 18px | 16px |
| Button | 14px | 14px |

## Component-Specific Research

### 1. Hero Section (Mobile)

**Decision**: Use absolute positioning for "Save the Date" text  
**Rationale**: Figma shows text overlay at top of hero section with absolute positioning  
**Implementation**: `position: absolute; top: [value from Figma]`

### 2. Navigation Bar Layout

**Decision**: Flexbox with `justify-between` for logo/hamburger, flex-grow for date  
**Rationale**: Logo and hamburger at edges, date fills remaining space  
**Implementation**:
```css
/* Container */
display: flex;
justify-content: space-between;
padding: 0 16px; /* mobile safe-margin */

/* Date text */
flex-grow: 1;
text-align: left;
```

### 3. Mobile Menu Styling

**Decision**: Background color matches nav (burgundy), 48px min-height for items  
**Rationale**: Figma shows consistent burgundy background, WCAG touch target guidelines  
**Implementation**:
```css
/* Menu background */
background-color: #640405; /* brand-burgundy */

/* Menu items */
min-height: 48px;
display: flex;
align-items: center;

/* Close icon */
color: #F9F2E8; /* brand-linen, NOT green */
```

### 4. Gift List Text

**Decision**: max-width: 800px on desktop, remove hardcoded line breaks  
**Rationale**: Figma shows constrained width for readability, natural text flow  
**Implementation**: `max-width: 800px; margin: 0 auto;`

### 5. WhatsApp Buttons

**Decision**: Both buttons use identical sizing from Figma  
**Rationale**: Visual consistency per Figma design  
**Implementation**: Use shared Button component with consistent props

### 6. Spotify Logo

**Decision**: Replace with SVG from Figma export  
**Rationale**: Current PNG is pixelated; SVG scales infinitely  
**Source**: Export from Figma node containing Spotify icon

### 7. Footer (Gracias) Updates

**Decision**: Three changes needed  
**Rationale**: Comparison with Figma node 11:762 revealed discrepancies

| Change | Current | Figma |
|--------|---------|-------|
| H2 font-weight | normal | **bold (700)** |
| H2 letter-spacing | 0 | **2% (1.12px)** |
| Body text | 1 line | **2 lines** (missing "(sí, en la foto teníamos 20 años)") |

## Alternatives Considered

### Spacing Approach

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| CSS custom properties | Central management | Extra abstraction | ❌ Rejected |
| Tailwind spacing tokens | Matches existing setup | Config changes | ✅ Selected |
| Inline values | Quick to implement | Hard to maintain | ❌ Rejected |

**Rationale**: Project already uses Tailwind with brand tokens. Adding spacing tokens maintains consistency.

### Typography Approach

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Global CSS overrides | Single location | May conflict | ✅ Selected |
| Component-level styles | Explicit | Repetitive | ❌ Rejected |
| Tailwind plugin | Reusable | Over-engineering | ❌ Rejected |

**Rationale**: Global CSS for H1/H2 is cleanest since these styles apply site-wide.

## Figma Node References

| Component | Node ID | Frame |
|-----------|---------|-------|
| Home Web | 10:197 | Main desktop layout |
| Home Mobile | 11:1017 | Mobile layout reference |
| Nav | 8:44 | Navigation component |
| Buttons | 11:623, 11:576, 11:624 | Button states |
| Footer (Gracias) | 11:762 | Footer section |

## Unresolved Items

None - all values extracted from Figma.
