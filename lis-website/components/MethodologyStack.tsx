import Link from 'next/link'

// Framework data is exported so other pages can reference it
// without importing the visual component (e.g. for metadata, loops, etc.)
export const frameworks = [
  {
    id:          'ELI',
    name:        'Executive Leverage Index',
    description: 'Diagnoses how leadership responsibility is distributed across the organisation — measuring decision load, escalation patterns, and ownership gaps.',
    accent:      '#4C6A5E',
    badgeBg:     'rgba(76,106,94,0.08)',
    badgeBorder: 'rgba(76,106,94,0.25)',
    href:        '/eli-snapshot',
  },
  {
    id:          'OCI',
    name:        'Organisational Clarity Index',
    description: 'Measures the structural clarity inside the organisation — role definition, decision authority, communication pathways, and accountability architecture.',
    accent:      '#C8A04A',
    badgeBg:     'rgba(200,160,74,0.08)',
    badgeBorder: 'rgba(200,160,74,0.25)',
    href:        '/methodology#oci',
  },
  {
    id:          'LIMM',
    name:        'Leadership Infrastructure Maturity Model',
    description: 'Maps organisations across five maturity stages — from Founder Dependency to Autonomous Organisation — identifying the structural constraints at each stage.',
    accent:      '#6A4C7D',
    badgeBg:     'rgba(106,76,125,0.08)',
    badgeBorder: 'rgba(106,76,125,0.25)',
    href:        '/methodology#limm',
  },
  {
    id:          'LIS',
    name:        'Leadership Infrastructure Systems',
    description: 'The implementation framework. Installs the ownership structures, decision rights architecture, escalation pathways, and accountability systems that allow leadership to scale.',
    accent:      '#1E2B38',
    badgeBg:     'rgba(30,43,56,0.06)',
    badgeBorder: 'rgba(30,43,56,0.18)',
    href:        '/methodology#lis',
  },
] as const

interface Props {
  /** Reduces vertical padding for tighter contexts (e.g. embedded in a card) */
  compact?: boolean
}

export default function MethodologyStack({ compact = false }: Props) {
  return (
    <div className="divide-y divide-surface-muted" role="list" aria-label="LIS methodology frameworks">
      {frameworks.map((fw, i) => (
        /*
          FIX: fw.href was defined but never used — rows had hover state but
          weren't navigable. Wrapping each row in a Link makes the intent real
          and gives keyboard users a proper interactive target.
          FIX: Moved compact padding to Tailwind conditional classes.
          Only the left border colour needs to stay as inline style (dynamic value).
        */
        <Link
          key={fw.id}
          href={fw.href}
          role="listitem"
          className={`group flex items-start gap-5 lg:gap-7 px-7 lg:px-9
                      hover:bg-surface/60 transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-eli
                      ${compact ? 'py-5' : 'py-6'}`}
          style={{ borderLeft: `2.5px solid ${fw.accent}` }}
        >
          {/* Sequence number — decorative, order conveyed by list semantics */}
          <div
            className="shrink-0 flex items-center justify-center border font-body font-semibold mt-0.5"
            style={{
              width:         '28px',
              height:        '28px',
              borderColor:   fw.accent,
              color:         fw.accent,
              fontSize:      '0.625rem',
              letterSpacing: '0.12em',
            }}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span
                className="fw-badge"
                style={{
                  backgroundColor: fw.badgeBg,
                  borderColor:     fw.badgeBorder,
                  color:           fw.accent,
                }}
              >
                {fw.id}
              </span>
              <h3
                className="font-display font-medium text-navy"
                style={{ fontSize: compact ? '0.9375rem' : '1rem', lineHeight: 1.2 }}
              >
                {fw.name}
              </h3>
            </div>
            {!compact && (
              <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                {fw.description}
              </p>
            )}
          </div>

          {/* Arrow — now meaningful as it's inside a link */}
          <div
            className="shrink-0 text-ink-faint/40 group-hover:text-ink-soft/70 transition-colors duration-150 mt-1 font-body text-sm"
            aria-hidden="true"
          >
            →
          </div>
        </Link>
      ))}
    </div>
  )
}
