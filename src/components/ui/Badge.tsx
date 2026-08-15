
import './Badge.css';
import type { BaseProps } from '../../types';

interface BadgeProps extends BaseProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}