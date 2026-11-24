import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

// 19 fotos: 0.webp → 18.webp
const TOTAL = 17
const images = Array.from({ length: TOTAL }, (_, i) => ({
  src: `/gallery/${i}.webp`,
  alt: `Recuerdo de Tito — foto ${i + 1}`,
}))

interface LightboxProps {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox ({ index, onClose, onPrev, onNext }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(imgRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' })
  }, [index])

  function close () {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose })
  }

  // Navegación con teclado
  useEffect(() => {
    function onKey (e: KeyboardEvent) {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNext, onPrev])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/92 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === overlayRef.current) close() }}
    >
      {/* Flecha izquierda */}
      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-charcoal/90 text-parchment text-xl hover:border-gold/40 hover:text-gold transition touch-manipulation"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Imagen */}
      <div className="relative max-h-[85vh] max-w-3xl w-full">
        <img
          ref={imgRef}
          src={images[index].src}
          alt={images[index].alt}
          className="mx-auto max-h-[85vh] max-w-full rounded-2xl border border-gold/20 object-contain shadow-2xl"
        />
        {/* Contador */}
        <p className="mt-3 text-center text-xs text-parchment/40 tracking-wider">
          {index + 1} / {TOTAL}
        </p>
      </div>

      {/* Flecha derecha */}
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-charcoal/90 text-parchment text-xl hover:border-gold/40 hover:text-gold transition touch-manipulation"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Cerrar */}
      <button
        onClick={close}
        className="absolute top-4 right-4 text-parchment/50 hover:text-parchment transition text-2xl leading-none"
        aria-label="Cerrar"
      >
        ×
      </button>
    </div>
  )
}

export default function PhotoGallery () {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openAt  = (i: number) => setLightboxIndex(i)
  const close   = () => setLightboxIndex(null)
  const prev    = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + TOTAL) % TOTAL : 0), [])
  const next    = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % TOTAL : 0), [])

  return (
    <section className="mt-14 sm:mt-20">
      {/* Encabezado */}
      <div className="mb-8 sm:mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium mb-2">Galería</p>
        <h2 className="font-serif text-3xl font-semibold text-ivory sm:text-4xl lg:text-5xl">
          Una vida entera
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-[#D2C9BD]">
          Momentos que quedaron grabados en quienes tuvieron el privilegio de caminar junto a él.
        </p>
      </div>

      {/* Grid masonry — 2 col en móvil, 3 col en tablet+ */}
      <div className="columns-2 sm:columns-3 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="group block w-full overflow-hidden rounded-xl border border-white/5 hover:border-gold/30 transition-all duration-300 focus:outline-none focus:border-gold/50"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
