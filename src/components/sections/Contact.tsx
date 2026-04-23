import { Building2, Loader2, Mail, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { site } from '../../data/content'
import { usePrivacyPolicy } from '../../context/PrivacyPolicyContext'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

function contactApiUrl(): string {
  const explicit = import.meta.env.VITE_CONTACT_API?.trim()
  if (explicit) return explicit
  const base = import.meta.env.BASE_URL
  const path = `${base.replace(/\/?$/, '')}/api/contact`
  return path.replace(/([^:]\/)\/+/g, '$1')
}

export function Contact() {
  const { openPrivacyPolicy } = usePrivacyPolicy()
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
      const res = await fetch(contactApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data: { error?: string } = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('err')
        setMessage(
          typeof data.error === 'string'
            ? data.error
            : 'Nie udało się wysłać wiadomości. Zadzwoń lub napisz bezpośrednio na e-mail.',
        )
        return
      }
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

  /** Okno mapy wokół markera (stopień ≈ 100 m; węższy = bliżej ulicy) */
  const pad = 0.006
  const mapBbox = `${site.mapLon - pad},${site.mapLat - pad},${site.mapLon + pad},${site.mapLat + pad}`
  const osmEmbedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(mapBbox)}&layer=mapnik&marker=${site.mapLat}%2C${site.mapLon}`

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
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-surface-elevated via-surface-elevated to-ink/[0.03] p-6 shadow-soft dark:border-white/10 dark:from-ink/50 dark:via-ink/40 dark:to-accent/[0.06]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-white p-2 shadow-inner dark:border-white/10">
                    <img
                      src={`${import.meta.env.BASE_URL}favicon.png`}
                      alt=""
                      className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                      width={96}
                      height={96}
                      onError={(e) => {
                        const el = e.currentTarget
                        if (el.src.endsWith('.svg')) return
                        el.onerror = null
                        el.src = `${import.meta.env.BASE_URL}favicon.svg`
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {site.serviceLine}
                    </p>
                    <p className="mt-1 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                      {site.nameFull}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-muted">{site.owner}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-surface/80 px-2.5 py-1 font-mono text-[11px] text-ink-muted dark:border-white/10 dark:bg-ink/30">
                        <Building2 className="h-3 w-3 text-accent" aria-hidden />
                        NIP {site.nip}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-surface/80 px-2.5 py-1 font-mono text-[11px] text-ink-muted dark:border-white/10 dark:bg-ink/30">
                        REGON {site.regon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  Telefon
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-ink transition hover:text-accent"
                  href={phoneHref}
                >
                  <Phone className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  E-mail
                </p>
                <a
                  className="mt-2 inline-flex items-center gap-2 break-all text-lg font-medium text-ink transition hover:text-accent"
                  href={`mailto:${site.email}`}
                >
                  <Mail className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                  {site.email}
                </a>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-ink">{site.address}</p>
                <p className="text-ink-muted">{site.city}</p>
              </div>
              <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 dark:border-white/10">
                <iframe
                  title="Mapa — lokalizacja w Częstochowie"
                  className="h-full min-h-[180px] w-full border-0 grayscale contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={osmEmbedSrc}
                />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-ink/8 bg-surface-elevated p-8 shadow-soft dark:border-white/12 dark:bg-gradient-to-b dark:from-[#0f2038] dark:to-[#060d16] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_24px_48px_-24px_rgba(0,0,0,0.5)] md:p-10"
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
                    className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-white/15 dark:bg-[#152238] dark:placeholder:text-[#a5b4cc]"
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
                      className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-white/15 dark:bg-[#152238] dark:placeholder:text-[#a5b4cc]"
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
                      className="mt-2 w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-white/15 dark:bg-[#152238] dark:placeholder:text-[#a5b4cc]"
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
                    className="mt-2 w-full resize-y rounded-xl border border-ink/12 bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-white/15 dark:bg-[#152238] dark:placeholder:text-[#a5b4cc]"
                    placeholder="Zakres prac, typ budynku / mieszkania, preferowany termin startu."
                  />
                </div>

                <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4 dark:border-white/12 dark:bg-white/[0.05]">
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
                      zapytanie.                       Zapoznałem(-am) się z{' '}
                      <button
                        type="button"
                        className="cursor-pointer border-0 bg-transparent p-0 font-medium text-accent underline decoration-accent/60 underline-offset-2"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          openPrivacyPolicy()
                        }}
                      >
                        polityką prywatności
                      </button>{' '}
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
