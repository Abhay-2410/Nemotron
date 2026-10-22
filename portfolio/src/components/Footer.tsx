import type { ComponentType } from 'react'
import { navLinks, profile, socialLinks } from '../data/resume'
import ContactForm from './ContactForm'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { FadeIn } from './motion'

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
}

export default function Footer() {
  return (
    <footer id="contact">
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-8">
        <FadeIn>
          <div className="glass-panel relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem]">
            <div className="relative px-4 py-10 sm:px-8 sm:py-12 md:py-16 lg:px-12">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
                  Let&apos;s Build Something Great
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base text-muted">
                  Let&apos;s bring your ideas to life with thoughtful design and code.
                </p>
              </div>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <div className="glass-panel flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
                {profile.photo ? (
                  <img src={profile.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold text-muted">AM</span>
                )}
              </div>
              <span className="text-sm font-semibold text-text">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {profile.footerBio}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.label]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-text text-bg transition-transform hover:scale-105"
                    aria-label={link.label}
                  >
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <nav
              className="flex flex-col items-start gap-3 lg:items-end"
              aria-label="Footer"
            >
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
              <a href="/resume.pdf" className="nav-link">
                Download résumé
              </a>
            </nav>
          </FadeIn>
        </div>

        <p className="border-t border-white/[0.08] py-6 text-center text-xs text-muted-dark">
          © {new Date().getFullYear()} — Copyright. All Rights reserved
        </p>
      </div>
    </footer>
  )
}
