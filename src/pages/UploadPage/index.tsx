import { useMediaProcessor } from '../../hooks/useMediaProcessor';
import { DragDropZone } from '../../components/ui/DragDropZone';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Icon } from '../../components/ui/Icon';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { formatBytes } from '../../utils/format';
import type { MediaInfo } from '../../types/media';
import { useCompanionStatus } from '../../hooks/useCompanionStatus';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(seconds: number | null): string {
  if (seconds === null) return '—';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatResolution(width: number | null, height: number | null): string {
  if (!width || !height) return '—';
  const label = height >= 2160 ? ' (4K)' : height >= 1440 ? ' (1440p)' : height >= 1080 ? ' (1080p)' : height >= 720 ? ' (720p)' : '';
  return `${width}×${height}${label}`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function MediaInfoCard({ info }: { info: MediaInfo }) {
  const fields: Array<{ label: string; value: string }> = [
    { label: 'Filename', value: info.filename },
    { label: 'Size',     value: formatBytes(info.sizeBytes) },
    { label: 'Type',     value: info.mimeType || 'Unknown' },
    { label: 'Duration', value: formatDuration(info.durationSeconds) },
    { label: 'Resolution', value: formatResolution(info.width, info.height) },
    { label: 'Tracks',   value: [info.hasVideo ? 'Video' : null, info.hasAudio ? 'Audio' : null].filter(Boolean).join(', ') || '—' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
      {fields.map(({ label, value }) => (
        <div key={label} style={{ background: 'rgba(0,0,0,0.25)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', wordBreak: 'break-all' }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

function InspectionProgress({ progress, stage }: { progress: number; stage: string }) {
  return (
    <div style={{ padding: 'var(--space-4) 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>{stage}</span>
        <span style={{ color: 'var(--color-accent-secondary)', fontWeight: 600 }}>{progress}%</span>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UploadPage() {
  const {
    status,
    mediaInfo,
    progress,
    stage,
    errorMessage,
    outputUrl,
    outputFilename,
    startInspection,
    startOptimization,
    cancel,
    reset,
  } = useMediaProcessor();

  const isCompanionInstalled = useCompanionStatus();

  return (
    <div style={{ padding: 'var(--space-12) var(--space-6)', maxWidth: 'var(--layout-max-width)', margin: '0 auto', width: '100%' }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Upload Media</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Prepare your video for publishing. All processing runs locally in your browser.
          </p>
        </div>
        <Badge variant="warning">Beta</Badge>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* ── IDLE ── */}
        {status === 'idle' && (
          <DragDropZone
            onFileSelect={startInspection}
            accept="video/mp4,video/quicktime,video/x-m4v,video/webm"
          />
        )}

        {/* ── EXTRACTING METADATA ── */}
        {status === 'extracting_metadata' && (
          <Card glow style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Reading Metadata</h3>
            <ProgressBar indeterminate />
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              {stage}
            </p>
          </Card>
        )}

        {/* ── INSPECTING (worker progress) ── */}
        {status === 'inspecting' && (
          <Card glow>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
              <h3>Inspecting File</h3>
              <Button variant="ghost" size="sm" onClick={cancel}>
                Cancel
              </Button>
            </div>
            <InspectionProgress progress={progress} stage={stage} />
            {mediaInfo && <MediaInfoCard info={mediaInfo} />}
          </Card>
        )}

        {/* ── READY ── */}
        {status === 'ready' && mediaInfo && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Card glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <Icon name="check" size={22} color="var(--color-success)" />
                  Inspection Complete
                </h3>
                <Button variant="ghost" size="sm" onClick={reset}>
                  Change File
                </Button>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                Your media has passed validation and is ready for optimization.
              </p>
              <MediaInfoCard info={mediaInfo} />
            </Card>

            {/* Disclaimer */}
            <Card style={{ background: 'rgba(155,93,229,0.05)', borderColor: 'rgba(155,93,229,0.25)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                  <Icon name="info" size={22} color="var(--color-accent-secondary)" />
                </div>
                <div>
                  <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-accent-secondary)' }}>
                    What Prism does and does not guarantee
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                    Prism Method optimizes the source file to preserve resolution, frame-rate integrity,
                    and playback reliability. <strong>Prism cannot control TikTok's server-side
                    processing.</strong> The final quality delivered to viewers depends entirely on
                    TikTok's internal encoding policies. No shadow-ban prevention is implied.
                  </p>
                  <div style={{ marginTop: 'var(--space-6)' }}>
                    <Button size="lg" onClick={startOptimization}>
                      Start Optimization
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {status === 'processing' && (
          <Card glow style={{ padding: 'var(--space-10)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Processing Media</h3>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', fontSize: '0.9rem' }}>
              Running output checks and preparing your file for download…
            </p>
            <InspectionProgress progress={progress} stage={stage} />
          </Card>
        )}

        {/* ── SUCCESS ── */}
        {status === 'success' && (
          <Card glow className="animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <div style={{ color: 'var(--color-success)', marginBottom: 'var(--space-4)', filter: 'drop-shadow(0 0 12px rgba(6,214,160,0.4))' }}>
              <Icon name="check" size={64} />
            </div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Optimization Complete</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '480px', margin: '0 auto var(--space-8)' }}>
              Your video is ready. {isCompanionInstalled ? (
                <strong>Prism Companion is active. Open TikTok Studio to upload.</strong>
              ) : (
                <>To complete the workflow, install Prism Companion for upload assistance in TikTok Studio.</>
              )}
              <br /><br />
              Remember — TikTok applies its own server-side encoding after upload.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <Button variant="secondary" onClick={reset}>
                Process Another
              </Button>
              {outputUrl && (
                <a href={outputUrl} download={outputFilename || 'prism_output.mp4'} style={{ textDecoration: 'none' }}>
                  <Button size="lg">
                    <Icon name="download" size={16} style={{ marginRight: '6px' }} />
                    Download Result
                  </Button>
                </a>
              )}
            </div>
          </Card>
        )}

        {/* ── ERROR ── */}
        {status === 'error' && (
          <Card style={{ borderColor: 'rgba(255,77,109,0.3)', background: 'rgba(255,77,109,0.04)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                <Icon name="alert" size={24} color="var(--color-error)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: 'var(--color-error)', marginBottom: 'var(--space-2)' }}>Validation Failed</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
                  {errorMessage || 'An unexpected error occurred.'}
                </p>
                <Button onClick={reset}>Try Another File</Button>
              </div>
            </div>
          </Card>
        )}

        {/* ── CANCELLED ── */}
        {status === 'cancelled' && (
          <Card style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Cancelled</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>
              Processing was cancelled. Your file was not modified.
            </p>
            <Button onClick={reset}>Start Over</Button>
          </Card>
        )}

      </div>
    </div>
  );
}