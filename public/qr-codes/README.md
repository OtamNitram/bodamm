# QR Codes - Manual Generation Required

## Task T012: Generate QR codes

Generate QR codes for the following destinations and save as PNG files in this directory:

### 1. Spotify Playlist QR Code

- **Destination URL**: https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5
- **Filename**: `spotify-qr.png`
- **Recommended size**: 512x512px or larger

### 2. RSVP Page QR Code

- **Destination URL**: https://yourdomain.com/rsvp (update with actual domain)
- **Filename**: `rsvp-qr.png`
- **Recommended size**: 512x512px or larger

### 3. Photos Link QR Code

- **Destination URL**: (to be determined - see src/config/links.ts)
- **Filename**: `photos-qr.png`
- **Recommended size**: 512x512px or larger

## QR Code Generation Tools

You can use any of these free tools:

1. **Online**: https://www.qr-code-generator.com/
2. **CLI**: `npm install -g qrcode-terminal` then `qrcode <url> -o <filename>.png`
3. **Node.js**: Use the `qrcode` package programmatically

## Example using qrcode package:

```bash
npm install -g qrcode
qrcode "https://open.spotify.com/playlist/6qJUsnH0MfqoR6q5gUMJi5" -o spotify-qr.png
```

After generating, place all PNG files in this directory.
