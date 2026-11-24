import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface Props {
  size?: 'sm' | 'lg'
  delay?: number
}

export default function CandleFlame ({ size = 'sm', delay = 0 }: Props) {
  const flameRef = useRef<SVGSVGElement>(null)

  const dim = size === 'lg' ? 48 : 20

  useEffect(() => {
    if (!flameRef.current) return
    // Flicker continuo en GPU (transform + opacity) → 60 FPS
    const tl = gsap.to(flameRef.current, {
      scaleX: 1.08,
      scaleY: 1.12,
      opacity: 0.92,
      rotation: 1.5,
      transformOrigin: '50% 100%',
      duration: 1.2 + Math.random() * 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay,
    })
    return () => { tl.kill() }
  }, [delay])

  return (
    <svg
      ref={flameRef}
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.9)]"
    >
      <path d="M12 2c.6 3.2 3.5 5.2 3.5 8.5a3.5 3.5 0 1 1-7 0c0-1.5.7-2.9 1.7-4 .2 1.2 1 1.9 1.6 1.9 0-2.3-.4-4.2.2-6.4Z" />
      <rect x="10" y="15" width="4" height="7" rx="1" className="text-parchment/40" fill="currentColor" />
    </svg>
  )
}
