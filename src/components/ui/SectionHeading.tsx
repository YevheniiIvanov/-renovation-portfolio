import { FadeIn } from './FadeIn'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <FadeIn className={`mb-14 md:mb-20 max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep dark:text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-[3.25rem] text-balance"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg text-balance">
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  )
}
