import { Bath, Hammer, Home, LayoutTemplate } from 'lucide-react'
import { services } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

const iconMap = {
  bath: Bath,
  layout: LayoutTemplate,
  home: Home,
  hammer: Hammer,
} as const

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-surface-elevated py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="services-heading"
          eyebrow="Usługi"
          title="Specjalizacja w pomieszczeniach, które mają znaczenie"
          subtitle="Od kawalerek po domy jednorodzinne — jeden odpowiedzialny koordynator od rozbiórki po odbiór końcowy."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon]
            return (
              <FadeIn key={s.id} delay={i * 0.06}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-ink/8 bg-surface p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-soft dark:border-white/8 dark:bg-ink/40">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.03] text-accent transition group-hover:border-accent/40 dark:border-white/10 dark:bg-white/5">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                  <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-widest text-accent opacity-0 transition group-hover:opacity-100">
                    Więcej →
                  </span>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
