import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import SectionRule from '@/components/SectionRule'

export const metadata: Metadata = {
  title: 'Deep Diagnostic — Full Structural Leadership Analysis',
  description: "A 60-minute structured session that delivers a comprehensive analysis of your organisation's leadership infrastructure — and a clear pathway to resolution.",
}

const comparisonRows = [
  { dimension: 'Format',       snapshot: '3-minute self-assessment',     deep: '60-minute structured session'            },
  { dimension: 'Depth',        snapshot: 'Rapid structural read',         deep: 'Full ELI, OCI, and LIMM analysis'        },
  { dimension: 'Output',       snapshot: 'Score + brief analysis',        deep: 'Comprehensive infrastructure report'     },
  { dimension: 'Facilitation', snapshot: 'Self-directed',                 deep: 'Expert-facilitated'                      },
  { dimension: 'Next steps',   snapshot: 'Signals and orientation',       deep: 'Specific recommendations and pathway'    },
  { dimension: 'Investment',   snapshot: 'No cost',                       deep: 'Paid session'                            },
] as const

const sessionStructure = [
  {
    segment: 'Context Review',
    duration: '10 min',
    detail: 'Establishing the current state — team structure, scaling stage, and the primary challenges that have been observed.',
  },
  {
    segment: 'ELI Deep Analysis',
    duration: '15 min',
    detail: 'A structured examination of decision distribution, escalation patterns, and executive load using the full Executive Leverage Index framework.',
  },
  {
    segment: 'OCI Structural Review',
    duration: '15 min',
    detail: 'Mapping role clarity, decision authority, and accountability structures using the Organisational Clarity Index.',
  },
  {
    segment: 'Maturity Stage Assessment',
    duration: '10 min',
    detail: 'Placing the organisation on the Leadership Infrastructure Maturity Model and identifying the limiting structural factors at current stage.',
  },
  {
    segment: 'Infrastructure Gaps and Priorities',
    duration: '10 min',
    detail: 'Identifying the specific infrastructure gaps that are causing the most friction — and in what order they should be addressed.',
  },
]

const deliverables = [
  'Full ELI score with dimensional breakdown',
  'OCI structural map showing clarity gaps',
  'Maturity stage placement and rationale',
  'Prioritised infrastructure gap analysis',
  'Recommended implementation pathway',
  'Written diagnostic summary delivered within 48 hours',
]

export default function DeepDiagnosticPage() {
  return (
    <>
      <PageHeader
        label="Deep Diagnostic"
        headline="A structured analysis of your organisation's leadership infrastructure."
        subtext="A 60-minute facilitated session that examines the full ELI, OCI, and maturity picture — and delivers a clear picture of what needs to be built."
        variant="navy"
      />

      {/* ── SNAPSHOT VS DEEP ──────────────────────────────────────────── */}
      <section className="section-py bg-white" aria-labelledby="comparison-heading">
        <div className="section-inner">
          <div className="mb-12">
            <SectionRule />
            <p className="eyebrow mb-5">Snapshot vs Deep Diagnostic</p>
            <h2
              id="comparison-heading"
              className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance max-w-2xl"
            >
              Know when to go deeper.
            </h2>
            <p className="mt-5 font-body text-body-lg text-ink-soft leading-relaxed max-w-2xl">
              The ELI Snapshot provides a rapid read of where pressure is building. The Deep Diagnostic produces a comprehensive structural analysis — the kind of evidence base that supports meaningful organisational change.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-body">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="text-left py-4 px-6 text-label font-semibold tracking-[0.15em] uppercase text-ink-faint border-b border-surface-muted w-1/3">
                    Dimension
                  </th>
                  <th scope="col" className="text-left py-4 px-6 text-label font-semibold tracking-[0.15em] uppercase text-eli border-b border-surface-muted w-1/3">
                    ELI Snapshot
                  </th>
                  <th scope="col" className="text-left py-4 px-6 text-label font-semibold tracking-[0.15em] uppercase text-navy border-b border-surface-muted w-1/3">
                    Deep Diagnostic
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-muted">
                {comparisonRows.map(row => (
                  <tr key={row.dimension} className="hover:bg-surface/50 transition-colors">
                    <td className="py-5 px-6 font-body font-semibold text-body-sm text-navy">{row.dimension}</td>
                    <td className="py-5 px-6 font-body text-body-sm text-ink-soft">{row.snapshot}</td>
                    <td className="py-5 px-6 font-body font-semibold text-body-sm text-navy">{row.deep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SESSION STRUCTURE ─────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-labelledby="session-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionRule />
              <p className="eyebrow mb-5">Session Structure</p>
              <h2
                id="session-heading"
                className="font-display font-medium text-navy text-display-sm mb-6 text-balance"
              >
                A structured 60-minute process.
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                The session follows a defined diagnostic protocol. Each segment examines a specific layer of your leadership infrastructure, building toward a complete structural picture.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ol className="border border-surface-muted bg-white divide-y divide-surface-muted" aria-label="Session segments">
                {sessionStructure.map((segment, i) => (
                  <li
                    key={segment.segment}
                    className="flex items-start gap-6 px-8 py-7 border-l-[2.5px] border-navy"
                  >
                    <div className="shrink-0 text-right w-14">
                      <span className="font-body text-label-sm text-eli font-semibold tracking-[0.16em] block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-label text-ink-faint">{segment.duration}</span>
                    </div>
                    <div>
                      <h3 className="font-body text-body-sm font-semibold text-navy mb-2">{segment.segment}</h3>
                      <p className="font-body text-body-sm text-ink-soft leading-relaxed">{segment.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ──────────────────────────────────────────────── */}
      <section className="section-py bg-white" aria-labelledby="deliverables-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionRule />
              <p className="eyebrow mb-5">What You Receive</p>
              <h2
                id="deliverables-heading"
                className="font-display font-medium text-navy text-display-sm mb-6 text-balance"
              >
                A complete infrastructure diagnostic — not a coaching conversation.
              </h2>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                The Deep Diagnostic produces a written analysis of your leadership infrastructure. Not a summary of opinions, but a structured evidence base for the decisions that follow.
              </p>
            </div>

            <ol className="divide-y divide-surface-muted" aria-label="Diagnostic deliverables">
              {deliverables.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-5 py-5"
                >
                  <span
                    className="step-badge border-eli text-eli shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-body-lg text-ink-mid leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-labelledby="booking-heading">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="border border-surface-muted bg-white p-10 lg:p-14">
            <SectionRule />
            <p className="eyebrow mb-5">Book a Deep Diagnostic</p>
            <h2
              id="booking-heading"
              className="font-display font-medium text-navy text-display-sm mb-6 text-balance"
            >
              Begin with a diagnostic conversation.
            </h2>
            <p className="font-body text-body-lg text-ink-soft leading-relaxed mb-10">
              The Deep Diagnostic is available as a standalone paid session. To book, submit your details below and we will confirm availability and session arrangements within 48 hours.
            </p>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    disabled
                    placeholder="Your name"
                    className="w-full border border-surface-muted bg-surface h-11 px-4 font-body text-body-sm text-ink-faint placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="org" className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2">
                    Organisation
                  </label>
                  <input
                    id="org"
                    type="text"
                    disabled
                    placeholder="Company name"
                    className="w-full border border-surface-muted bg-surface h-11 px-4 font-body text-body-sm text-ink-faint placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  placeholder="your@email.com"
                  className="w-full border border-surface-muted bg-surface h-11 px-4 font-body text-body-sm text-ink-faint placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="context" className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2">
                  Brief context <span className="normal-case text-ink-faint/60">(optional)</span>
                </label>
                <textarea
                  id="context"
                  disabled
                  rows={4}
                  placeholder="Describe the leadership challenges you are experiencing"
                  className="w-full border border-surface-muted bg-surface p-4 font-body text-body-sm text-ink-faint placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors resize-none disabled:cursor-not-allowed"
                />
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  className="btn-primary w-full justify-center"
                  disabled
                  aria-label="Request session (form not yet wired)"
                >
                  Request Deep Diagnostic Session
                </button>
                <p className="mt-4 font-body text-label text-ink-faint text-center">
                  We will confirm availability within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Not ready for a full session? Start with the Snapshot."
        subtext="The ELI Snapshot takes 3 minutes and gives you an immediate read of where leadership pressure is building."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        microcopy="No cost · No registration · Immediate results"
        variant="surface"
      />
    </>
  )
}
