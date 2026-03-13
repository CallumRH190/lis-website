'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children:   React.ReactNode
  delay?:     0 | 1 | 2 | 3 | 4
  className?: string
  threshold?: number
  distance?:  'sm' | 'md' | 'lg'
}

const DELAYS    = [0, 120, 240, 360, 480]
const DISTANCES = { sm: '16px', md: '32px', lg: '52px' }

export default function Reveal({
  children,
  delay     = 0,
  className = '',
  threshold = 0.1,
  distance  = 'md',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
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
        opacity:         visible ? 1 : 0,
        transform:       visible
          ? 'translateY(0) scale(1)'
          : `translateY(${DISTANCES[distance]}) scale(0.99)`,
        filter:          visible ? 'blur(0px)' : 'blur(2px)',
        transition:      [
          `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)`,
          `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)`,
          `filter 0.6s ease`,
        ].join(', '),
        transitionDelay: `${DELAYS[delay]}ms`,
        willChange:      'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  )
}
