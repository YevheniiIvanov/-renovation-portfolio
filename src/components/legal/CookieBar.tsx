import { useEffect, useState } from 'react'
import { usePrivacyPolicy } from '../../context/PrivacyPolicyContext'
import { Button } from '../ui/Button'

const KEY = 'ddbud-cookie-info'

function shouldShowBanner(): boolean {
  try {
    return !localStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function CookieBar() {
  const { openPrivacyPolicy, closePrivacyPolicy } = usePrivacyPolicy()
  const [visible, setVisible] = useState(shouldShowBanner)

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  function dismiss() {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    closePrivacyPolicy()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-[2px] dark:bg-black/70"
        aria-hidden="true"
      />
      <div
        role="region"
        aria-label="Informacja o prywatności"
        className="fixed right-4 bottom-4 left-4 z-[90] max-w-lg rounded-2xl border border-ink/10 bg-surface-elevated/95 p-4 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-ink/95 md:left-auto"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-ink-muted">
            Używamy niezbędnej pamięci przeglądarki (np. motyw strony). Wysyłając
            formularz, podajesz dane zgodnie z{' '}
            <button
              type="button"
              className="font-medium text-accent underline decoration-accent/60 underline-offset-2 hover:text-accent/90"
              onClick={openPrivacyPolicy}
            >
              polityką prywatności
            </button>
            .
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={dismiss}
            className="w-full rounded-xl"
          >
            Zapoznałem się z treścią
          </Button>
        </div>
      </div>
    </>
  )
}
