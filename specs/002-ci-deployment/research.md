# Research: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment  
**Date**: 2026-01-21

## Research Tasks

### 1. Netlify + Astro Integration

**Decision**: Use Netlify with automatic Astro framework detection

**Rationale**:

- Netlify natively supports Astro with zero configuration
- Auto-detects `astro build` command and `dist/` output directory
- No `netlify.toml` required for static-only deployment
- Constitution updated to use Netlify

**Alternatives Considered**:

- **Cloudflare Pages**: Also excellent, but user prefers Netlify
- **Vercel**: Good option, similar features
- **GitHub Pages**: Limited (no serverless functions for future RSVP)

### 2. GitHub Integration for CI/CD

**Decision**: Connect Netlify directly to GitHub repository

**Rationale**:

- Native GitHub OAuth integration in Netlify dashboard
- Automatic deployments on push to `main` branch
- Preview deployments for pull requests (included in free tier)
- No GitHub Actions workflow needed—Netlify handles everything

**Alternatives Considered**:

- **GitHub Actions + Netlify CLI**: More control but unnecessary complexity for this use case
- **Manual deploys**: Violates FR-001 (automatic deployment requirement)

### 3. Build Configuration

**Decision**: Use Netlify's auto-detected settings with minor overrides if needed

**Rationale**:

- Framework preset: `Astro`
- Build command: `npm run build` (maps to `astro check && astro build`)
- Publish directory: `dist`
- Node.js version: 18 (Netlify default, compatible with Astro 5.x)

**Configuration Notes**:

- Environment variable `NODE_VERSION=18` can be set if needed
- No build secrets required for static site
- Future RSVP feature will need `RSVP_SECRET` environment variable

### 4. Preview Deployments

**Decision**: Enable automatic preview deployments for all pull requests

**Rationale**:

- Included in Netlify free tier
- Unique URL per PR (e.g., `deploy-preview-123--bodamm.netlify.app`)
- Automatic cleanup when PR is closed/merged
- Satisfies User Story 4 (P3 priority)

**Configuration**:

- Default behavior—no additional setup required
- Preview URLs posted as GitHub PR comments automatically

### 5. Notification Strategy

**Decision**: Use Netlify's default notifications + GitHub commit status checks

**Rationale**:

- Netlify updates GitHub commit status (✓/✗)
- Email notifications available in Netlify dashboard settings
- Aligns with clarification answer: "Netlify default"
- No Slack/webhook integration needed for solo developer

### 6. Custom Domain (Deferred)

**Decision**: Use Netlify subdomain initially (`bodamm.netlify.app`)

**Rationale**:

- Clarification confirmed subdomain is acceptable
- Custom domain can be added later without breaking existing links
- Netlify handles SSL automatically for both subdomain and custom domains

**Future Steps** (not in scope):

1. Purchase domain (e.g., `bodamm.com`)
2. Add custom domain in Netlify site settings
3. Update DNS records as instructed

### 7. Future-Proofing: Serverless Functions

**Decision**: Architecture supports Netlify Functions for future RSVP

**Rationale**:

- Constitution updated to specify RSVP via Netlify Functions
- Functions are deployed from `netlify/functions/` directory (not created yet)
- No action needed now—just awareness for future feature

**Future Structure**:

```
netlify/
└── functions/
    └── rsvp.ts    # POST /.netlify/functions/rsvp endpoint (future feature)
```

## Resolved Unknowns

| Unknown              | Resolution                            |
| -------------------- | ------------------------------------- |
| Hosting platform     | Netlify (per updated constitution)    |
| CI/CD mechanism      | Native Netlify + GitHub integration   |
| Build command        | `npm run build` (auto-detected)       |
| Publish directory    | `dist` (auto-detected)                |
| Node.js version      | 18 (Netlify default)                  |
| Notification channel | GitHub commit status + email          |
| Custom domain        | Deferred; subdomain acceptable        |
| Docker               | Not needed for static site on Netlify |

## No Remaining NEEDS CLARIFICATION

All technical decisions resolved. Ready for Phase 1.
