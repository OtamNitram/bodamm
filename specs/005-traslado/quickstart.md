# Quickstart: Traslado — La Van Comunitaria

**Date**: 2026-02-10 | **Branch**: `005-traslado`

## Prerequisites

- Node.js 18+
- Netlify CLI (`npm i -g netlify-cli`)
- Access to the Google Sheet + Apps Script project (ask Martín)
- RSVP feature already deployed (shared Apps Script deployment)

## Environment Variables

Same `.env` as RSVP — no new variables needed:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/<deployment-id>/exec
RSVP_SECRET=<shared-secret-matching-apps-script>
```

## Local Development

```bash
# Install dependencies
npm install

# Run with Netlify Functions support
netlify dev
# This starts Astro dev server + Netlify Functions on http://localhost:8888
```

## Google Sheets Setup (Traslado Tab)

1. Open the existing Google Sheet (same one used for RSVP)
2. Create a new sheet tab named **"Traslado"**
3. Add headers in row 1: `zona | puntoDePartida | whatsapp | nombreCompleto | submittedAt`
4. Leave rows empty — data appends automatically on submission

## Apps Script Update

1. Open the Apps Script editor (Extensions → Apps Script) in the existing project
2. Add the `handleTrasladoSubmit` function from `specs/005-traslado/apps-script.js`
3. Update the `doPost(e)` handler to route `action: "traslado-submit"` to the new function
4. **Re-deploy** the Apps Script as a web app (same URL, new version)

> **Important**: The Apps Script URL does NOT change. Only the code is updated and redeployed.

## Testing

```bash
# Unit tests
npm test

# E2E tests (requires dev server running)
npm run test:e2e
```

## Key Files

| File                                    | Purpose                                            |
| --------------------------------------- | -------------------------------------------------- |
| `src/components/TrasladoForm.tsx`       | NEW: Transport coordination form                   |
| `src/data/zones.ts`                     | NEW: Static zone data (barrios, cities)            |
| `src/lib/traslado-types.ts`             | NEW: TypeScript types for transport submission     |
| `netlify/functions/traslado-submit.ts`  | NEW: API endpoint for transport data submission    |
| `src/components/Nav.tsx`                | UPDATE: Reorder links, add "Traslado"              |
| `src/pages/index.astro`                 | UPDATE: Restructure section order per Figma v2     |
| `src/components/Asistencia.tsx`         | UPDATE: Extract from FotosAsistenciaWrapper        |
| `src/components/FotosAsistenciaWrapper.tsx` | UPDATE: Remove Asistencia, keep Fotos+Temaikenes |
| `src/config/links.ts`                   | UPDATE: Add traslado API endpoint                  |
| `specs/005-traslado/apps-script.js`     | NEW: Apps Script extension for Traslado sheet      |

## Deployment

Push to `main` branch → Netlify auto-deploys. Manually update Apps Script code and redeploy.

## Deadline Behavior

After March 25, 2026 23:59 UYT:

- Client: traslado form hidden, only WhatsApp buttons shown
- Server: API returns 410 Gone for traslado submissions
