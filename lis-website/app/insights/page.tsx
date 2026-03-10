import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Insights — Leadership Infrastructure Thinking',
  description: 'Structural thinking on leadership infrastructure, organisational scaling, and the systems that determine whether companies grow or stall.',
}

// Placeholder articles — replace with real content via CMS or MDX.
// accent values use the updated brand token hex values.
const articles = [
  {
    slug:        'why-leadership-development-misses-the-point',
    category:    'Infrastructure Thinking',
    title:       'Why Leadership Development Misses the Point',
    excerpt:     'Most organisations invest in developing individual leaders. Few invest in the infrastructure that determines whether individual capability can function effectively at scale. The distinction matters more than most leadership teams recognise.',
    readTime:    '6 min read',
    date:        'March 2025',
    accent:      '#4C6A5E', // ELI green
  },
  {
    slug:        'the-escalation-problem',
    category:    'Structural Failure Patterns',
    title:       'The Escalation Problem: Why Decisions Keep Landing on Your Desk',
    excerpt:     'Escalation is not a people problem. When decisions consistently return to the same person, it is because the ownership structure around those decisions has not been built. This is diagnosable and fixable.',
    readTime:    '8 min read',
    date:        'February 2025',
    accent:      '#C8A04A', // OCI gold
  },
  {
    slug:        'founder-dependency-and-the-ceiling',
    category:    'Maturity Model Thinking',
    title:       'Founder Dependency and the Ceiling It Creates',
    excerpt:     'The same qualities that make founders effective at an early stage often become structural constraints as the organisation grows. Not because those qualities are wrong — but because the infrastructure to complement them has not been built.',
    readTime:    '7 min read',
    date:        'January 2025',
    accent:      '#6A4C7D', // LIMM purple
  },
  {
    slug:        'what-decision-rights-actually-mean',
    category:    'Infrastructure Thinking',
    title:       'What Decision Rights Actually Mean — and Why Most Companies Get Them Wrong',
    excerpt:     'Decision rights frameworks are often treated as a documentation exercise. In practice, they are a design problem: how authority should be structured, where it should sit, and what conditions govern its use.',
    readTime:    '9 min read',
    date:        'December 2024',
    accent:      '#4C6A5E',
  },
  {
    slug:        'the-five-stages-of-leadership-maturity',
    category:    'Maturity Model Thinking',
    title:       'The Five Stages of Leadership Infrastructure Maturity',
    excerpt:     'Not all leadership infrastructure gaps are the same. An organisation at Stage 2 faces fundamentally different structural challenges than an organisation at Stage 4. Understanding which stage you occupy changes what you need to build next.',
    readTime:    '10 min read',
    date:        'November 2024',
    accent:      '#6A4C7D',
  },
  {
    slug:        'why-accountability-systems-fail',
    category:    'Organisational Scaling',
    title:       'Why Accountability Systems Fail — and What to Build Instead',
    excerpt:     'Accountability does not fail because people lack commitment. It fails because the structural conditions that make accountability operable have not been designed: clear ownership, defined standards, and reliable feedback mechanisms.',
    readTime:    '7 min read',
    date:        'October 2024',
    accent:      '#1E2B38', // Navy
  },
] as const

const categories = [
  'All',
  'Infrastructure Thinking',
  'Structural Failure Patterns',
  'Maturity Model Thinking',
  'Organisational Scaling',
]

export default function InsightsPage() {
  const [featured, ...rest] = articles

  return (
    <>
      <PageHeader
        label="Insights"
        headline="Structural thinking on how organisations scale — and where they stall."
        subtext="Articles and analysis on leadership infrastructure, organisational design, and the systems that determine how effectively companies grow."
        variant="navy"
      />

      {/* ── CATEGORY FILTER (static — add client state on integration) ── */}
      <nav
        className="bg-white border-b border-surface-muted"
        aria-label="Article categories"
      >
        <div className="section-inner">
          <ul
            className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none"
            role="list"
          >
            {categories.map((cat, i) => (
              <li key={cat} className="shrink-0">
                <button
                  type="button"
                  className={`font-body text-label font-semibold tracking-[0.08em] px-4 py-2 transition-colors ${
                    i === 0
                      ? 'bg-navy text-white'
                      : 'text-ink-soft hover:text-navy hover:bg-surface'
                  }`}
                  aria-pressed={i === 0}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── ARTICLES ──────────────────────────────────────────────────── */}
      <section className="section-py bg-surface" aria-label="Articles">
        <div className="section-inner">

          {/* Featured article */}
          <div className="mb-8">
            <Link
              href={`/insights/${featured.slug}`}
              className="block bg-white border border-surface-muted p-10 lg:p-14 hover:border-navy/20 transition-colors group"
              aria-label={`Read: ${featured.title}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="fw-badge"
                      style={{
                        backgroundColor: `${featured.accent}14`,
                        borderColor:     `${featured.accent}35`,
                        color:            featured.accent,
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="font-body text-label text-ink-faint">{featured.date}</span>
                  </div>
                  <h2 className="font-display font-medium text-navy text-display-sm mb-4 group-hover:text-eli transition-colors text-balance">
                    {featured.title}
                  </h2>
                  <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-end">
                  <div
                    className="flex items-center gap-2 font-body text-body-sm font-semibold text-navy group-hover:text-eli transition-colors"
                    aria-hidden="true"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Article grid */}
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {rest.map(article => (
              <li key={article.slug}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="flex flex-col h-full bg-white border border-surface-muted hover:border-navy/20 transition-colors group overflow-hidden"
                  aria-label={`Read: ${article.title}`}
                >
                  {/* Top accent line — uses updated brand token */}
                  <div className="h-[2.5px] w-full shrink-0" style={{ backgroundColor: article.accent }} aria-hidden="true" />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="fw-badge"
                        style={{
                          backgroundColor: `${article.accent}14`,
                          borderColor:     `${article.accent}35`,
                          color:            article.accent,
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="font-body text-label text-ink-faint">{article.readTime}</span>
                    </div>

                    <h3 className="font-display font-medium text-navy text-body-lg mb-3 group-hover:text-eli transition-colors text-balance">
                      {article.title}
                    </h3>
                    <p className="font-body text-body-sm text-ink-soft leading-relaxed line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-body text-label text-ink-faint">{article.date}</span>
                      <span
                        className="font-body text-label font-semibold text-ink-faint/50 group-hover:text-eli transition-colors"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LINKEDIN NOTE ─────────────────────────────────────────────── */}
      <section className="section-py-sm bg-white border-y border-surface-muted">
        <div className="section-inner">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-display font-medium text-navy text-body-lg mb-1">
                More structural thinking, published regularly on LinkedIn.
              </p>
              <p className="font-body text-body-sm text-ink-soft">
                Articles, frameworks, and observations on leadership infrastructure.
              </p>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 text-[0.75rem]"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <CTASection
        headline="Understand where your organisation sits."
        subtext="Every article on this site ends at the same place: the diagnostic is the most useful starting point. Take the ELI Snapshot and get an immediate read of your leadership infrastructure."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        microcopy="3 minutes · No cost · Immediate results"
        variant="navy"
      />
    </>
  )
}
