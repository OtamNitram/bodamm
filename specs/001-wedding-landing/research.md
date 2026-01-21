# Phase 0: Research & Technical Decisions

**Feature**: Wedding Landing Page (V1 Static)  
**Date**: 2025-12-28  
**Status**: Complete

## Overview

This document captures technical research and decisions made during Phase 0 planning. All unknowns from Technical Context have been resolved.

## Research Areas

### 1. Figma Asset Extraction Strategy

**Decision**: Use Figma REST API with manual export for initial setup, then commit assets to repository

**Rationale**:

- Figma REST API allows programmatic export of images/icons at specific resolutions
- Manual export via Figma UI is acceptable for V1 (one-time setup)
- Assets committed to git ensure reproducible builds without Figma API dependency at build time
- Aligns with FR-011 (no hotlinking) and constitution (Figma as source of truth)

**Implementation**:

- Export images from Figma at 1x, 2x, 3x for responsive images
- Use WebP format for photos (better compression), SVG for icons where possible
- Store in `src/assets/images/` and `src/assets/icons/`
- Document export process in README for future updates

**Alternatives Considered**:

- Figma plugin for automated sync: Rejected (adds complexity, not needed for static assets that rarely change)
- Build-time Figma API calls: Rejected (requires API token management, slower builds, unnecessary for V1)

---

### 2. Tailwind Design Token Configuration

**Decision**: Define all constitution color tokens and typography in `tailwind.config.mjs` with semantic naming

**Rationale**:

- Constitution explicitly defines 6 color tokens with exact hex values
- Tailwind's theme extension allows custom color palette
- Semantic names (brand.darkGreen) prevent raw hex in components
- Enforces visual consistency per constitution principle V

**Implementation**:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          darkGreen: "#0A3428",
          eucalyptus: "#106552",
          burgundy: "#640405",
          linen: "#F9F2E8",
          terracotta: "#C6572A",
          navy: "#2A3354",
        },
      },
      fontFamily: {
        lato: ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
};
```

**Alternatives Considered**:

- CSS custom properties: Rejected (Tailwind tokens provide better IntelliSense and compile-time validation)
- Inline hex values: Rejected (violates constitution principle V)

---

### 3. Responsive Breakpoints Strategy

**Decision**: Use Figma-defined breakpoints (375px mobile, 800px tablet, 1200px+ web) with Tailwind responsive utilities

**Rationale**:

- Figma provides explicit designs for 3 viewports (nodes 11:1017, 11:1176, 10:197)
- Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px) don't match Figma
- Custom breakpoints ensure pixel-perfect matching per constitution

**Implementation**:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    screens: {
      mobile: "375px",
      tablet: "800px",
      web: "1200px",
    },
  },
};
```

Usage: `<div className="text-sm tablet:text-base web:text-lg">`

**Alternatives Considered**:

- Use Tailwind defaults: Rejected (doesn't match Figma breakpoints, violates constitution)
- Media queries in CSS: Rejected (less maintainable, Tailwind utilities preferred)

---

### 4. Navigation Scroll Behavior

**Decision**: Use native CSS `scroll-behavior: smooth` with anchor links, no JavaScript required

**Rationale**:

- FR-002 requires anchor links to sections
- CSS-only solution aligns with static-first principle (constitution II)
- Works without JavaScript (graceful degradation per constitution IV)
- Supported in all modern browsers (Chrome, Safari, Firefox, Edge per spec assumptions)

**Implementation**:

```css
/* global.css */
html {
  scroll-behavior: smooth;
}
```

```astro
<!-- Nav.tsx -->
<a href="#detalles">Detalles</a>
<!-- index.astro -->
<section id="detalles">...</section>
```

**Alternatives Considered**:

- JavaScript scroll library (smooth-scroll): Rejected (unnecessary dependency, violates minimal JS principle)
- React scroll component: Rejected (requires hydration, violates static-first)

---

### 5. Mobile Menu Toggle Strategy

**Decision**: Use React island with `useState` for mobile menu toggle, CSS for animations

**Rationale**:

- Constitution allows JS for mobile menu toggle specifically
- React island keeps JS minimal (only loads on interaction)
- Astro's partial hydration (`client:visible` or `client:idle`) optimizes performance
- Aligns with FR-015 (minimal JS for essential interactions)

**Implementation**:

```tsx
// Nav.tsx (React island)
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      <div className={isOpen ? "block" : "hidden md:block"}>
        {/* nav links */}
      </div>
    </nav>
  );
}
```

```astro
<!-- index.astro -->
<Nav client:idle />
```

**Alternatives Considered**:

- Pure CSS (checkbox hack): Rejected (less accessible, harder to maintain)
- Full-page hydration: Rejected (violates static-first principle)

---

### 6. Image Optimization Strategy

**Decision**: Use Astro's built-in `<Image>` component with automatic optimization

**Rationale**:

- Astro 4.x includes native image optimization (WebP conversion, responsive srcset)
- Automatic lazy loading for below-fold images
- Reduces bundle size and improves FCP (SC-006: <1.5s on 3G)
- No additional dependencies required

**Implementation**:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---
<Image src={heroImage} alt="Wedding hero" loading="eager" />
<Image src={detailsImage} alt="Details" loading="lazy" />
```

**Alternatives Considered**:

- Manual responsive images: Rejected (more work, error-prone)
- External CDN (Cloudinary): Rejected (adds external dependency, constitution prefers self-contained)

---

### 7. QR Code Generation

**Decision**: Generate QR codes using online tool (qr-code-generator.com) or library, commit as static images

**Rationale**:

- QR codes are static (Spotify URL, /rsvp URL, photos URL don't change frequently)
- No runtime generation needed (static-first principle)
- Simpler deployment (no QR library dependency)
- Aligns with FR-011 (assets served locally)

**Implementation**:

- Generate QR codes for:
  - Spotify playlist: https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5
  - RSVP page: https://[domain]/rsvp
  - Photos link: [TBD, placeholder for now]
- Save as PNG/SVG in `public/qr-codes/`
- Reference in components: `<img src="/qr-codes/spotify.png" alt="Spotify QR" />`

**Alternatives Considered**:

- Runtime QR generation (qrcode.js): Rejected (unnecessary JS, violates static-first)
- Dynamic QR with tracking: Rejected (no analytics in V1 per constitution)

---

### 8. Google Maps Embed Strategy

**Decision**: Use simple iframe embed with Google Maps Embed API (no API key required for basic embed)

**Rationale**:

- FR-006 requires map component matching Figma layout
- Constitution specifies "No API key; simple embed"
- Iframe embed is static HTML (no JS required)
- Aligns with graceful degradation (map loads independently)

**Implementation**:

```astro
<!-- Detalles.tsx -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>
```

URL will be configured in `src/config/links.ts` per FR-012.

**Alternatives Considered**:

- Google Maps JavaScript API: Rejected (requires API key, unnecessary JS)
- Static map image: Rejected (no interactivity, worse UX)

---

### 9. External Link Security

**Decision**: All external links use `target="_blank"` with `rel="noopener noreferrer"` for security

**Rationale**:

- Prevents reverse tabnabbing attacks
- Constitution Definition of Done requires security attributes
- Best practice for external links (Spotify, WhatsApp, Telegram, Maps)
- No performance impact

**Implementation**:

```tsx
<a href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
  Abrir Playlist
</a>
```

**Alternatives Considered**:

- Same-tab navigation: Rejected (poor UX, users lose wedding site context)
- Only `rel="noopener"`: Rejected (noreferrer adds privacy protection)

---

### 10. Placeholder RSVP Page Design

**Decision**: Simple static page with clear messaging, no form elements in V1

**Rationale**:

- FR-009, FR-010: /rsvp is placeholder only, no data handling
- SC-010: Must clearly communicate "próximamente" status
- Avoids user confusion (no fake form that doesn't work)
- Aligns with V1 scope discipline (constitution VI)

**Implementation**:

```astro
<!-- rsvp.astro -->
<Layout>
  <section class="text-center py-16">
    <h1>Confirmación de Asistencia</h1>
    <p class="text-xl mt-4">Próximamente disponible</p>
    <p class="mt-8">Mientras tanto, podés confirmar por:</p>
    <div class="flex gap-4 justify-center mt-4">
      <Button href={WHATSAPP_URL}>WhatsApp</Button>
      <Button href={TELEGRAM_URL}>Telegram</Button>
    </div>
  </section>
</Layout>
```

**Alternatives Considered**:

- Fake form with disabled submit: Rejected (confusing UX)
- Redirect to home: Rejected (breaks QR code expectations)

---

## Best Practices Applied

### Astro Static Site Generation

- Use `.astro` files for static content (pages, layouts)
- Use React components only for interactive islands (Nav menu toggle)
- Leverage Astro's partial hydration (`client:idle`, `client:visible`)
- Keep JavaScript bundle minimal (<50KB per constitution)

### TypeScript Strict Mode

- Enable `strict: true` in `tsconfig.json`
- Type all props interfaces
- Use `const` assertions for config objects
- Avoid `any` types (use `unknown` if needed)

### Tailwind CSS

- Use utility classes for styling (no custom CSS unless necessary)
- Define all design tokens in config (no arbitrary values like `text-[#0A3428]`)
- Use responsive utilities (`tablet:`, `web:`) for breakpoints
- Extract repeated patterns into components (Button, Section)

### Performance Optimization

- Lazy load below-fold images (`loading="lazy"`)
- Eager load hero image (`loading="eager"`)
- Use WebP for photos, SVG for icons
- Minimize CSS (Tailwind purge removes unused classes)
- No external fonts (self-host Lato or use system fallback)

### Accessibility

- Semantic HTML (`<nav>`, `<section>`, `<button>`)
- Alt text for all images
- Keyboard navigation support (native anchor links)
- Focus visible styles (Tailwind's `focus:` utilities)
- ARIA labels for icon-only buttons

---

## Resolved Unknowns

All "NEEDS CLARIFICATION" items from Technical Context have been resolved:

1. ✅ **Language/Version**: TypeScript (strict mode)
2. ✅ **Primary Dependencies**: Astro, React (islands), Tailwind CSS
3. ✅ **Testing**: Playwright (visual regression), Vitest (unit tests)
4. ✅ **Target Platform**: Static HTML/CSS/JS on Cloudflare Pages
5. ✅ **Performance Goals**: FCP <1.5s, Lighthouse 90+/95+
6. ✅ **Constraints**: Figma pixel-perfect, static-first, minimal JS
7. ✅ **Scale/Scope**: Single-page + placeholder, ~10-15 components

---

## Next Steps

Phase 0 research is complete. Proceed to Phase 1:

- Generate `data-model.md` (minimal, mostly static content entities)
- Generate `contracts/` (API contracts for future RSVP, if applicable)
- Generate `quickstart.md` (local dev setup, deployment)
- Update agent context with technology stack
