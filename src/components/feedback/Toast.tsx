import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';
import { Icon } from '../ui/Icon';
import type { ToastMessage } from '../../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export function Toast({ toasts, removeToast }: ToastProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <Icon name="check" color="var(--color-success)" />;
      case 'error': return <Icon name="alert" color="var(--color-error)" />;
      case 'warning': return <Icon name="alert" color="#ffd166" />;
      case 'info': return <Icon name="info" color="var(--color-accent-secondary)" />;
    }
  };

  return (
    <div className={`toast toast-${toast.type} animate-slide-up`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        {toast.message && <div className="toast-message">{toast.message}</div>}
      </div>
      <button className="toast-close" onClick={onRemove} aria-label="Close">
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}