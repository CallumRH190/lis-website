import SectionRule from '@/components/SectionRule'

interface PageHeaderProps {
  label?:   string
  headline: string
  subtext?: string
  variant?: 'navy' | 'surface' | 'white'
}

const bgMap = {
  navy:    'navy-section',
  surface: 'bg-surface',
  white:   'bg-white',
} as const

export default function PageHeader({
  label,
  headline,
  subtext,
  variant = 'navy',
}: PageHeaderProps) {
  const isNavy = variant === 'navy'

  return (
    <section className={`pt-20 pb-16 lg:pt-28 lg:pb-20 ${bgMap[variant]}`}>
      <div className="section-inner">

        {/* FIX: was an inline copy of the rule div — now uses shared SectionRule */}
        <SectionRule />

        <div className="max-w-3xl">
          {/*
            FIX: removed redundant text-eli from eyebrow.
            .eyebrow already applies text-eli in globals.css @layer components.
          */}
          {label && (
            <p className="eyebrow mb-5">{label}</p>
          )}
          <h1
            className={`font-display font-medium text-display-lg lg:text-display-xl text-balance ${
              isNavy ? 'text-white' : 'text-navy'
            }`}
          >
            {headline}
          </h1>
          {subtext && (
            <p
              className={`mt-6 font-body text-body-xl leading-relaxed max-w-2xl ${
                isNavy ? 'text-white/60' : 'text-ink-soft'
              }`}
            >
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
