# API Contracts: Traslado

**Date**: 2026-02-10 | **Branch**: `005-traslado`

## Overview

One Netlify Function provides the Traslado API. It communicates with Google Sheets via the same Apps Script web app used by RSVP, using a new action `"traslado-submit"`.

---

## POST /.netlify/functions/traslado-submit

Submit transport coordination data. Appends a new row to the "Traslado" Google Sheet.

### Request

```
POST /.netlify/functions/traslado-submit
Content-Type: application/json
```

```json
{
  "zona": "Montevideo",
  "puntoDePartida": "Pocitos",
  "whatsapp": "+598 99 123 456",
  "nombreCompleto": "Juan Pérez",
  "honeypot": ""
}
```

| Field            | Type   | Required | Validation                                                                        |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `zona`           | string | yes      | Must be one of: `"Montevideo"`, `"Costa de Oro"`, `"Otro"`                        |
| `puntoDePartida` | string | yes      | Non-empty. For Montevideo/Costa de Oro: must match a known barrio/city            |
| `whatsapp`       | string | yes      | Non-empty. Pattern: `^\+?[0-9\s-]+$`                                             |
| `nombreCompleto` | string | yes      | Non-empty after trim                                                              |
| `honeypot`       | string | no       | If non-empty, server returns fake success (200 OK) but does NOT persist data      |

### Response — 200 OK (success)

```json
{
  "success": true,
  "submittedAt": "2026-02-10T15:30:00-03:00"
}
```

### Response — 200 OK (honeypot triggered — fake success)

```json
{
  "success": true,
  "submittedAt": "2026-02-10T15:30:00-03:00"
}
```

> Indistinguishable from real success to prevent bot detection of the honeypot.

### Response — 400 Bad Request (validation error)

```json
{
  "error": "validation_error",
  "message": "Todos los campos son obligatorios.",
  "fields": ["whatsapp"]
}
```

### Response — 410 Gone (deadline passed)

```json
{
  "error": "deadline_passed",
  "message": "El plazo para registrar datos de traslado ha vencido (25 de marzo de 2026)."
}
```

### Response — 500 Internal Server Error

```json
{
  "error": "internal_error",
  "message": "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp."
}
```

---

## Apps Script Web App (Internal Extension)

Called by the Netlify Function. Same deployment as RSVP — new action added.

### POST (traslado-submit)

```
POST https://<apps-script-url>
Header: X-RSVP-SECRET: <shared-secret>
Content-Type: application/json
Body: { action: "traslado-submit", zona, puntoDePartida, whatsapp, nombreCompleto }
```

**Apps Script behavior**:

1. Validate secret header
2. Open sheet "Traslado" (create if missing? → No, require pre-creation)
3. Append row: `[zona, puntoDePartida, whatsapp, nombreCompleto, new Date().toISOString()]`
4. Return `{ success: true, submittedAt: <timestamp> }`

### Security

- Same `X-RSVP-SECRET` header as RSVP endpoints
- Secret stored as Netlify environment variable (`RSVP_SECRET`)
- Apps Script URL stored as Netlify environment variable (`APPS_SCRIPT_URL`)
- Honeypot check performed at Netlify Function level (before calling Apps Script)
