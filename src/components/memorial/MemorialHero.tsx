import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function MemorialHero () {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-child', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <header ref={heroRef} className="text-center">

      {/* Emblema llama */}
      <div className="hero-child mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-charcoal shadow-[0_0_40px_rgba(212,175,55,0.15)]">
        <svg className="h-6 w-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.5 3.5 3.5 5.5 3.5 9a3.5 3.5 0 1 1-7 0c0-1.6.8-3.1 1.8-4.3.2 1.3 1.1 2.1 1.7 2.1 0-2.5-.5-4.5 0-6.8Z" />
          <path strokeLinecap="round" d="M8 20h8" />
        </svg>
      </div>

      {/* Fechas */}
      <p className="hero-child text-xs uppercase tracking-[0.28em] text-gold font-medium">
        7 de agosto de 1963 &mdash; 22 de noviembre de 2026
      </p>

      {/* Foto — fluida: ocupa todo en móvil, contenida en tablet/desktop */}
      <div className="hero-child mx-auto mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
          {/* h-auto preserva el aspect ratio completo — no se cortan manos ni pies */}
          <img
            src="/hero.webp"
            alt="Alberto Rafael Defilippi Portal — Campeón de Marinera 2026"
            className="w-full block"
            style={{ marginTop: '-15%', marginBottom: '-13%' }}
            loading="eager"
          />
          {/* Gradiente sutil solo al pie, cubre el suelo sin tocar los pies */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-obsidian/55 to-transparent" />
        </div>
      </div>

      {/* Nombre completo y apodo entrañable */}
      <div className="hero-child mt-6 sm:mt-7 space-y-1.5">
        <h1 className="font-serif text-3xl font-black tracking-tight text-ivory sm:text-5xl lg:text-6xl">
          Alberto Rafael Defilippi Portal
        </h1>
        <p className="font-serif text-xl sm:text-2xl italic text-gold/90 tracking-wide">
          “Tito”
        </p>
      </div>

      {/* Separador ornamental de transición equilibrada */}
      <div className="hero-child mx-auto mt-7 sm:mt-9 flex items-center justify-center gap-3">
        <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-[10px] text-gold/60">✦</span>
        <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    </header>
  )
}
