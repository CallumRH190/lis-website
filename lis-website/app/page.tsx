import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CTASection from '@/components/CTASection'
import MethodologyStack from '@/components/MethodologyStack'
import SectionRule from '@/components/SectionRule'

export const metadata: Metadata = {
  title: 'Leadership Infrastructure for Scaling Organisations',
  description: 'A structured diagnostic that reveals where ownership, decision-making, and leadership load are breaking inside your organisation.',
}

/* ─── Data ────────────────────────────────────────────────────────── */

const symptoms = [
  { id: '01', text: 'Decisions repeatedly escalating to founders or executives that should be resolved at team level.' },
  { id: '02', text: 'Leadership teams overloaded with operational issues rather than focused on strategic direction.' },
  { id: '03', text: 'Strategic priorities consistently interrupted by firefighting and reactive problem-solving.' },
  { id: '04', text: 'Ownership unclear across teams — outcomes without identifiable accountable owners.' },
  { id: '05', text: 'Decisions stalling between departments with no clear resolution pathway.' },
  { id: '06', text: 'Standards applied inconsistently across the organisation, producing unpredictable performance.' },
] as const

const afterDiagnostic = [
  { label: 'Where leadership pressure is concentrated',    detail: 'Understand which parts of your structure are absorbing disproportionate decision load — and why.' },
  { label: 'How decisions move through your organisation', detail: 'See where decisions accelerate, stall, or divert — and what that reveals about your authority structure.' },
  { label: 'Where ownership is unclear or missing',        detail: 'Identify the accountability gaps producing the escalation and ambiguity you are experiencing.' },
  { label: 'How leadership load is distributed',           detail: "Understand whether your organisation's leadership capacity is genuinely distributed or concentrated in a single layer." },
] as const

const whoItIsFor = [
  { role: 'Founder-led Companies', context: 'Scaling beyond the early stage',   detail: 'Organisations where the founding team is reaching the limits of what founder-dependent operations can sustain.', accent: '#4C6A5E' },
  { role: 'CEOs',                  context: 'Experiencing decision bottlenecks', detail: 'Executives who find themselves involved in decisions that should not require their input — and who recognise this as structural.', accent: '#C8A04A' },
  { role: 'COOs',                  context: 'Managing operational complexity',   detail: 'Operations leaders who need a diagnostic baseline before designing structural interventions across the organisation.', accent: '#6A4C7D' },
  { role: 'Leadership Teams',      context: 'Seeking structural clarity',        detail: 'Teams experiencing friction that appears interpersonal but is more likely structural: unclear ownership, undefined authority.', accent: '#1E2B38' },
] as const

// Maturity stages: using explicit text colors instead of element-level opacity.
// Applying opacity to the entire <li> renders navy text at insufficient contrast
// against bg-surface on earlier stages (e.g. 0.55 opacity ≈ 3.0:1, fails WCAG AA).
// Instead we reduce only the decorative stage number opacity, while keeping
// the stage label at full contrast throughout. text-ink-soft passes AA at 5.1:1.
const maturityStages = [
  { stage: '01', label: 'Founder Dependency',      numOpacity: 0.35 },
  { stage: '02', label: 'Emerging Leadership',     numOpacity: 0.45 },
  { stage: '03', label: 'Structured Leadership',   numOpacity: 0.60 },
  { stage: '04', label: 'Distributed Ownership',   numOpacity: 0.75 },
  { stage: '05', label: 'Autonomous Organisation', numOpacity: 1    },
] as const

// Typed so TypeScript catches missing `highlight` values
type LoopStep = { n: string; title: string; sub: string; highlight?: boolean }
const loopSteps: LoopStep[] = [
  { n: '01', title: 'Issue Emerges',          sub: 'A decision or problem surfaces requiring resolution' },
  { n: '02', title: 'Escalated to Executive', sub: 'No clear ownership; routes upward by default', highlight: true },
  { n: '03', title: 'Executive Resolves',     sub: 'Issue resolved — but the structural gap remains' },
  { n: '04', title: 'Pattern Repeats',        sub: 'Same issue recurs. Executive bandwidth erodes.' },
]

const heroStack = [
  { id: 'ELI',  name: 'Executive Leverage Index',     color: '#4C6A5E' },
  { id: 'OCI',  name: 'Organisational Clarity Index', color: '#C8A04A' },
  { id: 'LIMM', name: 'Maturity Model',               color: '#6A4C7D' },
  { id: 'LIS',  name: 'Implementation Framework',     color: '#6e8ca0' },
] as const

// Framework logo cells used twice (stack logos + maturity section)
const frameworkLogos = [
  { src: '/logos/eli-logo.png',  alt: 'Executive Leverage Index (ELI)',                    bg: 'bg-surface'    },
  { src: '/logos/oci-logo.png',  alt: 'Organisational Clarity Index (OCI)',                bg: 'bg-navy-deep'  },
  { src: '/logos/limm-logo.png', alt: 'Leadership Infrastructure Maturity Model (LIMM)',   bg: 'bg-surface'    },
  { src: '/logos/lis-logo.png',  alt: 'Leadership Infrastructure Systems (LIS)',           bg: 'bg-navy-deep'  },
] as const

/* ─── Page ────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="navy-section pt-[5.5rem] pb-20 lg:pt-[7rem] lg:pb-28">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-7">
              <SectionRule />
              <p className="eyebrow mb-5">Executive Diagnostic Platform</p>
              <h1
                className="font-display font-medium text-white text-balance"
                style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.375rem)', lineHeight: 1.07, letterSpacing: '-0.022em' }}
              >
                Leadership Infrastructure for Companies Scaling Under Pressure
              </h1>
              <p className="mt-7 font-body text-body-xl text-white/60 leading-relaxed max-w-[34rem]">
                A structured diagnostic that reveals where ownership, decision-making, and leadership load are breaking inside your organisation.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/eli-snapshot" className="btn-eli px-8 py-3.5 text-[0.8125rem]">
                  Take the 3-Minute Leadership Diagnostic
                </Link>
                {/* btn-ghost-light handles its own text sizing */}
                <Link href="/methodology" className="btn-ghost-light">
                  View the Methodology
                </Link>
              </div>
              <p className="mt-4 font-body text-label text-white/30 tracking-[0.06em]">
                3-minute diagnostic · No account required · Instant result
              </p>
            </div>

            {/* Infrastructure stack — desktop only */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true">
              <div className="border border-white/[0.10] bg-white/[0.03] p-7">
                <p className="eyebrow text-white/30 mb-7">Infrastructure Stack</p>
                {heroStack.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.07] last:border-0"
                  >
                    <div
                      className="w-0.5 self-stretch min-h-[2.25rem] shrink-0 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span
                        className="font-body font-semibold tracking-[0.16em] uppercase block text-label-sm"
                        style={{ color: item.color }}
                      >
                        {item.id}
                      </span>
                      <p className="font-body text-body-sm text-white/55 mt-0.5">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SYMPTOMS
      ══════════════════════════════════════════════════ */}
      <section className="bg-white section-py-sm border-b border-surface-muted">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            <div className="lg:col-span-4 lg:pt-1">
              <SectionRule />
              <p className="eyebrow mb-5">Recognise This?</p>
              <h2 className="font-display font-medium text-navy text-display-sm text-balance">
                Symptoms of leadership infrastructure failure.
              </h2>
              <p className="mt-5 font-body text-body-sm text-ink-soft leading-relaxed">
                These are structural patterns, not management failures. They appear predictably when organisations scale faster than their leadership infrastructure.
              </p>
              <div className="mt-8">
                <Link href="/eli-snapshot" className="btn-primary px-6 py-3 text-[0.75rem]">
                  Run the Diagnostic
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              {/* gap-px mosaic — bg-surface-muted shows through as grid lines */}
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-muted"
                role="list"
                aria-label="Signs of leadership infrastructure failure"
              >
                {symptoms.map((s) => (
                  <li key={s.id} className="bg-white px-7 py-6">
                    <div className="flex items-start gap-4">
                      <span
                        className="shrink-0 font-body font-semibold text-label-sm text-eli/70 mt-0.5"
                        aria-hidden="true"
                      >
                        {s.id}
                      </span>
                      <p className="font-body text-body-sm text-ink-mid leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-label text-ink-faint italic px-1">
                If three or more of these patterns are present, the issue is structural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROBLEM REFRAME
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface section-py">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              <SectionRule />
              <p className="eyebrow mb-5">The Core Problem</p>
              <h2 className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance">
                Leadership problems are usually infrastructure problems.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:pt-14">
              <p className="font-body text-body-lg text-ink-soft leading-relaxed mb-6">
                Most organisations respond to leadership pressure by developing individual leaders — training programmes, coaching engagements, and capability frameworks.
              </p>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed mb-8">
                But leadership effectiveness is determined not only by who occupies leadership roles. It is determined by the systems around them: how decisions are structured, how ownership is assigned, how authority flows, and how accountability is maintained under operational pressure.
              </p>
              <div className="accent-rule-eli pl-6 py-1">
                <p className="font-display font-medium text-navy text-body-lg leading-relaxed">
                  When those systems are absent or poorly designed, organisations experience predictable failure patterns — regardless of individual quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ESCALATION LOOP
      ══════════════════════════════════════════════════ */}
      <section className="bg-white section-py-sm border-y border-surface-muted">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-4">
              <SectionRule />
              <p className="eyebrow mb-5">Structural Failure Pattern</p>
              <h2 className="font-display font-medium text-navy text-display-sm text-balance mb-5">
                The Escalation Dependency Loop
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-5">
                The most common structural failure pattern in scaling organisations. Not caused by poor leadership — caused by absent infrastructure.
              </p>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                Until the underlying structure is diagnosed and closed, the loop continues regardless of individual effort or intent.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-surface border border-surface-muted p-6 sm:p-8">

                {/* Ordered list — conveys sequence to screen readers */}
                <ol
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                  aria-label="Escalation dependency loop steps"
                >
                  {loopSteps.map((step) => (
                    <li
                      key={step.n}
                      className={`border p-5 bg-white ${
                        step.highlight ? 'border-eli/40' : 'border-surface-muted'
                      }`}
                    >
                      <span
                        className="font-body font-semibold text-eli/70 block mb-3 text-label-sm tracking-[0.18em]"
                        aria-hidden="true"
                      >
                        {step.n}
                      </span>
                      <p className="font-body font-semibold text-navy text-body-xs mb-1.5">{step.title}</p>
                      <p className="font-body text-ink-soft text-label leading-snug">{step.sub}</p>
                    </li>
                  ))}
                </ol>

                {/* Return-arc indicator */}
                <div
                  className="mt-3 border border-dashed border-eli/20 px-5 py-2.5 flex items-center gap-3"
                  aria-label="The loop repeats without structural resolution"
                >
                  <div className="flex-1 h-px bg-eli/15" aria-hidden="true" />
                  <p className="font-body text-ink-faint shrink-0 text-label tracking-[0.06em]">
                    ↺&ensp;Loop continues — no structural resolution
                  </p>
                  <div className="flex-1 h-px bg-eli/15" aria-hidden="true" />
                </div>

                <div className="mt-6 pt-6 border-t border-surface-muted flex items-center justify-between gap-6 flex-wrap">
                  <p className="font-body text-ink-soft leading-relaxed max-w-sm text-body-xs">
                    The ELI Snapshot identifies the specific structural gaps sustaining this pattern in your organisation.
                  </p>
                  <Link href="/eli-snapshot" className="btn-eli px-6 py-2.5 shrink-0 text-[0.75rem]">
                    Take the ELI Snapshot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          AUTHORITY
      ══════════════════════════════════════════════════ */}
      <section className="navy-section section-py">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              {/* Consistent SectionRule — same component as every other section */}
              <SectionRule />
              <p className="eyebrow mb-5">Our Approach</p>
              <h2 className="font-display font-medium text-white text-display-sm lg:text-display-md text-balance">
                A structured methodology. Not coaching. Not advisory.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:pt-12">
              <p className="font-body text-body-lg text-white/60 leading-relaxed mb-6">
                Leadership Infrastructure Systems is a diagnostic and implementation methodology for organisations experiencing the structural consequences of scale. Our work begins with rigorous measurement and moves through to implementation — installing the ownership structures, decision rights architecture, and accountability systems that allow leadership to function effectively at scale.
              </p>
              <p className="font-body text-body-lg text-white/60 leading-relaxed mb-10">
                This is not executive coaching. It is structured engineering of the operational infrastructure that surrounds leadership — built to function independently, not to create ongoing dependency.
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.07]">
                {[
                  { label: 'Diagnostic First',        detail: 'Every engagement begins with structured measurement, not assumed solutions.' },
                  { label: 'Systems, Not Individuals', detail: 'We build the infrastructure around leadership, not leadership capability itself.' },
                  { label: 'Independence as the Goal', detail: 'The infrastructure we install is designed to operate without ongoing involvement.' },
                ].map((p) => (
                  <div key={p.label} className="bg-white/[0.04] px-6 py-7">
                    <div className="w-5 h-px bg-eli/70 mb-5" aria-hidden="true" />
                    <dt className="font-body font-semibold text-white text-body-xs mb-2 tracking-[0.02em]">{p.label}</dt>
                    <dd className="font-body text-white/45 text-body-xs leading-relaxed">{p.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ELI + WHAT HAPPENS AFTER
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface section-py">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-6">
              <div className="mb-8">
                <Image
                  src="/logos/eli-logo.png"
                  alt="Executive Leverage Index (ELI)"
                  width={280}
                  height={80}
                  className="h-14 w-auto object-contain object-left"
                  priority
                />
              </div>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed mb-5">
                The ELI is a structured diagnostic that measures how leadership responsibility is distributed across your organisation — and where concentration, gaps, and pressure points exist.
              </p>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed mb-9">
                It is a structural analysis of how your organisation actually operates: who makes decisions, where they stall, and what that pattern reveals about your leadership infrastructure.
              </p>

              <ul className="space-y-3 mb-10" role="list" aria-label="What ELI measures">
                {[
                  'Escalation frequency and patterns',
                  'Executive decision load and availability',
                  'Leadership ownership distribution',
                  'Decision velocity across the structure',
                  'Organisational leverage ratio',
                ].map((m) => (
                  <li key={m} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-eli/70 shrink-0" aria-hidden="true" />
                    <span className="font-body text-body-sm text-ink-mid">{m}</span>
                  </li>
                ))}
              </ul>

              <Link href="/eli-snapshot" className="btn-primary px-7 py-3.5 text-[0.8125rem]">
                Take the ELI Snapshot
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="card p-8 lg:p-10 shadow-card">
                <p className="eyebrow mb-7">What Happens After the Diagnostic</p>
                <ol className="space-y-7" aria-label="Diagnostic outcomes">
                  {afterDiagnostic.map((item, i) => (
                    // key on label — stable and descriptive; avoids key={i}
                    <li key={item.label} className="flex items-start gap-5">
                      <div
                        className="step-badge border-eli text-eli shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-navy text-[0.875rem] mb-1.5">{item.label}</p>
                        <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 pt-7 border-t border-surface-muted">
                  <p className="font-body text-label text-ink-faint mb-4 tracking-[0.03em]">
                    3 minutes · No registration required · Immediate results
                  </p>
                  {/*
                    FIX: was `btn-eli w-full text-center block py-3`
                    `block` overrides `inline-flex` from .btn, breaking flex centering.
                    Use `w-full justify-center` to stretch without breaking flex layout.
                  */}
                  <Link href="/eli-snapshot" className="btn-eli w-full justify-center py-3 text-[0.8125rem]">
                    Take the 3-Minute Diagnostic
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO THIS IS FOR
      ══════════════════════════════════════════════════ */}
      <section className="bg-white section-py">
        <div className="section-inner">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end mb-14">
            <div className="lg:col-span-5">
              <SectionRule />
              <p className="eyebrow mb-5">Who This Is For</p>
              <h2 className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance">
                Organisations experiencing the structural consequences of scale.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pb-1">
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                This work is relevant wherever a growing organisation has outpaced its leadership infrastructure. The specific role matters less than the structural condition: friction, escalation, and slowing decision velocity.
              </p>
            </div>
          </div>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-muted"
            role="list"
          >
            {whoItIsFor.map((profile) => (
              <li key={profile.role} className="bg-white px-7 py-8">
                <div
                  className="w-5 h-[1.5px] mb-7 rounded-sm"
                  style={{ backgroundColor: profile.accent }}
                  aria-hidden="true"
                />
                <h3 className="font-display font-medium text-navy text-[1rem] mb-1.5">
                  {profile.role}
                </h3>
                <p
                  className="font-body font-semibold uppercase tracking-[0.12em] mb-4 text-label-sm"
                  style={{ color: profile.accent }}
                >
                  {profile.context}
                </p>
                <p className="font-body text-body-sm text-ink-soft leading-relaxed">{profile.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-between flex-wrap gap-4 px-1">
            <p className="font-body text-label text-ink-faint">
              Typically organisations with £2M–£50M revenue and leadership teams of 5–20 people.
            </p>
            <Link
              href="/about"
              className="font-body font-semibold text-navy hover:text-eli transition-colors underline underline-offset-4 text-body-xs"
            >
              About the methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          METHODOLOGY STACK
      ══════════════════════════════════════════════════ */}
      <section className="bg-surface section-py">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-4">
              <SectionRule />
              <p className="eyebrow mb-5">The Methodology</p>
              <h2 className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance mb-6">
                Four integrated diagnostic frameworks.
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-8">
                The LIS methodology moves from measurement to implementation — from identifying structural failure patterns to installing the systems that resolve them.
              </p>
              <Link href="/methodology" className="btn-secondary px-6 py-3 text-[0.75rem]">
                View Full Methodology
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="card shadow-card overflow-hidden">
                <MethodologyStack />
              </div>

              {/*
                FIX: was `grid-cols-4` with no responsive breakpoint — 4 logos
                crammed into ~320px on mobile. Now 2×2 on small screens.
              */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-muted">
                {frameworkLogos.map((logo) => (
                  <div
                    key={logo.alt}
                    className={`${logo.bg} p-5 flex items-center justify-center`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={120}
                      height={50}
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MATURITY TEASER
      ══════════════════════════════════════════════════ */}
      <section className="bg-white section-py-sm border-y border-surface-muted">
        <div className="section-inner">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/logos/limm-logo.png"
                  alt="Leadership Infrastructure Maturity Model (LIMM)"
                  width={28}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
                <p className="eyebrow text-limm">Leadership Infrastructure Maturity Model</p>
              </div>
              <h2 className="font-display font-medium text-navy text-xl lg:text-2xl">
                Five stages of organisational leadership maturity.
              </h2>
            </div>
            <Link
              href="/methodology#limm"
              className="font-body font-semibold text-navy hover:text-limm transition-colors underline underline-offset-4 shrink-0 text-body-sm"
            >
              Explore LIMM
            </Link>
          </div>

          {/*
            FIX: opacity floor raised to 0.55 so all text maintains
            sufficient contrast against the bg-surface background.
            Previous floor of 0.38 failed WCAG AA for normal text.
          */}
          <ol
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-surface-muted"
            aria-label="Five maturity stages"
          >
            {maturityStages.map((stage) => (
              <li
                key={stage.stage}
                className="bg-surface px-6 py-7"
              >
                {/* Decorative stage number fades — text-ink-faint at varying opacity */}
                <span
                  className="font-body font-semibold text-ink-faint uppercase tracking-[0.18em] block mb-2.5 text-label-sm"
                  style={{ opacity: stage.numOpacity }}
                  aria-hidden="true"
                >
                  Stage {stage.stage}
                </span>
                {/* Label stays at full contrast (text-ink-soft = 5.1:1 on bg-surface) */}
                <p className="font-display font-medium text-ink-soft text-[0.875rem]">{stage.label}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 font-body text-label text-ink-faint text-right">
            Most scaling organisations sit at Stage 2 or 3. The ELI identifies exactly where.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <CTASection
        headline="Find out where leadership pressure is building in your organisation."
        subtext="Take a 3-minute leadership infrastructure diagnostic and see where decision load, escalation, and ownership gaps are concentrated inside your company."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        secondaryCTA={{ label: 'Book a Deep Diagnostic', href: '/deep-diagnostic' }}
        microcopy="3 minutes · No account required · Instant result"
        variant="navy"
      />
    </>
  )
}
