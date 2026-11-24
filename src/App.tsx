import { useEffect } from 'react'
import { initAnonymousAuth } from './lib/firebase'
import MemorialHero from './components/memorial/MemorialHero'
import LifePillars  from './components/memorial/LifePillars'
import Dedication   from './components/memorial/Dedication'
import PhotoGallery from './components/memorial/PhotoGallery'
import AltarBoard   from './components/altar/AltarBoard'
import PageFooter   from './components/layout/PageFooter'

export default function App () {
  useEffect(() => {
    initAnonymousAuth().catch(console.error)
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-linear-to-b from-gold/10 via-transparent to-transparent" />
      <main className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <MemorialHero />
        <LifePillars />
        <Dedication />
        <PhotoGallery />
        <div className="mt-20 mx-auto h-px w-32 bg-linear-to-r from-transparent via-gold/30 to-transparent" />
        <AltarBoard />
        <PageFooter />
      </main>
    </>
  )
}
