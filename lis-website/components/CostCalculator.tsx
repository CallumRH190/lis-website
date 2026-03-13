'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmt(n: number, prefix = '£') {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000)     return `${prefix}${Math.round(n / 1_000)}k`
  return `${prefix}${Math.round(n)}`
}

function getInsight(
  escalations: number,
  resolveMin:  number,
  rate:        number,
  monthlyHrs:  number,
  annualCost:  number,
): string {
  if (escalations <= 3 && resolveMin <= 30) {
    return `Even at a low escalation rate, this represents ${monthlyHrs.toFixed(1)} executive hours per month consumed by decisions that should resolve below you. That time compounds — it is not available for the strategic work that drives growth.`
  }
  if (escalations >= 15 || monthlyHrs >= 20) {
    return `At this level, escalation is the operating system. You are spending the equivalent of ${Math.round(monthlyHrs / 8)} full working days per month on operational decisions. This is not a time management problem — it is an infrastructure problem, and it will worsen as headcount grows.`
  }
  if (rate >= 500) {
    return `The financial cost is significant, but the strategic cost is larger. At ${fmt(rate)}/hour, every escalated decision is displacing work that compounds over time. The annual figure of ${fmt(annualCost)} understates the true cost by excluding opportunity.`
  }
  return `This represents ${monthlyHrs.toFixed(1)} hours of executive time per month — ${fmt(annualCost)} annually — spent on decisions that a well-structured leadership infrastructure would resolve without your involvement. The question is not whether you can afford to fix it.`
}

// ─── Slider ───────────────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label:    string
  value:    number
  min:      number
  max:      number
  step:     number
  display:  string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="font-body text-body-xs font-semibold text-navy tracking-[0.02em]">
          {label}
        </label>
        <span
          className="font-body font-semibold text-eli tabular-nums"
          style={{ fontSize: '1.05rem' }}
        >
          {display}
        </span>
      </div>

      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 h-[2px] rounded-full bg-surface-muted" />
        {/* Fill */}
        <div
          className="absolute left-0 h-[2px] rounded-full bg-eli transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="relative w-full h-5 cursor-pointer appearance-none bg-transparent"
          style={{ WebkitAppearance: 'none' }}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width:  16px;
          height: 16px;
          border-radius: 50%;
          background:    var(--eli);
          border:        2px solid white;
          box-shadow:    0 1px 4px rgba(0,0,0,0.18);
          transition:    transform 0.12s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type='range']::-moz-range-thumb {
          width:  16px;
          height: 16px;
          border-radius: 50%;
          background:    var(--eli);
          border:        2px solid white;
          box-shadow:    0 1px 4px rgba(0,0,0,0.18);
        }
      `}</style>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CostCalculator() {
  const [escalations, setEscalations] = useState(10)   // per week
  const [resolveMin,  setResolveMin]  = useState(45)   // minutes per escalation
  const [rate,        setRate]        = useState(350)   // £/hr

  const { weeklyHrs, monthlyHrs, monthlyCost, annualCost } = useMemo(() => {
    const weeklyHrs  = (escalations * resolveMin) / 60
    const monthlyHrs = weeklyHrs * 4.3
    const monthlyCost = monthlyHrs * rate
    const annualCost  = monthlyCost * 12
    return { weeklyHrs, monthlyHrs, monthlyCost, annualCost }
  }, [escalations, resolveMin, rate])

  const insight = getInsight(escalations, resolveMin, rate, monthlyHrs, annualCost)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-surface-muted">

      {/* ── Inputs ───────────────────────────────────────────────── */}
      <div className="bg-white px-8 py-10 space-y-9">
        <div>
          <p className="font-body font-semibold text-navy mb-1" style={{ fontSize: '1rem' }}>
            Estimate the cost of escalation
          </p>
          <p className="font-body text-body-sm text-ink-soft">
            Adjust the inputs to reflect your organisation. The output is conservative — it counts only direct executive time, not opportunity cost.
          </p>
        </div>

        <Slider
          label="Escalations per week"
          value={escalations}
          min={1}
          max={30}
          step={1}
          display={String(escalations)}
          onChange={setEscalations}
        />

        <Slider
          label="Average resolution time"
          value={resolveMin}
          min={15}
          max={120}
          step={15}
          display={resolveMin >= 60 ? `${resolveMin / 60}hr` : `${resolveMin}min`}
          onChange={setResolveMin}
        />

        <Slider
          label="Executive hourly rate (effective)"
          value={rate}
          min={100}
          max={1000}
          step={50}
          display={`£${rate.toLocaleString()}`}
          onChange={setRate}
        />
      </div>

      {/* ── Output ───────────────────────────────────────────────── */}
      <div className="bg-surface px-8 py-10 flex flex-col justify-between gap-8">
        <div>
          <p
            className="font-body font-semibold uppercase tracking-[0.16em] mb-6"
            style={{ fontSize: '0.6rem', color: 'var(--ink-faint)' }}
          >
            Estimated impact
          </p>

          {/* Stats grid */}
          <dl className="grid grid-cols-2 gap-px bg-surface-muted mb-px">
            {[
              { label: 'Hrs / month',   value: `${monthlyHrs.toFixed(1)}hrs` },
              { label: 'Monthly cost',  value: fmt(monthlyCost)               },
              { label: 'Annual cost',   value: fmt(annualCost)                 },
              { label: 'Hrs / year',    value: `${Math.round(monthlyHrs * 12)}hrs` },
            ].map(stat => (
              <div key={stat.label} className="bg-white px-5 py-5">
                <dt
                  className="font-body uppercase tracking-[0.14em] mb-1.5"
                  style={{ fontSize: '0.575rem', color: 'var(--ink-faint)' }}
                >
                  {stat.label}
                </dt>
                <dd
                  className="font-display font-medium text-navy tabular-nums"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', lineHeight: 1.15 }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Insight */}
          <div
            key={insight}
            className="mt-5 px-5 py-5"
            style={{
              borderLeft:      '2.5px solid var(--eli)',
              backgroundColor: 'rgba(76,106,94,0.04)',
              animation:       'calcFade 0.3s ease both',
            }}
          >
            <p className="font-body text-body-sm text-ink-soft leading-relaxed">
              {insight}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <p className="font-body text-label text-ink-faint mb-4">
            These numbers reflect only executive time. They exclude: strategic opportunity cost, the cost of delayed decisions, and the compounding effect of team members waiting for escalation resolution.
          </p>
          <Link href="/eli-snapshot" className="btn-primary px-7 py-3 text-[0.75rem]">
            Measure the actual infrastructure gap
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes calcFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
