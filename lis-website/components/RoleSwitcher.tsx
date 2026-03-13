'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Data — copy from HTML prototype, reskinned in LIS brand ─────────────────
const ROLES = [
  {
    id:    'founder',
    label: 'Founder',
    panels: [
      {
        tag:     'Primary Symptom',
        heading: 'Decisions keep returning to you.',
        body:    'Problems you thought were delegated reappear on your desk. You are still the final word on things you handed over two years ago.',
        accent:  true,
      },
      {
        tag:     'What LIS Typically Diagnoses',
        heading: 'Escalation dependency and undefined ownership boundaries.',
        body:    'The business has grown faster than the systems that distribute leadership responsibility. Delegation happened without infrastructure.',
        accent:  false,
      },
      {
        tag:     'Structural Interpretation',
        heading: 'Your availability became the operating system.',
        body:    'By being responsive, you inadvertently trained escalation. The fix is not becoming less available — it is making authority explicit enough that escalation becomes unnecessary.',
        accent:  false,
      },
    ],
  },
  {
    id:    'ceo',
    label: 'CEO',
    panels: [
      {
        tag:     'Primary Symptom',
        heading: 'Growth is adding complexity, not capacity.',
        body:    'Hiring more people has not reduced your operational load. Each new management layer has created more coordination work, not less.',
        accent:  true,
      },
      {
        tag:     'What LIS Typically Diagnoses',
        heading: 'Decision rights not defined below director level.',
        body:    'The middle layer of management knows what they do but not what they own. Authority stops at the top because no framework distributes it downward.',
        accent:  false,
      },
      {
        tag:     'Structural Interpretation',
        heading: 'The infrastructure has not kept pace with the org chart.',
        body:    'You have a larger organisation but the same leadership operating system. The two need to be brought into alignment before the next phase of growth compounds the problem.',
        accent:  false,
      },
    ],
  },
  {
    id:    'coo',
    label: 'COO',
    panels: [
      {
        tag:     'Primary Symptom',
        heading: 'You are resolving the same problems on a loop.',
        body:    'The same categories of issue keep surfacing. You solve them, they return in a different shape. Operational fixes are not holding at the team level.',
        accent:  true,
      },
      {
        tag:     'What LIS Typically Diagnoses',
        heading: 'Ownership is task-based, not outcome-based.',
        body:    'Teams complete work but do not own results. When something goes wrong between two roles, it defaults upward rather than being resolved at the level it should be.',
        accent:  false,
      },
      {
        tag:     'Structural Interpretation',
        heading: 'The accountability system functions in calm, breaks under load.',
        body:    'Most organisations have leadership infrastructure that works when things go well. The fix is building systems that hold under pressure — not just when everything is stable.',
        accent:  false,
      },
    ],
  },
  {
    id:    'leadership',
    label: 'Leadership Team',
    panels: [
      {
        tag:     'Primary Symptom',
        heading: 'It is unclear where your authority actually ends.',
        body:    'You make some decisions independently, refer others upward, and are not always certain which is right. The cost of a wrong call feels ambiguous.',
        accent:  true,
      },
      {
        tag:     'What LIS Typically Diagnoses',
        heading: 'Decision rights exist informally, not structurally.',
        body:    'Authority has been communicated by example and correction rather than by explicit documentation. People learn what they can decide by occasionally getting it wrong.',
        accent:  false,
      },
      {
        tag:     'Structural Interpretation',
        heading: 'Capable leaders operating without a map.',
        body:    'The constraint here is rarely capability — it is clarity. When authority is made explicit and escalation pathways are defined, the same leadership team performs at a significantly higher level without additional development.',
        accent:  false,
      },
    ],
  },
] as const

type RoleId = typeof ROLES[number]['id']

// ─── Component ───────────────────────────────────────────────────────────────
export default function RoleSwitcher() {
  const [active, setActive] = useState<RoleId>('founder')
  const activeRole = ROLES.find(r => r.id === active)!

  return (
    <div>
      {/* ── Tab bar ────────────────────────────────────────────────── */}
      <div
        className="flex border-b border-surface-muted overflow-x-auto scrollbar-none"
        role="tablist"
        aria-label="Select your role"
      >
        {ROLES.map(role => (
          <button
            key={role.id}
            role="tab"
            aria-selected={active === role.id}
            aria-controls={`panel-${role.id}`}
            id={`tab-${role.id}`}
            onClick={() => setActive(role.id)}
            className="shrink-0 px-7 py-4 font-body font-medium text-body-xs uppercase tracking-[0.14em] border-b-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eli focus-visible:ring-offset-2 whitespace-nowrap -mb-px"
            style={{
              color:       active === role.id ? 'var(--navy)' : 'var(--ink-faint)',
              borderColor: active === role.id ? 'var(--navy)' : 'transparent',
            }}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* ── Content panels ─────────────────────────────────────────── */}
      {ROLES.map(role => (
        <div
          key={role.id}
          id={`panel-${role.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${role.id}`}
          hidden={active !== role.id}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-muted mt-px">
            {role.panels.map((panel, i) => (
              <div
                key={panel.tag}
                className="bg-white px-8 py-8"
                style={panel.accent ? { borderLeft: '2.5px solid var(--eli)' } : undefined}
              >
                <p
                  className="font-body uppercase tracking-[0.16em] mb-4"
                  style={{ fontSize: '0.6rem', color: 'var(--ink-faint)' }}
                >
                  {panel.tag}
                </p>
                <h3 className="font-display font-medium text-navy mb-3" style={{ fontSize: '1rem', lineHeight: 1.3 }}>
                  {panel.heading}
                </h3>
                <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                  {panel.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between flex-wrap gap-4 px-1">
        <p className="font-body text-label text-ink-faint">
          The structural pattern is consistent across roles. The entry point differs.
        </p>
        <Link
          href="/eli-snapshot"
          className="font-body font-semibold text-navy hover:text-eli transition-colors underline underline-offset-4 text-body-xs shrink-0"
        >
          Take the diagnostic →
        </Link>
      </div>
    </div>
  )
}
