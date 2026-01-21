# Quickstart: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment  
**Date**: 2026-01-21

## Prerequisites

- GitHub account with access to `OtamNitram/bodamm` repository
- Cloudflare account (free tier is sufficient)

## Setup Steps

### Step 1: Create Cloudflare Account (if needed)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign up with email or use GitHub OAuth
3. No payment method required for Pages free tier

### Step 2: Connect GitHub Repository

1. In Cloudflare dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Click **Connect GitHub** and authorize Cloudflare
3. Select repository: `OtamNitram/bodamm`
4. Click **Begin setup**

### Step 3: Configure Build Settings

Cloudflare auto-detects Astro. Verify these settings:

| Setting                | Value           |
| ---------------------- | --------------- |
| Project name           | `bodamm`        |
| Production branch      | `main`          |
| Framework preset       | Astro           |
| Build command          | `npm run build` |
| Build output directory | `dist`          |

Click **Save and Deploy**.

### Step 4: Wait for Initial Deployment

- Build typically completes in 1-3 minutes
- Watch progress in the Cloudflare dashboard
- On success, site is live at: `https://bodamm.pages.dev`

### Step 5: Verify Deployment

1. Visit `https://bodamm.pages.dev`
2. Confirm the wedding landing page loads
3. Test on mobile device to verify responsive design

### Step 6: Enable Notifications (Optional)

1. In Cloudflare Pages project settings → **Notifications**
2. Enable email notifications for failed deployments
3. GitHub commit status checks are enabled by default

## Verification Checklist

- [ ] Site accessible at `https://bodamm.pages.dev`
- [ ] HTTPS certificate active (automatic)
- [ ] Push to `main` triggers new deployment
- [ ] PR creates preview deployment with unique URL
- [ ] Failed build shows error in GitHub commit status

## Ongoing Usage

### Routine Deployments

No action required. Push to `main` → automatic deployment.

### Preview Deployments

1. Create a pull request
2. Cloudflare automatically deploys preview
3. Preview URL posted as PR comment
4. Preview deleted when PR is closed/merged

### Monitoring

- **Build logs**: Cloudflare dashboard → Pages → Deployments
- **Build status**: GitHub commit status checks (✓/✗)
- **Notifications**: Email (if enabled)

## Troubleshooting

### Build Fails

1. Check Cloudflare dashboard for error logs
2. Common issues:
   - TypeScript errors: Run `npm run build` locally to reproduce
   - Missing dependencies: Ensure `package-lock.json` is committed
   - Node version: Set `NODE_VERSION=18` in environment variables if needed

### Site Not Updating

1. Verify push reached `main` branch on GitHub
2. Check Cloudflare dashboard for deployment status
3. Clear browser cache or use incognito mode

### Preview URL Not Posted

1. Ensure Cloudflare GitHub app has PR comment permissions
2. Check PR for deployment status check instead

## Future: Custom Domain

When ready to add a custom domain:

1. Cloudflare Pages → Project settings → Custom domains
2. Add domain (e.g., `bodamm.com`)
3. Update DNS records as instructed
4. SSL certificate provisioned automatically

## Related Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Astro on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Project Constitution](../../.specify/memory/constitution.md)
