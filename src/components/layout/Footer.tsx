import { site, navLinks } from '../../data/content'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Footer() {
  return (
    <footer
      className="border-t border-ink/8 bg-ink text-white dark:bg-black"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-medium">{site.name}</p>
          <p className="mt-1 text-sm text-white/70">{site.administrator}</p>
          <p className="mt-2 max-w-sm text-sm text-white/65">{site.address}</p>
          <p className="mt-2 max-w-sm text-sm text-white/65">
            Remonty łazienek, wykończenia wnętrz i kompleksowe modernizacje
            domów oraz mieszkań.
          </p>
        </div>
        <nav aria-label="Nawigacja w stopce">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
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
              <a
                href="#privacy"
                className="transition hover:text-accent"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#privacy')
                }}
              >
                Polityka prywatności
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. Wszelkie prawa
            zastrzeżone.
          </p>
          <p>
            Zdjęcia w portfolio mają charakter poglądowy (typy realizacji).
          </p>
        </div>
      </div>
    </footer>
  )
}
