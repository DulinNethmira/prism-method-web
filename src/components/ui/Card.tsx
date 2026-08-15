
import './Card.css';
import type { BaseProps } from '../../types';

interface CardProps extends BaseProps {
  glow?: boolean;
}

export function Card({ children, className = '', glow = false, ...props }: CardProps) {
  return (
    <div className={`card ${glow ? 'card-glow' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}