# Prism Method

Prism Method is a privacy-first video preparation and optimization platform for content creators. Its purpose is to help creators prepare media for publishing by improving video compatibility, encoding efficiency, visual quality preservation, frame-rate integrity, and playback reliability.

## Browser-First Architecture & Privacy

Prism Method is built with a browser-first architecture. User videos are processed locally in the browser using Web Workers and WebAssembly (FFmpeg). **Your videos remain on your device.** 

We do not upload your media to any remote servers, nor do we collect credentials, browsing history, telemetry, tracking pixels, or any unnecessary analytics.

## Supported Workflow

1. **Upload:** Select your source video (up to the **300 MB** initial limit).
2. **Analysis:** Prism analyzes the file locally.
3. **Optimization:** Prism processes and prepares the video for optimal playback reliability.
4. **Download:** The user downloads the resulting file.
5. **Publish:** Use the Prism Companion browser extension alongside TikTok Studio for an assisted publishing experience.

## Limitations

Prism Method is a legitimate media engineering tool. It is **NOT** a TikTok bypass tool.
- We do not bypass TikTok security, authentication, CAPTCHA, or moderation.
- We do not claim to prevent shadow bans or manipulate recommendations.
- We cannot guarantee that TikTok's server-side processing will preserve the exact uploaded resolution or frame rate. 

## Development Setup

The project uses Vite, React, and TypeScript.

### Requirements
- Node.js (v20+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build Commands
To build the static application for production:
```bash
npm run build
```
This runs TypeScript compilation (`tsc -b`) and Vite build (`vite build`).

### Linting
```bash
npm run lint
```

## Deployment

This website is statically hosted using **GitHub Pages**. 
Deployment is handled automatically by GitHub Actions on pushes to the `main` branch. 
Because the application is entirely static and browser-first, no backend, VPS, or database is required.
