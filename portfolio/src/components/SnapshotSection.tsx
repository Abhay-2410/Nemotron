import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { CountUp } from './CountUp'
import { FadeIn, Stagger, StaggerItem } from './motion'

const stats = [
  {
    label: 'CGPA',
    suffix: ' / 10',
    value: 8.36,
    decimals: 2,
    start: 0,
  },
  {
    label: 'Hackathon Wins',
    subtext: 'VertchX · Vyuhatech 2.0',
    value: 2,
    decimals: 0,
    start: 0,
  },
  {
    label: 'Internship',
    subtext: 'Software Engineer @ Startup Haven',
    value: 6,
    suffix: ' mo',
    decimals: 0,
    start: 0,
  },
  {
    label: 'Graduating',
    subtext: 'B.E. CSE (ISE), MVJ College of Engineering',
    value: 2027,
    decimals: 0,
    start: 2020,
  },
] as const

function StatCard({
  stat,
  active,
}: {
  stat: (typeof stats)[number]
  active: boolean
}) {
  return (
    <article className="snapshot-stat-card glass-panel h-full rounded-2xl sm:h-auto px-4 py-5 sm:px-6 sm:py-8">
      <p className="text-[clamp(1.4rem,6vw,1.75rem)] font-bold leading-none tracking-tight text-text sm:text-[clamp(1.75rem,4vw,2.25rem)]">
        <CountUp
          value={stat.value}
          start={stat.start}
          decimals={stat.decimals}
          active={active}
        />
        {'suffix' in stat && stat.suffix ? (
          <span className="text-muted">{stat.suffix}</span>
        ) : null}
      </p>
      <p className="mt-3 text-sm font-medium text-text sm:mt-4">{stat.label}</p>
      {'subtext' in stat && stat.subtext ? (
        <p className="mt-1 text-[0.6875rem] leading-relaxed text-muted-dark sm:mt-1.5 sm:text-xs">{stat.subtext}</p>
      ) : null}
    </article>
  )
}

export default function SnapshotSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, { once: true, amount: 0.25, margin: '-60px' })
  const animateStats = reduceMotion ? true : inView

  return (
    <section
      ref={sectionRef}
      id="snapshot"
      className="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 lg:pb-8"
    >
      <FadeIn className="mx-auto max-w-2xl text-center">
        <p className="section-label">Snapshot</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl">
          A Quick Look
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The numbers and journey behind the work.
        </p>
      </FadeIn>

      <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="h-full">
            <StatCard stat={stat} active={animateStats} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
