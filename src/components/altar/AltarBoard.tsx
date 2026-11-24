import { useState, useRef, useCallback } from 'react'
import { useCandles } from '../../hooks/useCandles'
import CandleItem from '../candle/CandleItem'
import CreateCandleModal from '../candle/CreateCandleModal'
import ReadCandleModal from '../candle/ReadCandleModal'
import type { Candle, PendingCandle } from '../../types/candle'

/** Distancia mínima entre velas (porcentaje) */
const MIN_DIST = 5

function isTooClose (candles: Candle[], x: number, y: number): boolean {
  return candles.some((c) => {
    const dx = c.x - x
    const dy = c.y - y
    return Math.sqrt(dx * dx + dy * dy) < MIN_DIST
  })
}

export default function AltarBoard () {
  const [search, setSearch]           = useState('')
  const [pending, setPending]         = useState<PendingCandle | null>(null)
  const [selected, setSelected]       = useState<Candle | null>(null)
  const [lastAdded, _setLastAdded]    = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const { candles, filtered, loading, total } = useCandles(search)

  // Convierte click absoluto del board en coordenadas porcentuales
  const handleBoardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return
    const rect = boardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100

    // Ignorar si el clic fue sobre una vela existente (el evento ya fue consumido)
    const target = e.target as HTMLElement
    if (target.closest('button[data-candle]')) return

    if (isTooClose(candles, x, y)) return
    setPending({ x, y })
  }, [candles])

  function handleCandleClick (c: Candle) {
    setSelected(c)
  }

  return (
    <section className="mt-14 sm:mt-20" id="altar">
      {/* Encabezado del altar */}
      <div className="mb-6 sm:mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium mb-2">Altar de Luces</p>
        <h2 className="font-serif text-3xl font-semibold text-ivory sm:text-4xl lg:text-5xl">
          Enciende una vela
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-[#D2C9BD]">
          Toca cualquier espacio vacío del altar para encender tu propia vela y dejar una dedicatoria
          para Alberto y su familia.
        </p>

        {/* Contador + buscador — apilados en móvil, en fila en tablet+ */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-charcoal/90 px-4 py-1.5 text-xs text-gold font-medium shadow-sm">
            <svg className="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c.6 3.2 3.5 5.2 3.5 8.5a3.5 3.5 0 1 1-7 0c0-1.5.7-2.9 1.7-4 .2 1.2 1 1.9 1.6 1.9 0-2.3-.4-4.2.2-6.4Z"/>
            </svg>
            {total} {total === 1 ? 'vela encendida' : 'velas encendidas'}
          </span>

          <div className="relative w-full max-w-xs sm:w-auto">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre…"
              className="rounded-full border border-gold/25 bg-charcoal/90 pl-9 pr-4 py-2 text-xs sm:text-sm text-ivory placeholder:text-parchment/60 focus:outline-none focus:border-gold/60 transition w-full sm:w-48 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Tablero de velas */}
      <div
        ref={boardRef}
        onClick={handleBoardClick}
        className="relative mx-auto w-full overflow-hidden rounded-3xl border border-white/10 bg-charcoal/50 cursor-crosshair"
        style={{ height: 'clamp(420px, 60vw, 680px)' }}
      >
        {/* Gradiente ambiental */}
        <div className="pointer-events-none absolute inset-0 bg-radial-[at_50%_30%] from-gold/5 via-transparent to-transparent" />

        {/* Texto de ayuda cuando no hay velas */}
        {!loading && filtered.length === 0 && !search && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-parchment/80 text-sm sm:text-base text-center px-6 leading-relaxed">
              Sé el primero en encender una vela.<br />Toca cualquier lugar del altar.
            </p>
          </div>
        )}

        {!loading && filtered.length === 0 && search && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-parchment/90 text-sm sm:text-base text-center px-6 leading-relaxed">
              No se encontró ninguna vela para "{search}".
            </p>
          </div>
        )}

        {/* Renderizado de velas */}
        {filtered.map((candle) => (
          <div key={candle.id} data-candle onClick={(e) => { e.stopPropagation(); handleCandleClick(candle) }}>
            <CandleItem
              candle={candle}
              isNew={candle.id === lastAdded}
              onClick={handleCandleClick}
            />
          </div>
        ))}

        {/* Indicador de carga */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
          </div>
        )}
      </div>

      {/* Instrucción táctil */}
      <p className="mt-4 text-center text-xs tracking-wider text-gold/80 font-medium">
        Toca el altar para encender tu vela &bull; Toca una vela para leer su dedicatoria
      </p>

      {/* Modales */}
      {pending && (
        <CreateCandleModal
          x={pending.x}
          y={pending.y}
          onClose={() => setPending(null)}
          onCreated={() => {
            // La nueva vela aparecerá vía onSnapshot con animación
          }}
        />
      )}

      {selected && (
        <ReadCandleModal
          candle={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
