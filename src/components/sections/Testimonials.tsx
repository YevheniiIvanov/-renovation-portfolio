import { testimonials } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-surface-elevated py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Opinie"
          title="Klienci, którym zależy na spokojnym wykonaniu"
          align="center"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/8 bg-surface p-8 shadow-card dark:border-white/8 dark:bg-ink/35">
                <blockquote className="flex-1 font-display text-lg leading-snug text-ink md:text-xl">
                  „{t.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-ink/10 pt-6 dark:border-white/10">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink-muted">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
