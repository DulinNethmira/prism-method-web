
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { APP_ROUTES } from '../../config/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center',
      padding: 'var(--space-6)'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-accent-primary)', marginBottom: 'var(--space-2)' }}>404</h1>
      <h2 style={{ marginBottom: 'var(--space-4)' }}>Page not found</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Button onClick={() => navigate(APP_ROUTES.HOME)}>
        Return to Home
      </Button>
    </div>
  );
}