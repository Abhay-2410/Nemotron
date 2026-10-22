import { motion, useReducedMotion } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { HeroReveal } from './motion'
import { TechIcon } from './TechIcons'

function SkillCard({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="skill-tile">
      <TechIcon name={icon} className="h-7 w-7 sm:h-9 sm:w-9" />
      <span className="text-center text-[0.6875rem] leading-tight font-medium text-muted sm:text-sm">
        {label}
      </span>
    </div>
  )
}

function SkillCategoryBlock({
  title,
  description,
  skills,
  delay,
}: {
  title: string
  description: string
  skills: { label: string; icon: string }[]
  delay: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <HeroReveal delay={delay} className="mt-12 first:mt-0 sm:mt-16 md:mt-20">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted">{description}</p>
      </div>

      <motion.div
        className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-4"
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.03, delayChildren: 0.04 },
          },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.label}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
                    },
                  }
            }
          >
            <SkillCard label={skill.label} icon={skill.icon} />
          </motion.div>
        ))}
      </motion.div>
    </HeroReveal>
  )
}

export default function TechStack() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 pt-6 pb-6 sm:px-6 lg:px-8 lg:pt-8 lg:pb-8">
      <HeroReveal delay={0.05} className="mx-auto max-w-2xl text-center">
        <p className="section-label">Tech Stack</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl">
          Tools I Build With
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          A curated set of technologies I rely on to build modern web experiences.
        </p>
      </HeroReveal>

      <div className="mt-14 md:mt-16">
        {skillCategories.map((category, index) => (
          <SkillCategoryBlock
            key={category.title}
            title={category.title}
            description={category.description}
            skills={category.skills}
            delay={0.08 + index * 0.05}
          />
        ))}
      </div>
    </section>
  )
}
