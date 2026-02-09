# API Contracts: RSVP

**Date**: 2026-02-07 | **Branch**: `004-rsvp`

## Overview

Two Netlify Functions provide the RSVP API. Both communicate with Google Sheets via Apps Script web app.

---

## GET /.netlify/functions/rsvp-search

Search for a guest by first name and last name. Returns the group with all members and their current RSVP status.

### Request

```
GET /.netlify/functions/rsvp-search?firstName=Mart%C3%ADn&lastName=Mato
```

| Param       | Type   | Required | Description        |
| ----------- | ------ | -------- | ------------------ |
| `firstName` | string | yes      | Guest's first name |
| `lastName`  | string | yes      | Guest's last name  |

### Response — 200 OK (found)

```json
{
  "found": true,
  "group": {
    "id": "g1",
    "members": [
      {
        "id": "m1",
        "firstName": "Martín",
        "lastName": "Mato",
        "attending": true,
        "hasDietaryRestriction": false,
        "dietaryDescription": null
      },
      {
        "id": "m2",
        "firstName": "Mariana",
        "lastName": "Mignone",
        "attending": true,
        "hasDietaryRestriction": true,
        "dietaryDescription": "Vegetariana"
      }
    ]
  }
}
```

### Response — 200 OK (not found)

```json
{
  "found": false,
  "group": null
}
```

### Response — 400 Bad Request

```json
{
  "error": "firstName and lastName are required"
}
```

### Response — 410 Gone (deadline passed)

```json
{
  "error": "deadline_passed",
  "message": "El plazo para confirmar asistencia ha vencido (25 de marzo de 2026)."
}
```

### Response — 500 Internal Server Error

```json
{
  "error": "internal_error",
  "message": "Error al buscar invitado. Por favor intentá de nuevo o contactanos por WhatsApp."
}
```

---

## POST /.netlify/functions/rsvp-submit

Submit RSVP data for a group. Overwrites any previous submission.

### Request

```
POST /.netlify/functions/rsvp-submit
Content-Type: application/json
```

```json
{
  "groupId": "g1",
  "members": [
    {
      "id": "m1",
      "attending": true,
      "hasDietaryRestriction": false,
      "dietaryDescription": null
    },
    {
      "id": "m2",
      "attending": true,
      "hasDietaryRestriction": true,
      "dietaryDescription": "Vegetariana"
    }
  ]
}
```

| Field                             | Type           | Required    | Validation                                                 |
| --------------------------------- | -------------- | ----------- | ---------------------------------------------------------- |
| `groupId`                         | string         | yes         | Must match existing group                                  |
| `members`                         | array          | yes         | Must contain all members of the group                      |
| `members[].id`                    | string         | yes         | Must match existing member in group                        |
| `members[].attending`             | boolean        | yes         |                                                            |
| `members[].hasDietaryRestriction` | boolean        | yes         |                                                            |
| `members[].dietaryDescription`    | string \| null | conditional | Required and non-empty if `hasDietaryRestriction === true` |

### Response — 200 OK

```json
{
  "success": true,
  "submittedAt": "2026-02-07T22:30:00-03:00"
}
```

### Response — 400 Bad Request (validation error)

```json
{
  "error": "validation_error",
  "message": "Descripción de restricción alimentaria obligatoria.",
  "fields": ["dietaryDescription"]
}
```

### Response — 404 Not Found

```json
{
  "error": "group_not_found",
  "message": "Grupo no encontrado."
}
```

### Response — 410 Gone (deadline passed)

```json
{
  "error": "deadline_passed",
  "message": "El plazo para confirmar asistencia ha vencido (25 de marzo de 2026)."
}
```

### Response — 500 Internal Server Error

```json
{
  "error": "internal_error",
  "message": "Error al guardar confirmación. Por favor intentá de nuevo o contactanos por WhatsApp."
}
```

---

## Apps Script Web App (Internal)

Called by Netlify Functions. Not exposed to the client.

### GET (search)

```
GET https://<apps-script-url>?action=search&firstName=...&lastName=...
Header: X-RSVP-SECRET: <shared-secret>
```

### POST (submit)

```
POST https://<apps-script-url>
Header: X-RSVP-SECRET: <shared-secret>
Content-Type: application/json
Body: { action: "submit", groupId, members }
```

### Security

- `X-RSVP-SECRET` header validated by Apps Script on every request
- Secret stored as Netlify environment variable (`RSVP_SECRET`)
- Apps Script URL stored as Netlify environment variable (`APPS_SCRIPT_URL`)
