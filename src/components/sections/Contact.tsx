import { Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { site } from '../../data/content'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>(
    'idle',
  )
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const consent = fd.get('consent') === 'on'
    const body = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent,
    }
    if (!consent) {
      setStatus('idle')
      setMessage('Zaznacz zgodę na przetwarzanie danych osobowych.')
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('ok')
      setMessage('Dziękujemy — odpowiemy najpóźniej w następnym dniu roboczym.')
      form.reset()
    } catch {
      setStatus('err')
      setMessage(
        'Nie udało się wysłać wiadomości. Zadzwoń lub napisz bezpośrednio na e-mail.',
      )
    }
  }

  const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-ink/5 bg-surface py-24 md:py-32 dark:border-white/5"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              id="contact-heading"
              eyebrow="Kontakt"
              title="Opowiedz nam o swoim wnętrzu"
              subtitle="Opisz zakres, termin i oczekiwania — wrócimy z propozycją kolejnych kroków i realnym harmonogramem."
              align="left"
            />
            <FadeIn className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  Telefon
                </p>
                <a
                  className="mt-1 block text-lg font-medium text-ink hover:text-accent"
                  href={phoneHref}
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  E-mail
                </p>
                <a
                  className="mt-1 block text-lg font-medium text-ink hover:text-accent"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
              <p className="text-sm text-ink-muted">{site.city}</p>
              <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 dark:border-white/10">
                <iframe
                  title="Mapa obszaru działania"
                  className="h-full min-h-[180px] w-full border-0 grayscale contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=20.85%2C52.10%2C21.15%2C52.35&layer=mapnik"
                />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-ink/8 bg-surface-elevated p-8 shadow-soft dark:border-white/8 dark:bg-ink/40 md:p-10"
              noValidate
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-widest text-ink-muted"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none dark:border-white/12 dark:bg-ink/60"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-widest text-ink-muted"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none dark:border-white/12 dark:bg-ink/60"
                      placeholder="jan@example.pl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs font-semibold uppercase tracking-widest text-ink-muted"
                    >
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none dark:border-white/12 dark:bg-ink/60"
                      placeholder="Opcjonalnie"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-widest text-ink-muted"
                  >
                    Treść zapytania
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-y rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none dark:border-white/12 dark:bg-ink/60"
                    placeholder="Zakres prac, typ budynku / mieszkania, preferowany termin startu."
                  />
                </div>

                <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <label className="flex cursor-pointer gap-3 text-sm leading-snug text-ink">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 h-4 w-4 shrink-0 rounded border-ink/30 text-accent focus:ring-accent"
                    />
                    <span>
                      Wyrażam zgodę na przetwarzanie moich danych osobowych
                      podanych w formularzu w celu udzielenia odpowiedzi na
                      zapytanie. Zapoznałem(-am) się z{' '}
                      <a
                        href="#privacy"
                        className="font-medium text-accent underline decoration-accent/60 underline-offset-2"
                      >
                        polityką prywatności
                      </a>{' '}
                      i informacją o przetwarzaniu danych.
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  className="min-w-[160px] gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Wysyłanie
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" strokeWidth={1.75} />
                      Wyślij wiadomość
                    </>
                  )}
                </Button>
                {message ? (
                  <p
                    role={status === 'ok' ? 'status' : 'alert'}
                    className={
                      status === 'ok'
                        ? 'text-sm text-accent'
                        : 'text-sm text-red-600 dark:text-red-400'
                    }
                  >
                    {message}
                  </p>
                ) : null}
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
