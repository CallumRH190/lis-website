'use client'

import { useState } from 'react'

// ─── Data — full content from HTML prototype ──────────────────────────────────
const STAGES = [
  {
    n:           '01',
    label:       'Founder Dependency',
    description: 'The organisation functions because of one person\'s knowledge, relationships, and decision-making. There is no leadership system — there is a leader.',
    signals: [
      'All significant decisions pass through the founder — often the same day they arise.',
      'Role boundaries are understood informally; no written ownership exists.',
      'Growth is constrained by the founder\'s available hours, not by market demand or team capacity.',
    ],
    next: {
      heading: 'To Reach Stage 02',
      body:    'The organisation must establish its first intentional leadership layer — naming who leads what, with what authority, and creating the habit of leadership meetings that function without founder presence.',
    },
  },
  {
    n:           '02',
    label:       'Emerging Leadership',
    description: 'A leadership team exists in name. Key individuals have leadership titles and carry real responsibility — but the infrastructure supporting them is informal or absent.',
    signals: [
      'Escalation is high — leaders check upward frequently, even on decisions within their apparent remit.',
      'Accountability exists but is person-dependent: the outcome depends on who holds the role, not on the system around the role.',
      'The executive is still being pulled into operational decisions they delegated months or years ago.',
    ],
    next: {
      heading: 'To Reach Stage 03',
      body:    'Decision rights must be formally documented. Leaders need to know — explicitly, in writing — what they are authorised to decide without escalation. Escalation pathways need structure, not just convention.',
    },
  },
  {
    n:           '03',
    label:       'Structured Leadership',
    description: 'Formal infrastructure is in place. Decision rights are documented. Escalation pathways exist. The leadership team operates with defined authority — though the system still depends on strong individuals to function well.',
    signals: [
      'Leaders can cite their decision authority — they know what they own without needing to ask.',
      'Escalation has decreased, but still spikes under pressure or when conditions change.',
      'Ownership is outcome-oriented in most roles, though accountability systems break down between departments.',
    ],
    next: {
      heading: 'To Reach Stage 04',
      body:    'The infrastructure must become self-reinforcing — systems that calibrate themselves, accountability that operates without executive surveillance, and leadership standards that hold under load, not just in stable conditions.',
    },
  },
  {
    n:           '04',
    label:       'Distributed Ownership',
    description: 'The leadership operating system functions independently of any single person. Ownership is structural, not personal. Authority is distributed and understood across multiple levels of the organisation.',
    signals: [
      'The executive can be away for extended periods without operational disruption — the system holds.',
      'Problems are resolved at the level they should be resolved at, without requiring escalation as the default.',
      'Leadership talent can be onboarded into defined roles with clear infrastructure — not just into a relationship with the CEO.',
    ],
    next: {
      heading: 'To Reach Stage 05',
      body:    'The organisation must shift from maintaining infrastructure to evolving it — developing the internal capability to diagnose and improve leadership systems as the organisation changes, without external intervention.',
    },
  },
  {
    n:           '05',
    label:       'Infrastructure Leadership',
    description: 'The organisation does not just have leadership infrastructure — it understands it, maintains it, and continuously evolves it. Leadership systems are a source of competitive advantage, not just operational necessity.',
    signals: [
      'The organisation can diagnose its own structural failures and design its own responses.',
      'Leadership infrastructure scales intentionally ahead of headcount growth, not in response to it.',
      'Executive time is almost entirely strategic — operational load is genuinely absorbed by the infrastructure below.',
    ],
    next: {
      heading: 'Sustaining Stage 05',
      body:    'Organisations at Stage 05 treat leadership infrastructure as a living system — subject to regular calibration, formal review, and intentional evolution as market and organisational conditions change.',
    },
  },
] as const

type StageN = typeof STAGES[number]['n']

// ─── Component ───────────────────────────────────────────────────────────────
export default function LIMMExplorer() {
  const [active, setActive] = useState<StageN>('01')
  const stage = STAGES.find(s => s.n === active)!

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">

      {/* ── Stage nav ────────────────────────────────────────────── */}
      <nav aria-label="LIMM stages">
        {/* Desktop: vertical list */}
        <div className="hidden lg:flex flex-col" role="tablist" aria-orientation="vertical">
          {STAGES.map(s => (
            <StageButton
              key={s.n}
              stage={s}
              active={active === s.n}
              onClick={() => setActive(s.n)}
              orientation="vertical"
            />
          ))}
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div
          className="flex lg:hidden overflow-x-auto scrollbar-none border-b border-surface-muted"
          role="tablist"
          aria-orientation="horizontal"
        >
          {STAGES.map(s => (
            <StageButton
              key={s.n}
              stage={s}
              active={active === s.n}
              onClick={() => setActive(s.n)}
              orientation="horizontal"
            />
          ))}
        </div>
      </nav>

      {/* ── Detail panel ─────────────────────────────────────────── */}
      {STAGES.map(s => (
        <div
          key={s.n}
          role="tabpanel"
          id={`stage-panel-${s.n}`}
          aria-labelledby={`stage-btn-${s.n}`}
          hidden={active !== s.n}
          style={{
            animation: active === s.n ? 'limmFadeUp 0.35s ease both' : undefined,
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <span
              className="font-body font-semibold uppercase tracking-[0.16em] block mb-2"
              style={{ fontSize: '0.625rem', color: 'var(--limm)' }}
            >
              Stage {s.n}
            </span>
            <h3 className="font-display font-medium text-navy mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)' }}>
              {s.label}
            </h3>
            <p className="font-body text-body-sm text-ink-soft leading-relaxed max-w-xl">
              {s.description}
            </p>
          </div>

          {/* Signals */}
          <div className="mb-8">
            <p
              className="font-body font-semibold uppercase tracking-[0.16em] mb-5"
              style={{ fontSize: '0.6rem', color: 'var(--ink-faint)' }}
            >
              Observable Signals
            </p>
            <ul className="space-y-3" role="list">
              {s.signals.map(signal => (
                <li
                  key={signal}
                  className="flex gap-3 items-start bg-surface border border-surface-muted px-5 py-4"
                >
                  <div
                    className="w-[5px] h-[5px] rounded-full shrink-0 mt-[0.45rem]"
                    style={{ backgroundColor: 'var(--limm)' }}
                    aria-hidden="true"
                  />
                  <span className="font-body text-body-sm text-ink-soft leading-relaxed">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progression note */}
          <div
            className="px-6 py-5"
            style={{
              borderLeft:      '2.5px solid rgba(106,76,125,0.4)',
              backgroundColor: 'rgba(106,76,125,0.04)',
              border:          '1px solid rgba(106,76,125,0.12)',
              borderLeftWidth: '2.5px',
              borderLeftColor: 'rgba(106,76,125,0.5)',
            }}
          >
            <p
              className="font-body font-semibold uppercase tracking-[0.16em] mb-2"
              style={{ fontSize: '0.6rem', color: 'var(--limm)' }}
            >
              {s.next.heading}
            </p>
            <p className="font-body text-body-sm text-ink-soft leading-relaxed">
              {s.next.body}
            </p>
          </div>
        </div>
      ))}

      {/* Keyframe — injected once, scoped to component */}
      <style>{`
        @keyframes limmFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Stage button ─────────────────────────────────────────────────────────────
function StageButton({
  stage,
  active,
  onClick,
  orientation,
}: {
  stage:       typeof STAGES[number]
  active:      boolean
  onClick:     () => void
  orientation: 'vertical' | 'horizontal'
}) {
  const isVertical = orientation === 'vertical'

  return (
    <button
      id={`stage-btn-${stage.n}`}
      role="tab"
      aria-selected={active}
      aria-controls={`stage-panel-${stage.n}`}
      onClick={onClick}
      className="text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-limm focus-visible:ring-offset-2"
      style={
        isVertical
          ? {
              padding:         '1rem 1.25rem',
              borderLeft:      `2px solid ${active ? 'var(--limm)' : 'var(--surface-muted)'}`,
              backgroundColor: active ? 'rgba(106,76,125,0.04)' : 'transparent',
            }
          : {
              padding:         '0.9rem 1.25rem',
              borderBottom:    `2px solid ${active ? 'var(--limm)' : 'transparent'}`,
              minWidth:        '140px',
              marginBottom:    '-1px',
              whiteSpace:      'nowrap' as const,
            }
      }
    >
      <span
        className="font-body font-semibold uppercase tracking-[0.14em] block mb-0.5"
        style={{
          fontSize: '0.575rem',
          color:    active ? 'var(--limm)' : 'var(--ink-faint)',
        }}
      >
        Stage {stage.n}
      </span>
      <span
        className="font-body font-medium"
        style={{
          fontSize:   '0.8rem',
          lineHeight: 1.3,
          color:      active ? 'var(--navy)' : 'var(--ink-soft)',
        }}
      >
        {stage.label}
      </span>
    </button>
  )
}
