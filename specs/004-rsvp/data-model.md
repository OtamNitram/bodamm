# Data Model: RSVP — Confirmación de Asistencia

**Date**: 2026-02-07 | **Branch**: `004-rsvp`

## Entities

### Group

Logical grouping of related guests (e.g., couple, family).

| Field         | Type                    | Required | Description                                                 |
| ------------- | ----------------------- | -------- | ----------------------------------------------------------- |
| `id`          | string                  | yes      | Unique group identifier (e.g., "g1", "g2")                  |
| `submittedAt` | ISO 8601 string \| null | no       | Timestamp of last RSVP submission. Null if never submitted. |

### Guest (Member of a Group)

Individual person invited to the event.

| Field                   | Type            | Required | Description                                                          |
| ----------------------- | --------------- | -------- | -------------------------------------------------------------------- |
| `id`                    | string          | yes      | Unique guest identifier (e.g., "m1", "m2")                           |
| `groupId`               | string          | yes      | FK → Group.id                                                        |
| `firstName`             | string          | yes      | Guest first name (as appears on invitation)                          |
| `lastName`              | string          | yes      | Guest last name (as appears on invitation)                           |
| `attending`             | boolean \| null | no       | `true` = confirmed, `false` = declined, `null` = not yet responded   |
| `hasDietaryRestriction` | boolean         | no       | Whether guest has dietary restrictions. Default: `false`.            |
| `dietaryDescription`    | string \| null  | no       | Free text description. Required if `hasDietaryRestriction === true`. |

## Relationships

```
Group 1 ──── * Guest
```

- A Group contains 1 or more Guests.
- A Guest belongs to exactly 1 Group.
- Search returns a Group (with all its Guests) based on matching any Guest's firstName + lastName.

## Validation Rules

### Search

- Input: `firstName` + `lastName` (both required, non-empty)
- Match: exact after normalization (lowercase + strip diacritics)
- No typeahead; no partial matching

### RSVP Submission

- At least one guest in the group must have `attending` set (not all null)
- If `hasDietaryRestriction === true` → `dietaryDescription` must be non-empty
- Deadline check: submission rejected if server date > 2026-03-25T23:59:59-03:00

### Overwrite Behavior

- Re-submission for the same group overwrites all previous data for that group
- `submittedAt` is updated to current timestamp

## Google Sheets Schema (Storage)

Single sheet named "RSVP" with denormalized rows (one row per guest):

| Column                   | Maps To                     | Notes              |
| ------------------------ | --------------------------- | ------------------ |
| A: groupId               | Group.id                    |                    |
| B: firstName             | Guest.firstName             |                    |
| C: lastName              | Guest.lastName              |                    |
| D: attending             | Guest.attending             | TRUE/FALSE/empty   |
| E: hasDietaryRestriction | Guest.hasDietaryRestriction | TRUE/FALSE         |
| F: dietaryDescription    | Guest.dietaryDescription    |                    |
| G: submittedAt           | Group.submittedAt           | ISO 8601 timestamp |

Pre-populated with all guests (columns A-C filled, D-G empty). RSVP submission fills/overwrites columns D-G for all group members.

## State Transitions

### Guest Attendance

```
null (not responded) → true (attending) → false (declined) [or vice versa on re-submit]
```

### Form Visibility (Client)

```
ACTIVE (before deadline) → EXPIRED (after 2026-03-25) → WhatsApp only
```
