
import { createHashRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { ErrorBoundary } from '../components/feedback/ErrorBoundary';
import { APP_ROUTES } from '../config/constants';
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));
const HowItWorksPage = lazy(() => import('../pages/HowItWorksPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// A simple fallback spinner for lazy loaded routes
const SuspenseFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-secondary)' }}>
    Loading...
  </div>
);

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: (
      <AppShell>
        <ErrorBoundary>
          <div /> {/* Trigger error boundary */}
        </ErrorBoundary>
      </AppShell>
    ),
    children: [
      {
        path: APP_ROUTES.HOME,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.UPLOAD,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <UploadPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.HOW_IT_WORKS,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <HowItWorksPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.PRIVACY,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);