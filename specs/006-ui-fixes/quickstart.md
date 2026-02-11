# Quickstart: UI Fixes — V2 Design Alignment & UX Polish

**Branch**: `006-ui-fixes` | **Date**: 2026-02-10

## Prerequisites

- Node.js (compatible with Astro 5.x)
- `npm install` completed at repo root

## Local Development

```bash
npm run dev
```

Opens at `http://localhost:4321` by default.

## Files to Modify (by fix area)

### 1. RSVP Modal Scroll Lock
- **NEW** `src/hooks/useScrollLock.ts` — Reusable hook: toggles `overflow: hidden` on `document.body`
- `src/components/RsvpConfirmModal.tsx` — Import and activate `useScrollLock` when modal is mounted
- `src/components/RsvpForm.tsx` — Activate `useScrollLock` during `formState === "submitting"`

### 2. RSVP Success Screen Buttons & Copy
- `src/components/RsvpSuccessMessage.tsx` — Normalize both buttons to Figma v2 button specs:
  - "Agregar al calendario": min-h 40px, px-4, py-2, rounded-[12px], text-[14px], font-semibold, bg-brand-darkGreen, text-brand-linen
  - "Modificar confirmación": Same dimensions, outlined variant (border border-brand-darkGreen, text-brand-darkGreen, transparent bg)
  - Verify heading copy matches Figma v2

### 3. Spotify Button
- `src/components/Fotos.tsx` — Update the Spotify `<a>` tag classes to match Button.tsx base styles: `min-h-[40px] px-4 py-2 rounded-[12px] text-[14px] font-semibold`

### 4. Calendar .ics
- `src/lib/calendar.ts` — No changes needed. Current MIME type (`text/calendar;charset=utf-8`) is already correct.

### 5. Transport Success & Zone Chips
- `src/components/TrasladoForm.tsx`:
  - Remove `setTimeout(resetForm, 5000)` from success handler
  - Replace inline success `<div>` with styled success screen matching RSVP pattern (card, checkmark, heading, re-fill button)
  - Zone chips: Change from `flex-wrap gap-3 rounded-full` per chip to flush segmented control (`gap-[1px]`, first chip `rounded-l-full`, last chip `rounded-r-full`, middle chips no rounding)

### 6. Bank Accounts
- `src/components/GiftList.tsx` — Update hardcoded account numbers:
  - UYU: `0062001200748170`
  - USD: `0062005200888865`

### 7. Responsive Breakpoints
- Visual audit at 375px, 800px, 1200px against Figma frames (11:1017, 11:1176, 10:197)
- Fix any deviations found during audit in the respective component files

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

### Manual Verification Checklist

1. **Scroll lock**: Open RSVP → fill form → click "Enviar confirmación" → try scrolling background → should be locked
2. **Success buttons**: Complete RSVP → verify both buttons same size, correct variants
3. **Spotify**: Scroll to Temaikenes → verify button matches other site buttons in size
4. **Calendar**: Click "Agregar al calendario" on mobile → should open native calendar
5. **Transport**: Submit traslado form → success stays visible → click re-fill → form reappears
6. **Bank accounts**: Scroll to Gift List → verify UYU and USD numbers
7. **Zone chips**: View traslado on 375px → chips are flush segmented control
8. **Breakpoints**: Resize to 375/800/1200px → compare against Figma screenshots

## Figma References

- **Button component**: nodes 11:623 (default), 11:576 (hover), 11:624 (outlined), 11:1141 (Spotify instance)
- **Home Web**: 10:197
- **Home Tablet**: 11:1176
- **Home Mobile**: 11:1017
- **Figma file**: `https://www.figma.com/design/qwrm6VDQhaEODfbkZfQ6Kk/Casamiento`
