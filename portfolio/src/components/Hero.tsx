import { motion, useReducedMotion } from 'framer-motion'
import { heroStack, profile } from '../data/resume'
import { ArrowRight } from './Icons'
import { HeroReveal } from './motion'
import { TechIcon } from './TechIcons'

const projectTicker = [
  {
    name: 'Synaptiq',
    status: 'multi-agent AI tutor, HiDevs x Mastra Hackathon Finalist',
  },
  {
    name: 'ForensIQ',
    status: 'AI financial investigation platform, Build with Gemma Hackathon',
  },
  {
    name: 'MailMind AI',
    status: 'Gmail productivity dashboard, Cerebras x Gemma Hackathon',
  },
  {
    name: 'AdviseMENT',
    status: 'AI investment assistant, in active development',
  },
  {
    name: 'KaariGharKala',
    status: 'D2C artisan brand, Top 15 OFF/BEAT x CF Challenge',
  },
]

function TickerItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="hero-ticker-group" aria-hidden={duplicate || undefined}>
      {projectTicker.map((project) => (
        <span className="hero-ticker-item" key={`${duplicate ? 'duplicate-' : ''}${project.name}`}>
          <span className="hero-ticker-name">{project.name}</span>
          <span aria-hidden="true"> — </span>
          {project.status}
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-screen overflow-x-clip">
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="min-w-0 max-w-full">
            <HeroReveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="rounded-full border border-[#c97a4a]/40 bg-[#c97a4a]/[0.06] px-3 py-1.5 text-xs font-medium text-[#c97a4a]">
                  {profile.title}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-[#c97a4a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {profile.location}
                </span>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.1}>
              <h1 className="mt-5 text-[clamp(1.85rem,8vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-text break-words md:mt-6 md:text-[clamp(2.5rem,5.5vw,3.75rem)] md:leading-[1.05]">
                {profile.headline}
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.16}>
              <div className="mt-5 max-w-lg space-y-3.5 sm:mt-6 sm:space-y-4">
                {profile.bio.map((paragraph) => (
                  <p className="text-[0.9375rem] leading-relaxed text-muted sm:text-base" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </HeroReveal>

            <HeroReveal delay={0.28}>
              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                <a href="#projects" className="btn-outline glass-panel">
                  See my works
                </a>
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  Contact Me
                  <ArrowRight />
                </a>
              </div>
            </HeroReveal>

            <motion.div
              className="mt-8 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3"
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'visible'}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.42 },
                },
              }}
            >
              {heroStack.map((tech) => (
                <motion.div
                  key={tech}
                  className="hero-icon-tile glass-panel"
                  title={tech}
                  variants={{
                    hidden: { opacity: 0, x: -36 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      },
                    },
                  }}
                  whileHover={
                    reduceMotion ? undefined : { x: 4, y: -3, transition: { duration: 0.2 } }
                  }
                >
                  <TechIcon name={tech} className="h-7 w-7" />
                </motion.div>
              ))}
            </motion.div>

            <HeroReveal delay={0.48} className="min-w-0">
              <div
                className="hero-ticker mt-5 sm:mt-6"
                role="region"
                aria-label="Recent project updates"
              >
                <div className="hero-ticker-track">
                  <TickerItems />
                  <TickerItems duplicate />
                </div>
              </div>
            </HeroReveal>
          </div>

          <div className="relative mx-auto w-full max-w-[18rem] min-w-0 sm:max-w-md lg:max-w-none">
            <HeroReveal delay={0.18}>
              <div className="glass-panel hero-photo-panel relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                ) : (
                  <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-black/30">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08) 0%, transparent 55%)',
                      }}
                    />
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-border/80 bg-black/40">
                      <span className="text-3xl font-semibold text-muted-dark">AM</span>
                    </div>
                    <p className="relative mt-4 text-sm text-muted-dark">Your photo goes here</p>
                  </div>
                )}
              </div>
            </HeroReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
