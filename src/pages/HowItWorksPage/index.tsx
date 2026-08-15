
import { Card } from '../../components/ui/Card';

export default function HowItWorksPage() {
  return (
    <div style={{ padding: 'var(--space-12) var(--space-6)', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>How it Works</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <Card>
          <h2 className="text-gradient">1. Analysis</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            Prism Method analyzes your source media directly in your browser. We examine the codec, container, bitrate, frame rate, and other technical properties to determine the most effective optimization path.
          </p>
        </Card>

        <Card>
          <h2 className="text-gradient">2. Optimization</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            Based on the analysis, we apply targeted optimizations. We don't indiscriminately re-encode every video. If your source media is already compatible, we leave it untouched.
          </p>
        </Card>

        <Card>
          <h2 className="text-gradient">3. Validation</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
            Before you download the file, we perform a series of checks to ensure playback reliability, proper audio synchronization, and decoder compatibility.
          </p>
        </Card>
      </div>
    </div>
  );
}