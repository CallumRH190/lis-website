'use client'

import { useEffect, useState } from 'react'

// Each child animates in sequence on page load — no scroll trigger needed.
// Usage: wrap individual hero elements (eyebrow, h1, subtext, CTAs, microcopy)
// and pass an index prop to control stagger timing.

interface HeroItemProps {
  children:   React.ReactNode
  index?:     number   // 0 = first, fires at 80ms; each step adds 130ms
  className?: string
  from?:      'bottom' | 'left'
}

const BASE_DELAY = 80   // ms before first element starts
const STAGGER    = 130  // ms between each element

export function HeroItem({
  children,
  index    = 0,
  className = '',
  from     = 'bottom',
}: HeroItemProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small RAF to ensure initial hidden state is painted before animating
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const delay   = BASE_DELAY + index * STAGGER
  const translateFrom = from === 'left' ? 'translateX(-24px)' : 'translateY(28px)'

  return (
    <div
      className={className}
      style={{
        opacity:         mounted ? 1 : 0,
        transform:       mounted ? 'translate(0,0) scale(1)' : `${translateFrom} scale(0.98)`,
        filter:          mounted ? 'blur(0px)' : 'blur(3px)',
        transition:      [
          `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)`,
          `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)`,
          `filter 0.7s ease`,
        ].join(', '),
        transitionDelay: `${delay}ms`,
        willChange:      'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  )
}

// The hero sidebar card (infrastructure stack) slides in from the right
export function HeroCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={className}
      style={{
        opacity:         mounted ? 1 : 0,
        transform:       mounted ? 'translateX(0) scale(1)' : 'translateX(32px) scale(0.97)',
        filter:          mounted ? 'blur(0px)' : 'blur(4px)',
        transition:      [
          `opacity 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          `filter 0.8s ease`,
        ].join(', '),
        transitionDelay: `${BASE_DELAY + 3 * STAGGER}ms`,
        willChange:      'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  )
}
