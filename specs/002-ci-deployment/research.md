# Research: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment  
**Date**: 2026-01-21

## Research Tasks

### 1. Cloudflare Pages + Astro Integration

**Decision**: Use Cloudflare Pages with automatic Astro framework detection

**Rationale**:

- Cloudflare Pages natively supports Astro with zero configuration
- Auto-detects `astro build` command and `dist/` output directory
- No `wrangler.toml` required for static-only deployment
- Constitution mandates Cloudflare Pages (overrides spec's Netlify recommendation)

**Alternatives Considered**:

- **Netlify**: Excellent Astro support, but constitution specifies Cloudflare
- **Vercel**: Good option, but constitution specifies Cloudflare
- **GitHub Pages**: Limited (no serverless functions for future RSVP)

### 2. GitHub Integration for CI/CD

**Decision**: Connect Cloudflare Pages directly to GitHub repository

**Rationale**:

- Native GitHub OAuth integration in Cloudflare dashboard
- Automatic deployments on push to `main` branch
- Preview deployments for pull requests (included in free tier)
- No GitHub Actions workflow needed—Cloudflare handles everything

**Alternatives Considered**:

- **GitHub Actions + Wrangler CLI**: More control but unnecessary complexity for this use case
- **Manual deploys**: Violates FR-001 (automatic deployment requirement)

### 3. Build Configuration

**Decision**: Use Cloudflare's auto-detected settings with minor overrides if needed

**Rationale**:

- Framework preset: `Astro`
- Build command: `npm run build` (maps to `astro check && astro build`)
- Output directory: `dist`
- Node.js version: 18 (Cloudflare default, compatible with Astro 5.x)

**Configuration Notes**:

- Environment variable `NODE_VERSION=18` can be set if needed
- No build secrets required for static site
- Future RSVP feature will need `RSVP_SECRET` environment variable

### 4. Preview Deployments

**Decision**: Enable automatic preview deployments for all pull requests

**Rationale**:

- Included in Cloudflare Pages free tier
- Unique URL per PR (e.g., `abc123.bodamm.pages.dev`)
- Automatic cleanup when PR is closed/merged
- Satisfies User Story 4 (P3 priority)

**Configuration**:

- Default behavior—no additional setup required
- Preview URLs posted as GitHub PR comments automatically

### 5. Notification Strategy

**Decision**: Use Cloudflare's default notifications + GitHub commit status checks

**Rationale**:

- Cloudflare Pages updates GitHub commit status (✓/✗)
- Email notifications available in Cloudflare dashboard settings
- Aligns with clarification answer: "Netlify default" → equivalent Cloudflare behavior
- No Slack/webhook integration needed for solo developer

### 6. Custom Domain (Deferred)

**Decision**: Use Cloudflare subdomain initially (`bodamm.pages.dev`)

**Rationale**:

- Clarification confirmed subdomain is acceptable
- Custom domain can be added later without breaking existing links
- Cloudflare handles SSL automatically for both subdomain and custom domains

**Future Steps** (not in scope):

1. Purchase domain (e.g., `bodamm.com`)
2. Add custom domain in Cloudflare Pages settings
3. Update DNS records (automatic if domain is on Cloudflare DNS)

### 7. Future-Proofing: Serverless Functions

**Decision**: Architecture supports Cloudflare Pages Functions for future RSVP

**Rationale**:

- Constitution specifies RSVP via Cloudflare Pages Functions
- Functions are deployed from `functions/` directory (not created yet)
- No action needed now—just awareness for future feature

**Future Structure**:

```
functions/
└── api/
    └── rsvp.ts    # POST /api/rsvp endpoint (future feature)
```

## Resolved Unknowns

| Unknown              | Resolution                               |
| -------------------- | ---------------------------------------- |
| Hosting platform     | Cloudflare Pages (per constitution)      |
| CI/CD mechanism      | Native Cloudflare + GitHub integration   |
| Build command        | `npm run build` (auto-detected)          |
| Output directory     | `dist` (auto-detected)                   |
| Node.js version      | 18 (Cloudflare default)                  |
| Notification channel | GitHub commit status + email             |
| Custom domain        | Deferred; subdomain acceptable           |
| Docker               | Not needed for static site on Cloudflare |

## No Remaining NEEDS CLARIFICATION

All technical decisions resolved. Ready for Phase 1.
