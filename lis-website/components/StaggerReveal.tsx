'use client'

import { useEffect, useRef, useState } from 'react'
import React from 'react'

interface StaggerRevealProps {
  children:      React.ReactNode
  className?:    string
  staggerMs?:    number   // delay between each child, default 80ms
  durationMs?:   number   // each child's animation duration, default 700ms
  threshold?:    number   // intersection threshold, default 0.06
  distance?:     number   // translateY distance in px, default 36
  as?:           'ul' | 'ol' | 'div'
}

export default function StaggerReveal({
  children,
  className   = '',
  staggerMs   = 80,
  durationMs  = 700,
  threshold   = 0.06,
  distance    = 36,
  as          = 'div',
}: StaggerRevealProps) {
  const ref = useRef<HTMLElement>(null)
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

  // Inject per-child animation via a style tag keyed to instance
  const uid  = useRef(`sr-${Math.random().toString(36).slice(2, 7)}`).current
  const kids = React.Children.toArray(children)

  const css = kids
    .map((_, i) => {
      const delay = i * staggerMs
      return `
        .${uid} > *:nth-child(${i + 1}) {
          opacity:          ${visible ? 1 : 0};
          transform:        ${visible ? 'translateY(0) scale(1)' : `translateY(${distance}px) scale(0.985)`};
          filter:           ${visible ? 'blur(0px)' : 'blur(2px)'};
          transition:
            opacity   ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
            transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
            filter    ${Math.round(durationMs * 0.8)}ms ease ${delay}ms;
        }
      `
    })
    .join('')

  const Tag = as as React.ElementType

  return (
    <>
      <style>{css}</style>
      <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${uid} ${className}`}>
        {children}
      </Tag>
    </>
  )
}
