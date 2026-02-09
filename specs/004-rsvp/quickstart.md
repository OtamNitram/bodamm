# Quickstart: RSVP — Confirmación de Asistencia

**Date**: 2026-02-07 | **Branch**: `004-rsvp`

## Prerequisites

- Node.js 18+
- Netlify CLI (`npm i -g netlify-cli`)
- Access to the Google Sheet + Apps Script project (ask Martín)

## Environment Variables

Create a `.env` file in project root (or set in Netlify dashboard for production):

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

> **Note**: `npm run dev` (Astro only) will NOT serve Netlify Functions. Use `netlify dev` for full-stack local development.

## Google Sheets Setup

1. Create a Google Sheet with a sheet named "RSVP"
2. Add headers in row 1: `groupId | firstName | lastName | attending | hasDietaryRestriction | dietaryDescription | submittedAt`
3. Pre-populate rows 2+ with guest data (columns A-C; leave D-G empty)
4. Open Apps Script editor (Extensions → Apps Script)
5. Paste the contents of `specs/004-rsvp/apps-script.js` into the Apps Script editor
6. Set the shared secret: Project Settings → Script Properties → Add `RSVP_SECRET` with the same value as the Netlify env var
7. Deploy the Apps Script as a web app (Execute as: Me, Access: Anyone)
8. Copy the deployment URL → set as `APPS_SCRIPT_URL` env var

## Private Access for the Couple (FR-009)

The couple (Martín & Mariana) access RSVP data directly via Google Sheets:

1. **Share the Google Sheet** only with Martín's and Mariana's Google accounts (Editor access)
2. **Do NOT** share the sheet with "Anyone with the link" — keep it restricted
3. The sheet will auto-populate as guests submit RSVPs (columns D-G filled by Apps Script)
4. **API security**: All Netlify Function → Apps Script requests are authenticated via `X-RSVP-SECRET` header. Requests without the correct secret are rejected with 403.
5. **No public admin panel**: The couple views and manages data directly in Google Sheets — no separate admin UI needed

## Guest Data Seed

Edit `src/data/guests.json` with the guest list. Format:

```json
{
  "groups": [
    {
      "id": "g1",
      "members": [
        { "firstName": "Martín", "lastName": "Mato" },
        { "firstName": "Mariana", "lastName": "Mignone" }
      ]
    }
  ]
}
```

This file is used to:

- Populate the Google Sheet initially (manual or script)
- Reference during development/testing

## Testing

```bash
# Unit tests
npm test

# E2E tests (requires dev server running)
npm run test:e2e
```

## Key Files

| File                               | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| `src/components/Asistencia.tsx`    | Main RSVP section (replaces old version) |
| `src/components/RsvpForm.tsx`      | Search + form + confirmation modal       |
| `src/components/RsvpPopup.tsx`     | Session-based welcome pop-up             |
| `src/lib/rsvp-types.ts`            | TypeScript types                         |
| `src/lib/rsvp-search.ts`           | Name normalization + match logic         |
| `src/lib/calendar.ts`              | ICS file generation                      |
| `src/data/guests.json`             | Guest seed data                          |
| `netlify/functions/rsvp-search.ts` | API: search guest                        |
| `netlify/functions/rsvp-submit.ts` | API: submit RSVP                         |
| `src/config/links.ts`              | WhatsApp URLs + API config               |

## Deployment

Push to `main` branch → Netlify auto-deploys. Ensure environment variables are set in Netlify dashboard.

## Deadline Behavior

After March 25, 2026 23:59 UYT:

- Client: form hidden, only WhatsApp buttons shown
- Server: API returns 410 Gone for search and submit requests
