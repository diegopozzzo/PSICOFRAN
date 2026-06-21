import Reveal from './Reveal'
import { fotos } from '../lib/fotos'

const strip = [
  { src: fotos.escritorio, alt: 'Francis en su espacio de consulta', pos: 'object-[center_20%]' },
  { src: fotos.tablet, alt: 'Francis con tablet', pos: 'object-top' },
  { src: fotos.retrato, alt: 'Francis Landeo, retrato profesional', pos: 'object-[center_15%]' },
]

/** Collage compacto: franja horizontal de 3 fotos, baja altura */
export default function PhotoCollage() {
  return (
    <Reveal>
      <div className="mx-auto flex max-w-2xl gap-2 sm:max-w-3xl sm:gap-2.5">
        {strip.map((f, i) => (
          <div
            key={f.src}
            className={`relative flex-1 overflow-hidden ring-1 ring-espresso-900/[0.06] ${
              i === 0 ? 'rounded-l-2xl' : i === strip.length - 1 ? 'rounded-r-2xl' : ''
            }`}
          >
            <img
              src={f.src}
              alt={f.alt}
              className={`h-24 w-full object-cover sm:h-32 ${f.pos}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Reveal>
  )
}

export function HeroPhoto({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-200/60 via-blush-100/30 to-transparent blur-sm" />
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-1.5 shadow-[0_28px_70px_-30px_rgba(54,34,39,0.35)] ring-1 ring-espresso-900/[0.07]">
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="aspect-[4/5] w-full max-w-[380px] object-cover object-[center_12%] sm:max-w-[420px]"
          loading="eager"
        />
      </div>
      <div className="absolute -bottom-4 -left-2 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-lg ring-1 ring-blush-200/80 backdrop-blur-sm sm:block">
        <p className="font-serif text-sm italic text-espresso-900">Francis Landeo</p>
        <p className="text-[10px] uppercase tracking-[0.14em] text-blush-500">Psicóloga clínica</p>
      </div>
    </div>
  )
}
