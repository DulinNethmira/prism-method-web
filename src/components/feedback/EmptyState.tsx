import './EmptyState.css';
import { Icon } from '../ui/Icon';
import type { IconName } from '../ui/Icon';
import type { BaseProps } from '../../types';

interface EmptyStateProps extends BaseProps {
  icon?: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      {icon && (
        <div className="empty-state-icon">
          <Icon name={icon} size={48} color="var(--color-accent-primary)" />
        </div>
      )}
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-description">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}