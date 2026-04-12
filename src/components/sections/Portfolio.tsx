import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { portfolioItems, type PortfolioItem } from '../../data/content'
import { BeforeAfter } from '../portfolio/BeforeAfter'
import { Lightbox } from '../portfolio/Lightbox'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function Portfolio() {
  const [active, setActive] = useState<PortfolioItem | null>(null)

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 border-y border-ink/5 bg-surface py-24 md:py-32 dark:border-white/5"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="portfolio-heading"
          eyebrow="Realizacje"
          title="Przed i po — precyzja w każdej linii"
          subtitle="Przeciągaj suwak, by zobaczyć zmianę. Otwórz projekt, by przeczytać krótki opis."
          align="center"
        />

        <div className="columns-1 gap-8 space-y-8 md:columns-2">
          {portfolioItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05} className="break-inside-avoid">
              <motion.article
                layout
                className="group overflow-hidden rounded-2xl border border-ink/8 bg-surface-elevated shadow-card dark:border-white/8"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <BeforeAfter
                  beforeSrc={item.beforeSrc}
                  afterSrc={item.afterSrc}
                  alt={item.title}
                />
                <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-medium text-ink md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{item.caption}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 px-3 py-2 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent dark:border-white/15"
                    aria-label={`Otwórz szczegóły: ${item.title}`}
                  >
                    <Maximize2 className="h-4 w-4" strokeWidth={1.75} />
                    <span className="hidden sm:inline">Otwórz</span>
                  </button>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  )
}
