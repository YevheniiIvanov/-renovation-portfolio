import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-b border-ink/5 bg-surface py-24 md:py-32 dark:border-white/5"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="about-heading"
          eyebrow="O nas"
          title="Remonty dopasowane do codziennego życia"
          subtitle="Pracuję z osobami, które cenią sobie przejrzystość: konkretne oferty, porządek na budowie i wykończenia odporne na codzienne użytkowanie — nie tylko na zdjęcia."
          align="center"
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85&auto=format&fit=crop"
                alt="Wykończone wnętrze w naturalnym świetle"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 dark:ring-white/10" />
            </div>
          </FadeIn>
          <div className="space-y-8">
            <FadeIn delay={0.08}>
              <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                Doświadczenie widać w detalach
              </h3>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-base leading-relaxed text-ink-muted md:text-lg">
                Od ponad dekady realizuję prace mieszkaniowe ze szczególnym
                naciskiem na strefy mokre i „kopertę” wnętrza — izolacje,
                okładziny, listwy i ciche przejścia między materiałami. Każda
                inwestycja ma ustalony harmonogram, zabezpieczenia przeciwpyłowe
                i cotygodniowe omówienia postępów.
              </p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  'Uprawnienia i ubezpieczenie',
                  'Gwarancje na wykonanie',
                  'Przejrzyste kosztorysy',
                  'Dokumentacja fotograficzna',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-ink"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
