import { Component } from 'react';
import type { ErrorInfo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 'var(--space-8)', display: 'flex', justifyContent: 'center' }}>
          <Card glow style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-error)' }}>Something went wrong</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              An unexpected error occurred. Please try reloading the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}