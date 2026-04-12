import { X } from 'lucide-react'
import { useState } from 'react'

const KEY = 'atelier-cookie-info'

function shouldShowBanner(): boolean {
  try {
    return !localStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function CookieBar() {
  const [visible, setVisible] = useState(shouldShowBanner)

  function dismiss() {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Informacja o prywatności"
      className="fixed right-4 bottom-4 left-4 z-[90] max-w-lg rounded-2xl border border-ink/10 bg-surface-elevated/95 p-4 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-ink/95 md:left-auto"
    >
      <div className="flex gap-3">
        <p className="flex-1 text-sm leading-relaxed text-ink-muted">
          Używamy niezbędnej pamięci przeglądarki (np. motyw strony). Wysyłając
          formularz, podajesz dane zgodnie z{' '}
          <a
            href="#privacy"
            className="font-medium text-accent underline decoration-accent/60 underline-offset-2"
            onClick={dismiss}
          >
            polityką prywatności
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-full p-1 text-ink-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10"
          aria-label="Zamknij informację"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
