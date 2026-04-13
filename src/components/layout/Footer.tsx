import { Mail, Phone } from 'lucide-react'
import { usePrivacyPolicy } from '../../context/PrivacyPolicyContext'
import { site, navLinks } from '../../data/content'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function phoneHref(tel: string) {
  return `tel:${tel.replace(/\s/g, '')}`
}

export function Footer() {
  const { openPrivacyPolicy } = usePrivacyPolicy()

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-ink text-white dark:bg-[#060608]"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/12 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt=""
                className="mx-auto h-28 w-28 object-contain md:h-32 md:w-32"
                width={128}
                height={128}
                onError={(e) => {
                  const el = e.currentTarget
                  if (el.src.endsWith('.svg')) return
                  el.onerror = null
                  el.src = `${import.meta.env.BASE_URL}favicon.svg`
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {site.serviceLine}
              </p>
              <p className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
                {site.nameFull}
              </p>
              <p className="mt-1 text-sm text-white/65">{site.owner}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                Remonty łazienek, wykończenia wnętrz i kompleksowe modernizacje
                — terminowo i z dbałością o detale.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={phoneHref(site.phone)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-accent/50 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  {site.phone.replace('+48 ', '')}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-accent/50 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                  <span className="truncate">{site.email}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <nav aria-label="Nawigacja w stopce">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75 lg:justify-end">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="transition hover:text-accent"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(l.href)
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0 text-sm text-inherit transition hover:text-accent"
                    onClick={openPrivacyPolicy}
                  >
                    Polityka prywatności
                  </button>
                </li>
              </ul>
            </nav>

            <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-none lg:max-w-md">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                  NIP
                </p>
                <p className="mt-1 font-mono text-sm font-medium tracking-wide text-white">
                  {site.nip}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                  REGON
                </p>
                <p className="mt-1 font-mono text-sm font-medium tracking-wide text-white">
                  {site.regon}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.nameFull}. Wszelkie prawa
            zastrzeżone.
          </p>
          <p className="md:text-right">
            Zdjęcia w portfolio mają charakter poglądowy (typy realizacji).
          </p>
        </div>
      </div>
    </footer>
  )
}
