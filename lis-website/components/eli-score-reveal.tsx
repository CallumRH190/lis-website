'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

// ─── Easing ──────────────────────────────────────────────────────────────────
// Ease-out quart — decelerates the counter naturally, not mechanically
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

// ─── Hook: fire once on scroll-into-view ─────────────────────────────────────
function useInViewOnce(threshold = 0.25) {
  const ref = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, triggered }
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Dimensions ordered by structural severity — matches Amber Band / 62 profile
const DIMENSIONS = [
  {
    label:      'Escalation Frequency',
    descriptor: 'Elevated',
    fill:       78,
    animDelay:  800,
  },
  {
    label:      'Ownership Clarity',
    descriptor: 'Partial',
    fill:       44,
    animDelay:  1060,
  },
  {
    label:      'Decision Velocity',
    descriptor: 'Constrained',
    fill:       36,
    animDelay:  1320,
  },
] as const

const TARGET_SCORE  = 62
const COUNTER_DURATION = 1700   // ms — deliberate, not rushed

// ─── Component ───────────────────────────────────────────────────────────────
export default function ELIScoreReveal() {
  const { ref, triggered } = useInViewOnce(0.25)

  const [score,           setScore]           = useState(0)
  const [showBand,        setShowBand]        = useState(false)
  const [showInterpret,   setShowInterpret]   = useState(false)
  const [showRight,       setShowRight]       = useState(false)
  const [barActive,       setBarActive]       = useState([false, false, false])

  const activateBar = useCallback((index: number) => {
    setBarActive(prev => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }, [])

  useEffect(() => {
    if (!triggered) return

    // ── Score counter ─────────────────────────────────────────────────────────
    const startTime = performance.now()
    let raf: number

    function tick(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / COUNTER_DURATION, 1)
      setScore(Math.round(easeOutQuart(progress) * TARGET_SCORE))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // ── Staggered reveal timers ───────────────────────────────────────────────
    const t1 = setTimeout(() => setShowBand(true),      680)
    const t2 = setTimeout(() => setShowRight(true),     480)
    const t3 = setTimeout(() => setShowInterpret(true), 1020)
    const t4 = setTimeout(() => activateBar(0), DIMENSIONS[0].animDelay)
    const t5 = setTimeout(() => activateBar(1), DIMENSIONS[1].animDelay)
    const t6 = setTimeout(() => activateBar(2), DIMENSIONS[2].animDelay)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6)
    }
  }, [triggered, activateBar])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={ref}
      className="section-py bg-white"
      aria-labelledby="eli-reveal-heading"
    >
      <div className="section-inner-sm">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="w-8 h-px bg-eli opacity-50 mb-8" aria-hidden="true" />
          <p className="eyebrow mb-4">Sample Diagnostic Result</p>
          <h2
            id="eli-reveal-heading"
            className="font-display font-medium text-navy text-display-sm max-w-lg"
          >
            See what the ELI&nbsp;Snapshot produces.
          </h2>
        </div>

        {/* ── Two-column grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-12 lg:gap-24 items-start">

          {/* ── LEFT — Score + Band + Interpretation ─────────────────── */}
          <div>

            {/* Score numeral */}
            <div
              className="flex items-end gap-2.5 mb-7"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Sample ELI score: ${score} out of 100`}
            >
              <span
                className="font-display font-medium text-navy leading-none tabular-nums select-none"
                style={{
                  fontSize:      'clamp(5rem, 11vw, 7rem)',
                  letterSpacing: '-0.045em',
                  lineHeight:    '0.9',
                }}
                aria-hidden="true"
              >
                {score}
              </span>
              <span
                className="font-body text-ink-faint/60 font-light leading-none pb-1.5"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}
                aria-hidden="true"
              >
                /100
              </span>
            </div>

            {/* Structural divider */}
            <div className="w-full h-px bg-surface-muted mb-7" aria-hidden="true" />

            {/* Band label — fades in after score settles */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity:   showBand ? 1 : 0,
                transform: showBand ? 'translateY(0)' : 'translateY(5px)',
              }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                {/* Amber indicator dot */}
                <div
                  className="w-[7px] h-[7px] rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--oci)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-body font-semibold uppercase tracking-[0.18em]"
                  style={{ fontSize: '0.6875rem', color: 'var(--oci)' }}
                >
                  Amber Band
                </span>
              </div>
              <p
                className="font-body uppercase tracking-[0.13em] text-ink-faint"
                style={{ fontSize: '0.625rem' }}
              >
                Escalation Dependency
              </p>
            </div>

            {/* Structural interpretation */}
            <div
              className="mt-8 transition-all duration-700 ease-out"
              style={{
                opacity:   showInterpret ? 1 : 0,
                transform: showInterpret ? 'translateY(0)' : 'translateY(5px)',
              }}
            >
              <div
                className="pl-5"
                style={{ borderLeft: '2px solid rgba(200, 160, 74, 0.35)' }}
              >
                <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                  Decision load is concentrating at executive level. Escalation is the operating system — not a symptom of individual failure, but of undefined ownership and authority across the leadership structure.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Dimension analysis ───────────────────────────── */}
          <div
            className="transition-all duration-500 ease-out"
            style={{
              opacity:          showRight ? 1 : 0,
              transform:        showRight ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay:  triggered ? '0ms' : '0ms',
            }}
          >
            <p
              className="font-body uppercase tracking-[0.18em] text-ink-faint mb-9"
              style={{ fontSize: '0.6875rem' }}
            >
              Dimension Analysis
            </p>

            {/* Bars */}
            <div
              className="space-y-9"
              role="list"
              aria-label="ELI dimension readings"
            >
              {DIMENSIONS.map((dim, i) => (
                <div key={dim.label} role="listitem">

                  {/* Row header */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-body text-body-xs font-medium text-navy">
                      {dim.label}
                    </span>
                    <span
                      className="font-body uppercase tracking-[0.14em] text-ink-faint transition-opacity duration-400"
                      style={{
                        fontSize: '0.6rem',
                        opacity:  barActive[i] ? 1 : 0,
                        transitionDelay: '300ms',
                      }}
                    >
                      {dim.descriptor}
                    </span>
                  </div>

                  {/* Track + fill */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: '2px', backgroundColor: 'var(--surface-muted)' }}
                    role="meter"
                    aria-label={`${dim.label}: ${dim.descriptor}`}
                    aria-valuenow={dim.fill}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="absolute inset-y-0 left-0 transition-all ease-out"
                      style={{
                        backgroundColor: 'rgba(200, 160, 74, 0.65)',
                        width:           barActive[i] ? `${dim.fill}%` : '0%',
                        transitionDuration: '1000ms',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Fine interpretive footnote */}
            <div className="mt-11 pt-8 border-t border-surface-muted">
              <p className="font-body text-body-xs text-ink-faint/80 leading-relaxed">
                Scores between 55–70 indicate structural pressure at leadership level. Amber Band findings typically resolve with targeted infrastructure installation within 60–90 days.
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer — call to action ───────────────────────────────────── */}
        <div className="mt-14 pt-9 border-t border-surface-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="font-body text-body-sm text-ink-soft italic max-w-sm">
            This is what your result looks like. Take the diagnostic to see yours.
          </p>
          <Link
            href="#start"
            className="btn-primary shrink-0"
          >
            Start the ELI Snapshot →
          </Link>
        </div>

      </div>
    </section>
  )
}
