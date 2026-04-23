import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useId, useRef, useState } from 'react'
import { ImageSkeleton } from '../ui/ImageSkeleton'

type BeforeAfterProps = {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  alt: string
  className?: string
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Przed',
  afterLabel = 'Po',
  alt,
  className = '',
}: BeforeAfterProps) {
  const reduce = useReducedMotion()
  const id = useId()
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)
  const baseReady = afterLoaded

  const onMove = useCallback(
    (clientX: number, rect: DOMRect) => {
      const x = clientX - rect.left
      const p = Math.min(100, Math.max(0, (x / rect.width) * 100))
      setPos(p)
    },
    [],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerUp = () => {
    dragging.current = false
    setIsDragging(false)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    onMove(e.clientX, rect)
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onMove(e.clientX, rect)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 5))
    }
  }

  return (
    <div
      className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/5 shadow-card ${className}`}
    >
      {!baseReady ? (
        <ImageSkeleton className="absolute inset-0 rounded-2xl" />
      ) : null}
      {/* After — full background */}
      <img
        src={afterSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${afterLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setAfterLoaded(true)}
      />
      {/* Before — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${beforeLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setBeforeLoaded(true)}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-between px-4 text-[10px] font-semibold uppercase tracking-widest text-white/90 drop-shadow-md md:text-xs">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>

      <div
        role="slider"
        aria-label={`Porównanie przed i po: ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-describedby={`${id}-hint`}
        id={`${id}-slider`}
        className="absolute inset-0 cursor-ew-resize touch-none outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerMove={onPointerMove}
        onClick={onClick}
      >
        <span id={`${id}-hint`} className="sr-only">
          Przeciągnij lub użyj strzałek, aby porównać zdjęcia przed i po
        </span>
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/90 shadow-lg"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/20 shadow-lg backdrop-blur-md"
            animate={reduce ? undefined : { scale: isDragging ? 1.06 : 1 }}
          >
            <span className="text-lg font-light text-white">↔</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
