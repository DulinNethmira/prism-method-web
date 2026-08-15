# Browser Processing Boundary

This document defines the public/private processing boundary for Prism Method browser-side processing.

---

## What the browser can safely do

The following capabilities are implemented in `prism-method-web` and run entirely on the user's device:

| Capability | Implementation | Location |
|---|---|---|
| File size validation | Worker reads `File.size` against configurable limit | `src/workers/mediaWorker.ts` |
| MIME/extension check | Worker checks type and extension | `src/workers/mediaWorker.ts` |
| Binary signature validation | Worker reads first 12 bytes (ftyp/EBML headers) | `src/workers/mediaWorker.ts` |
| Video metadata extraction | Main thread via `HTMLVideoElement` (duration, resolution, tracks) | `src/hooks/useMediaProcessor.ts` |
| Worker lifecycle management | Cancellation, cleanup, object URL revocation | `src/hooks/useMediaProcessor.ts` |

**No video data is ever sent to a remote server.**

---

## What the browser CANNOT safely do

The following capabilities require the private **Prism Engine** (`prism-method-core`) and are NOT implemented here:

| Capability | Reason |
|---|---|
| Codec-level stream analysis (VFR detection, B-frames, GOP structure) | Requires ffprobe; proprietary heuristics in `prism-method-core` |
| Video re-encoding / transcoding | Requires FFmpeg; encoding profiles are proprietary |
| Bitrate analysis and normalization | Proprietary optimization logic |
| Frame-pacing analysis | Proprietary playback-risk engine |
| HDR/color space detection | Requires libav; results feed into proprietary planner |
| Optimization profile selection | Proprietary to `prism-method-core`; must not be exposed publicly |

---

## Future Architecture

When the backend is ready, the boundary will shift:

```
Browser (prism-method-web)
  ↓  HTTPS — file upload (user-authorized)
Prism API  (private)
  ↓
Prism Engine (prism-method-core)  ← proprietary analysis + optimization
  ↓
Validated output → download URL returned to browser
```

The browser layer remains the same. Only the `startOptimization` call in `useMediaProcessor` changes from returning the original file to polling a job API for the optimized result.

---

## Security Notes

- `prism-method-web` is PUBLIC. Every file in this repository must be safe to read by anyone.
- Do not add proprietary scoring, heuristics, or optimization logic to this repository.
- Do not add API keys or backend credentials.
- The Web Worker runs in an isolated context with no access to `document` or `window`.

---

*Last updated: 2026-08-15 — Phase 5 Browser Processing*
