'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Step {
  n:          string
  title:      string
  sub:        string
  highlight?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  { n: '01', title: 'Issue Emerges',          sub: 'A decision or problem surfaces requiring resolution' },
  { n: '02', title: 'Escalated to Executive', sub: 'No clear ownership; routes upward by default', highlight: true },
  { n: '03', title: 'Executive Resolves',     sub: 'Issue resolved — but the structural gap remains' },
  { n: '04', title: 'Pattern Repeats',        sub: 'Same issue recurs. Executive bandwidth erodes.' },
]

// Delay (ms) at which each step illuminates after scroll-trigger
const STEP_DELAYS  = [200, 750, 1300, 1850]
const ARC_DELAY    = 2450
const FOOTER_DELAY = 2800

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInViewOnce(threshold = 0.3) {
  const ref       = useRef<HTMLElement>(null)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, fired }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function EscalationLoop() {
  const { ref, fired } = useInViewOnce(0.3)

  // Which steps are illuminated
  const [lit,       setLit]       = useState<boolean[]>([false, false, false, false])
  const [arcActive, setArcActive] = useState(false)
  const [footerVis, setFooterVis] = useState(false)

  useEffect(() => {
    if (!fired) return

    const timers: ReturnType<typeof setTimeout>[] = []

    STEP_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(() => {
        setLit(prev => { const n = [...prev]; n[i] = true; return n })
      }, delay))
    })

    timers.push(setTimeout(() => setArcActive(true),  ARC_DELAY))
    timers.push(setTimeout(() => setFooterVis(true),  FOOTER_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [fired])

  return (
    <section
      ref={ref}
      className="bg-white section-py-sm border-y border-surface-muted"
      aria-labelledby="loop-heading"
    >
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left — prose ──────────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <div className="w-8 h-px bg-eli opacity-50 mb-8" aria-hidden="true" />
            <p className="eyebrow mb-5">Structural Failure Pattern</p>
            <h2
              id="loop-heading"
              className="font-display font-medium text-navy text-display-sm text-balance mb-5"
            >
              The Escalation Dependency Loop
            </h2>
            <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-5">
              The most common structural failure pattern in scaling organisations. Not caused by poor leadership — caused by absent infrastructure.
            </p>
            <p className="font-body text-body-sm text-ink-soft leading-relaxed">
              Until the underlying structure is diagnosed and closed, the loop continues regardless of individual effort or intent.
            </p>
          </div>

          {/* ── Right — animated loop ─────────────────────────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-surface border border-surface-muted p-6 sm:p-8">

              {/* Steps */}
              <ol
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                aria-label="Escalation dependency loop — four steps"
              >
                {STEPS.map((step, i) => (
                  <StepCard
                    key={step.n}
                    step={step}
                    lit={lit[i]}
                    index={i}
                  />
                ))}
              </ol>

              {/* Return arc — draws in after all steps */}
              <ReturnArc active={arcActive} />

              {/* Footer */}
              <div
                className="mt-6 pt-6 border-t border-surface-muted flex items-center justify-between gap-6 flex-wrap transition-all duration-500 ease-out"
                style={{
                  opacity:   footerVis ? 1 : 0,
                  transform: footerVis ? 'translateY(0)' : 'translateY(4px)',
                }}
              >
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
  )
}

// ─── Step card ───────────────────────────────────────────────────────────────
function StepCard({ step, lit, index }: { step: Step; lit: boolean; index: number }) {
  // Step 02 (highlight) gets the ELI border treatment
  const isHighlight = step.highlight

  return (
    <li
      className="relative"
      style={{
        // Connector line between cards — decorative, desktop only
        // Handled via pseudo in CSS; here we just ensure stacking is clean
      }}
    >
      <div
        className="border p-5 bg-white h-full transition-all duration-500 ease-out"
        style={{
          borderColor:  lit
            ? isHighlight
              ? 'rgba(76, 106, 94, 0.55)'   // eli, more prominent for step 02
              : 'rgba(76, 106, 94, 0.22)'   // eli, subtle for others
            : 'var(--surface-muted)',
          boxShadow: lit && isHighlight
            ? '0 0 0 1px rgba(76,106,94,0.12), 0 2px 8px rgba(76,106,94,0.07)'
            : 'none',
          transform: lit ? 'translateY(-1px)' : 'translateY(0)',
        }}
        aria-current={isHighlight ? 'step' : undefined}
      >
        {/* Step number */}
        <span
          className="font-body font-semibold block mb-3 text-label-sm tracking-[0.18em] transition-colors duration-500"
          style={{ color: lit ? 'rgba(76,106,94,0.85)' : 'rgba(76,106,94,0.3)' }}
          aria-hidden="true"
        >
          {step.n}
        </span>

        {/* Title */}
        <p
          className="font-body font-semibold text-body-xs mb-1.5 transition-colors duration-500"
          style={{ color: lit ? 'var(--navy)' : 'var(--ink-faint)' }}
        >
          {step.title}
        </p>

        {/* Sub */}
        <p
          className="font-body text-label leading-snug transition-colors duration-500"
          style={{ color: lit ? 'var(--ink-soft)' : 'rgba(142,153,164,0.5)' }}
        >
          {step.sub}
        </p>

        {/* Intervention indicator — step 02 only, visible when lit */}
        {isHighlight && (
          <div
            className="mt-3 transition-all duration-400 ease-out"
            style={{
              opacity: lit ? 1 : 0,
              transitionDelay: lit ? '300ms' : '0ms',
            }}
            aria-label="Intervention point"
          >
            <div
              className="inline-flex items-center gap-1.5 px-2 py-1"
              style={{ backgroundColor: 'rgba(76,106,94,0.07)' }}
            >
              <div
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--eli)' }}
                aria-hidden="true"
              />
              <span
                className="font-body uppercase tracking-[0.14em]"
                style={{ fontSize: '0.55rem', color: 'var(--eli)' }}
              >
                Intervention point
              </span>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

// ─── Return arc ───────────────────────────────────────────────────────────────
// SVG line that "draws" from right to left after all steps light up
function ReturnArc({ active }: { active: boolean }) {
  return (
    <div
      className="mt-3 border border-dashed border-eli/20 px-5 py-2.5 flex items-center gap-3 transition-opacity duration-600 ease-out"
      style={{ opacity: active ? 1 : 0 }}
      aria-label="The loop repeats without structural resolution"
    >
      {/* Left line — grows from 0 width */}
      <div
        className="flex-1 h-px bg-eli/15 transition-all duration-700 ease-out origin-left"
        style={{
          transform:       active ? 'scaleX(1)' : 'scaleX(0)',
          transitionDelay: active ? '100ms' : '0ms',
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <p
        className="font-body text-ink-faint shrink-0 text-label tracking-[0.06em] transition-opacity duration-400"
        style={{
          opacity:         active ? 1 : 0,
          transitionDelay: active ? '400ms' : '0ms',
        }}
      >
        ↺&ensp;Loop continues — no structural resolution
      </p>

      {/* Right line — grows from 0 width */}
      <div
        className="flex-1 h-px bg-eli/15 transition-all duration-700 ease-out origin-right"
        style={{
          transform:       active ? 'scaleX(1)' : 'scaleX(0)',
          transitionDelay: active ? '100ms' : '0ms',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
