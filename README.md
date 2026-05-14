# Faranka Website & OTA Update Hub

This folder contains the marketing website and OTA (Over-The-Air) update configuration for the Faranka app.

## Structure

- `index.html` - Landing page for the app
- `update.json` - OTA update configuration (checked by the app on startup)
- `releases/` - Folder for storing APK files (optional)

## Setup Instructions

### 1. Deploy to GitHub Pages

1. Create a **new public GitHub repo** called `genzeb-website`
2. Push this folder to that repo
3. Go to repo Settings → Pages → Source: Deploy from `main` branch
4. Your site will be live at `https://USERNAME.github.io/genzeb-website/`

### 2. Update the OTA URL in the App

In your Flutter app (`lib/services/ota_update_service.dart`), update:

```dart
final String _jsonUrl = 'https://USERNAME.github.io/genzeb-website/update.json';
```

Replace `USERNAME` with your GitHub username.

### 3. Building and Releasing Updates

When you have a new APK:

```bash
cd /path/to/genzeb
flutter build apk --release
```

Then:
1. Upload the APK to somewhere accessible (Google Drive, Dropbox, or your own server)
2. Update `update.json` with the new version code and APK URL
3. Commit and push to GitHub
4. Users will see the update notification on next app startup

## update.json Format

```json
{
  "version_code": 2,
  "version_name": "1.0.1",
  "release_notes": "Bug fixes and improvements",
  "apk_url": "https://link-to-your-apk.com/app-release.apk"
}
```

**Important:** `version_code` must be higher than the current app version to trigger an update.

## Example Workflow

1. Make changes to the app
2. Increment build number in `pubspec.yaml`: `version: 1.0.0+2`
3. Build APK: `flutter build apk --release`
4. Host APK somewhere (Google Drive public link, etc.)
5. Update `update.json` with new `version_code` and APK URL
6. Push changes to this GitHub repo
7. Users see update prompt on next app launch

## Hosting APKs

### Option 1: Google Drive (Simplest)
1. Upload APK to Google Drive
2. Right-click → Share → Anyone with link can view
3. Copy shareable link, it will be like: `https://drive.google.com/file/d/FILE_ID/view`
4. Convert to direct download: `https://drive.google.com/uc?export=download&id=FILE_ID`

### Option 2: GitHub Releases
1. Create a GitHub Release in your private repo
2. Attach the APK file
3. Use the release download URL in `update.json`

### Option 3: Your Own Server
1. Upload APK to a web server you control
2. Use the direct URL in `update.json`

## Testing Updates

1. Ensure app version in `pubspec.yaml` is lower than `version_code` in `update.json`
2. Run app and go to Settings
3. You should see the update prompt
4. Test the update flow

---

**Note:** Keep this website public (even if your main repo is private) so the app can fetch updates and the landing page is visible to users.
