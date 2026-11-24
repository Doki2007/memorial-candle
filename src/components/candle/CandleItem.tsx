import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import CandleFlame from './CandleFlame'
import type { Candle } from '../../types/candle'

interface Props {
  candle: Candle
  isNew?: boolean
  onClick: (c: Candle) => void
}

export default function CandleItem ({ candle, isNew = false, onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isNew || !ref.current) return
    // Destello de entrada al encender una vela nueva
    gsap.fromTo(
      ref.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' },
    )
  }, [isNew])

  return (
    <button
      ref={ref}
      onClick={() => onClick(candle)}
      title={candle.name}
      className="group absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-0.5 cursor-pointer focus:outline-none"
      style={{ left: `${candle.x}%`, top: `${candle.y}%` }}
    >
      <CandleFlame size="sm" delay={Math.random() * 1.5} />
      <span className="max-w-[76px] truncate text-[11px] font-medium leading-tight text-ivory/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] group-hover:text-gold transition-colors font-sans">
        {candle.name}
      </span>
    </button>
  )
}
