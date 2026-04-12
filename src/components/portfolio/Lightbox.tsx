import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { PortfolioItem } from '../../data/content'

type LightboxProps = {
  item: PortfolioItem | null
  onClose: () => void
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!item) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence mode="wait">
      {item ? (
        <motion.div
          key={item.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm dark:bg-black/80"
            aria-label="Zamknij okno"
            onClick={onClose}
          />
          <motion.div
            className="relative z-[101] max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-soft"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface/90 text-ink shadow-md backdrop-blur dark:border-white/10 dark:bg-ink/80 dark:text-surface"
              aria-label="Zamknij"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative aspect-[4/3] bg-ink/5 md:aspect-auto md:min-h-[min(70vh,560px)]">
                <img
                  src={item.highlightSrc}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.category}
                </p>
                <h2
                  id="lightbox-title"
                  className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl"
                >
                  {item.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                  {item.caption}
                </p>
                <p className="mt-8 text-sm text-ink-muted">
                  Porównanie przed/po znajdziesz w siatce realizacji poniżej.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
