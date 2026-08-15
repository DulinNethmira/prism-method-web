export const UPLOAD_LIMIT_BYTES = 300 * 1024 * 1024; // 300 MB

export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-m4v',
  'video/webm'
];

export const APP_ROUTES = {
  HOME: '/',
  UPLOAD: '/upload',
  HOW_IT_WORKS: '/how-it-works',
  PRIVACY: '/privacy',
} as const;

export const THEME = {
  TRANSITION_FAST: 150,
  TRANSITION_BASE: 250,
  TRANSITION_SLOW: 400,
} as const;