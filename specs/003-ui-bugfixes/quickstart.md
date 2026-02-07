# Quickstart: UI Bugfixes Implementation

**Feature**: 003-ui-bugfixes  
**Date**: 2026-01-30  
**Estimated Time**: 2-3 hours

## Prerequisites

- [ ] Local dev environment running (`npm run dev`)
- [ ] Figma file open for reference: https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento
- [ ] Browser DevTools ready for responsive testing

## Implementation Order

Follow this order to minimize conflicts and enable incremental testing:

### Phase 1: Global Typography (FR-019, FR-020, FR-021)

**Files**: `src/styles/global.css` or Tailwind config

```css
/* Add to global styles or create typography utilities */
h1, .h1 {
  font-weight: 700; /* bold */
  letter-spacing: 0.02em; /* 2% */
}

h2, .h2 {
  font-weight: 700; /* bold */
  letter-spacing: 0.02em; /* 2% */
}
```

**Verification**: Inspect any H1/H2 heading and confirm bold + 2% letter-spacing.

---

### Phase 2: Spacing System (FR-004, FR-005, FR-006)

**Files**: `tailwind.config.mjs`, component files

1. **Add spacing tokens to Tailwind config** (if not present):

```js
// tailwind.config.mjs
spacing: {
  'safe': '48px',      // Web
  'safe-mobile': '16px', // Mobile
  'xl': '96px',
  'xl-mobile': '56px',
  'l': '48px',
  'l-mobile': '40px',
  // m, s, xs already standard Tailwind values
}
```

2. **Update section padding** in `index.astro` and components:
   - Mobile (< 768px): `px-4` (16px)
   - Desktop (≥ 768px): `px-12` (48px)

3. **Fix QR→Asistencia spacing**: Identify the excessive gap and reduce to design system value.

**Verification**: Measure margins at 375px and 1200px viewports.

---

### Phase 3: Navigation Layout (FR-007, FR-008, FR-009)

**File**: `src/components/Nav.tsx`

```tsx
// Update container div
<div className="flex items-center justify-between px-4 md:px-12">
  {/* Logo - left edge */}
  <a href="#hero">
    <Logo />
  </a>
  
  {/* Date - fills space, left aligned */}
  <p className="flex-grow text-left text-[12px] ml-4">
    25 de Abril de 2026
  </p>
  
  {/* Hamburger - right edge (mobile only) */}
  <button className="md:hidden">...</button>
  
  {/* Desktop nav links */}
  <div className="hidden md:flex gap-8">...</div>
</div>
```

**Verification**: Logo touches left safe-margin, hamburger touches right safe-margin, date fills middle.

---

### Phase 4: Mobile Menu Styling (FR-010, FR-011, FR-012, FR-013)

**File**: `src/components/Nav.tsx`

1. **Background color**: Ensure menu uses `bg-brand-burgundy`
2. **Touch targets**: Add `min-h-[48px]` to menu items
3. **Close icon color**: Use `text-brand-linen` (NOT green)
4. **Scroll behavior**: Ensure nav maintains `bg-brand-burgundy` on scroll

```tsx
// Menu items
<a className="block py-3 min-h-[48px] flex items-center text-brand-linen">
  {item.label}
</a>

// Close icon (X)
<svg className="w-6 h-6 text-brand-linen" ...>
```

**Verification**: Open menu, check background color, measure item height, verify icon color.

---

### Phase 5: Hero Section Mobile (FR-001, FR-002, FR-003)

**File**: `src/components/Hero.tsx`

1. **Center hero image**: `mx-auto` or `object-center`
2. **Position "Save the Date"**: Use absolute positioning at top

```tsx
<section className="relative">
  {/* Background image - centered */}
  <img className="w-full object-cover object-center" ... />
  
  {/* Save the Date - absolute top */}
  <div className="absolute top-[value] left-4 right-4 md:left-12">
    <p className="text-brand-linen">Save the date!</p>
  </div>
</section>
```

**Verification**: View at 375px width, confirm image centered and text at top.

---

### Phase 6: Gift List Text (FR-014, FR-015)

**File**: `src/components/GiftList.tsx` or section in `index.astro`

1. **Add max-width**: `max-w-[800px] mx-auto`
2. **Remove hardcoded line breaks**: Delete `<br>` tags, let text flow naturally

```tsx
<p className="max-w-[800px] mx-auto text-center">
  {/* Text flows naturally, no <br> tags */}
</p>
```

**Verification**: View on desktop, confirm text container ≤ 800px and wraps naturally.

---

### Phase 7: Asset Quality (FR-016)

**Files**: `src/assets/icons/spotify.svg`, component using it

1. **Export SVG from Figma**: Right-click Spotify icon → Export as SVG
2. **Replace existing file**: `src/assets/icons/spotify.svg`
3. **Update import** if filename changed

**Verification**: Zoom to 200%, confirm no pixelation.

---

### Phase 8: WhatsApp Buttons (FR-017, FR-018)

**File**: `src/components/Button.tsx` or Asistencia section

1. **Ensure identical sizing**: Both buttons should use same width/height
2. **Verify colors**: `bg-brand-darkGreen`, `text-brand-linen`

```tsx
<Button className="w-[257px] h-[40px]">Mandale un WhatsApp a Martín</Button>
<Button className="w-[257px] h-[40px]">Mandale un WhatsApp a Mariana</Button>
```

**Verification**: Place buttons side by side, confirm identical dimensions.

---

### Phase 9: Footer Updates (FR-022, FR-023, FR-024)

**File**: `src/components/Gracias.tsx`

```tsx
{/* H2 - now bold with letter-spacing */}
<h2 className="font-['Dancing_Script'] font-bold text-[56px] text-brand-linen tracking-[0.02em]">
  Simplemente gracias
</h2>

{/* Body text - two lines */}
<div className="text-[18px] text-brand-linen">
  <p>Por acompañarnos en el día más lindo de nuestras vidas</p>
  <p>(sí, en la foto teníamos 20 años)</p>
</div>
```

**Verification**: Compare with Figma node 11:762.

---

## Testing Checklist

After implementation, verify each success criteria:

- [ ] **SC-001**: Measure spacing at mobile/desktop - matches Figma table
- [ ] **SC-002**: Menu items ≥ 48px height
- [ ] **SC-003**: Hero matches Figma at 375px
- [ ] **SC-004**: Spotify logo crisp at 2x
- [ ] **SC-005**: WhatsApp buttons identical size
- [ ] **SC-006**: H1/H2 bold + 2% letter-spacing
- [ ] **SC-007**: Footer matches Figma
- [ ] **SC-008**: Nav color stable on scroll
- [ ] **SC-009**: Close icon is linen, not green

## Visual Regression Tests

Run existing Playwright tests:

```bash
npm run test:visual
```

If tests fail, update snapshots after confirming changes match Figma:

```bash
npm run test:visual -- --update-snapshots
```

## Rollback Plan

If issues arise, revert specific component files:

```bash
git checkout main -- src/components/[ComponentName].tsx
```
