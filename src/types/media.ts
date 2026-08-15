// Public-safe media type definitions.
// These types describe browser-extractable metadata only.
// Proprietary analysis results (risk scores, optimization plans, etc.) live in prism-method-core.

/** Metadata extracted in the browser without any proprietary processing. */
export interface MediaInfo {
  /** Original filename as provided by the OS. */
  filename: string;
  /** File size in bytes. */
  sizeBytes: number;
  /** MIME type as reported by the browser. May be empty string for unknown types. */
  mimeType: string;
  /** Duration in seconds extracted via HTMLVideoElement. Null if not a video or extraction fails. */
  durationSeconds: number | null;
  /** Natural video width in CSS pixels. Null if extraction fails or file has no video track. */
  width: number | null;
  /** Natural video height in CSS pixels. Null if extraction fails or file has no video track. */
  height: number | null;
  /** True if the video element detected at least one video track. */
  hasVideo: boolean;
  /** True if the video element detected at least one audio track. */
  hasAudio: boolean;
}

// ── Web Worker message protocol ──────────────────────────────────────────────

/** Messages sent TO the media worker. */
export type WorkerInMessage =
  | { type: 'INSPECT'; file: File; limitBytes: number }
  | { type: 'CANCEL' };

/** Messages sent FROM the media worker back to the main thread. */
export type WorkerOutMessage =
  | { type: 'VALIDATION_ERROR'; reason: string }
  | { type: 'PROGRESS'; percent: number; stage: string }
  | { type: 'INSPECTION_COMPLETE' }
  | { type: 'ERROR'; message: string }
  | { type: 'CANCELLED' };

/** Validation error reasons for consumer logic. */
export type ValidationErrorCode =
  | 'FILE_TOO_LARGE'
  | 'UNSUPPORTED_FORMAT'
  | 'EMPTY_FILE'
  | 'READ_ERROR';
