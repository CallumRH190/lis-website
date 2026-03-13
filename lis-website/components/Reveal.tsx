'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children:  React.ReactNode
  delay?:    0 | 1 | 2 | 3 | 4   // stagger index — multiples of 100ms
  className?: string
  threshold?: number
}

const DELAYS = [0, 100, 200, 300, 400] // ms

export default function Reveal({
  children,
  delay     = 0,
  className = '',
  threshold = 0.12,
}: RevealProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:          visible ? 1 : 0,
        transform:        visible ? 'translateY(0)' : 'translateY(14px)',
        transition:       `opacity 0.65s ease, transform 0.65s ease`,
        transitionDelay:  `${DELAYS[delay]}ms`,
        willChange:       'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
