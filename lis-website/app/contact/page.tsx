import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import SectionRule from '@/components/SectionRule'

export const metadata: Metadata = {
  title: 'Contact — Leadership Infrastructure Systems',
  description: 'Get in touch to discuss a diagnostic engagement or ask a question.',
}

const contactReasons = [
  { label: 'Book a Deep Diagnostic',      detail: 'A structured 60-minute diagnostic session examining your leadership infrastructure.' },
  { label: 'Enquire About an Audit',       detail: 'A company-wide diagnostic programme for scaling organisations.' },
  { label: 'Discuss the Infrastructure Build', detail: 'A structured implementation engagement to install leadership infrastructure.' },
  { label: 'General Enquiry',             detail: 'A question about the methodology, services, or whether this work is relevant to your situation.' },
]

// Shared label style — keeps form labels consistent across the page
const labelClass = 'font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-soft block mb-2'

// Shared input/textarea classes — wire to real form submission on integration
const inputClass = 'w-full border border-surface-muted bg-surface h-11 px-4 font-body text-body-sm text-ink placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors disabled:cursor-not-allowed'
const textareaClass = 'w-full border border-surface-muted bg-surface p-4 font-body text-body-sm text-ink placeholder:text-ink-faint/60 focus:border-navy focus:outline-none transition-colors resize-none disabled:cursor-not-allowed'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        headline="Talk to us about your organisation's leadership infrastructure."
        subtext="If you are experiencing the leadership friction that comes with scale, the most useful first step is usually the ELI Snapshot. If you would prefer to speak directly, use the form below."
        variant="navy"
      />

      <section className="section-py bg-surface" aria-labelledby="contact-form-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* ── Left: context ──────────────────────────────── */}
            <div className="lg:col-span-4">
              <SectionRule />
              <p className="eyebrow mb-6">Before You Write</p>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-8">
                The fastest route to understanding whether our work is relevant to your situation is the ELI Snapshot — a free, 3-minute diagnostic that produces an immediate structural read.
              </p>

              {/* Inline ELI nudge */}
              <div className="border border-surface-muted bg-white p-7 mb-8">
                <p className="eyebrow text-eli mb-4">Start Here</p>
                <p className="font-body text-body-sm text-ink-mid mb-5 leading-relaxed">
                  Take the ELI Snapshot first. If the results are relevant, get in touch.
                </p>
                <Link
                  href="/eli-snapshot"
                  className="btn-eli w-full justify-center text-[0.75rem]"
                >
                  Take the ELI Snapshot
                </Link>
                <p className="font-body text-label text-ink-faint text-center mt-3">
                  3 minutes · No cost · Immediate result
                </p>
              </div>

              {/* Contact reasons */}
              <div>
                <p className="eyebrow text-ink-faint mb-5">Reasons to Get in Touch</p>
                <ul className="space-y-4" role="list">
                  {contactReasons.map(reason => (
                    <li key={reason.label} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-eli shrink-0 mt-[0.45rem]" aria-hidden="true" />
                      <div>
                        <p className="font-body text-body-sm font-semibold text-navy">{reason.label}</p>
                        <p className="font-body text-body-xs text-ink-soft mt-0.5 leading-relaxed">{reason.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right: form ────────────────────────────────── */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-surface-muted p-10 lg:p-14">
                <h2
                  id="contact-form-heading"
                  className="font-display font-medium text-navy text-display-sm mb-8"
                >
                  Send us a message
                </h2>

                {/*
                  Form placeholder — wire to a server action or API route.
                  All inputs use proper <label htmlFor> associations.
                  Replace the styled divs with actual <input> / <select> / <textarea>.
                */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="full-name" className={labelClass}>
                        Full Name <span className="text-eli" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        disabled
                        placeholder="Your name"
                        required
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="organisation" className={labelClass}>
                        Organisation <span className="text-eli" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="organisation"
                        type="text"
                        disabled
                        placeholder="Company name"
                        required
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address <span className="text-eli" aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled
                      placeholder="your@organisation.com"
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className={labelClass}>
                      What are you looking to discuss?
                    </label>
                    <input
                      id="reason"
                      type="text"
                      disabled
                      placeholder="Select a reason"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Tell us about your situation
                    </label>
                    <textarea
                      id="message"
                      disabled
                      rows={5}
                      placeholder="Describe the leadership challenges you are experiencing and what you are hoping to address"
                      className={textareaClass}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      className="btn-primary w-full justify-center"
                      disabled
                      aria-label="Send message (form not yet wired)"
                    >
                      Send Message
                    </button>
                    <p className="font-body text-label text-ink-faint text-center mt-4">
                      We respond to all enquiries within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
