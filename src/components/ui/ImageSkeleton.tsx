import { motion } from 'framer-motion'

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-ink/5 dark:bg-white/5 ${className}`}
      animate={{ opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    />
  )
}
