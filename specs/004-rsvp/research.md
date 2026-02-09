# Research: RSVP — Confirmación de Asistencia

**Date**: 2026-02-07 | **Branch**: `004-rsvp`

## R1: Netlify Functions with Astro Static

**Decision**: Use `netlify/functions/` directory with TypeScript handlers alongside Astro `output: "static"`.

**Rationale**: Astro static build generates HTML/CSS/JS to `dist/`. Netlify Functions are independent serverless functions deployed alongside the static site. No need for `@astrojs/netlify` adapter (that's for SSR). Functions in `netlify/functions/` are auto-detected by Netlify.

**Alternatives considered**:

- Astro SSR with Netlify adapter → Violates constitution Principle II (static-first)
- Client-side only (no server) → Cannot protect guest list data; CSV on client exposes all names

**Pattern**:

```typescript
// netlify/functions/rsvp-search.ts
import type { Context } from "@netlify/functions";
export default async (req: Request, context: Context) => {
  // Parse query params, search guests, return JSON
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
```

## R2: Google Sheets via Apps Script

**Decision**: Google Apps Script deployed as web app. Netlify Functions call it with shared secret (`X-RSVP-SECRET` header per constitution).

**Rationale**: Constitution mandates Google Sheets storage. Apps Script provides free, no-maintenance API. Couple views data directly in Google Sheets — no admin panel needed.

**Alternatives considered**:

- JSON file on server → No persistent write with static hosting; Netlify Functions are stateless
- Supabase/Firebase → Overkill for ~200 guests; adds external dependency
- Netlify Blobs → Possible but less user-friendly for the couple to view data

**Apps Script endpoints**:

- `doPost(e)`: Receives RSVP submission, writes/overwrites row in sheet
- `doGet(e)`: Searches guest by name+surname, returns group data with existing RSVP status

**Sheet schema**: Single denormalized sheet with columns: groupId, firstName, lastName, attending, hasDietaryRestriction, dietaryDescription, submittedAt.

## R3: Accent/Case-Tolerant Search

**Decision**: Use `String.prototype.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()` for comparison.

**Rationale**: Standard JS Unicode normalization. Strips diacritics (á→a, ñ→n, ü→u) and lowercases. Works for Spanish names. No external library needed.

**Alternatives considered**:

- `Intl.Collator` with sensitivity options → More complex, less predictable for exact match
- External library (lodash `deburr`) → Unnecessary dependency for one function

**Implementation**: Normalize both the search input and stored names, then compare with `===`.

## R4: ICS Calendar Generation

**Decision**: Client-side generation. Build ICS string in browser, trigger download via Blob URL.

**Rationale**: No server needed. ICS format is a simple text spec (RFC 5545). For a single event, it's ~20 lines of text. Keep static-first principle.

**Alternatives considered**:

- Server-side generation via Netlify Function → Unnecessary round-trip for static content
- Google Calendar link → Platform-specific; ICS is universal

**ICS template**:

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260425T203000
DTEND:20260426T040000
SUMMARY:Casamiento Martín & Mariana
LOCATION:Bodega Spinoglio
DESCRIPTION:¡Nos casamos!
END:VEVENT
END:VCALENDAR
```

## R5: Guest Seed Data Format

**Decision**: JSON file at `src/data/guests.json` with groups containing members. Loaded into Google Sheets before launch. Also used by Netlify Functions for search (read from Sheets).

**Rationale**: JSON is easy to edit, version-controlled, and can be imported into Google Sheets. The function reads from Sheets at runtime (source of truth for RSVP state).

**Alternatives considered**:

- CSV → Less structured for nested group/member relationships
- Hardcoded in function → Not maintainable

**Format**:

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

## R6: Session Pop-up (sessionStorage)

**Decision**: Use `sessionStorage.getItem('rsvp-popup-dismissed')` to track if pop-up was shown. Set on dismiss/accept.

**Rationale**: `sessionStorage` clears when tab closes — matches "once per session" requirement. No cookies needed.

**Alternatives considered**:

- `localStorage` → Persists across sessions; pop-up would never show again
- Cookie → Requires cookie consent considerations; overkill

## R7: Deadline Enforcement (Client + Server)

**Decision**: Check date on both client (hide form) and server (reject submissions). Client compares `new Date()` against `2026-03-25T23:59:59-03:00`.

**Rationale**: Client-side check provides immediate UX (form hidden). Server-side check prevents API abuse. Belt and suspenders.

**Alternatives considered**:

- Client-only → Could be bypassed with devtools
- Server-only → Form still visible, confusing UX
