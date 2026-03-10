import Link from 'next/link'

const footerLinks: Record<string, { href: string; label: string }[]> = {
  Diagnostic: [
    { href: '/eli-snapshot',    label: 'ELI Snapshot'    },
    { href: '/deep-diagnostic', label: 'Deep Diagnostic' },
  ],
  Platform: [
    { href: '/methodology', label: 'Methodology' },
    { href: '/solutions',   label: 'Solutions'   },
    { href: '/insights',    label: 'Insights'    },
  ],
  Company: [
    { href: '/about',   label: 'About'        },
    { href: '/contact', label: 'Contact'       },
    { href: '/portal',  label: 'Client Portal' },
  ],
}

export default function Footer() {
  return (
    <footer className="navy-section" aria-label="Site footer">

      {/* ── Main grid ──────────────────────────────── */}
      <div className="section-inner pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="lg:col-span-5">
            {/* Wordmark */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-end gap-[3px]" aria-hidden="true">
                <div className="w-[3px] h-[22px] rounded-sm bg-white" />
                <div className="w-[3px] h-[28px] rounded-sm bg-eli"   />
                <div className="w-[3px] h-[18px] rounded-sm bg-oci"   />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-white text-[1.0625rem] tracking-[-0.01em]">
                  LIS
                </span>
                <span className="font-body font-medium text-white/40 text-[0.5625rem] tracking-[0.13em] uppercase mt-[3px]">
                  Leadership Infrastructure
                </span>
              </div>
            </div>

            <p className="font-body text-body-sm text-white/55 leading-relaxed max-w-xs mb-8">
              A structured methodology for diagnosing and fixing the leadership infrastructure problems that emerge as organisations scale.
            </p>

            {/*
              FIX: .btn already sets inline-flex items-center gap-2.
              Only gap-2.5 overrides the default gap — everything else was redundant.
            */}
            <Link
              href="/eli-snapshot"
              className="btn-eli gap-2.5 text-[0.75rem] tracking-[0.08em]"
            >
              Take the ELI Snapshot
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Link columns — 3 col at sm+, stacked on mobile */}
          <nav
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8"
            aria-label="Footer navigation"
          >
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                {/*
                  <p> not <h3> — these are nav labels, not document headings.
                  text-white/30 utility correctly overrides .eyebrow's text-eli
                  (utilities beat component classes in Tailwind's cascade).
                */}
                <p className="eyebrow text-white/30 mb-5">{category}</p>
                <ul className="space-y-3.5" role="list">
                  {links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-body-sm text-white/55 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────── */}
      <div className="border-t border-white/[0.08]">
        <div className="section-inner py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[0.6875rem] text-white/30 tracking-[0.03em]">
            © {new Date().getFullYear()} Leadership Infrastructure Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-body text-[0.6875rem] text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-[0.6875rem] text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
