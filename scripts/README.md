# Release Sync Scripts

## update-release.js

Publishes a locally built release to the website, mirroring what the CI workflow
(`.github/workflows/build-release.yml` in the genzeb repo) does automatically.

### What it does

1. Reads `version` from `../genzeb/pubspec.yaml` to get:
   - Version name (e.g., `1.1.07`)
   - Version code (build number, e.g., `84`)
2. Locates the freshly built arm64 APK in `../genzeb/build/app/outputs/flutter-apk/`
3. Copies it to `public/faranka.apk`
4. Refuses to run if the published `version_code` in `update.json` is newer than
   the pubspec build number (equal is allowed, to repair/re-publish a version)
5. Rewrites `update.json` with the canonical schema
6. Commits and pushes to `genze-eb-web` so Vercel redeploys

### How to use

The version lives only in `genzeb/pubspec.yaml` (`version: <name>+<code>`).
Bump it before releasing, then:

1. Build the APK in genzeb:
   ```bash
   cd ../genzeb
   flutter build apk --release --target-platform android-arm64
   ```

2. Publish the release to the website:
   ```bash
   cd ../genzeb-website
   npm run sync-release
   ```

3. (Optional) Deploy the website locally if you are not using Vercel auto-deploys:
   ```bash
   npm run build
   npm start
   ```

### Result

The `update.json` file is updated with the version from `pubspec.yaml` and the
newly built APK, then pushed to the website repo. The website serves this
metadata to the Android app for OTA checks and downloads.

### Versioning

- `pubspec.yaml` is the single source of truth for both version name and code.
- CI releases must be tagged `v<version name>` (e.g. `v1.1.07`) matching pubspec.
- `version_code` must strictly increase between releases.
