import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import SectionRule from '@/components/SectionRule'
import ELIScoreReveal from '@/components/ELIScoreReveal'

export const metadata: Metadata = {
  title: 'ELI Snapshot — Executive Leverage Index',
  description: 'A 3-minute diagnostic that reveals where decision load, escalation patterns, and ownership gaps are concentrated in your organisation.',
}

const whatItMeasures = [
  {
    id:     '01',
    label:  'Escalation Frequency',
    detail: 'How often decisions are escalating above the level at which they should be resolved — and what this reveals about ownership structure.',
  },
  {
    id:     '02',
    label:  'Executive Decision Load',
    detail: 'The proportion of operational and strategic decisions that depend on founder or executive involvement.',
  },
  {
    id:     '03',
    label:  'Leadership Ownership Distribution',
    detail: 'How clearly ownership of outcomes is assigned across your leadership structure.',
  },
  {
    id:     '04',
    label:  'Decision Velocity',
    detail: 'How quickly decisions move from identification to resolution across different levels of the organisation.',
  },
  {
    id:     '05',
    label:  'Organisational Leverage Ratio',
    detail: 'The degree to which leadership capacity in the organisation extends beyond the founding team.',
  },
]

const whoItIsFor = [
  'Founders and CEOs of companies with 5–20 person leadership teams',
  'COOs identifying where operational bottlenecks originate',
  'Leadership teams experiencing friction as they scale',
  'Organisations preparing for a significant growth phase',
]

const afterCompletion = [
  {
    step:   '01',
    label:  'Receive Your ELI Score',
    detail: 'An immediate score and brief analysis identifying where pressure is concentrated in your leadership structure.',
  },
  {
    step:   '02',
    label:  'Review Structural Signals',
    detail: 'A breakdown of which dimensions are contributing most to your current load — and what this typically indicates structurally.',
  },
  {
    step:   '03',
    label:  'Understand Your Maturity Stage',
    detail: 'A placement on the Leadership Infrastructure Maturity Model based on your diagnostic results.',
  },
  {
    step:   '04',
    label:  'Consider Next Steps',
    detail: 'The option to book a Deep Diagnostic for a full structural analysis and pathway to resolution.',
  },
]

const faqs = [
  {
    q: 'How long does the ELI Snapshot take?',
    a: 'The Snapshot takes approximately 3 minutes to complete. It is a structured set of questions designed to surface patterns in your current leadership distribution.',
  },
  {
    q: 'Is the Snapshot anonymous?',
    a: 'You can complete the Snapshot without creating an account. Results are generated immediately. If you choose to save or revisit your results, a contact detail is required.',
  },
  {
    q: 'What happens after I complete the Snapshot?',
    a: 'You receive an immediate result: your ELI score, a brief structural analysis, and your approximate maturity stage placement. You will have the option to book a Deep Diagnostic if you want a full structural analysis.',
  },
  {
    q: 'Is this relevant for organisations outside a specific industry?',
    a: 'The ELI measures structural patterns in how leadership responsibility is distributed. These patterns exist across sectors. The diagnostic is relevant wherever a leadership team exists and the organisation is scaling.',
  },
  {
    q: 'What is the difference between the Snapshot and the Deep Diagnostic?',
    a: 'The Snapshot provides a rapid structural read. The Deep Diagnostic is a 60-minute structured session that examines the full ELI, OCI, and LIMM picture in detail, and produces a comprehensive infrastructure analysis.',
  },
]

export default function ELISnapshotPage() {
  return (
    <>
      <PageHeader
        label="Executive Leverage Index"
        headline="A 3-minute diagnostic for how leadership load is structured inside your organisation."
        subtext="The ELI Snapshot measures escalation patterns, decision distribution, and ownership clarity — and tells you where leadership pressure is likely to be building."
        variant="navy"
      />

      {/* ── WHAT IT MEASURES ──────────────────────────────────────────── */}
      <section className="section-py bg-white" aria-labelledby="measures-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <SectionRule />
              <p className="eyebrow mb-5">What the ELI Measures</p>
              <h2
                id="measures-heading"
                className="font-display font-medium text-navy text-display-sm text-balance"
              >
                Five dimensions of leadership infrastructure.
              </h2>
              <p className="mt-5 font-body text-body-sm text-ink-soft leading-relaxed">
                The ELI does not measure leadership quality. It measures the structural conditions around leadership — the architecture that determines whether individual capability can translate into organisational performance.
              </p>
            </div>

            {/* Measure list — left border conveys ELI colour without a broken class */}
            <ol className="lg:col-span-8 divide-y divide-surface-muted" aria-label="ELI measurement dimensions">
              {whatItMeasures.map(item => (
                <li
                  key={item.id}
                  className="flex gap-6 pl-6 py-6 border-l-[2.5px] border-eli"
                >
                  <span className="shrink-0 font-body text-label-sm text-eli font-semibold tracking-[0.16em] mt-0.5" aria-hidden="true">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-navy text-body-lg mb-2">{item.label}</h3>
                    <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── ANIMATED SCORE REVEAL ─────────────────────────────────────── */}
      <ELIScoreReveal />

      {/* ── WHO IT IS FOR + WHAT HAPPENS AFTER ───────────────────────── */}
      <section className="section-py bg-surface" aria-label="Audience and outcomes">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionRule />
              <p className="eyebrow mb-5">Who the Snapshot Is For</p>
              <h2 className="font-display font-medium text-navy text-display-sm mb-7">
                Designed for leadership teams in scaling organisations.
              </h2>
              <ul className="space-y-4" role="list">
                {whoItIsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-eli shrink-0 mt-[0.4rem]" aria-hidden="true" />
                    <p className="font-body text-body-sm text-ink-mid leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionRule />
              <p className="eyebrow mb-5">What Happens After</p>
              <h2 className="font-display font-medium text-navy text-display-sm mb-7">
                Immediate results. Structural clarity.
              </h2>
              <ol className="space-y-6">
                {afterCompletion.map(item => (
                  <li key={item.step} className="flex items-start gap-5">
                    <div
                      className="step-badge border-eli text-eli shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-body text-body-sm font-semibold text-navy mb-1">{item.label}</h3>
                      <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASSESSMENT EMBED ──────────────────────────────────────────── */}
      <section id="start" className="section-py bg-white" aria-labelledby="snapshot-heading">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="w-8 h-px bg-eli opacity-50 mx-auto mb-8" aria-hidden="true" />
            <p className="eyebrow mb-5">Executive Leverage Index</p>
            <h2
              id="snapshot-heading"
              className="font-display font-medium text-navy text-display-sm mb-5"
            >
              Start the Snapshot
            </h2>
            <p className="font-body text-body-lg text-ink-soft">
              Complete the 3-minute diagnostic below. Your result will appear immediately upon completion.
            </p>
          </div>

          {/*
            Assessment embed placeholder.
            Replace this div with your Typeform embed, custom React form,
            or native LIS assessment tool.
          */}
          <div
            className="border-2 border-dashed border-surface-muted bg-surface p-16 text-center"
            role="region"
            aria-label="Assessment tool placeholder"
          >
            <div
              className="w-12 h-12 border border-eli flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <div className="w-5 h-5 border-2 border-eli border-t-transparent rounded-full opacity-50" />
            </div>
            <p className="font-body text-body-sm font-semibold text-navy mb-2">Assessment Tool</p>
            <p className="font-body text-label text-ink-faint mb-8 max-w-xs mx-auto leading-relaxed">
              The ELI Snapshot assessment will be embedded here. This placeholder awaits integration with your assessment platform (Typeform, custom form, or LIS-native tool).
            </p>
            <button
              className="btn-primary"
              disabled
              aria-label="Begin assessment (not yet integrated)"
            >
              Begin Assessment →
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-8 text-center" id="faq-heading">Frequently Asked</p>
          <dl className="divide-y divide-surface-muted">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="font-body text-body-sm font-semibold text-navy mb-3">{faq.q}</dt>
                <dd className="font-body text-body-sm text-ink-soft leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection
        headline="Ready to start the diagnostic?"
        subtext="Take the ELI Snapshot and see where leadership pressure is building in your organisation."
        primaryCTA={{ label: 'Start the ELI Snapshot', href: '#start' }}
        secondaryCTA={{ label: 'Book a Deep Diagnostic instead', href: '/deep-diagnostic' }}
        microcopy="3 minutes · No account required · Immediate results"
        variant="navy"
      />
    </>
  )
}
