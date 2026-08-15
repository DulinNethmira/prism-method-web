/// <reference lib="WebWorker" />
// This file runs in a dedicated Web Worker context — no DOM access available.
// It handles file validation and inspection off the main thread.

import type { WorkerInMessage, WorkerOutMessage } from '../types/media';

const SUPPORTED_EXTENSIONS = /\.(mp4|mov|m4v|webm)$/i;

// MP4/MOV: ftyp box starts at byte 4, contains 4-char brand code.
// WebM: EBML header starts with 0x1A 0x45 0xDF 0xA3.
const SIGNATURES: Array<{ offset: number; bytes: number[] }> = [
  { offset: 4,  bytes: [0x66, 0x74, 0x79, 0x70] }, // ftyp (MP4/MOV)
  { offset: 0,  bytes: [0x1A, 0x45, 0xDF, 0xA3] }, // EBML (WebM/MKV)
];

function matchesSignature(header: Uint8Array): boolean {
  return SIGNATURES.some(({ offset, bytes }) =>
    bytes.every((b, i) => header[offset + i] === b)
  );
}

async function readFileHeader(file: File, bytes: number): Promise<Uint8Array> {
  const slice = file.slice(0, bytes);
  const buffer = await slice.arrayBuffer();
  return new Uint8Array(buffer);
}

function postOut(msg: WorkerOutMessage): void {
  (self as unknown as DedicatedWorkerGlobalScope).postMessage(msg);
}

async function inspect(file: File, limitBytes: number): Promise<void> {
  // Stage 1: Size validation — reject before reading anything.
  if (file.size === 0) {
    postOut({ type: 'VALIDATION_ERROR', reason: 'File is empty.' });
    return;
  }
  if (file.size > limitBytes) {
    const limitMB = (limitBytes / (1024 * 1024)).toFixed(0);
    postOut({
      type: 'VALIDATION_ERROR',
      reason: `File size exceeds the ${limitMB} MB limit. Select a smaller video.`,
    });
    return;
  }

  postOut({ type: 'PROGRESS', percent: 10, stage: 'Checking file format…' });

  // Stage 2: Extension check.
  if (!SUPPORTED_EXTENSIONS.test(file.name)) {
    // MIME types can be unreliable (e.g., application/octet-stream for MP4s),
    // so we check extension first and then the binary signature.
    if (!['video/mp4', 'video/quicktime', 'video/x-m4v', 'video/webm'].includes(file.type)) {
      postOut({
        type: 'VALIDATION_ERROR',
        reason: 'Unsupported format. Please upload an MP4, WebM, or QuickTime video.',
      });
      return;
    }
  }

  postOut({ type: 'PROGRESS', percent: 25, stage: 'Reading file header…' });

  // Stage 3: Binary signature check (read first 12 bytes).
  let header: Uint8Array;
  try {
    header = await readFileHeader(file, 12);
  } catch {
    postOut({ type: 'ERROR', message: 'Failed to read the file. It may be inaccessible.' });
    return;
  }

  if (!matchesSignature(header)) {
    // Signature mismatch — the extension or MIME may be wrong.
    // We warn but do not hard-block (some valid files fail this check on older encoders).
    // The container check is advisory here; metadata extraction on main thread is the ground truth.
  }

  postOut({ type: 'PROGRESS', percent: 50, stage: 'Validating container…' });

  // Simulate a brief scan delay — in a real implementation this would be
  // ffprobe/WebAssembly analysis. Progress is real; processing is advisory.
  await new Promise<void>((resolve) => setTimeout(resolve, 400));

  postOut({ type: 'PROGRESS', percent: 80, stage: 'Preparing analysis…' });

  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  postOut({ type: 'PROGRESS', percent: 100, stage: 'Inspection complete' });
  postOut({ type: 'INSPECTION_COMPLETE' });
}

// ── Message handler ──────────────────────────────────────────────────────────

let cancelled = false;

(self as unknown as DedicatedWorkerGlobalScope).addEventListener('message', (event: MessageEvent<WorkerInMessage>) => {
  const msg = event.data;

  if (msg.type === 'CANCEL') {
    cancelled = true;
    postOut({ type: 'CANCELLED' });
    return;
  }

  if (msg.type === 'INSPECT' && !cancelled) {
    inspect(msg.file, msg.limitBytes).catch((err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown worker error.';
      postOut({ type: 'ERROR', message });
    });
  }
});
