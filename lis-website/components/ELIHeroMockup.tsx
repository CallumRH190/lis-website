'use client'

import { useEffect, useState, useRef } from 'react'

// ─── Animation timing (ms) ────────────────────────────────────────────────────
const T = {
  start:        600,   // pause before anything moves
  scoreEnd:     2200,  // score finishes counting
  bandIn:       2500,  // band label appears
  bar1Start:    2800,
  bar1End:      3700,
  bar2Start:    3200,
  bar2End:      4200,
  bar3Start:    3600,
  bar3End:      4700,
  interpretIn:  5000,  // interpretation line fades in
  ctaIn:        5500,  // bottom CTA line
  loopReset:    8500,  // hold then restart
}

const SCORE_TARGET = 58
const SCORE_MAX    = 100

const DIMENSIONS = [
  { label: 'Escalation Frequency', value: 78, color: '#4C6A5E', descriptor: 'Elevated'     },
  { label: 'Ownership Clarity',    value: 44, color: '#C8A04A', descriptor: 'Partial'       },
  { label: 'Decision Velocity',    value: 36, color: '#6A4C7D', descriptor: 'Constrained'   },
] as const

// ─── Easing ───────────────────────────────────────────────────────────────────
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

function useAnimLoop(duration: number, running: boolean) {
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    if (!running) { setProgress(0); startRef.current = null; return }

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const raw     = Math.min(elapsed / duration, 1)
      setProgress(easeOutQuart(raw))
      if (raw < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, duration])

  return progress
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ELIHeroMockup() {
  const [tick,        setTick]        = useState(0)   // increments each loop
  const [elapsed,     setElapsed]     = useState(0)
  const elapsedRef = useRef(0)
  const startRef   = useRef<number>(0)
  const rafRef     = useRef<number>(0)

  // Master clock — drives everything from elapsed ms
  useEffect(() => {
    startRef.current = performance.now()

    const frame = (now: number) => {
      const ms = now - startRef.current
      elapsedRef.current = ms
      setElapsed(ms)

      if (ms >= T.loopReset) {
        // reset
        startRef.current = now
        setTick(t => t + 1)
      }
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const ms = elapsed

  // Score counter
  const scoreProgress = ms < T.start ? 0
    : Math.min((ms - T.start) / (T.scoreEnd - T.start), 1)
  const score = Math.round(easeOutQuart(scoreProgress) * SCORE_TARGET)

  // Visibility flags
  const showBand      = ms > T.bandIn
  const showInterpret = ms > T.interpretIn
  const showCTA       = ms > T.ctaIn

  // Bar fills
  function barFill(start: number, end: number, target: number) {
    if (ms < start) return 0
    const p = Math.min((ms - start) / (end - start), 1)
    return easeOutQuart(p) * target
  }

  const fills = [
    barFill(T.bar1Start, T.bar1End, DIMENSIONS[0].value),
    barFill(T.bar2Start, T.bar2End, DIMENSIONS[1].value),
    barFill(T.bar3Start, T.bar3End, DIMENSIONS[2].value),
  ]

  const descriptorVisible = [
    ms > T.bar1Start + 400,
    ms > T.bar2Start + 400,
    ms > T.bar3Start + 400,
  ]

  return (
    <div
      aria-hidden="true"
      style={{
        border:          '1px solid rgba(255,255,255,0.10)',
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding:         '1.75rem',
        fontFamily:      'inherit',
        userSelect:      'none',
      }}
    >
      {/* ── Header bar ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.575rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.2rem' }}>
            ELI Snapshot
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
            Executive Leverage Index
          </p>
        </div>
        <div style={{
          fontSize:        '0.55rem',
          fontWeight:      600,
          letterSpacing:   '0.14em',
          textTransform:   'uppercase',
          padding:         '0.3rem 0.65rem',
          border:          '1px solid rgba(255,255,255,0.12)',
          color:           'rgba(255,255,255,0.35)',
        }}>
          Live Result
        </div>
      </div>

      {/* ── Score + band ─────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Big score */}
        <div style={{ lineHeight: 1 }}>
          <span style={{
            fontFamily:    'var(--font-display, Georgia, serif)',
            fontSize:      'clamp(3.5rem, 7vw, 5rem)',
            fontWeight:    500,
            color:         'white',
            letterSpacing: '-0.03em',
            display:       'block',
            tabularNums:   true,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {score}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
            / {SCORE_MAX}
          </span>
        </div>

        {/* Band */}
        <div style={{
          opacity:    showBand ? 1 : 0,
          transform:  showBand ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          paddingBottom: '0.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8A04A' }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A04A' }}>
              Amber
            </span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontWeight: 400, whiteSpace: 'nowrap' }}>
            Emerging Pressure
          </p>
        </div>
      </div>

      {/* ── Separator ─────────────────────────────────────────── */}
      <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: '1.25rem' }} />

      {/* ── Dimension bars ────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.25rem' }}>
        {DIMENSIONS.map((dim, i) => (
          <div key={dim.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
                {dim.label}
              </span>
              <span style={{
                fontSize:   '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:      dim.color,
                opacity:    descriptorVisible[i] ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}>
                {dim.descriptor}
              </span>
            </div>
            {/* Track */}
            <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height:          '100%',
                width:           `${fills[i]}%`,
                backgroundColor: dim.color,
                borderRadius:    2,
                transition:      'none',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Interpretation line ───────────────────────────────── */}
      <div style={{
        borderLeft:      '2px solid rgba(76,106,94,0.5)',
        paddingLeft:     '0.75rem',
        opacity:         showInterpret ? 1 : 0,
        transform:       showInterpret ? 'translateY(0)' : 'translateY(8px)',
        transition:      'opacity 0.6s ease, transform 0.6s ease',
        marginBottom:    '1.25rem',
      }}>
        <p style={{ fontSize: '0.685rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontStyle: 'italic' }}>
          Leadership load is concentrating at executive level. Escalation patterns indicate structural gaps in decision rights distribution.
        </p>
      </div>

      {/* ── CTA footer ───────────────────────────────────────── */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity:    showCTA ? 1 : 0,
        transition: 'opacity 0.5s ease',
        paddingTop: '0.75rem',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{ fontSize: '0.575rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
          3 min · No account required
        </p>
        <div style={{
          fontSize:        '0.6rem',
          fontWeight:      600,
          letterSpacing:   '0.12em',
          textTransform:   'uppercase',
          color:           '#4C6A5E',
          display:         'flex',
          alignItems:      'center',
          gap:             '0.3rem',
        }}>
          Get yours
          <span style={{ fontSize: '0.75rem' }}>→</span>
        </div>
      </div>
    </div>
  )
}
