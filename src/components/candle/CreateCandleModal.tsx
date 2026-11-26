import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { addCandle } from '../../lib/candles'
import CandleFlame from './CandleFlame'

interface Props {
  x: number
  y: number
  onClose: () => void
  onCreated: () => void
}

export default function CreateCandleModal ({ x, y, onClose, onCreated }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  const [name, setName]       = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  // Animación de entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      )
    })
    return () => ctx.revert()
  }, [])

  function animateClose (cb: () => void) {
    gsap.to(panelRef.current, { opacity: 0, scale: 0.92, y: 16, duration: 0.25, ease: 'power2.in', onComplete: cb })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2)    { setError('El nombre debe tener al menos 2 caracteres.'); return }
    if (message.trim().length < 5) { setError('La dedicatoria debe tener al menos 5 caracteres.'); return }
    setSaving(true)
    setError('')
    try {
      await addCandle(name.trim(), message.trim(), x, y)
      onCreated()
      animateClose(onClose)
    } catch (err: unknown) {
      console.error('Error al encender vela:', err)
      const msg = err instanceof Error ? err.message : 'Error al guardar. Intenta de nuevo.'
      setError(msg)
      setSaving(false)
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === overlayRef.current) animateClose(onClose) }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-sm rounded-3xl border border-gold/30 bg-charcoal/95 shadow-2xl shadow-gold/15 p-6 sm:p-8"
      >
        {/* Vela preview */}
        <div className="mb-5 flex flex-col items-center gap-1">
          <CandleFlame size="lg" />
          <p className="text-xs text-gold/90 font-medium mt-1">Tu lugar en el altar</p>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory text-center mb-1">
          Enciende tu vela
        </h2>
        <p className="text-xs sm:text-sm text-[#D2C9BD] text-center mb-6 leading-relaxed">
          Deja tu nombre y una dedicatoria íntima para Alberto y su familia.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="candle-name" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">
              Nombre
            </label>
            <input
              id="candle-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              maxLength={50}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-gold/20 bg-obsidian/80 px-4 py-2.5 text-sm sm:text-base text-ivory placeholder:text-parchment/60 focus:outline-none focus:border-gold/60 transition"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="candle-msg" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">
              Dedicatoria
            </label>
            <textarea
              id="candle-msg"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError('') }}
              maxLength={600}
              rows={4}
              placeholder="Escribe tu mensaje para Alberto…"
              className="w-full resize-none rounded-xl border border-gold/20 bg-obsidian/80 px-4 py-2.5 text-sm sm:text-base text-ivory placeholder:text-parchment/60 focus:outline-none focus:border-gold/60 transition"
            />
            <p className="text-right text-xs text-parchment/60 mt-0.5">{message.length}/600</p>
          </div>

          {error && <p className="text-xs text-red-400 font-medium text-center">{error}</p>}

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={() => animateClose(onClose)}
              className="flex-1 rounded-full border border-white/20 py-2.5 text-sm text-parchment hover:border-gold/40 hover:text-ivory transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-gold text-obsidian font-semibold py-2.5 text-sm hover:bg-gold/90 active:scale-95 transition disabled:opacity-60 shadow-md shadow-gold/20"
            >
              {saving ? 'Encendiendo…' : 'Encender vela'}
            </button>
          </div>
        </form>

        <button
          onClick={() => animateClose(onClose)}
          className="absolute top-4 right-4 text-parchment/60 hover:text-parchment transition text-2xl leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  )
}
