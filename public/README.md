This folder is served statically by Next.js at the site root.

To host the APK with the website:

1. Copy your APK into this folder and name it `faranka.apk` (or update `update.json` with your chosen filename).
2. Commit the APK (or keep it locally) and deploy the site. The APK will be available at `/faranka.apk`.

Notes:
- APK files are binary and can be large; ensure your hosting provider accepts files of this size.
- If you prefer not to commit the APK to the repo, you can upload it by other means to the server's public directory during deployment.

Example `update.json` APK entry:

```
"apk_url": "/faranka.apk"
```

After deployment the download URL will be `https://your-site.com/faranka.apk`.
