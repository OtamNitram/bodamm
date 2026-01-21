# Wedding Landing Page (V1 Static)

A static wedding landing page built with Astro, React, and Tailwind CSS, faithfully replicating Figma designs.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site.

## 📁 Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── Nav.tsx      # Navigation with mobile menu
│   │   ├── Hero.tsx     # Hero section
│   │   ├── Detalles.tsx # Event details + map
│   │   ├── GiftList.tsx # Gift list section
│   │   ├── Fotos.tsx    # Photos & Spotify section
│   │   ├── Asistencia.tsx # RSVP section
│   │   ├── Gracias.tsx  # Thank you section
│   │   └── Button.tsx   # Reusable button component
│   ├── pages/
│   │   ├── index.astro  # Home page
│   │   └── rsvp.astro   # RSVP placeholder page
│   ├── layouts/
│   │   └── Layout.astro # Base layout with meta tags
│   ├── config/
│   │   └── links.ts     # Centralized external URLs
│   ├── styles/
│   │   └── global.css   # Global styles + Tailwind
│   └── assets/
│       ├── images/      # Figma images (WebP)
│       └── icons/       # Figma icons (SVG)
├── public/
│   ├── fonts/           # Font files
│   └── qr-codes/        # QR code images
└── tests/
    ├── visual/          # Playwright visual tests
    └── unit/            # Vitest unit tests
```

## 🎨 Design Tokens

Defined in `tailwind.config.mjs`:

**Colors:**

- `brand-darkGreen`: #0A3428
- `brand-eucalyptus`: #106552
- `brand-burgundy`: #640405
- `brand-linen`: #F9F2E8
- `brand-terracotta`: #C6572A
- `brand-navy`: #2A3354

**Breakpoints:**

- `mobile`: 375px
- `tablet`: 800px
- `web`: 1200px

**Font:**

- Lato (Regular 400, SemiBold 600)

## ⚙️ Configuration

### External Links

Edit `src/config/links.ts` to update all external URLs:

```typescript
export const externalLinks = {
  spotify: {
    playlistUrl: "https://open.spotify.com/playlist/...",
  },
  contact: {
    whatsappUrl: "https://wa.me/...",
    telegramUrl: "https://t.me/...",
  },
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=...",
    directionsUrl: "https://maps.google.com/?q=...",
  },
  // ... more links
};
```

## 🖼️ Figma Asset Extraction

### Required Manual Steps

1. **Images** (see `src/assets/images/README.md`):

   - Export frames from Figma in WebP format at 1x, 2x, 3x
   - Nodes: 10:197 (web), 11:1176 (tablet), 11:1017 (mobile)

2. **Icons** (see `src/assets/icons/README.md`):

   - Export all icons from Figma in SVG format
   - Save with descriptive names (e.g., `whatsapp.svg`)

3. **QR Codes** (see `public/qr-codes/README.md`):
   - Generate QR codes for Spotify, RSVP, and photos
   - Save as PNG files (512x512px recommended)

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run visual regression tests
npm run test:e2e

# Run tests in UI mode
npx playwright test --ui
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 📋 Implementation Status

### ✅ Completed

- Phase 1: Setup (T001-T009) - Project initialization
- Phase 2: Foundational (T013-T015) - Layout, Button, Playwright config
- Phase 3: User Story 1 (T016-T022) - All 6 sections created
- Phase 4: User Story 2 (T026-T028) - Navigation with mobile menu
- Phase 7: User Story 5 (T043-T048) - RSVP placeholder page

### ⏳ Pending Manual Work

- T010: Extract images from Figma
- T011: Extract icons from Figma
- T012: Generate QR codes

### 🔄 Next Steps

- Complete Figma asset extraction (T010-T012)
- Add visual regression tests with Figma baselines (T023)
- Verify navigation scroll behavior (T029-T031)
- Validate Spotify integration (T032-T036)
- Test contact buttons (T037-T042)
- Polish & validation (T050-T062)

## 🎯 Constitution Compliance

This project adheres to the project constitution:

- ✅ **Figma Source of Truth**: All designs reference Figma file qwrm6VDQhaEODfbkZfQ6Kk
- ✅ **Static-First Performance**: Astro static build, minimal JavaScript
- ✅ **RSVP UX Simplicity**: V1 placeholder with WhatsApp/Telegram fallback
- ✅ **Graceful Degradation**: All digital interactions have human alternatives
- ✅ **Design Token Consistency**: Tailwind config uses exact constitution tokens
- ✅ **V1 Scope Discipline**: No scope creep, real RSVP deferred to V2

## 📝 Notes

- **CSS Warnings**: `@tailwind` and `@apply` warnings in IDE are expected - these are processed at build time
- **Placeholder Content**: Components contain placeholder text marked with `[brackets]` - update with actual content
- **TODO Comments**: Search for `TODO` in code for items requiring Figma assets or content updates

## 🔗 Resources

- **Figma Design**: https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento
- **Spotify Playlist**: https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5
- **Specification**: See `specs/001-wedding-landing/spec.md`
- **Implementation Plan**: See `specs/001-wedding-landing/plan.md`
- **Tasks**: See `specs/001-wedding-landing/tasks.md`
