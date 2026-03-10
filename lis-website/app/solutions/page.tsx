import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Solutions — The Leadership Infrastructure Service Ladder',
  description: 'From rapid diagnostic to full infrastructure build. A structured pathway for organisations at different stages of readiness.',
}

const services = [
  {
    tier:        '01',
    name:        'ELI Snapshot',
    type:        'Diagnostic',
    description: 'A 3-minute self-assessment that produces an immediate read of where leadership load, escalation patterns, and ownership gaps exist in your organisation.',
    investment:  'No cost',
    duration:    '3 minutes',
    deliverables: [
      'ELI score and dimensional breakdown',
      'Summary structural analysis',
      'Maturity stage indicator',
      'Recommended next step',
    ],
    suitable:    'Suitable for any founder or executive wanting a rapid structural orientation.',
    cta:         { label: 'Take the ELI Snapshot', href: '/eli-snapshot' },
    accent:      '#4C6A5E',
    featured:    false,
  },
  {
    tier:        '02',
    name:        'Deep Diagnostic',
    type:        'Analysis',
    description: 'A structured 60-minute diagnostic session examining the full ELI, OCI, and LIMM picture. Produces a comprehensive infrastructure analysis and recommended implementation pathway.',
    investment:  'Paid session',
    duration:    '60 minutes + written summary',
    deliverables: [
      'Full ELI analysis with dimensional breakdown',
      'OCI structural clarity map',
      'Maturity stage assessment with rationale',
      'Infrastructure gap prioritisation',
      'Written diagnostic report (delivered within 48 hours)',
      'Recommended implementation pathway',
    ],
    suitable:    'For organisations experiencing clear leadership friction and wanting a full diagnostic baseline.',
    cta:         { label: 'Book Deep Diagnostic', href: '/deep-diagnostic' },
    accent:      '#C8A04A',
    featured:    true,
  },
  {
    tier:        '03',
    name:        'Company-Wide Leadership Audit',
    type:        'Audit',
    description: 'A comprehensive diagnostic programme conducted across multiple leadership layers. Combines ELI, OCI, and LIMM assessments with structured interviews to produce an organisation-wide infrastructure map.',
    investment:  'Engagement fee',
    duration:    '2–4 weeks',
    deliverables: [
      'Organisation-wide ELI and OCI analysis',
      'Layer-by-layer maturity mapping',
      'Root cause analysis of structural failure patterns',
      'Prioritised infrastructure gap register',
      'Board-ready diagnostic report',
      'Implementation roadmap',
    ],
    suitable:    'For organisations scaling through a significant structural transition or preparing for rapid growth.',
    cta:         { label: 'Enquire About Audit', href: '/contact' },
    accent:      '#6A4C7D',
    featured:    false,
  },
  {
    tier:        '04',
    name:        'Leadership Infrastructure Build',
    type:        'Implementation',
    description: 'A structured implementation programme that installs the leadership infrastructure systems identified in the diagnostic phase. Operates as a direct build engagement — not advisory.',
    investment:  'Programme fee',
    duration:    '3–6 months',
    deliverables: [
      'Ownership framework design and installation',
      'Decision rights architecture build',
      'Escalation pathway design',
      'Leadership standards framework',
      'Accountability system installation',
      'Communication architecture design',
      'Leadership team alignment programme',
      'Progress review and iteration cycles',
    ],
    suitable:    'For organisations committed to structural change with a defined leadership infrastructure gap to close.',
    cta:         { label: 'Discuss the Build', href: '/contact' },
    accent:      '#1E2B38',
    featured:    false,
  },
] as const

const principles = [
  { label: 'Diagnostic First',         detail: 'Every engagement begins with rigorous diagnosis. We do not recommend solutions before we understand the structural picture clearly.' },
  { label: 'Structured Implementation', detail: 'Our implementation work follows defined frameworks. We install systems, not opinions.' },
  { label: 'No Dependency Created',    detail: 'The infrastructure we build is designed to operate without us. The goal is structural self-sufficiency, not ongoing dependency.' },
] as const

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        label="Solutions"
        headline="A structured pathway from diagnostic to infrastructure build."
        subtext="Four stages of engagement, each designed for a specific level of organisational readiness and intent."
        variant="navy"
      />

      {/* ── PRINCIPLE ROW ─────────────────────────────────────────────── */}
      <section className="section-py-sm bg-white border-b border-surface-muted" aria-label="Our approach">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {principles.map(p => (
              <div key={p.label} className="flex items-start gap-5">
                {/*
                  Fixed: was h-full (requires parent height) + min-h-[4rem].
                  Now uses a fixed-height decorative bar that doesn't depend
                  on parent layout.
                */}
                <div
                  className="w-[2.5px] shrink-0 rounded-sm bg-eli"
                  style={{ minHeight: '4rem', alignSelf: 'stretch' }}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display font-medium text-navy text-body-lg mb-2">{p.label}</h3>
                  <p className="font-body text-body-sm text-ink-soft leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE TIERS ─────────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-label="Service tiers">
        <div className="section-inner">
          <ul className="space-y-6" role="list">
            {services.map(service => (
              <li
                key={service.tier}
                className={`bg-white border border-surface-muted overflow-hidden ${
                  service.featured ? 'ring-1 ring-navy/10' : ''
                }`}
              >
                {service.featured && (
                  <div className="bg-navy px-8 py-2.5">
                    <span className="font-body text-label font-semibold tracking-[0.18em] uppercase text-white/50">
                      Most Commonly Requested
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* ── Left: overview ─────────────────────────────── */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-4 mb-5">
                        <span
                          className="font-body text-label-sm font-semibold tracking-[0.16em] uppercase"
                          style={{ color: service.accent }}
                          aria-hidden="true"
                        >
                          {service.tier}
                        </span>
                        {/* fw-badge replaces framework-pill */}
                        <span
                          className="fw-badge"
                          style={{
                            backgroundColor: `${service.accent}14`,
                            borderColor:     `${service.accent}35`,
                            color:            service.accent,
                          }}
                        >
                          {service.type}
                        </span>
                      </div>

                      <h2 className="font-display font-medium text-navy text-display-sm mb-4">
                        {service.name}
                      </h2>

                      <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-5">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-6 mb-7">
                        <div>
                          <span className="font-body text-label font-semibold text-ink-faint uppercase tracking-[0.15em] block">Investment</span>
                          <span className="font-body text-body-sm font-semibold text-navy">{service.investment}</span>
                        </div>
                        <div className="w-px h-8 bg-surface-muted" aria-hidden="true" />
                        <div>
                          <span className="font-body text-label font-semibold text-ink-faint uppercase tracking-[0.15em] block">Duration</span>
                          <span className="font-body text-body-sm font-semibold text-navy">{service.duration}</span>
                        </div>
                      </div>

                      <p className="font-body text-body-xs text-ink-faint italic mb-8">
                        {service.suitable}
                      </p>

                      {/*
                        CTA button colour:
                        - For navy-accent service (#1E2B38), btn-primary already uses navy → no override needed
                        - For colour-accent services, override background/border inline
                      */}
                      <Link
                        href={service.cta.href}
                        className="btn-primary text-[0.75rem]"
                        style={
                          service.accent !== '#1E2B38'
                            ? { backgroundColor: service.accent, borderColor: service.accent }
                            : undefined
                        }
                      >
                        {service.cta.label}
                      </Link>
                    </div>

                    {/* ── Right: deliverables ────────────────────────── */}
                    <div className="lg:col-span-7">
                      <p className="font-body text-label font-semibold tracking-[0.18em] uppercase text-ink-faint mb-5">
                        Deliverables
                      </p>
                      <ol className="space-y-3">
                        {service.deliverables.map((item, i) => (
                          <li key={item} className="flex items-start gap-4">
                            <span
                              className="shrink-0 font-body text-label-sm font-semibold tracking-[0.16em] mt-0.5"
                              style={{ color: service.accent }}
                              aria-hidden="true"
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-body text-body-sm text-ink-mid leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        headline="The diagnostic is always the starting point."
        subtext="The ELI Snapshot costs nothing and takes 3 minutes. It provides the structural orientation that makes every subsequent decision clearer."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        secondaryCTA={{ label: 'Contact us to discuss', href: '/contact' }}
        variant="navy"
      />
    </>
  )
}
