import type { ReactNode, CSSProperties } from 'react';

export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}