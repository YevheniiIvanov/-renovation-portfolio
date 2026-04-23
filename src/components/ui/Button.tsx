import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white shadow-soft hover:bg-navy-hover',
  ghost:
    'bg-transparent text-ink hover:bg-ink/5 dark:hover:bg-white/5',
  outline:
    'border border-ink/15 bg-transparent text-ink hover:border-accent hover:text-accent dark:border-white/15',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
