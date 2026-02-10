# Research: Traslado — La Van Comunitaria

**Date**: 2026-02-10 | **Branch**: `005-traslado`

## R1: Reuse Netlify Function → Apps Script Pattern

**Decision**: Create a new Netlify Function `netlify/functions/traslado-submit.ts` that calls the same Apps Script deployment but with `action: "traslado-submit"`. The Apps Script is extended with a new handler that writes to a separate "Traslado" sheet.

**Rationale**: Reusing the same Apps Script deployment avoids managing a second web app URL and secret. The shared secret (`RSVP_SECRET`) already authenticates the Netlify Function → Apps Script channel. Adding a new action to the same doPost handler is the simplest approach. No new environment variables needed.

**Alternatives considered**:

- Separate Apps Script deployment → Extra URL to manage, extra secret, extra deploy step for the couple
- Direct Google Sheets API via service account → Requires additional credentials, more complex setup
- Netlify Blobs → Not user-friendly for the couple to view data

**Pattern**:

```typescript
// netlify/functions/traslado-submit.ts
import type { Context } from "@netlify/functions";
export default async (req: Request, context: Context) => {
  const body = await req.json();
  // Validate fields, check honeypot, check deadline
  // POST to Apps Script with action: "traslado-submit"
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
```

## R2: Zone Data (Static Lists)

**Decision**: Create `src/data/zones.ts` with three exports: `ZONE_CATEGORIES` (enum/union), `MONTEVIDEO_BARRIOS` (string array), and `COSTA_CIUDADES` (string array). Data is hardcoded as static arrays — no API call.

**Rationale**: The list of Montevideo barrios and Costa de Oro cities is small and stable. Hardcoding avoids external API calls and keeps the site static-first. The data was previously part of the RSVP feature (removed in 004-rsvp cleanup) and can be recreated.

**Alternatives considered**:

- Fetch from API → Unnecessary network dependency; violates static-first principle
- JSON file → TypeScript file provides type safety and is more idiomatic

**Data sources**:

- Montevideo barrios: ~60 official neighborhoods (Aguada, Buceo, Carrasco, Centro, Cordón, Malvín, Parque Rodó, Pocitos, Prado, Punta Carretas, Tres Cruces, etc.)
- Costa de Oro cities: Ciudad de la Costa, Solymar, Shangrilá, Atlántida, Parque del Plata, Pando, Las Toscas, Neptunia, Pinamar, Salinas, etc.

## R3: Honeypot Anti-Spam

**Decision**: Add a hidden text input field (e.g., `name="website"`) to the form, visually hidden with CSS (`position: absolute; left: -9999px`). If the field has a value on submit, the client silently "succeeds" (shows success message) but does NOT send data to the server. Optionally, the server also rejects if the honeypot field is present.

**Rationale**: Honeypot is zero-friction for real users, effective against basic bots, and trivial to implement. No CAPTCHA needed for a small wedding site. Client-side check prevents unnecessary API calls; server-side check is belt-and-suspenders.

**Alternatives considered**:

- reCAPTCHA → Adds friction, requires Google API key, overkill for ~200 guests
- Rate limiting → Adds server complexity (stateless functions make IP tracking hard)
- No protection → Acceptable risk but honeypot cost is near-zero

## R4: Page Structure Restructuring (UI Audit)

**Decision**: Break apart `FotosAsistenciaWrapper` and restructure `index.astro` to match Figma v2 section order. The new order is:

1. `Nav` (updated links)
2. `Hero`
3. `Detalles`
4. `Asistencia` (standalone, no longer wrapped with Fotos)
5. `Traslado` (NEW component)
6. `GiftList`
7. `FotosTemaikenes` (renamed/restructured — Temaikenes + Fotos combined)
8. `Gracias`

**Rationale**: Figma v2 separates Asistencia from the Fotos/Temaikenes section. The current `FotosAsistenciaWrapper` bundles them together, which contradicts the v2 layout. Breaking them apart gives independent control over backgrounds and positioning per section.

**Alternatives considered**:

- Keep `FotosAsistenciaWrapper` and move Traslado inside → Breaks Figma v2 structure
- Wrap everything in a single layout component → Too complex, reduces composability

**Impact on existing components**:

- `FotosAsistenciaWrapper.tsx` → Remove or refactor (Asistencia extracted, Fotos stays with Temaikenes)
- `Asistencia.tsx` → Becomes standalone in page layout; may need its own background wrapper
- `Fotos.tsx` → Stays with Temaikenes section
- `Nav.tsx` → Update `navItems` array: reorder links, add "Traslado", unhide "Fotos"
- Each section needs its own background per Figma v2

## R5: Mobile Chip Horizontal Scroll with Snap

**Decision**: Use CSS `overflow-x: auto` with `scroll-snap-type: x mandatory` on the chips container, and `scroll-snap-align: start` on each chip. This provides native scroll behavior with snap-to-chip alignment.

**Rationale**: CSS scroll snap is widely supported, performant, and requires no JavaScript. It matches the Figma dev annotation ("snap" effect). The container hides the scrollbar with `scrollbar-width: none` / `::-webkit-scrollbar { display: none }`.

**Alternatives considered**:

- JavaScript-based scroll library (e.g., Swiper) → Overkill for 3 chips
- No snap, free scroll → Poor UX with chips partially visible

**Implementation**:

```css
.chips-container {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.chips-container::-webkit-scrollbar { display: none; }
.chip {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

## R6: Deadline Enforcement (Client + Server)

**Decision**: Reuse the same pattern from RSVP (R7 in 004-rsvp research). Client hides form after deadline; server rejects submissions with 410 Gone. Deadline: 2026-03-25T23:59:59-03:00.

**Rationale**: Proven pattern from RSVP. The `src/lib/deadline.ts` utility already exists and can be reused directly.

**Alternatives considered**: None — reuse existing proven implementation.

## R7: Apps Script Extension for Traslado Sheet

**Decision**: Extend the existing Apps Script `doPost(e)` handler with a new action `"traslado-submit"`. This handler writes to a sheet named "Traslado" (separate from "RSVP"). The same `RSVP_SECRET` authenticates requests.

**Rationale**: Keeps a single Apps Script deployment. The couple only needs to create a new sheet tab "Traslado" with the appropriate headers. No new deployment URL or secret needed.

**Sheet schema**: Single sheet "Traslado" with columns: `zona | puntoDePartida | whatsapp | nombreCompleto | submittedAt`

**Apps Script addition**:

```javascript
function handleTrasladoSubmit(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Traslado");
  sheet.appendRow([
    data.zona,
    data.puntoDePartida,
    data.whatsapp,
    data.nombreCompleto,
    new Date().toISOString()
  ]);
  return { success: true, submittedAt: new Date().toISOString() };
}
```
