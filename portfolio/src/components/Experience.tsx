import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { experience } from '../data/resume'
import { ArrowRight, ChevronDown, ChevronUp } from './Icons'
import { FadeIn, Stagger, StaggerItem } from './motion'

export default function Experience() {
  const [expanded, setExpanded] = useState<number>(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 pt-6 pb-6 sm:px-6 lg:px-8 lg:pt-8 lg:pb-8">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <p className="section-label">Experience</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl">
          Where I&apos;ve Worked
        </h2>
        <p className="mt-4 text-base text-muted">
          A summary of my professional journey and the impact I&apos;ve made.
        </p>
      </FadeIn>

      <Stagger className="mx-auto mt-14 max-w-3xl space-y-4">
        {experience.map((item, index) => {
          const isOpen = expanded === index

          return (
            <StaggerItem key={`${item.company}-${item.period}`}>
              <div className="glass-panel overflow-hidden rounded-2xl">
                <button
                  type="button"
                  className="flex w-full flex-col items-start gap-1 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5"
                  onClick={() => setExpanded(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 font-medium text-text">
                    {item.role} — {item.company}
                  </span>
                  <span className="shrink-0 text-sm text-muted">{item.period}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.08] px-4 pb-5 pt-4 sm:px-6">
                        <ul className="space-y-2 text-sm leading-relaxed text-muted">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-dark" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  className="flex w-full border-t border-white/[0.08] px-4 py-3 text-muted-dark transition-colors hover:bg-white/[0.04] sm:px-6"
                  onClick={() => setExpanded(isOpen ? -1 : index)}
                  aria-label={isOpen ? 'Collapse experience' : 'Expand experience'}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-bg">
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </span>
                </button>
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>

      <FadeIn className="mt-10 flex justify-center" delay={0.15}>
        <a href="/resume.pdf" className="btn-primary">
          Download My CV
          <ArrowRight />
        </a>
      </FadeIn>
    </section>
  )
}
