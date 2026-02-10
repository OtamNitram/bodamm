# Data Model: Traslado — La Van Comunitaria

**Date**: 2026-02-10 | **Branch**: `005-traslado`

## Entities

### TransportEntry

A single submission of transport coordination data from a guest.

| Field            | Type                                       | Required | Description                                                                          |
| ---------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------ |
| `zona`           | `"Montevideo"` \| `"Costa de Oro"` \| `"Otro"` | yes      | Zone category selected via chip                                                      |
| `puntoDePartida` | string                                     | yes      | Specific location: barrio (Montevideo), city (Costa de Oro), or free text (Otro)     |
| `whatsapp`       | string                                     | yes      | WhatsApp phone number. Digits and optional `+` prefix. Not validated for reachability |
| `nombreCompleto` | string                                     | yes      | Full name of the guest                                                               |
| `submittedAt`    | ISO 8601 string                            | auto     | Server-generated timestamp at submission time                                        |

### Zone (Static Data)

Zone categories and their dependent options. Not stored — used only for UI rendering.

| Category     | Options Source                  | UI Control |
| ------------ | ------------------------------- | ---------- |
| Montevideo   | `MONTEVIDEO_BARRIOS[]` (static) | Dropdown   |
| Costa de Oro | `COSTA_CIUDADES[]` (static)     | Dropdown   |
| Otro         | N/A — free text                 | Text input |

## Relationships

```
Zone 1 ──── * TransportEntry (via zona + puntoDePartida)
```

- A Zone category has many possible TransportEntries.
- Each TransportEntry belongs to exactly one Zone category.
- No relationship to Guest/Group entities from RSVP (independent feature).

## Validation Rules

### Client-Side

- `zona`: must be one of `"Montevideo"`, `"Costa de Oro"`, `"Otro"` (chip selection required)
- `puntoDePartida`: non-empty string; for Montevideo/Costa de Oro must be a value from the dropdown
- `whatsapp`: non-empty, matches pattern `^\+?[0-9\s-]+$` (digits, optional +, spaces, dashes)
- `nombreCompleto`: non-empty string, trimmed
- Honeypot field: if non-empty → silently fake success (no server call)

### Server-Side

- All client validations repeated
- Deadline check: reject if server date > 2026-03-25T23:59:59-03:00
- Honeypot field: if present and non-empty → reject silently (return fake success)
- `zona` must be one of the three valid values

### Append-Only Behavior

- Each submission creates a new row in the Google Sheet
- No deduplication — multiple submissions from the same person create multiple rows
- Organizers handle duplicates manually via the Google Sheet

## Google Sheets Schema (Storage)

New sheet named "Traslado" (separate tab from "RSVP" in the same spreadsheet):

| Column | Header          | Maps To                      | Notes                                      |
| ------ | --------------- | ---------------------------- | ------------------------------------------ |
| A      | zona            | TransportEntry.zona          | "Montevideo", "Costa de Oro", or "Otro"    |
| B      | puntoDePartida  | TransportEntry.puntoDePartida | Barrio, city name, or free text            |
| C      | whatsapp        | TransportEntry.whatsapp      | Phone number as entered                    |
| D      | nombreCompleto  | TransportEntry.nombreCompleto | Full name as entered                       |
| E      | submittedAt     | TransportEntry.submittedAt   | ISO 8601 timestamp, server-generated       |

Row 1 contains headers. New submissions append to the next empty row.

## State Transitions

### Form Visibility (Client)

```
ACTIVE (before deadline) → EXPIRED (after 2026-03-25) → WhatsApp only
```

### Submission Flow

```
IDLE → SUBMITTING → SUCCESS (alert fades, form resets) → IDLE
IDLE → SUBMITTING → ERROR (WhatsApp fallback shown) → IDLE (user can retry)
```
