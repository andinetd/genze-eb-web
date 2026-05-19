# Faranka Marketing Site

This repository now contains a Next.js marketing site for Faranka plus the OTA update payload used by the app.

## What Changed

- `app/page.js` renders the marketing homepage.
- `app/layout.js` sets the site shell and typography.
- `app/update.json/route.js` serves the OTA config at `/update.json`.
- `update.json` remains the source file for release metadata.

## Run Locally

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open `http://localhost:3000`.

## Update Flow

When you ship a new Android build, update `update.json` with the next `version_code`, `version_name`, release notes, and the APK URL. The homepage and the `/update.json` route now fetch the live file from GitHub at request time, with a local fallback if GitHub is unavailable.

## Deploy

Deploy this site to Vercel or another Next.js host. The OTA endpoint will be available at `/update.json`.

## Automated Release Pipeline

This public repo receives APK builds and version updates automatically from the private [`genzeb`](../genzeb) Flutter repo via GitHub Actions.

**Setup (one-time):**

1. In the private `genzeb` repo, create a **Personal Access Token**:
   - GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Generate new token with **repo** scope
   - Copy the token

2. Add the token as a secret in the private `genzeb` repo:
   - Private repo → **Settings** → **Secrets and variables** → **Actions**
   - New secret named `RELEASE_TOKEN` → paste the token

3. The workflow is already configured in `.github/workflows/build-release.yml`

**Release flow:**

```bash
cd ../genzeb  # Go to private Flutter repo
git tag v1.0.0
git push origin main --tags
```

GitHub Actions will:
- Build the ARM64 APK
- Push it to `public/faranka.apk` in this repo
- Auto-update `update.json` with version info and APK download URL
- Commit and push to this public repo

The site and OTA config stay in sync automatically.
