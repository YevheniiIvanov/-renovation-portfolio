import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { site } from '../../data/content'
import { Button } from '../ui/Button'

const HERO_BG =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=85&auto=format&fit=crop'

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 scale-105"
        style={{ y: reduce ? 0 : y }}
      >
        <img
          src={HERO_BG}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25 dark:from-black dark:via-black/60"
          aria-hidden
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40"
        style={{ opacity: reduce ? 1 : opacity }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent [text-shadow:_0_1px_12px_rgba(0,0,0,0.45)]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {site.serviceLine}
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-balance text-white [text-shadow:_0_2px_28px_rgba(0,0,0,0.55)]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            {site.tagline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
          >
            Łazienki, wnętrza i pełne remonty — z dbałością o detale i jasnym
            harmonogramem prac.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
          >
            <Button
              variant="primary"
              className="border border-white/45 bg-accent text-ink shadow-sm hover:bg-accent-hover dark:border-white/50 dark:bg-accent dark:text-ink"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Rozpocznij projekt
            </Button>
            <Button
              variant="outline"
              className="!border-white/55 !bg-white/5 !text-white backdrop-blur-[2px] hover:!border-white hover:!bg-white/15 hover:!text-white"
              onClick={() =>
                document
                  .getElementById('portfolio')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Zobacz realizacje
            </Button>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="mt-16 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-accent"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Przewiń
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
        </motion.a>
      </motion.div>
    </section>
  )
}
