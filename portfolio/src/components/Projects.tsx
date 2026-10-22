import { profile, projects } from '../data/resume'
import { ArrowRight, GitHubIcon } from './Icons'
import { FadeIn, Stagger, StaggerItem } from './motion'

const projectGradients = [
  'linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #0f0f0f 100%)',
  'linear-gradient(135deg, #064e3b 0%, #047857 45%, #0f0f0f 100%)',
  'linear-gradient(135deg, #7c2d12 0%, #9a3412 45%, #0f0f0f 100%)',
]

function ProjectImage({ name, index }: { name: string; index: number }) {
  return (
    <div className="project-image-wrap aspect-[16/9] w-full">
      <div
        className="project-placeholder flex h-full w-full items-center justify-center p-6 text-center"
        style={{ background: projectGradients[index % projectGradients.length] }}
      >
        <span className="text-4xl font-bold tracking-tight text-white/10 group-hover:text-white/20 transition-colors">
          {name}
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 pt-6 pb-6 sm:px-6 lg:px-8 lg:pt-8 lg:pb-8">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <p className="section-label">Projects</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-4 text-base text-muted">
          AI applications, intelligent multi-agent systems, and full-stack platforms built to solve real-world problems.
        </p>
      </FadeIn>

      <FadeIn className="mt-8 text-center" delay={0.1}>
        <p className="text-sm text-muted-dark">{profile.tagline}</p>
      </FadeIn>

      <Stagger className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
        {projects.map((project, index) => (
          <StaggerItem key={project.name} className="flex">
            <article className="group glass-panel flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
              <div>
                <ProjectImage name={project.name} index={index} />

                <div className="mt-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-text">{project.name}</h3>
                    {project.status && (
                      <span className="rounded-full border border-[#c97a4a]/30 bg-[#c97a4a]/10 px-2.5 py-0.5 text-xs font-medium text-[#c97a4a]">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c97a4a]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[11px] text-muted-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/5">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline glass-panel flex-1 justify-center text-xs py-2 px-3 inline-flex items-center gap-2"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center text-xs py-2 px-3 inline-flex items-center gap-2"
                >
                  Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
