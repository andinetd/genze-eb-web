# Release Sync Scripts

## update-release.js

Automatically syncs release metadata from the **genzeb** project to the website.

### What it does

1. Reads `pubspec.yaml` from `../genzeb/` to extract:
   - Version name (e.g., `1.0.0`)
   - Version code (e.g., `1`)
2. Finds the latest APK in `../genzeb/build/app/outputs/flutter-apk/`
3. Updates `update.json` with the new metadata
4. Records a `last_updated` timestamp

### How to use

After building a new APK in genzeb, run:

```bash
npm run sync-release
```

Or directly:

```bash
node scripts/update-release.js
```

### Workflow

1. Build the APK in genzeb:
   ```bash
   cd ../genzeb
   flutter build apk --release
   ```

2. Sync the release to the website:
   ```bash
   cd ../genzeb-website
   npm run sync-release
   ```

3. Deploy the website:
   ```bash
   npm run build
   npm start
   ```

### Result

The `update.json` file is updated with:
- Current version from genzeb
- Path to the freshly built APK
- Timestamp of the sync

The website then automatically serves this metadata to the Android app for OTA checks and download links.
