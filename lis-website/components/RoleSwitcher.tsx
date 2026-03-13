'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
type RoleId = 'founder' | 'ceo' | 'coo' | 'leadership'

// ─── Copy ─────────────────────────────────────────────────────────────────────
const ROLES: { id: RoleId; label: string; symptom: string; diagnosis: string; interpretation: string }[] = [
  {
    id:             'founder',
    label:          'Founder',
    symptom:        'Decisions keep returning to you.',
    diagnosis:      'Escalation dependency and undefined ownership boundaries.',
    interpretation: 'Your availability became the operating system. By being responsive, you inadvertently trained escalation. The fix is not becoming less available — it is making authority explicit enough that escalation becomes unnecessary.',
  },
  {
    id:             'ceo',
    label:          'CEO',
    symptom:        'Growth is adding complexity, not capacity.',
    diagnosis:      'Decision rights not defined below director level.',
    interpretation: 'The infrastructure has not kept pace with the org chart. You have a larger organisation but the same leadership operating system. The two need to be brought into alignment before the next phase of growth compounds the problem.',
  },
  {
    id:             'coo',
    label:          'COO',
    symptom:        'You are resolving the same problems on a loop.',
    diagnosis:      'Ownership is task-based, not outcome-based.',
    interpretation: 'The accountability system functions in calm, breaks under load. The fix is building systems that hold under pressure — not just when everything is stable.',
  },
  {
    id:             'leadership',
    label:          'Leadership Team',
    symptom:        'It is unclear where your authority actually ends.',
    diagnosis:      'Decision rights exist informally, not structurally.',
    interpretation: 'Capable leaders operating without a map. The constraint here is rarely capability — it is clarity. When authority is made explicit, the same team performs at a significantly higher level.',
  },
]

// ─── Animation playhead hook ──────────────────────────────────────────────────
function usePlayhead(active: boolean, duration = 5500) {
  const [ms, setMs]      = useState(0)
  const startRef         = useRef<number>(0)
  const rafRef           = useRef<number>(0)

  useEffect(() => {
    if (!active) { setMs(0); return }
    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      if (elapsed >= duration) { startRef.current = now; setMs(0) }
      else setMs(elapsed)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, duration])

  return ms
}

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }
function prog(ms: number, start: number, end: number) {
  if (ms < start) return 0
  return easeOut(Math.min((ms - start) / (end - start), 1))
}

// ─── Shared mockup styles ─────────────────────────────────────────────────────
const wrap: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.02)',
  border:          '1px solid rgba(255,255,255,0.08)',
  padding:         '1.25rem',
}
const label: React.CSSProperties = {
  fontSize:      '0.53rem',
  fontWeight:    600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color:         'rgba(255,255,255,0.25)',
  marginBottom:  '0.85rem',
}

// ─── FOUNDER: escalation load by level ───────────────────────────────────────
function FounderMockup({ active }: { active: boolean }) {
  const ms = usePlayhead(active)

  const rows = [
    { name: 'Founder',   pct: 73, color: '#4C6A5E', delay: 400  },
    { name: 'Directors', pct: 18, color: '#C8A04A', delay: 900  },
    { name: 'Managers',  pct: 7,  color: '#6A4C7D', delay: 1400 },
    { name: 'Team Leads',pct: 2,  color: '#6e8ca0', delay: 1900 },
  ]

  const noteIn = prog(ms, 3200, 3900)

  return (
    <div style={wrap}>
      <p style={label}>Where Decisions Are Being Resolved</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.9rem' }}>
        {rows.map(row => {
          const p    = prog(ms, row.delay, row.delay + 900)
          const fill = p * row.pct
          return (
            <div key={row.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.565rem', color: 'rgba(255,255,255,0.45)' }}>{row.name}</span>
                <span style={{ fontSize: '0.565rem', fontWeight: 700, color: row.color }}>
                  {Math.round(fill)}%
                </span>
              </div>
              <div style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${fill}%`, backgroundColor: row.color, borderRadius: 3 }} />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        padding:         '0.45rem 0.6rem',
        backgroundColor: 'rgba(76,106,94,0.08)',
        border:          '1px solid rgba(76,106,94,0.2)',
        borderLeft:      '2px solid rgba(76,106,94,0.5)',
        opacity:         noteIn,
        transform:       `translateY(${(1 - noteIn) * 5}px)`,
      }}>
        <p style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          73% of escalated decisions are being resolved at founder level. This scales directly with headcount.
        </p>
      </div>
    </div>
  )
}

// ─── CEO: decision rights coverage by layer ──────────────────────────────────
function CEOMockup({ active }: { active: boolean }) {
  const ms = usePlayhead(active)

  const layers = [
    { name: 'C-Suite',    pct: 94, color: '#4C6A5E', delay: 400  },
    { name: 'Directors',  pct: 68, color: '#C8A04A', delay: 850  },
    { name: 'Managers',   pct: 31, color: '#C8A04A', delay: 1300 },
    { name: 'Team Leads', pct: 11, color: '#c0392b', delay: 1750 },
  ]

  const noteIn = prog(ms, 3100, 3800)

  return (
    <div style={wrap}>
      <p style={label}>Decision Rights Coverage — by Layer</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.9rem' }}>
        {layers.map(row => {
          const p    = prog(ms, row.delay, row.delay + 850)
          const fill = p * row.pct
          return (
            <div key={row.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.565rem', color: 'rgba(255,255,255,0.45)' }}>{row.name}</span>
                <span style={{ fontSize: '0.565rem', fontWeight: 700, color: row.color }}>
                  {Math.round(fill)}% defined
                </span>
              </div>
              <div style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${fill}%`, backgroundColor: row.color, borderRadius: 3 }} />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        padding:         '0.45rem 0.6rem',
        backgroundColor: 'rgba(192,57,43,0.07)',
        border:          '1px solid rgba(192,57,43,0.2)',
        borderLeft:      '2px solid rgba(192,57,43,0.5)',
        opacity:         noteIn,
        transform:       `translateY(${(1 - noteIn) * 5}px)`,
      }}>
        <p style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          89% of team leads lack documented decision authority. Decisions default upward on contact.
        </p>
      </div>
    </div>
  )
}

// ─── COO: ownership accountability grid ──────────────────────────────────────
function COOMockup({ active }: { active: boolean }) {
  const ms = usePlayhead(active)

  const rows = ['Revenue', 'Delivery', 'Quality', 'Capacity', 'Retention']
  const cols = ['Sales', 'Ops', 'Product', 'Finance', 'People']
  const owned = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
  ]
  const noteIn = prog(ms, 3400, 4100)

  return (
    <div style={wrap}>
      <p style={label}>Outcome Ownership Map</p>
      <div style={{ marginBottom: '0.75rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 52 }} />
              {cols.map(c => (
                <th key={c} style={{ fontSize: '0.485rem', color: 'rgba(255,255,255,0.28)', fontWeight: 500, paddingBottom: '0.4rem', textAlign: 'center' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row}>
                <td style={{ fontSize: '0.485rem', color: 'rgba(255,255,255,0.35)', paddingRight: 4, paddingBottom: 3 }}>{row}</td>
                {cols.map((_, ci) => {
                  const d = 400 + (ri * 5 + ci) * 100
                  const p = prog(ms, d, d + 450)
                  const has = owned[ri][ci] === 1
                  return (
                    <td key={ci} style={{ padding: '2px' }}>
                      <div style={{
                        height:          16,
                        borderRadius:    2,
                        backgroundColor: has ? `rgba(76,106,94,${0.1 + p * 0.45})` : `rgba(255,255,255,${0.02 + p * 0.03})`,
                        border:          has ? `1px solid rgba(76,106,94,${0.25 + p * 0.4})` : '1px solid rgba(255,255,255,0.05)',
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        opacity:         p,
                      }}>
                        {has && p > 0.6 && <span style={{ fontSize: '0.48rem', color: '#4C6A5E' }}>✓</span>}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding:         '0.45rem 0.6rem',
        backgroundColor: 'rgba(200,160,74,0.07)',
        border:          '1px solid rgba(200,160,74,0.18)',
        borderLeft:      '2px solid rgba(200,160,74,0.45)',
        opacity:         noteIn,
        transform:       `translateY(${(1 - noteIn) * 5}px)`,
      }}>
        <p style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Only 5 of 25 outcome areas have a documented owner. The rest resolve by escalation or remain unresolved.
        </p>
      </div>
    </div>
  )
}

// ─── LEADERSHIP TEAM: authority clarity test ─────────────────────────────────
function LeadershipMockup({ active }: { active: boolean }) {
  const ms = usePlayhead(active)

  const items = [
    { label: 'Hire a direct report',    status: 'Authorised', color: '#4C6A5E', bg: 'rgba(76,106,94,0.12)',   border: 'rgba(76,106,94,0.3)',   delay: 300  },
    { label: 'Spend £5k on a supplier', status: 'Unclear',    color: '#C8A04A', bg: 'rgba(200,160,74,0.08)',  border: 'rgba(200,160,74,0.25)', delay: 700  },
    { label: 'Change a team process',   status: 'Authorised', color: '#4C6A5E', bg: 'rgba(76,106,94,0.12)',   border: 'rgba(76,106,94,0.3)',   delay: 1100 },
    { label: 'Approve overtime',        status: 'Unclear',    color: '#C8A04A', bg: 'rgba(200,160,74,0.08)',  border: 'rgba(200,160,74,0.25)', delay: 1500 },
    { label: 'Pause a project',         status: 'Escalate',   color: '#c0392b', bg: 'rgba(192,57,43,0.08)',   border: 'rgba(192,57,43,0.25)', delay: 1900 },
    { label: 'Promote a team member',   status: 'Escalate',   color: '#c0392b', bg: 'rgba(192,57,43,0.08)',   border: 'rgba(192,57,43,0.25)', delay: 2300 },
  ]

  const noteIn = prog(ms, 3400, 4100)

  return (
    <div style={wrap}>
      <p style={label}>Authority Clarity Test — Team Lead Level</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', marginBottom: '0.75rem' }}>
        {items.map(item => {
          const p = prog(ms, item.delay, item.delay + 480)
          return (
            <div
              key={item.label}
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
                padding:         '0.32rem 0.55rem',
                backgroundColor: item.bg,
                border:          `1px solid ${item.border}`,
                opacity:         p,
                transform:       `translateX(${(1 - p) * -8}px)`,
              }}
            >
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
              <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.color, flexShrink: 0, marginLeft: 8 }}>
                {item.status}
              </span>
            </div>
          )
        })}
      </div>
      <div style={{
        padding:         '0.45rem 0.6rem',
        backgroundColor: 'rgba(200,160,74,0.07)',
        border:          '1px solid rgba(200,160,74,0.18)',
        borderLeft:      '2px solid rgba(200,160,74,0.45)',
        opacity:         noteIn,
        transform:       `translateY(${(1 - noteIn) * 5}px)`,
      }}>
        <p style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          33% of decisions have no clear authority. Leaders default to escalation rather than risk being wrong.
        </p>
      </div>
    </div>
  )
}

const MOCKUPS: Record<RoleId, React.ComponentType<{ active: boolean }>> = {
  founder:    FounderMockup,
  ceo:        CEOMockup,
  coo:        COOMockup,
  leadership: LeadershipMockup,
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function RoleSwitcher() {
  const [active, setActive] = useState<RoleId>('founder')
  const role   = ROLES.find(r => r.id === active)!
  const Mockup = MOCKUPS[active]

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex border-b border-surface-muted overflow-x-auto scrollbar-none"
        role="tablist"
        aria-label="Select your role"
      >
        {ROLES.map(r => (
          <button
            key={r.id}
            role="tab"
            aria-selected={active === r.id}
            onClick={() => setActive(r.id)}
            className="shrink-0 px-7 py-4 font-body font-medium uppercase tracking-[0.14em] border-b-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 whitespace-nowrap -mb-px"
            style={{
              fontSize:    '0.75rem',
              color:       active === r.id ? 'var(--navy)' : 'var(--ink-faint)',
              borderColor: active === r.id ? 'var(--navy)' : 'transparent',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Two-column panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-surface-muted mt-px">

        {/* Copy — left */}
        <div
          className="bg-white px-8 py-10"
          key={active + '-copy'}
          style={{ animation: 'roleFade 0.35s ease both' }}
        >
          <p className="font-body uppercase tracking-[0.16em] mb-4" style={{ fontSize: '0.6rem', color: 'var(--ink-faint)' }}>
            Primary Symptom
          </p>
          <h3 className="font-display font-medium text-navy mb-6" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', lineHeight: 1.25 }}>
            {role.symptom}
          </h3>
          <div className="accent-rule-eli pl-5 py-1 mb-6">
            <p className="font-body text-body-xs font-semibold text-navy mb-1">Typical diagnosis</p>
            <p className="font-body text-body-sm text-ink-soft leading-relaxed">{role.diagnosis}</p>
          </div>
          <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-8">
            {role.interpretation}
          </p>
          <Link href="/eli-snapshot" className="btn-primary px-6 py-3 text-[0.75rem]">
            Run the diagnostic →
          </Link>
        </div>

        {/* Mockup — right, navy background */}
        <div
          className="navy-section px-8 py-10"
          key={active + '-mockup'}
          style={{ animation: 'roleFade 0.35s ease both', minHeight: 320 }}
        >
          <Mockup active={true} />
        </div>
      </div>

      <div className="mt-5 px-1">
        <p className="font-body text-label text-ink-faint">
          The structural pattern is consistent across roles. The entry point differs.
        </p>
      </div>

      <style>{`
        @keyframes roleFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
