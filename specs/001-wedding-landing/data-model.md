# Phase 1: Data Model

**Feature**: Wedding Landing Page (V1 Static)  
**Date**: 2025-12-28  
**Status**: Complete

## Overview

This document defines the data entities for the wedding landing page. Since V1 is a static site with no persistence, the "data model" primarily describes configuration objects and content structures rather than database schemas.

## Entities

### 1. ExternalLinks

**Purpose**: Centralized configuration for all external URLs used throughout the site

**Location**: `src/config/links.ts`

**Schema**:

```typescript
interface ExternalLinks {
  spotify: {
    playlistUrl: string; // Canonical Spotify playlist URL
  };
  contact: {
    whatsappUrl: string; // WhatsApp deep link with pre-filled message
    telegramUrl: string; // Telegram deep link
  };
  maps: {
    embedUrl: string; // Google Maps iframe embed URL
    directionsUrl: string; // Google Maps directions link
  };
  photos: {
    qrDestinationUrl: string; // URL for photo QR code (placeholder in V1)
    alternativeLinkUrl: string; // Alternative text link for photos
  };
  rsvp: {
    pageUrl: string; // Internal /rsvp page URL
  };
}
```

**Validation Rules**:

- All URLs must be valid HTTPS URLs (except internal routes)
- WhatsApp URL format: `https://wa.me/[number]?text=[encoded message]`
- Telegram URL format: `https://t.me/[username]` or `tg://resolve?domain=[username]`
- Maps embed URL must be Google Maps iframe embed format
- Placeholder values acceptable in V1 (documented in README)

**Example**:

```typescript
export const externalLinks: ExternalLinks = {
  spotify: {
    playlistUrl: "https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5",
  },
  contact: {
    whatsappUrl:
      "https://wa.me/5491112345678?text=Hola%2C%20quiero%20confirmar%20mi%20asistencia",
    telegramUrl: "https://t.me/username",
  },
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=...",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=...",
  },
  photos: {
    qrDestinationUrl: "https://placeholder.com/photos", // TBD
    alternativeLinkUrl: "https://placeholder.com/photos", // TBD
  },
  rsvp: {
    pageUrl: "/rsvp",
  },
};
```

**Relationships**: Referenced by all components that render external links (Nav, Fotos, Asistencia, RSVP placeholder)

---

### 2. DesignTokens

**Purpose**: Figma design tokens for colors, typography, and spacing

**Location**: `tailwind.config.mjs`

**Schema**:

```typescript
interface DesignTokens {
  colors: {
    brand: {
      darkGreen: string; // #0A3428
      eucalyptus: string; // #106552
      burgundy: string; // #640405
      linen: string; // #F9F2E8
      terracotta: string; // #C6572A
      navy: string; // #2A3354
    };
  };
  fontFamily: {
    lato: string[]; // ['Lato', 'system-ui', 'sans-serif']
  };
  screens: {
    mobile: string; // '375px'
    tablet: string; // '800px'
    web: string; // '1200px'
  };
}
```

**Validation Rules**:

- Color hex values must match constitution exactly
- Font family must include Lato with fallback stack
- Breakpoints must match Figma viewport sizes

**Source of Truth**: Constitution (`.specify/memory/constitution.md`)

**Immutability**: These values are NON-NEGOTIABLE per constitution. Any change requires constitution amendment.

---

### 3. PageSection

**Purpose**: Represents a navigable section on the home page

**Location**: Implicit in component structure (`src/components/`)

**Schema**:

```typescript
interface PageSection {
  id: string; // Anchor ID (e.g., 'detalles', 'gift-list')
  title: string; // Display title (e.g., 'Detalles', 'Gift List')
  component: ReactNode; // React component rendering the section
  order: number; // Display order (1-6)
}
```

**Instances**:

1. Hero (order: 1, id: 'hero')
2. Detalles (order: 2, id: 'detalles')
3. Gift List (order: 3, id: 'gift-list')
4. Fotos & Temaikenes (order: 4, id: 'fotos')
5. Asistencia (order: 5, id: 'asistencia')
6. Gracias (order: 6, id: 'gracias')

**Relationships**:

- Referenced by Nav component for anchor links
- Rendered in order on `index.astro`

---

### 4. NavigationItem

**Purpose**: Represents a link in the navigation menu

**Location**: `src/components/Nav.tsx`

**Schema**:

```typescript
interface NavigationItem {
  label: string; // Display text (e.g., 'Detalles')
  href: string; // Anchor link (e.g., '#detalles')
  isExternal: boolean; // false for anchors, true for external links
}
```

**Instances**:

```typescript
const navItems: NavigationItem[] = [
  { label: "Detalles", href: "#detalles", isExternal: false },
  { label: "Gift List", href: "#gift-list", isExternal: false },
  { label: "Fotos & Temaikenes", href: "#fotos", isExternal: false },
  { label: "Asistencia", href: "#asistencia", isExternal: false },
  { label: "Volver al inicio", href: "#hero", isExternal: false },
];
```

**Validation Rules**:

- Internal anchors must start with '#'
- External links must be valid URLs
- Labels must match Figma navigation design

---

### 5. Asset

**Purpose**: Represents an image or icon extracted from Figma

**Location**: `src/assets/images/` and `src/assets/icons/`

**Schema**:

```typescript
interface Asset {
  filename: string; // e.g., 'hero-bg.webp', 'spotify-icon.svg'
  path: string; // Relative path from src/assets/
  format: "webp" | "png" | "svg" | "jpg";
  dimensions?: {
    width: number;
    height: number;
  };
  figmaNodeId?: string; // Original Figma node ID for traceability
  alt: string; // Accessibility alt text
}
```

**Validation Rules**:

- All images must have alt text
- WebP preferred for photos (better compression)
- SVG preferred for icons (scalable)
- Filenames must be descriptive (no 'image1.png')

**Lifecycle**:

1. Extracted from Figma (manual or API)
2. Optimized (compression, format conversion)
3. Committed to repository
4. Imported in components via Astro's `import` or `<Image>` component

---

### 6. QRCode

**Purpose**: Represents a QR code image for external links

**Location**: `public/qr-codes/`

**Schema**:

```typescript
interface QRCode {
  filename: string; // e.g., 'spotify-qr.png', 'rsvp-qr.png'
  destinationUrl: string; // URL encoded in QR code
  format: "png" | "svg";
  size: number; // Pixel dimensions (square)
  displayContext: string; // Where it's shown (e.g., 'Fotos section', 'Asistencia section')
}
```

**Instances**:

1. Spotify QR: Links to Spotify playlist
2. RSVP QR: Links to /rsvp page
3. Photos QR: Links to photo destination (placeholder in V1)

**Validation Rules**:

- QR codes must be readable at minimum 200x200px
- Must have visible text link alternative per constitution IV
- Destination URLs must match `externalLinks` config

---

## Data Flow

### Static Content Flow

```
Figma Design
    ↓ (manual export)
Assets (images/icons)
    ↓ (commit to repo)
src/assets/
    ↓ (import in components)
Astro Components
    ↓ (build time)
Static HTML
```

### Configuration Flow

```
Constitution
    ↓ (defines tokens)
tailwind.config.mjs
    ↓ (compile time)
CSS Classes
    ↓ (applied in components)
Styled HTML
```

### External Links Flow

```
src/config/links.ts
    ↓ (import in components)
Component Props
    ↓ (render time)
<a href={...}> tags
```

---

## State Management

**V1 has NO client-side state management** (no Redux, Zustand, Context API).

The only stateful component is Nav (mobile menu toggle):

```typescript
// Nav.tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

This is local component state only, not shared across components.

---

## Future Considerations (V2+)

When real RSVP is implemented, the data model will expand to include:

### RSVPSubmission (Future)

```typescript
interface RSVPSubmission {
  name: string;
  attending: boolean;
  guestCount?: number;
  dietary?: string;
  message?: string;
  code?: string; // Optional tracking code from URL param
  submittedAt: Date;
}
```

This will be stored in Google Sheets via Cloudflare Function + Apps Script (per constitution). Not implemented in V1.

---

## Validation Strategy

### Build-Time Validation

- TypeScript strict mode catches type errors
- Tailwind purge removes unused classes
- Astro build fails if imports are missing

### Runtime Validation (Minimal)

- Unit tests verify `externalLinks` URLs are valid
- No runtime validation needed for static content

### Manual Validation

- Visual regression tests (Playwright) compare rendered output to Figma
- Lighthouse audit verifies performance targets
- Manual QA checks all external links open correctly

---

## Summary

The V1 data model is intentionally minimal:

- **ExternalLinks**: Centralized URL configuration
- **DesignTokens**: Figma-derived styling constants
- **PageSection**: Home page section structure
- **NavigationItem**: Nav menu links
- **Asset**: Figma-extracted images/icons
- **QRCode**: Static QR code images

No database, no API, no client-side state (except Nav menu toggle). All data is static configuration committed to the repository.
