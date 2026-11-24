const pillars = [
  {
    label: 'Vocación y Honor',
    title: 'Bombero de Corazón',
    body: (
      <>
        Hombre de servicio en la histórica <strong className="font-medium text-ivory">Compañía 18</strong> y {' '}
        <strong className="font-medium text-ivory">en la Compañía 202</strong>. Rescatista capacitado en{' '}
        <strong className="font-medium text-ivory">USAR</strong> y{' '}
        <strong className="font-medium text-ivory">CRECL</strong>, siempre listo para acudir al llamado sin esperar nada a cambio.
      </>
    ),
  },
  {
    label: 'Pasión y Alegría',
    title: 'Campeón de Marinera',
    body: (
      <>
        Llevó el pañuelo y la elegancia de nuestra marinera en el alma. Este{' '}
        <strong className="font-medium text-ivory">2026 se coronó campeón</strong>, dejando en la pista la misma fuerza,
        carisma y alegría con la que vivió cada día.
      </>
    ),
  },
  {
    label: 'Su Esencia',
    title: 'Siempre Resolutivo',
    body: (
      <>
        El primero en tender la mano y encontrar solución cuando otros veían problemas. Su presencia daba calma, respaldo
        y una sonrisa segura a su familia, sus amigos.
      </>
    ),
  },
]

export default function LifePillars () {
  return (
    <section className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 sm:grid-cols-3">
      {pillars.map((p) => (
        <article
          key={p.title}
          className="rounded-2xl border border-gold/15 bg-charcoal/90 p-5 sm:p-6 transition hover:border-gold/35 shadow-lg shadow-black/40"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-medium">{p.label}</p>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-ivory">{p.title}</h2>
          <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#D2C9BD]">{p.body}</p>
        </article>
      ))}
    </section>
  )
}
