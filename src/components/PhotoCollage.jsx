import { fotos } from '../lib/fotos'

/**
 * Collage en cuadrícula (sin superposición).
 * Mismo orden visual: esquinas + centro; sentada al centro (hero solo en Inicio).
 */
const tiles = [
  {
    src: fotos.perfil,
    alt: 'Francis Landeo, psicóloga clínica',
    pos: 'object-[center_22%]',
    className: 'col-start-1 row-start-1 aspect-[4/5]',
  },
  {
    src: fotos.escritorio,
    alt: 'Francis en su espacio de consulta',
    pos: 'object-[center_35%]',
    className: 'col-start-2 row-start-1 aspect-[4/5]',
  },
  {
    src: fotos.sentada,
    alt: 'Francis Landeo en su consultorio',
    pos: 'object-[center_20%]',
    className: 'col-span-2 row-start-2 aspect-[5/3]',
  },
  {
    src: fotos.tablet,
    alt: 'Francis Landeo con tablet',
    pos: 'object-[center_18%]',
    className: 'col-start-1 row-start-3 aspect-[4/5]',
  },
  {
    src: fotos.retrato,
    alt: 'Francis Landeo, retrato profesional',
    pos: 'object-[center_22%]',
    className: 'col-start-2 row-start-3 aspect-[4/5]',
  },
]

function CollageFrame({ src, alt, pos, className }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-blush-50 ring-1 ring-espresso-900/[0.08] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${pos}`}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

export default function PhotoCollage({ className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto grid w-full max-w-[300px] grid-cols-2 gap-2 sm:max-w-[360px] sm:gap-2.5">
        {tiles.map((t) => (
          <CollageFrame key={t.src} {...t} />
        ))}
      </div>
    </div>
  )
}

export function HeroPhoto({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-200/60 via-blush-100/30 to-transparent blur-sm" />
      <div className="relative overflow-hidden rounded-[2rem] bg-cream p-1.5 shadow-[0_28px_70px_-30px_rgba(54,34,39,0.35)] ring-1 ring-espresso-900/[0.07]">
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
