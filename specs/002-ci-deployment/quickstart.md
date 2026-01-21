# Quickstart: CI/CD Deployment Pipeline

**Feature**: 002-ci-deployment  
**Date**: 2026-01-21

## Prerequisites

- GitHub account with access to `OtamNitram/bodamm` repository
- Netlify account (free tier is sufficient)

## Setup Steps

### Step 1: Create Netlify Account (if needed)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up with email or use GitHub OAuth
3. No payment method required for free tier

### Step 2: Connect GitHub Repository

1. In Netlify dashboard, click **Add new site** → **Import an existing project**
2. Click **Deploy with GitHub** and authorize Netlify
3. Select repository: `OtamNitram/bodamm`
4. Click **Configure site**

### Step 3: Configure Build Settings

Netlify auto-detects Astro. Verify these settings:

| Setting           | Value           |
| ----------------- | --------------- |
| Site name         | `bodamm`        |
| Branch to deploy  | `main`          |
| Build command     | `npm run build` |
| Publish directory | `dist`          |

Click **Deploy site**.

### Step 4: Wait for Initial Deployment

- Build typically completes in 1-3 minutes
- Watch progress in the Netlify dashboard
- On success, site is live at: `https://bodamm.netlify.app`

### Step 5: Verify Deployment

1. Visit `https://bodamm.netlify.app`
2. Confirm the wedding landing page loads
3. Test on mobile device to verify responsive design

### Step 6: Enable Notifications (Optional)

1. In Netlify site settings → **Build & deploy** → **Deploy notifications**
2. Add email notification for failed deployments
3. GitHub commit status checks are enabled by default

## Verification Checklist

- [ ] Site accessible at `https://bodamm.netlify.app`
- [ ] HTTPS certificate active (automatic)
- [ ] Push to `main` triggers new deployment
- [ ] PR creates preview deployment with unique URL
- [ ] Failed build shows error in GitHub commit status

## Ongoing Usage

### Routine Deployments

No action required. Push to `main` → automatic deployment.

### Preview Deployments

1. Create a pull request
2. Netlify automatically deploys preview
3. Preview URL posted as PR comment
4. Preview deleted when PR is closed/merged

### Monitoring

- **Build logs**: Netlify dashboard → Deploys
- **Build status**: GitHub commit status checks (✓/✗)
- **Notifications**: Email (if enabled)

## Troubleshooting

### Build Fails

1. Check Netlify dashboard for error logs
2. Common issues:
   - TypeScript errors: Run `npm run build` locally to reproduce
   - Missing dependencies: Ensure `package-lock.json` is committed
   - Node version: Set `NODE_VERSION=18` in environment variables if needed

### Site Not Updating

1. Verify push reached `main` branch on GitHub
2. Check Netlify dashboard for deployment status
3. Clear browser cache or use incognito mode

### Preview URL Not Posted

1. Ensure Netlify GitHub app has PR comment permissions
2. Check PR for deployment status check instead

## Future: Custom Domain

When ready to add a custom domain:

1. Netlify → Site settings → Domain management
2. Add custom domain (e.g., `bodamm.com`)
3. Update DNS records as instructed
4. SSL certificate provisioned automatically

## Related Documentation

- [Netlify Docs](https://docs.netlify.com/)
- [Astro on Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Project Constitution](../../.specify/memory/constitution.md)
