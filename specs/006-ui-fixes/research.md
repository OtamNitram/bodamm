# Research: UI Fixes — V2 Design Alignment & UX Polish

**Branch**: `006-ui-fixes` | **Date**: 2026-02-10

## Research Topics

This is a UI fix batch with no major architectural unknowns. Research focuses on best-practice patterns for the three implementation decisions that required investigation.

---

### 1. Body Scroll Lock for Modals

**Decision**: Use a custom `useScrollLock` React hook that toggles `overflow: hidden` on `document.body` when the modal or overlay is visible.

**Rationale**:
- The simplest approach that works cross-browser and cross-device is setting `document.body.style.overflow = 'hidden'` when the modal opens and restoring it on close.
- On iOS Safari, an additional `position: fixed` + `top` offset trick may be needed to prevent background scroll-through (a known iOS Safari bug).
- A custom hook keeps the logic reusable across `RsvpConfirmModal` (confirming state) and the submitting overlay in `RsvpForm`.
- The hook must restore scroll on unmount (cleanup in `useEffect`) to prevent scroll being permanently locked if the component unmounts unexpectedly.

**Alternatives considered**:
- **`body-scroll-lock` npm package**: Adds a dependency for a simple task; violates constitution constraint of no new JS dependencies.
- **CSS `overscroll-behavior: contain` on modal**: Only prevents scroll chaining, does not fully lock background scroll on all browsers.
- **Dialog element with `showModal()`**: Would require refactoring the modal to use `<dialog>`, which natively handles scroll lock in modern browsers. However, the existing React component pattern works well and dialog refactor is out of scope.

---

### 2. .ics Calendar MIME Type Handling

**Decision**: Keep the existing `Blob` approach with explicit `text/calendar;charset=utf-8` MIME type. Ensure the generated blob URL is opened via `window.open()` or anchor navigation rather than forced download, so mobile OS handlers can intercept the calendar content type.

**Rationale**:
- The current implementation uses `new Blob([ics], { type: "text/calendar;charset=utf-8" })` and triggers `a.click()` with `a.download` set. The `download` attribute forces a file save on desktop, which is fine.
- On mobile, the `download` attribute behavior varies: iOS Safari often ignores it and opens the .ics in the calendar app; Android Chrome respects it and downloads the file, but the file then opens in the calendar app when tapped in the download tray.
- The simplest improvement is to keep the current approach as-is — it already works for the native calendar use case on mobile. No code change needed for FR-011/012 beyond verifying the MIME type is correct (which it already is).

**Alternatives considered**:
- **`webcal://` protocol**: Requires hosting the .ics file at a URL, adds server-side complexity. Overkill for a single-event one-time-use calendar entry.
- **Google Calendar deep link**: Would only work for Google Calendar users, not Apple Calendar or others. Adds platform-specific logic.
- **Dual button (Google Calendar + .ics)**: Adds UI complexity for minimal gain given the audience size.

---

### 3. Zone Chips Segmented Control Layout

**Decision**: Replace the current `flex-wrap gap-3` chip layout with a flush segmented control using `flex` with `gap-0` (or `gap-px`) and adjusted border-radius so only the first chip has left rounding and the last has right rounding, creating a unified button-group.

**Rationale**:
- The "magnetized" (imantados) requirement from the user means chips should be visually connected, forming a single segmented control rather than individual floating pills.
- Standard pattern: remove individual `rounded-full` from each chip, apply `rounded-l-full` to first, `rounded-r-full` to last, and no rounding on middle chips. Use `gap-[1px]` or shared border to create the 1-2px visual separator.
- This pattern is common in mobile UI (iOS segmented control, Material toggle buttons) and feels natural for a 3-option exclusive selection.

**Alternatives considered**:
- **Horizontal scroll**: Unnecessary since only 3 chips easily fit on 375px viewport.
- **Full-width stacked**: Wastes vertical space and breaks the quick-selection UX.
- **Keep gap-3 but reduce**: Still looks like separate pills, doesn't achieve the "magnetized" feel.

---

### 4. Transport Success Screen Aesthetics

**Decision**: Model the transport success screen after `RsvpSuccessMessage.tsx` — reuse the same visual structure: card container with white/20 background, checkmark icon in eucalyptus circle, Dancing Script heading, body text, and two buttons (primary filled + outlined secondary).

**Rationale**:
- The RSVP success screen already exists and works well. Matching its pattern creates visual consistency without inventing new components.
- The transport success heading can be "¡Datos guardados!" with body text "Nos pondremos en contacto para coordinar el traslado."
- Two buttons: "Enviar otros datos" (outlined, to re-fill form) — no calendar button needed for transport.
- Remove the `setTimeout(resetForm, 5000)` and replace with explicit user action.

**Alternatives considered**:
- **Shared `SuccessMessage` component**: Could extract a reusable component from `RsvpSuccessMessage.tsx`. However, the two success screens have different button sets (RSVP has calendar + modify; transport has just re-fill). Keeping them as separate but visually aligned components is simpler and avoids over-abstraction for just two instances.

---

### 5. Button Component Reuse for Success Screens

**Decision**: The existing `Button.tsx` component already matches Figma v2 specs for the Default variant (min-h 40px, px 16px, py 8px, rounded 12px, 14px Lato SemiBold). The success screen buttons in `RsvpSuccessMessage.tsx` currently use inline Tailwind classes with **different** sizing (min-h 44px, px 24px, text-16px for calendar; min-h 40px, px 24px, text-14px for modify). These must be normalized to match the `Button.tsx` base styles.

**Rationale**:
- `Button.tsx` already implements the Figma v2 button spec correctly. The success screen buttons deviate because they were built with inline classes rather than using the component.
- The `Button.tsx` component is an `<a>` tag (link-based). For the success screen, we need `<button>` elements (onClick handlers, not links). Adding an `Outlined` variant to `Button.tsx` and supporting both `<a>` and `<button>` renders would be ideal but may be over-engineering for two buttons.
- Simpler approach: Normalize the inline Tailwind classes on the success screen buttons to match `Button.tsx` base styles exactly. This is a direct fix without component refactoring.

**Alternatives considered**:
- **Refactor `Button.tsx` to support `<button>` and outlined variant**: Cleaner long-term but adds scope to a bug-fix batch. Can be deferred.
- **Create `ButtonAction` component for non-link buttons**: Adds a new component; violates the "0 new components" goal of this fix batch.

---

## Summary of Decisions

| Area | Decision | Impact |
|------|----------|--------|
| Scroll lock | Custom `useScrollLock` hook with `overflow: hidden` on body | 1 new hook file, ~20 lines |
| Calendar .ics | Keep current implementation as-is (MIME type already correct) | 0 code changes |
| Zone chips | Flush segmented control with shared borders, per-position rounding | CSS-only changes in TrasladoForm |
| Transport success | Mirror RSVP success visual pattern, remove auto-dismiss timer | Modify TrasladoForm success branch |
| Button consistency | Normalize inline classes to match Button.tsx base styles | Modify RsvpSuccessMessage |
