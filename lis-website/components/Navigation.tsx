'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/methodology', label: 'Methodology' },
  { href: '/solutions',   label: 'Solutions'   },
  { href: '/insights',    label: 'Insights'    },
  { href: '/about',       label: 'About'       },
]

const MOBILE_MENU_ID = 'mobile-nav-menu'

export default function Navigation() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) setOpen(false)
  }, [open])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/[0.98] backdrop-blur-md shadow-[0_1px_0_rgba(30,43,56,0.08)]' : 'bg-surface/95 backdrop-blur-sm border-b border-surface-muted'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-eli focus:text-white focus:text-sm focus:font-body">
        Skip to main content
      </a>

      <div className="section-inner">
        <div className="flex items-center justify-between h-[4.25rem]">

          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Leadership Infrastructure Systems — home">
            <div className="flex items-end gap-[3px]" aria-hidden="true">
              <div className="w-[3px] h-[22px] rounded-sm bg-navy" />
              <div className="w-[3px] h-[28px] rounded-sm bg-eli" />
              <div className="w-[3px] h-[18px] rounded-sm bg-oci" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-navy text-[1.0625rem] tracking-[-0.01em]">LIS</span>
              <span className="font-body font-medium text-ink-soft text-[0.5625rem] tracking-[0.13em] uppercase mt-[3px]">Leadership Infrastructure</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={pathname === link.href ? 'nav-link-active' : 'nav-link'} aria-current={pathname === link.href ? 'page' : undefined}>
                {link.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-surface-muted" aria-hidden="true" />
            <Link href="https://oci-app.vercel.app/dashboard" className="nav-link">
              Portal
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link href="/contact" className={pathname === '/contact' ? 'nav-link-active' : 'nav-link'} aria-current={pathname === '/contact' ? 'page' : undefined}>
              Contact
            </Link>
            <Link href="/eli-snapshot" className="btn-eli text-[0.75rem] tracking-[0.07em] px-5 py-2.5">
              Take ELI Snapshot
            </Link>
          </div>

          <button type="button" className="lg:hidden p-3 -mr-3 flex flex-col justify-center gap-[5px]" onClick={() => setOpen(prev => !prev)} aria-controls={MOBILE_MENU_ID} aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>
            <span className={`block h-[1.5px] w-5 bg-navy transition-all duration-200 origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-navy transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-navy transition-all duration-200 origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div id={MOBILE_MENU_ID} className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`} aria-hidden={!open}>
        <div className="overflow-hidden">
          <div className="bg-white border-t border-surface-muted">
            <nav className="section-inner py-4 flex flex-col divide-y divide-surface-muted" aria-label="Mobile">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} className="py-3.5 font-body text-sm font-medium text-ink hover:text-navy transition-colors" aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              ))}
              <Link href="https://oci-app.vercel.app/dashboard" tabIndex={open ? 0 : -1} className="py-3.5 font-body text-sm font-medium text-ink hover:text-navy transition-colors">
                Client Portal
              </Link>
              <Link href="/contact" tabIndex={open ? 0 : -1} className="py-3.5 font-body text-sm font-medium text-ink hover:text-navy transition-colors" aria-current={pathname === '/contact' ? 'page' : undefined}>
                Contact
              </Link>
              <div className="pt-5 pb-2">
                <Link href="/eli-snapshot" tabIndex={open ? 0 : -1} className="btn-eli w-full justify-center">
                  Take the ELI Snapshot
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
