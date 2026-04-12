/** Dane firmy — uzupełnij przed publikacją (RODO, stopka). */
export const site = {
  name: 'Atelier Haus',
  tagline: 'Precyzja. Jakość. Nowoczesne życie.',
  /** Krótka nazwa administratora danych (np. firma lub imię i nazwisko przedsiębiorcy) */
  administrator: 'Atelier Haus — Jan Kowalski',
  /** Pełny adres do polityki prywatności i stopki */
  address: '00-001 Warszawa, ul. Przykładowa 1',
  phone: '+48 600 000 000',
  email: 'kontakt@atelierhaus.pl',
  city: 'Obsługa: Warszawa i okolice',
  /** NIP — opcjonalnie, do wyświetlenia w polityce */
  nip: '0000000000',
}

export const services = [
  {
    id: 'bath',
    title: 'Remonty łazienek',
    description:
      'Strefy mokre klasy premium: płytki, oświetlenie, armatura i szczelna izolacja przeciwwilgociowa.',
    icon: 'bath' as const,
  },
  {
    id: 'finish',
    title: 'Wykończenia wnętrz',
    description:
      'Listwy, podłogi, systemy malarskie i detale, które wyglądają dobrze w świetle dziennym i sztucznym.',
    icon: 'layout' as const,
  },
  {
    id: 'remodel',
    title: 'Remonty mieszkań',
    description:
      'Kompleksowe modernizacje w ramach regulaminów wspólnot i spółdzielni — harmonogram i minimalny hałas.',
    icon: 'home' as const,
  },
  {
    id: 'general',
    title: 'Remonty całych domów',
    description:
      'Kuchnie, układy pomieszczeń i koordynacja z uprawnionymi podwykonawcami, gdy jest to potrzebne.',
    icon: 'hammer' as const,
  },
]

export type PortfolioItem = {
  id: string
  title: string
  category: string
  beforeSrc: string
  afterSrc: string
  caption: string
  highlightSrc: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Łazienka marmur i mosiądz',
    category: 'Łazienka',
    caption: 'Ciepły kamień, szczotkowany mosiądz i ukryta zabudowa.',
    beforeSrc:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf16?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=85&auto=format&fit=crop',
  },
  {
    id: 'p2',
    title: 'Minimalistyczna strefa mokra',
    category: 'Łazienka',
    caption: 'Odpływ liniowy, szkło bezramowe, stonowana kolorystyka.',
    beforeSrc:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&q=85&auto=format&fit=crop',
  },
  {
    id: 'p3',
    title: 'Rytm salonu',
    category: 'Wnętrza',
    caption: 'Gzymsy, listwy i spokojna paleta dla wieczornego wypoczynku.',
    beforeSrc:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85&auto=format&fit=crop',
  },
  {
    id: 'p4',
    title: 'Oś kuchni otwartej',
    category: 'Remont',
    caption: 'Ułożenie zabudowy, linie widokowe i trwałe blaty.',
    beforeSrc:
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format&fit=crop',
  },
  {
    id: 'p5',
    title: 'Sypialnia z antresolą',
    category: 'Wnętrza',
    caption: 'Warstwowe światło i cisza akustyczna.',
    beforeSrc:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=85&auto=format&fit=crop',
  },
  {
    id: 'p6',
    title: 'Wejście do mieszkania',
    category: 'Mieszkanie',
    caption: 'Kompaktowy hol z lustrem i ukrytym schowkiem.',
    beforeSrc:
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1400&q=85&auto=format&fit=crop',
    afterSrc:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85&auto=format&fit=crop',
    highlightSrc:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=85&auto=format&fit=crop',
  },
]

export const testimonials = [
  {
    id: 't1',
    quote:
      'Ekipa zabezpieczyła podłogi i skończyła terminowo. Łazienka jak w hotelu.',
    name: 'Elena M.',
    role: 'Właścicielka mieszkania',
  },
  {
    id: 't2',
    quote:
      'Spokojne rzemiosło — narożniki, fugi i przejścia są bez zarzutu.',
    name: 'Jordan K.',
    role: 'Właściciel domu',
  },
  {
    id: 't3',
    quote:
      'Jasne oferty, bez niespodzianek — wszystko uzgodnione ze wspólnotą.',
    name: 'Priya S.',
    role: 'Członkini zarządu wspólnoty',
  },
]

export const navLinks = [
  { href: '#about', label: 'O nas' },
  { href: '#services', label: 'Usługi' },
  { href: '#portfolio', label: 'Realizacje' },
  { href: '#testimonials', label: 'Opinie' },
  { href: '#contact', label: 'Kontakt' },
]
