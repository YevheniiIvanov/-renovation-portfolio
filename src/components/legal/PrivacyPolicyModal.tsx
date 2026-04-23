import { X } from 'lucide-react'
import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { getPrivacyPolicyHtml } from '../../data/privacy'

type PrivacyPolicyModalProps = {
  open: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
  const privacyTitleId = useId()
  const privacyHtml = getPrivacyPolicyHtml()

  useEffect(() => {
    if (!open) return
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
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={privacyTitleId}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm dark:bg-black/80"
        aria-label="Zamknij okno polityki prywatności"
        onClick={onClose}
      />
      <div className="relative z-[111] flex max-h-[min(90vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-soft">
        <div className="flex items-start justify-between gap-3 border-b border-ink/10 px-5 py-4 dark:border-white/10">
          <h2
            id={privacyTitleId}
            className="pr-8 font-display text-lg font-medium tracking-tight text-ink md:text-xl"
          >
            Polityka prywatności
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-ink-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10"
            aria-label="Zamknij"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div
            className="max-w-none space-y-4 text-sm leading-relaxed text-ink-muted [&_a]:text-accent-deep [&_a]:dark:text-accent [&_code]:text-xs [&_h3]:mt-6 [&_h3]:scroll-mt-4 [&_h3]:first:mt-0 [&_li]:marker:text-accent-deep dark:[&_li]:marker:text-accent [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: privacyHtml }}
          />
          <p className="mt-6 text-xs text-ink-muted/90">
            Ostatnia aktualizacja:{' '}
            {new Date().toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            .
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
