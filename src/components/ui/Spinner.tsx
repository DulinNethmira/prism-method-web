
import './Spinner.css';
import type { BaseProps } from '../../types';

interface SpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`spinner spinner-${size} ${className}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}