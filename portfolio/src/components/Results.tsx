import { results } from '../data/resume'
import { FadeIn, Stagger, StaggerItem } from './motion'

function TrophyIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5v1a4 4 0 0 0 4 4M16 6h3v1a4 4 0 0 1-4 4M12 11v5M9 20h6M10 16h4" />
    </svg>
  )
}

const podiumCount = results.filter((item) => item.podium).length
const winCount = results.filter((item) => item.win).length
const years = results
  .map((item) => Number(item.date.match(/\d{4}/)?.[0]))
  .filter((year) => Number.isFinite(year))
  .sort((a, b) => a - b)
const yearSpan =
  years[0] === years[years.length - 1]
    ? String(years[0])
    : `${years[0]}–${years[years.length - 1]}`

export default function Results() {
  return (
    <section
      id="results"
      className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20 lg:pt-14"
    >
      <FadeIn className="mx-auto max-w-2xl text-center">
        <p className="section-label">Recognition</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-5xl">
          Achievements &amp; Certifications
        </h2>
        <p className="mt-4 text-base text-muted">
          Competition wins and milestones from my journey.
        </p>
      </FadeIn>

      <FadeIn
        className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted"
        delay={0.08}
      >
        <span className="inline-flex items-center gap-2 text-[#c9b56d]">
          <TrophyIcon />
          {results.length} achievements
        </span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-white/10 sm:block" />
        <span>{podiumCount} podiums</span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-white/10 sm:block" />
        <span>{winCount} wins</span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-white/10 sm:block" />
        <span>{yearSpan}</span>
      </FadeIn>

      <Stagger className="mx-auto mt-12 max-w-4xl space-y-4">
        {results.map((item) => (
          <StaggerItem key={item.title}>
            <article className="glass-panel group grid gap-4 rounded-2xl p-3 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04] sm:grid-cols-[180px_1fr] sm:items-center sm:gap-5 sm:p-4">
              <div className="relative flex aspect-[16/10] min-w-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-black/40">
                <img
                  src={item.banner}
                  alt={`${item.title} banner`}
                  className="absolute inset-0 h-full w-full object-cover sm:object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.2), transparent 55%, rgba(0,0,0,0.05))',
                  }}
                />
                <span
                  className={`absolute left-2.5 top-2.5 rounded px-2 py-1 text-[0.625rem] font-bold uppercase tracking-wide ${
                    item.badgeTone === 'winner'
                      ? 'bg-[#c9b56d] text-black'
                      : 'bg-slate-600/90 text-slate-100'
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="min-w-0 py-1 px-1 sm:px-0">
                <p className="text-xs text-muted-dark">{item.date}</p>
                <h3 className="mt-1 text-base font-semibold tracking-tight text-text sm:text-lg">
                  {item.title}
                </h3>
                {item.organization && (
                  <p className="mt-1 text-sm text-muted">{item.organization}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted-dark">{item.description}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
