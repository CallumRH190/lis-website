import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import SectionRule from '@/components/SectionRule'

export const metadata: Metadata = {
  title: 'About — Leadership Infrastructure Systems',
  description: 'The perspective and approach behind Leadership Infrastructure Systems.',
}

const principles = [
  {
    label: 'Diagnosis before prescription.',
    detail: 'We do not recommend solutions before we understand the structural picture. Every engagement begins with rigorous diagnostic work, not assumptions.',
  },
  {
    label: 'Systems over individuals.',
    detail: 'We do not train leaders. We build the infrastructure that allows leaders to function effectively. The distinction shapes everything we do.',
  },
  {
    label: 'Structure over motivation.',
    detail: 'Organisational problems that look like motivation or culture problems are almost always structural problems in disguise. We look for the infrastructure failure before the character failure.',
  },
  {
    label: 'Implementation over advice.',
    detail: 'Our work is not advisory. We do not produce recommendations and leave. We build the systems that need to exist, and we verify that they work.',
  },
  {
    label: 'Independence as the goal.',
    detail: 'Everything we install is designed to operate without us. We do not build dependency. We build structural capability that lasts.',
  },
]

const whatThis = [
  'A structured diagnostic and implementation methodology',
  'A systematic approach to building leadership infrastructure',
  'A practice grounded in how organisations actually operate',
  'A direct implementation service, not advisory consulting',
]

const whatNot = [
  'Executive coaching or leadership development training',
  'Motivational or transformational consulting',
  'Culture work or values facilitation',
  'Organisational development in the traditional HR sense',
]

const whoWeWorkWith = [
  { label: 'Founders',         detail: 'Experiencing the ceiling of founder-dependent operations.' },
  { label: 'CEOs',             detail: 'Leading organisations through structural scaling transitions.' },
  { label: 'COOs',             detail: 'Responsible for operational architecture and leadership infrastructure.' },
  { label: 'Leadership Teams', detail: 'Scaling organisations with 5–20 person leadership layers experiencing structural friction.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        headline="A methodology-led approach to the structural problems of scaling organisations."
        subtext="Leadership Infrastructure Systems exists because the most common leadership challenges faced by scaling organisations are structural — not personal, not cultural, and not solved by development programmes alone."
        variant="navy"
      />

      {/* ── PERSPECTIVE ───────────────────────────────────────────────── */}
      <section className="section-py bg-white" aria-labelledby="perspective-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionRule />
              <p className="eyebrow mb-5">The Perspective</p>
              <h2
                id="perspective-heading"
                className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance"
              >
                What we see inside scaling organisations.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 lg:pt-14">
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                As companies grow past early-stage, they encounter a predictable set of leadership challenges. Decisions that were once made quickly become slow. Founders who were once across everything become bottlenecks. Teams that operated well at ten people start to fracture at thirty.
              </p>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                The common response is to invest in the people: coaching, training, performance management, culture work. These are not wrong investments. But they address the wrong layer. The limitation is almost never individual capability. It is the structural conditions around those individuals.
              </p>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                When ownership is undefined, the best-intentioned leader cannot take it. When decision rights are unclear, the most capable person will default to escalation. When accountability structures are absent, performance standards drift regardless of individual quality.
              </p>
              <div className="accent-rule-eli pl-6 py-1">
                <p className="font-display font-medium text-navy text-body-lg leading-relaxed">
                  These are infrastructure problems. And they have infrastructure solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ────────────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-labelledby="principles-heading">
        <div className="section-inner">
          <SectionRule />
          <p className="eyebrow mb-10" id="principles-heading">Operating Principles</p>
          <div className="divide-y divide-surface-muted">
            {principles.map((p, i) => (
              <div key={p.label} className="py-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                <div className="lg:col-span-1">
                  <span className="font-body text-label-sm text-eli font-semibold tracking-[0.16em]" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display font-medium text-navy text-body-lg">{p.label}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="font-body text-body-sm text-ink-soft leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT THIS IS / IS NOT ─────────────────────────────────────── */}
      <section className="section-py-sm bg-white" aria-label="What this methodology is and is not">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <SectionRule />
              <p className="eyebrow mb-6">What This Is</p>
              <ul className="space-y-4" role="list">
                {whatThis.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-eli shrink-0 mt-[0.4rem]" aria-hidden="true" />
                    <p className="font-body text-body-sm text-ink-mid leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="w-8 h-px bg-surface-deep mb-8" aria-hidden="true" />
              <p className="eyebrow text-ink-faint mb-6">What This Is Not</p>
              <ul className="space-y-4" role="list">
                {whatNot.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-surface-deep shrink-0 mt-[0.4rem]" aria-hidden="true" />
                    <p className="font-body text-body-sm text-ink-soft/70 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ──────────────────────────────────────────── */}
      <section className="section-py-sm bg-surface border-y border-surface-muted" aria-labelledby="who-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <SectionRule />
              <p className="eyebrow" id="who-heading">Who We Work With</p>
            </div>
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-muted">
                {whoWeWorkWith.map(w => (
                  <div key={w.label} className="bg-white p-6 border-l-[2.5px] border-eli">
                    <h3 className="font-body text-body-sm font-semibold text-navy mb-2">{w.label}</h3>
                    <p className="font-body text-body-sm text-ink-soft leading-relaxed">{w.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="The ELI Snapshot is the starting point."
        subtext="Take 3 minutes to see where leadership pressure is building in your organisation — and whether this methodology is relevant to what you are facing."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        secondaryCTA={{ label: 'Get in touch', href: '/contact' }}
        variant="navy"
      />
    </>
  )
}
