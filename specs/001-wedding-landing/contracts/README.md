# API Contracts

**Feature**: Wedding Landing Page (V1 Static)  
**Date**: 2025-12-28

## Overview

This directory contains API contracts for the wedding landing page. Since V1 is a static site with no backend API, these contracts are **placeholders for future implementation** (V2+).

## V1 Status

**No API contracts are implemented in V1.**

The V1 specification explicitly excludes:

- Real RSVP functionality (FR-010: /rsvp page MUST NOT persist or transmit any user data)
- Backend services
- Data persistence
- API endpoints

## Future Contracts (V2+)

When real RSVP functionality is implemented in a future spec, the following contracts will be defined:

### POST /api/rsvp

**Purpose**: Submit RSVP form data to Google Sheets via Cloudflare Function + Apps Script

**Request**:

```typescript
interface RSVPRequest {
  name: string; // Guest name (required)
  attending: boolean; // Attendance confirmation (required)
  guestCount?: number; // Number of guests (optional, if attending)
  dietary?: string; // Dietary restrictions (optional)
  message?: string; // Additional message (optional)
  code?: string; // Tracking code from URL param (optional)
}
```

**Response (Success)**:

```typescript
interface RSVPResponse {
  success: true;
  message: string; // e.g., "¡Listo! Gracias por confirmar"
  submittedAt: string; // ISO 8601 timestamp
}
```

**Response (Error)**:

```typescript
interface RSVPErrorResponse {
  success: false;
  error: string; // Error message
  fallbackUrl: string; // WhatsApp/Telegram URL for manual confirmation
}
```

**Authentication**:

- Shared secret via `X-RSVP-SECRET` header (between Cloudflare Function and Apps Script)

**Rate Limiting**:

- TBD (likely 5 requests per IP per minute)

**Validation Rules**:

- `name`: 1-100 characters, required
- `attending`: boolean, required
- `guestCount`: 1-10, optional (only if attending=true)
- `dietary`: max 500 characters, optional
- `message`: max 1000 characters, optional
- `code`: alphanumeric, max 20 characters, optional

---

## Contract Evolution

When implementing V2 RSVP:

1. Create OpenAPI 3.0 spec: `contracts/rsvp-api.yaml`
2. Define TypeScript types: `contracts/rsvp-types.ts`
3. Document authentication: `contracts/authentication.md`
4. Document Google Sheets schema: `contracts/sheets-schema.md`
5. Update this README with actual implementation details

---

## Related Documents

- **Constitution**: `.specify/memory/constitution.md` (defines RSVP UX principles)
- **V1 Spec**: `specs/001-wedding-landing/spec.md` (explicitly excludes RSVP)
- **Data Model**: `specs/001-wedding-landing/data-model.md` (includes future RSVPSubmission entity)

---

**Note**: This directory exists to maintain consistency with the planning workflow structure. It will be populated when RSVP functionality is specified and implemented in a future feature branch.
