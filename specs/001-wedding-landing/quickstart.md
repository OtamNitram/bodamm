# Quickstart Guide: Wedding Landing Page

**Feature**: Wedding Landing Page (V1 Static)  
**Date**: 2025-12-28  
**Target Audience**: Developers setting up local development or deployment

## Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Git
- Code editor (VS Code recommended)
- Figma account (for asset extraction)
- Cloudflare account (for deployment)

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd bodamm
git checkout 001-wedding-landing
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

**Expected dependencies** (from `package.json`):

- `astro` (^4.x)
- `react` (^18.x)
- `react-dom` (^18.x)
- `tailwindcss` (^3.x)
- `@astrojs/react` (Astro React integration)
- `@astrojs/tailwind` (Astro Tailwind integration)
- `typescript` (^5.x)

**Dev dependencies**:

- `@playwright/test` (visual regression tests)
- `vitest` (unit tests)

### 3. Configure External Links

Edit `src/config/links.ts` with actual URLs:

```typescript
export const externalLinks = {
  spotify: {
    playlistUrl: "https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5",
  },
  contact: {
    whatsappUrl:
      "https://wa.me/5491112345678?text=Hola%2C%20confirmo%20asistencia",
    telegramUrl: "https://t.me/yourusername",
  },
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=YOUR_LOCATION",
  },
  photos: {
    qrDestinationUrl: "https://your-photo-link.com", // Placeholder
    alternativeLinkUrl: "https://your-photo-link.com", // Placeholder
  },
  rsvp: {
    pageUrl: "/rsvp",
  },
};
```

**Note**: Placeholder URLs are acceptable for initial development. Update before production deployment.

### 4. Extract Figma Assets

#### Manual Export (Recommended for V1)

1. Open Figma file: https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento
2. Navigate to key frames:
   - Home Web (node 10:197)
   - Home Tablet (node 11:1176)
   - Home Mobile (node 11:1017)
   - Nav (node 8:44)
   - Buttons (nodes 11:623, 11:576, 11:624)
3. Export images:
   - Select image layers → Export → Format: WebP (for photos) or SVG (for icons)
   - Export at 1x, 2x, 3x for responsive images
4. Save to:
   - Photos: `src/assets/images/`
   - Icons: `src/assets/icons/`
5. Name files descriptively: `hero-background.webp`, `spotify-icon.svg`, etc.

#### Programmatic Export (Optional)

```bash
# Using Figma REST API (requires FIGMA_TOKEN)
export FIGMA_TOKEN=your_figma_personal_access_token
node scripts/export-figma-assets.js
```

(Script not included in V1; manual export sufficient)

### 5. Generate QR Codes

Use online tool or library to generate QR codes:

**URLs to encode**:

- Spotify: `https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5`
- RSVP: `https://your-domain.com/rsvp` (update with actual domain)
- Photos: `https://your-photo-link.com` (placeholder)

**Save to**: `public/qr-codes/`

- `spotify-qr.png`
- `rsvp-qr.png`
- `photos-qr.png`

**Recommended tool**: https://www.qr-code-generator.com/ (free, no account required)

**Settings**:

- Size: 512x512px minimum
- Format: PNG or SVG
- Error correction: Medium (M)

### 6. Start Development Server

```bash
npm run dev
```

**Expected output**:

```
🚀 astro v4.x.x started in XXXms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Open http://localhost:4321/ in browser.

### 7. Verify Setup

**Checklist**:

- [ ] Home page loads with all 6 sections visible
- [ ] Navigation links scroll to correct sections
- [ ] Spotify button opens playlist in new tab
- [ ] WhatsApp/Telegram buttons have correct URLs
- [ ] Map embed displays (or placeholder if not configured)
- [ ] QR codes display in Fotos and Asistencia sections
- [ ] /rsvp page shows placeholder message
- [ ] No console errors
- [ ] Responsive design works on mobile/tablet/web viewports

---

## Development Workflow

### File Structure Overview

```
src/
├── components/       # React components (islands)
│   ├── Nav.tsx      # Navigation with mobile menu toggle
│   ├── Hero.tsx     # Hero section
│   ├── Detalles.tsx # Details section
│   └── ...
├── pages/
│   ├── index.astro  # Home page (all sections)
│   └── rsvp.astro   # Placeholder RSVP page
├── layouts/
│   └── Layout.astro # Base layout
├── config/
│   └── links.ts     # External URLs (EDIT THIS)
├── styles/
│   └── global.css   # Global styles
└── assets/
    ├── images/      # Figma images (EXTRACT FROM FIGMA)
    └── icons/       # Figma icons (EXTRACT FROM FIGMA)
```

### Making Changes

**To update external links**:

1. Edit `src/config/links.ts`
2. Save (dev server auto-reloads)

**To update design tokens**:

1. Edit `tailwind.config.mjs`
2. Restart dev server (`Ctrl+C`, then `npm run dev`)

**To add/modify components**:

1. Edit component in `src/components/`
2. Save (dev server auto-reloads)
3. Verify against Figma design

**To update assets**:

1. Replace file in `src/assets/` or `public/`
2. Save (dev server auto-reloads)

### Testing

**Visual regression tests** (Playwright):

```bash
npm run test:visual
```

Compares rendered output to Figma screenshots. Update baselines when intentional changes made.

**Unit tests** (Vitest):

```bash
npm run test:unit
```

Tests config validation, utility functions.

**Lighthouse audit**:

```bash
npm run build
npm run preview
# In separate terminal:
lighthouse http://localhost:4321 --view
```

Target scores: 90+ mobile, 95+ desktop.

---

## Build & Deployment

### Build for Production

```bash
npm run build
```

**Expected output**:

```
✓ Completed in XXXs.
  ├─ dist/index.html
  ├─ dist/rsvp/index.html
  └─ dist/_astro/... (optimized assets)
```

**Output directory**: `dist/` (static HTML/CSS/JS)

### Preview Production Build

```bash
npm run preview
```

Opens http://localhost:4321/ serving production build.

**Verify**:

- [ ] All pages load correctly
- [ ] Images optimized (WebP format)
- [ ] CSS minified
- [ ] JavaScript minimal (<50KB)
- [ ] No console errors

### Deploy to Cloudflare Pages

#### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub:

   ```bash
   git add .
   git commit -m "Wedding landing page V1"
   git push origin 001-wedding-landing
   ```

2. Merge to `main` branch (via PR or direct push)

3. Cloudflare Pages auto-deploys from `main` branch

**Cloudflare Pages settings**:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 18+

#### Option 2: Manual Deploy (CLI)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name=casamiento
```

### Post-Deployment Verification

**Checklist**:

- [ ] Visit production URL
- [ ] Test all navigation links
- [ ] Test all external links (Spotify, WhatsApp, Telegram, Maps)
- [ ] Test QR codes with mobile device
- [ ] Test responsive design on real mobile/tablet
- [ ] Run Lighthouse audit on production URL
- [ ] Verify FCP <1.5s on 3G (Chrome DevTools Network throttling)

---

## Configuration Reference

### Environment Variables

**None required for V1** (all config in `src/config/links.ts`).

Future versions may use:

- `RSVP_SECRET` (for RSVP API authentication)
- `GOOGLE_SHEETS_ID` (for RSVP storage)

### External URLs to Configure

| Config Key                | Example                                                  | Where to Get                     |
| ------------------------- | -------------------------------------------------------- | -------------------------------- |
| `spotify.playlistUrl`     | `https://open.spotify.com/playlist/...`                  | Spotify playlist share link      |
| `contact.whatsappUrl`     | `https://wa.me/5491112345678?text=...`                   | WhatsApp number + message        |
| `contact.telegramUrl`     | `https://t.me/username`                                  | Telegram username                |
| `maps.embedUrl`           | `https://www.google.com/maps/embed?pb=...`               | Google Maps → Share → Embed      |
| `maps.directionsUrl`      | `https://www.google.com/maps/dir/?api=1&destination=...` | Google Maps → Directions → Share |
| `photos.qrDestinationUrl` | `https://your-link.com`                                  | TBD (placeholder in V1)          |

### Design Tokens (Tailwind Config)

**Colors** (from constitution):

```javascript
colors: {
  brand: {
    darkGreen: '#0A3428',
    eucalyptus: '#106552',
    burgundy: '#640405',
    linen: '#F9F2E8',
    terracotta: '#C6572A',
    navy: '#2A3354',
  },
}
```

**Breakpoints** (from Figma):

```javascript
screens: {
  mobile: '375px',
  tablet: '800px',
  web: '1200px',
}
```

**Typography**:

```javascript
fontFamily: {
  lato: ['Lato', 'system-ui', 'sans-serif'],
}
```

---

## Troubleshooting

### Issue: Dev server won't start

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Images not loading

**Check**:

1. Files exist in `src/assets/images/`
2. Import paths correct in components
3. File extensions match (case-sensitive on Linux)

### Issue: Tailwind classes not working

**Check**:

1. `tailwind.config.mjs` has correct `content` paths
2. `global.css` imports Tailwind directives
3. Dev server restarted after config change

### Issue: External links not working

**Check**:

1. URLs in `src/config/links.ts` are valid HTTPS
2. WhatsApp URL format: `https://wa.me/[number]?text=[message]`
3. Telegram URL format: `https://t.me/[username]`

### Issue: Build fails

**Check**:

1. No TypeScript errors: `npm run typecheck`
2. All imports resolve correctly
3. No missing assets referenced in components

### Issue: Lighthouse score low

**Check**:

1. Images optimized (WebP format, lazy loading)
2. Fonts loaded efficiently (preload or system fallback)
3. JavaScript minimal (<50KB)
4. CSS purged (Tailwind removes unused classes)

---

## Additional Resources

- **Astro Docs**: https://docs.astro.build/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Figma File**: https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento
- **Constitution**: `.specify/memory/constitution.md`
- **Spec**: `specs/001-wedding-landing/spec.md`
- **Plan**: `specs/001-wedding-landing/plan.md`

---

## Support

For questions or issues:

1. Check this quickstart guide
2. Review spec and plan documents
3. Verify constitution compliance
4. Check Figma designs for visual reference

---

**Last Updated**: 2025-12-28  
**Version**: 1.0.0 (V1 Static)
