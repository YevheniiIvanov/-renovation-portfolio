import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, site } from '../../data/content'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header() {
  const { theme, toggle } = useTheme()
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 72],
    [
      'rgba(247, 245, 240, 0)',
      'rgba(247, 245, 240, 0.94)',
    ],
  )
  const headerBgDark = useTransform(
    scrollY,
    [0, 72],
    ['rgba(12, 12, 14, 0)', 'rgba(12, 12, 14, 0.94)'],
  )

  const bg = theme === 'dark' ? headerBgDark : headerBg
  const borderOp = useTransform(scrollY, [0, 72], [0, 1])
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 12px 40px rgba(0,0,0,0.06)'],
  )

  const [mobileOpen, setMobileOpen] = useState(false)
  /** Nad ciemnym Hero (tryb jasny) nagłówek musi mieć jasny tekst — po scrollu wraca do ink. */
  const [headerSolid, setHeaderSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    setHeaderSolid(v > 56)
  })

  useEffect(() => {
    setHeaderSolid(window.scrollY > 56)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobileOpen])

  const onHero =
    theme === 'light' && !headerSolid
  const heroLink = onHero
    ? 'text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.55)]'
    : 'text-ink'
  const heroMuted = onHero
    ? 'text-white/85 [text-shadow:_0_1px_2px_rgba(0,0,0,0.45)]'
    : 'text-ink-muted'

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md transition-shadow duration-300"
      style={{
        backgroundColor: bg,
        boxShadow: headerShadow,
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/10 dark:bg-white/10"
        style={{ opacity: borderOp }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a
          href="#top"
          className="group flex items-baseline gap-2.5"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span
            className={`font-display text-xl font-semibold tracking-tight md:text-2xl transition-colors duration-300 ${heroLink}`}
          >
            {site.name}
          </span>
          <span
            className={`hidden text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 sm:inline ${heroMuted}`}
          >
            {site.serviceLineShort}
          </span>
        </a>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Menu główne"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${heroMuted} ${onHero ? 'hover:text-white' : 'hover:text-ink'}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggle}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-ink transition hover:border-accent hover:text-accent dark:border-white/10 ${onHero ? 'border-white/35 text-white hover:text-accent' : 'border-ink/10'}`}
            aria-label={
              theme === 'dark'
                ? 'Przełącz na jasny motyw'
                : 'Przełącz na ciemny motyw'
            }
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>

          <Button
            variant="primary"
            className="hidden px-6 py-2.5 text-xs md:inline-flex"
            onClick={() => scrollTo('#contact')}
          >
            Umów konsultację
          </Button>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden dark:border-white/10 ${onHero ? 'border-white/35 text-white' : 'border-ink/10 text-ink'}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-surface/98 px-5 py-6 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-ink/95"
        >
          <nav className="flex flex-col gap-4" aria-label="Menu mobilne">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                  setMobileOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" onClick={() => scrollTo('#contact')}>
              Umów konsultację
            </Button>
          </nav>
        </div>
      ) : null}
    </motion.header>
  )
}
