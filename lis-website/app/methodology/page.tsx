import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import SectionRule from '@/components/SectionRule'

export const metadata: Metadata = {
  title: 'Methodology — The Leadership Infrastructure Framework',
  description: 'The four-part diagnostic and implementation methodology: ELI, OCI, LIMM, and LIS.',
}

const maturityStages = [
  {
    stage: '01',
    label: 'Founder Dependency',
    description: 'All significant decisions require founder or executive involvement. Leadership capacity does not exist independently of the founding team.',
    signals: ['Every major decision awaits founder input', 'No documented decision rights exist', 'Absence of founder creates operational pause'],
  },
  {
    stage: '02',
    label: 'Emerging Leadership',
    description: 'Early leadership roles exist but authority and accountability are not clearly defined. Escalation is frequent and unpredictable.',
    signals: ['Managers exist but ownership is ambiguous', 'Escalation patterns are inconsistent', 'Role definitions overlap or conflict'],
  },
  {
    stage: '03',
    label: 'Structured Leadership',
    description: 'A defined leadership structure is in place with some clarity of role and responsibility, but infrastructure gaps create friction under pressure.',
    signals: ['Structure exists but decision rights are incomplete', 'Performance under pressure is inconsistent', 'Leadership standards vary across teams'],
  },
  {
    stage: '04',
    label: 'Distributed Ownership',
    description: 'Leadership ownership is clearly distributed. Decision rights are defined. Accountability systems are operational but not yet deeply embedded.',
    signals: ['Clear ownership at all levels', 'Decision rights are documented and followed', 'Accountability operates independently of founders'],
  },
  {
    stage: '05',
    label: 'Autonomous Organisation',
    description: 'Leadership infrastructure is fully embedded. The organisation scales without founder dependency. Strategic direction is set rather than managed.',
    signals: ['Organisation functions without executive operational involvement', 'Leadership standards are self-reinforcing', 'Structural adaptation happens systematically'],
  },
] as const

const lisComponents = [
  { id: '01', label: 'Ownership Frameworks',        detail: 'Defining who owns what outcomes — clearly, completely, and in a way that is understood across the organisation.' },
  { id: '02', label: 'Decision Rights Architecture', detail: 'Mapping who has the authority to make which decisions, at what level, and under what conditions.' },
  { id: '03', label: 'Escalation Pathways',          detail: 'Designing clear routes for decisions that need to move upward — including criteria, timelines, and resolution expectations.' },
  { id: '04', label: 'Leadership Standards',         detail: 'Establishing the behavioural and operational standards that define what leadership means inside your organisation.' },
  { id: '05', label: 'Accountability Systems',       detail: 'Building the mechanisms by which ownership, commitments, and standards are tracked and maintained consistently.' },
  { id: '06', label: 'Communication Architecture',   detail: 'Structuring how information, decisions, and direction flow across the organisation — by design rather than by default.' },
] as const

// Framework sequence — each step in the methodology journey
const frameworkSequence = [
  { id: 'ELI',  label: 'Executive Leverage Index',     role: 'Measure load & distribution', color: '#4C6A5E', step: 'Diagnose' },
  { id: 'OCI',  label: 'Organisational Clarity Index', role: 'Measure structural clarity',  color: '#C8A04A', step: 'Analyse'  },
  { id: 'LIMM', label: 'Maturity Model',               role: 'Map current stage',            color: '#6A4C7D', step: 'Position' },
  { id: 'LIS',  label: 'Infrastructure Systems',       role: 'Install what is needed',       color: '#1E2B38', step: 'Build'    },
] as const

// ELI dimension cards
const eliDimensions = [
  { label: 'Escalation Frequency',   detail: 'How often decisions are escalating beyond their appropriate level.' },
  { label: 'Executive Decision Load', detail: 'The proportion of decisions that require executive involvement.' },
  { label: 'Leadership Ownership',    detail: 'How clearly outcome ownership is distributed across the structure.' },
  { label: 'Decision Velocity',       detail: 'The speed at which decisions move from identification to resolution.' },
  { label: 'Organisational Leverage', detail: 'The ratio of leadership capacity to executive dependency.' },
] as const

// OCI dimension cards
const ociDimensions = [
  { label: 'Role Clarity',            detail: 'The degree to which every leadership role has defined scope, expectations, and boundaries.' },
  { label: 'Decision Authority',       detail: 'Whether authority to decide is clearly mapped across roles and levels.' },
  { label: 'Communication Pathways',   detail: 'How information moves — by design or by default — across the organisation.' },
  { label: 'Accountability Structures', detail: 'Whether the systems for measuring and maintaining commitment exist and function.' },
  { label: 'Leadership Alignment',     detail: 'The degree to which the leadership team shares consistent operating principles.' },
] as const

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        label="The Methodology"
        headline="Four integrated frameworks for diagnosing and building leadership infrastructure."
        subtext="The LIS methodology moves from measurement to implementation — from identifying structural failure patterns to installing the systems that resolve them."
        variant="navy"
      />

      {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
      <section className="section-py bg-white" aria-labelledby="thesis-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionRule />
              <p className="eyebrow mb-5">The Core Thesis</p>
              <h2
                id="thesis-heading"
                className="font-display font-medium text-navy text-display-sm lg:text-display-md text-balance"
              >
                Leadership problems are infrastructure problems.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-14 space-y-5">
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                Individual capability is necessary but not sufficient. The degree to which individual leadership capability translates into organisational performance depends on the systems that surround it: how decisions are structured, how ownership is assigned, how authority is defined, and how accountability is maintained.
              </p>
              <p className="font-body text-body-lg text-ink-soft leading-relaxed">
                The LIS methodology begins with diagnosis — measuring the current structural state — and moves through to implementation: installing the infrastructure systems that allow leadership to operate effectively at scale.
              </p>
            </div>
          </div>

          {/* Framework sequence diagram */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-surface-muted" role="list" aria-label="Methodology sequence">
            {frameworkSequence.map((fw) => (
              <div key={fw.id} className="bg-white px-8 py-8" role="listitem">
                <div
                  className="font-body text-label font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: fw.color }}
                >
                  {fw.step}
                </div>
                <div className="w-6 h-px mb-4" style={{ backgroundColor: fw.color }} aria-hidden="true" />
                <p
                  className="font-display font-semibold text-display-sm mb-2"
                  style={{ color: fw.color }}
                >
                  {fw.id}
                </p>
                <p className="font-body text-body-sm text-ink-soft">{fw.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELI ───────────────────────────────────────────────────────── */}
      <section id="eli" className="section-py bg-surface" aria-labelledby="eli-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="mb-8">
                <Image
                  src="/logos/eli-logo.png"
                  alt="ELI — Executive Leverage Index"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain object-left"
                />
              </div>
              {/* ELI badge */}
              <span className="fw-badge mb-5" style={{ backgroundColor: 'rgba(76,106,94,0.08)', borderColor: 'rgba(76,106,94,0.25)', color: '#4C6A5E' }}>
                ELI
              </span>
              <h2
                id="eli-heading"
                className="font-display font-medium text-navy text-display-sm mb-5"
              >
                Executive Leverage Index
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-8">
                The primary entry point into the LIS methodology. The ELI diagnoses how leadership responsibility is distributed — where load is concentrated, where ownership is absent, and where escalation patterns indicate structural risk.
              </p>
              <Link href="/eli-snapshot" className="btn-eli text-[0.75rem]">
                Take the ELI Snapshot
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-muted">
                {eliDimensions.map(item => (
                  <div key={item.label} className="bg-white p-7 border-l-[2.5px] border-eli">
                    <h3 className="font-body text-body-sm font-semibold text-navy mb-2">{item.label}</h3>
                    <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OCI ───────────────────────────────────────────────────────── */}
      <section id="oci" className="section-py bg-white" aria-labelledby="oci-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="mb-8">
                <Image
                  src="/logos/oci-logo.png"
                  alt="OCI — Organisational Clarity Index"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain object-left"
                  style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(25%) saturate(800%) hue-rotate(175deg)' }}
                />
              </div>
              <span className="fw-badge mb-5" style={{ backgroundColor: 'rgba(200,160,74,0.08)', borderColor: 'rgba(200,160,74,0.25)', color: '#C8A04A' }}>
                OCI
              </span>
              <h2
                id="oci-heading"
                className="font-display font-medium text-navy text-display-sm mb-5"
              >
                Organisational Clarity Index
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                The OCI measures the structural clarity that exists inside your organisation. Not organisational chart clarity — structural clarity: the degree to which roles, authority, accountability, and communication are defined clearly enough to operate under pressure.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-muted">
                {ociDimensions.map(item => (
                  <div key={item.label} className="bg-surface p-7 border-l-[2.5px] border-oci">
                    <h3 className="font-body text-body-sm font-semibold text-navy mb-2">{item.label}</h3>
                    <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIMM ──────────────────────────────────────────────────────── */}
      <section id="limm" className="section-py bg-surface" aria-labelledby="limm-heading">
        <div className="section-inner">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/logos/limm-logo.png"
                alt="LIMM — Leadership Infrastructure Maturity Model"
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="fw-badge" style={{ backgroundColor: 'rgba(106,76,125,0.08)', borderColor: 'rgba(106,76,125,0.25)', color: '#6A4C7D' }}>
                LIMM
              </span>
            </div>
            <h2
              id="limm-heading"
              className="font-display font-medium text-navy text-display-sm lg:text-display-md mb-5 text-balance"
            >
              Leadership Infrastructure Maturity Model
            </h2>
            <p className="font-body text-body-lg text-ink-soft leading-relaxed max-w-2xl">
              The LIMM maps organisations across five stages of leadership infrastructure maturity. It provides a reference frame for understanding the current state — and what it will take to progress.
            </p>
          </div>

          <div className="divide-y divide-surface-muted">
            {maturityStages.map((stage, i) => (
              <div
                key={stage.stage}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-1">
                  {/* Use text-limm (not text-limm-DEFAULT) */}
                  <span className="font-body text-label-sm text-limm font-semibold tracking-[0.16em]" aria-hidden="true">
                    {stage.stage}
                  </span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display font-medium text-navy text-body-xl">{stage.label}</h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="font-body text-body-sm text-ink-soft leading-relaxed">{stage.description}</p>
                </div>
                <div className="lg:col-span-4">
                  <p className="font-body text-label font-semibold tracking-[0.12em] uppercase text-ink-faint mb-3">Indicators</p>
                  <ul className="space-y-1.5" role="list">
                    {stage.signals.map(signal => (
                      <li key={signal} className="flex items-start gap-2">
                        {/* Use bg-limm (not bg-limm-DEFAULT) */}
                        <div className="w-1 h-1 rounded-full mt-1.5 bg-limm shrink-0" aria-hidden="true" />
                        <span className="font-body text-label text-ink-soft">{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIS ───────────────────────────────────────────────────────── */}
      <section id="lis" className="section-py bg-white" aria-labelledby="lis-heading">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="mb-8">
                <Image
                  src="/logos/lis-logo.png"
                  alt="LIS — Leadership Infrastructure Systems"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain object-left"
                />
              </div>
              {/* LIS uses surface bg since it has a dark background logo */}
              <span className="fw-badge mb-5 bg-surface text-navy border-navy/20">
                LIS
              </span>
              <h2
                id="lis-heading"
                className="font-display font-medium text-navy text-display-sm mb-5"
              >
                Leadership Infrastructure Systems
              </h2>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed mb-5">
                The implementation framework. Once the diagnostic phase is complete, LIS installs the specific infrastructure systems that resolve the identified gaps.
              </p>
              <p className="font-body text-body-sm text-ink-soft leading-relaxed">
                This is not consulting advice. It is structured implementation — building the operational architecture that allows leadership to function at scale.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-muted">
              {lisComponents.map(item => (
                <div key={item.id} className="bg-surface p-7 border-l-[2.5px] border-navy">
                  <span className="font-body text-label-sm text-ink-faint/60 font-semibold tracking-[0.16em] block mb-3">{item.id}</span>
                  <h3 className="font-body text-body-sm font-semibold text-navy mb-2">{item.label}</h3>
                  <p className="font-body text-body-sm text-ink-soft leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Start with the ELI Snapshot."
        subtext="The diagnostic is the entry point. Take 3 minutes to get an immediate read of where your leadership infrastructure stands."
        primaryCTA={{ label: 'Take the ELI Snapshot', href: '/eli-snapshot' }}
        secondaryCTA={{ label: 'Book a Deep Diagnostic', href: '/deep-diagnostic' }}
        variant="navy"
      />
    </>
  )
}
