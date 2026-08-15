
import { Card } from '../../components/ui/Card';

export default function PrivacyPage() {
  return (
    <div style={{ padding: 'var(--space-12) var(--space-6)', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Privacy Policy</h1>
      
      <Card>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          At Prism Method, we believe your media is your property. Our platform is designed with a privacy-first architecture.
        </p>
        <h3 style={{ margin: 'var(--space-6) 0 var(--space-2)' }}>Local Browser Processing</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          By default, Prism Method processes your video directly on your device using your web browser. We do not upload your media to a remote server for processing unless explicitly required by a specific optimization profile (and you will always be notified beforehand).
        </p>

        <h3 style={{ margin: 'var(--space-6) 0 var(--space-2)' }}>No Analytics or Tracking</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          We do not collect browsing history, implement advertising trackers, or harvest metadata from your videos.
        </p>

        <h3 style={{ margin: 'var(--space-6) 0 var(--space-2)' }}>TikTok Credentials</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Prism Method and Prism Companion will never ask for, collect, or store your TikTok passwords, cookies, or authentication tokens.
        </p>
      </Card>
    </div>
  );
}