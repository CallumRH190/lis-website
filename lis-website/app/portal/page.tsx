import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Client Portal — Leadership Infrastructure Systems',
  description: "Access your organisation's diagnostic data, ELI scores, and progress tracking.",
}

// Placeholder metrics — replace with real API data on integration
const placeholderMetrics = [
  { label: 'ELI Score',        value: '—', subtitle: 'Executive Leverage Index',      color: '#4C6A5E' },
  { label: 'OCI Score',        value: '—', subtitle: 'Organisational Clarity Index',  color: '#C8A04A' },
  { label: 'Maturity Stage',   value: '—', subtitle: 'Current LIMM Stage',            color: '#6A4C7D' },
  { label: 'Last Assessment',  value: '—', subtitle: 'Date of last diagnostic',       color: '#1E2B38' },
] as const

// Placeholder chart bar heights
const chartBars = [30, 45, 40, 55, 60, 70, 65, 75] as const

export default function PortalPage() {
  return (
    /* Full-height flex column — avoids fragile calc(100vh - Npx) */
    <div className="flex-1 bg-surface flex flex-col items-center justify-center py-20 px-6">

      {/* ── Login state ───────────────────────────────────────────────── */}
      <div className="w-full max-w-lg flex flex-col items-center">

        {/* Lock icon */}
        <div
          className="w-16 h-16 border border-surface-muted bg-white flex items-center justify-center mb-8"
          aria-hidden="true"
        >
          <div className="relative">
            <div className="w-6 h-4 border-2 border-navy rounded-t-full" />
            <div className="w-8 h-5 border-2 border-navy flex items-center justify-center">
              <div className="w-1 h-2 bg-navy" />
            </div>
          </div>
        </div>

        <p className="eyebrow mb-4">Client Portal</p>
        <h1 className="font-display font-medium text-navy text-display-sm text-center mb-3">
          Leadership Infrastructure Dashboard
        </h1>
        <p className="font-body text-body-sm text-ink-soft text-center max-w-sm mb-10 leading-relaxed">
          Sign in to access your organisation's diagnostic data, ELI and OCI scores, maturity mapping, and progress tracking.
        </p>

        {/* Login form placeholder */}
        <div className="w-full bg-white border border-surface-muted p-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="portal-email"
                className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2"
              >
                Email Address
              </label>
              <div
                className="border border-surface-muted bg-surface h-11 px-4 flex items-center"
                aria-hidden="true"
              >
                <span className="font-body text-body-sm text-ink-faint/60">your@organisation.com</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="portal-password"
                className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2"
              >
                Password
              </label>
              <div
                className="border border-surface-muted bg-surface h-11 px-4 flex items-center"
                aria-hidden="true"
              >
                <span className="font-body text-body-sm text-ink-faint/60">••••••••</span>
              </div>
            </div>
            <button
              className="btn-primary w-full justify-center"
              disabled
              aria-label="Sign in to portal (not yet integrated)"
            >
              Sign In to Portal
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-muted">
            <p className="font-body text-label text-ink-faint text-center leading-relaxed">
              Portal access is provided to clients following a completed diagnostic engagement.
            </p>
          </div>
        </div>
      </div>

      {/* ── Dashboard preview ─────────────────────────────────────────── */}
      <div className="w-full max-w-4xl mt-20">
        <div className="flex items-center gap-3 mb-6" aria-hidden="true">
          <div className="flex-1 h-px bg-surface-muted" />
          <span className="font-body text-label text-ink-faint tracking-[0.15em] uppercase">Dashboard Preview</span>
          <div className="flex-1 h-px bg-surface-muted" />
        </div>

        {/* Metric cards — decorative preview only */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 opacity-40 pointer-events-none select-none"
          aria-hidden="true"
        >
          {placeholderMetrics.map(metric => (
            <div key={metric.label} className="bg-white border border-surface-muted p-6">
              <div className="w-4 h-px mb-4" style={{ backgroundColor: metric.color }} />
              <div className="font-display font-medium text-navy text-display-md mb-1">{metric.value}</div>
              <div className="font-body text-label font-semibold text-ink-mid">{metric.label}</div>
              <div className="font-body text-label text-ink-faint mt-1">{metric.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div
          className="bg-white border border-surface-muted p-8 opacity-40 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-body text-label font-semibold tracking-[0.15em] uppercase text-ink-faint mb-1">
                Infrastructure Progress
              </p>
              <p className="font-display font-medium text-navy text-body-sm">Maturity Stage Progression Over Time</p>
            </div>
          </div>
          <div className="flex items-end gap-3 h-24">
            {chartBars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-surface-muted"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <p className="font-body text-label text-ink-faint text-center mt-6">
          Full dashboard functionality is available to clients with completed diagnostic engagements.
        </p>
      </div>

      {/* ── Not-yet-a-client nudge ─────────────────────────────────────── */}
      <div className="mt-12 text-center">
        <p className="font-body text-body-sm text-ink-soft mb-4">
          Not yet a client? Start with the diagnostic.
        </p>
        <Link href="/eli-snapshot" className="btn-eli">
          Take the ELI Snapshot
        </Link>
      </div>
    </div>
  )
}
