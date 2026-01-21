# Visual Deviations from Figma Designs

**Feature**: Wedding Landing Page (V1 Static)  
**Date**: 2026-01-21  
**Requirement**: FR-014 - Document any visual deviations with justification

## Summary

This document tracks any intentional deviations from the Figma designs (file qwrm6VDQhaEODfbkZfQ6Kk).

## Documented Deviations

### 1. Spotify Icon Color

- **Location**: Fotos & Temaikenes section, Spotify button
- **Figma**: Uses Spotify brand icon
- **Implementation**: Uses `#1bd75f` (Spotify green) for the music note symbol
- **Justification**: Spotify brand color for visual recognition. Not a constitution color token, but acceptable for third-party brand representation.

### 2. QR Codes

- **Location**: Fotos section, Asistencia section
- **Figma**: Placeholder QR code images
- **Implementation**: Generated functional QR codes linking to actual destinations
- **Justification**: Figma QR codes were placeholders. Real QR codes generated for:
  - Spotify playlist: `https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5`
  - RSVP page: `/rsvp`
  - Photos link: `https://placeholder.com/photos` (to be updated)

### 3. Image Formats

- **Figma**: Various image formats
- **Implementation**:
  - Hero background: PNG (7.4MB - could be optimized to WebP)
  - Section backgrounds: JPG
  - Icons: SVG
  - Patterns: PNG
- **Justification**: Formats preserved from Figma export. Hero image is large and should be optimized for production.

## Recommendations for Future Optimization

1. **Hero Image**: Convert to WebP and add responsive srcset for better performance
2. **Font Loading**: Consider self-hosting Lato font for faster loading
3. **Image Compression**: Run images through optimization pipeline before production

## Verification Status

- [x] All sections match Figma layout structure
- [x] All design tokens (colors, typography) match constitution
- [x] All icons extracted from Figma and served locally
- [x] No Figma asset URLs remain in codebase
