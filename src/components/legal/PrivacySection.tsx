import { getPrivacyPolicyHtml } from '../../data/privacy'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function PrivacySection() {
  const html = getPrivacyPolicyHtml()

  return (
    <section
      id="privacy"
      className="scroll-mt-24 border-t border-ink/5 bg-surface py-24 md:py-32 dark:border-white/5"
      aria-labelledby="privacy-heading"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading
          id="privacy-heading"
          eyebrow="RODO / ochrona danych"
          title="Polityka prywatności i informacja o przetwarzaniu danych osobowych"
          subtitle="Poniżej znajdują się podstawowe informacje wymagane przez Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) oraz polską ustawę o ochronie danych osobowych."
          align="left"
        />
        <FadeIn>
          <div
            className="mt-12 max-w-none space-y-4 text-sm leading-relaxed text-ink-muted [&_a]:text-accent [&_code]:text-xs [&_h3]:scroll-mt-28 [&_li]:marker:text-accent [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <p className="mt-8 text-xs text-ink-muted/90">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            . Treść ma charakter informacyjny — w razie działalności regulowanej
            szczegółowo (np. newsletter, remarketing) należy ją rozszerzyć.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
