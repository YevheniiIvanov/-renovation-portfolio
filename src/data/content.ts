/** Dane firmy — RODO, stopka, kontakt. */
export const site = {
  /** Krótka nazwa w menu (np. logo tekstowe) */
  name: 'DD BUD',
  /** Pełna nazwa handlowa */
  nameFull: 'DD BUD Wykończenia',
  /** Linia jak na wizytówce */
  serviceLine: 'Usługi remontowo wykończeniowe',
  /** Krótki dopisek w nagłówku */
  serviceLineShort: 'Remonty · Wykończenia',
  tagline: 'Precyzja. Jakość. Nowoczesne życie.',
  /** Właściciel / osoba reprezentująca */
  owner: 'Dmytro Dovhopolyk',
  /** Administrator danych (RODO) */
  administrator: 'DD BUD Wykończenia — Dmytro Dovhopolyk',
  /** Adres do mapy, stopki i polityki prywatności */
  address: 'ul. Świętej Barbary 69/1, 42-226 Częstochowa',
  /**
   * Punkt na mapie OSM (marker) — Nominatim dla „69, Świętej Barbary”, Częstochowa
   * (dzielnica Podjasnogórska, 42-226).
   */
  mapLat: 50.8039964,
  mapLon: 19.0919705,
  phone: '+48 666 698 053',
  email: 'wykonczenia.ddbud@gmail.com',
  city: 'Obsługa: Częstochowa i okolice',
  nip: '5732963686',
  regon: '542063759',
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
      'Podłogi zabezpieczone od pierwszego dnia, roboty domknięte w umówionym terminie. Łazienka wyszła jak z katalogu — jestem bardzo zadowolona.',
    name: 'Magdalena W.',
    role: 'Właścicielka mieszkania',
  },
  {
    id: 't2',
    quote:
      'Spokojna, rzetelna robota: narożniki, fugi i przejścia między materiałami — wszystko dopracowane, bez fuszerki.',
    name: 'Marek T.',
    role: 'Właściciel domu',
  },
  {
    id: 't3',
    quote:
      'Jasna wycena, bez dopłat „pod koniec”. Uzgodniliśmy zakres z zarządem wspólnoty i poszło sprawnie.',
    name: 'Katarzyna Z.',
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
