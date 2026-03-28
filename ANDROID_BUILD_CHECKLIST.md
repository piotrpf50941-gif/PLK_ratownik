# PKP Ratownik v15 — Android build ready checklist

## 1. Hosting
- publish the app over HTTPS
- verify `manifest.webmanifest` loads correctly
- verify `sw.js` is served from the app root
- verify `/.well-known/assetlinks.json` can be published on the same domain

## 2. PWA validation
- install from Chrome on Android
- confirm icon, splash, standalone mode
- test offline screen
- test 112 / 999 / alarm buttons

## 3. TWA / Bubblewrap
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://YOUR-DOMAIN/manifest.webmanifest
bubblewrap build
```

Suggested package name:
- `pl.pkp.ratownik`

Suggested app name:
- `Ratownik PLK`

## 4. assetlinks.json
Publish this file at `https://YOUR-DOMAIN/.well-known/assetlinks.json`

Use your final package name and signing certificate fingerprint.

## 5. Google Play assets
Prepare:
- app icon 512x512
- screenshots from phone
- short description
- full description
- privacy policy

## 6. Final tests
- online and offline launch
- install / reinstall
- history export
- alarm history export
- SMS / tel handoff on Android
