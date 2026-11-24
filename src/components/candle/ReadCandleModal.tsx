import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import CandleFlame from './CandleFlame'
import type { Candle } from '../../types/candle'

interface Props {
  candle: Candle
  onClose: () => void
}

export default function ReadCandleModal ({ candle, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      )
    })
    return () => ctx.revert()
  }, [])

  function animateClose () {
    gsap.to(panelRef.current, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in', onComplete: onClose })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === overlayRef.current) animateClose() }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-sm rounded-3xl border border-gold/30 bg-charcoal/95 shadow-2xl shadow-gold/15 p-6 sm:p-8 text-center"
      >
        {/* Llama grande */}
        <div className="flex justify-center mb-5">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <CandleFlame size="lg" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-1">Vela encendida por</p>
        <h2 className="font-serif text-3xl font-semibold text-ivory mb-4">{candle.name}</h2>

        <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-ivory/95 font-normal">
          "{candle.message}"
        </p>

        <button
          onClick={animateClose}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-2 text-sm text-gold hover:bg-gold/20 font-medium transition"
        >
          Cerrar
        </button>

        <button
          onClick={animateClose}
          className="absolute top-4 right-4 text-parchment/60 hover:text-parchment transition text-2xl leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  )
}
