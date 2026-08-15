
import './ProgressBar.css';
import type { BaseProps } from '../../types';

interface ProgressBarProps extends BaseProps {
  progress?: number; // 0 to 100
  indeterminate?: boolean;
}

export function ProgressBar({ progress = 0, indeterminate = false, className = '' }: ProgressBarProps) {
  return (
    <div className={`progress-track ${className}`}>
      <div 
        className={`progress-fill ${indeterminate ? 'progress-indeterminate' : ''}`}
        style={!indeterminate ? { width: `${Math.min(100, Math.max(0, progress))}%` } : undefined}
      />
    </div>
  );
}