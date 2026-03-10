import Link from 'next/link'

interface CTASectionProps {
  headline?:     string
  subtext?:      string
  primaryCTA?:   { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  microcopy?:    string
  variant?:      'navy' | 'surface' | 'white'
}

const bgMap = {
  navy:    'navy-section',
  surface: 'bg-surface',
  white:   'bg-white',
} as const

export default function CTASection({
  headline     = 'Find out where leadership pressure is building inside your organisation.',
  subtext      = 'The ELI Snapshot is a 3-minute diagnostic that identifies where decision load, escalation, and ownership gaps are concentrated.',
  primaryCTA   = { label: 'Take the ELI Snapshot', href: '/eli-snapshot' },
  secondaryCTA,
  microcopy    = '3 minutes · No account required · Instant result',
  variant      = 'navy',
}: CTASectionProps) {
  const isNavy = variant === 'navy'

  return (
    /*
      FIX: Replaced aria-labelledby="cta-headline" + id="cta-headline" with
      aria-label on the section. The previous approach produced duplicate IDs
      when this component was used more than once per page, which is invalid
      HTML and breaks assistive technology.
    */
    <section
      className={`section-py-lg ${bgMap[variant]}`}
      aria-label={headline}
    >
      <div className="section-inner-sm text-center">

        {/* Thin decorative rule */}
        <div className="flex justify-center mb-10" aria-hidden="true">
          <div className="w-8 h-px bg-eli opacity-50" />
        </div>

        <h2
          className={`font-display font-medium text-display-md lg:text-display-lg text-balance leading-tight mb-6 ${
            isNavy ? 'text-white' : 'text-navy'
          }`}
        >
          {headline}
        </h2>

        {subtext && (
          <p
            className={`font-body text-body-lg leading-relaxed mb-10 max-w-2xl mx-auto ${
              isNavy ? 'text-white/60' : 'text-ink-soft'
            }`}
          >
            {subtext}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className="btn-eli px-8 py-3.5 text-[0.8125rem]"
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={isNavy ? 'btn-ghost-light' : 'btn-ghost-dark'}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>

        {microcopy && (
          <p
            className={`mt-5 font-body text-label tracking-[0.06em] ${
              isNavy ? 'text-white/30' : 'text-ink-faint'
            }`}
          >
            {microcopy}
          </p>
        )}
      </div>
    </section>
  )
}
