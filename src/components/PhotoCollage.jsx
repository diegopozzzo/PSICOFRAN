import { fotos } from '../lib/fotos'

/**
 * Collage superpuesto: 4 esquinas + centro dominante.
 * Sin Reveal: debe verse al instante al entrar a la página.
 */
const tiles = [
  {
    src: fotos.perfil,
    alt: 'Francis Landeo, psicóloga clínica',
    pos: 'object-[center_22%]',
    frame: 'left-0 top-0 z-[1] h-[44%] w-[47%]',
  },
  {
    src: fotos.tablet,
    alt: 'Francis Landeo con tablet',
    pos: 'object-[center_18%]',
    frame: 'bottom-0 left-0 z-[1] h-[44%] w-[47%]',
  },
  {
    src: fotos.escritorio,
    alt: 'Francis en su espacio de consulta',
    pos: 'object-[center_35%]',
    frame: 'right-0 top-[2%] z-[1] h-[42%] w-[45%]',
  },
  {
    src: fotos.retrato,
    alt: 'Francis Landeo, retrato profesional',
    pos: 'object-[center_22%]',
    frame: 'bottom-0 right-0 z-[1] h-[44%] w-[45%]',
  },
  {
    src: fotos.hero,
    alt: 'Francis Landeo con libros de psicología',
    pos: 'object-[center_12%]',
    frame:
      'left-1/2 top-1/2 z-[3] h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 shadow-[0_20px_50px_-12px_rgba(54,34,39,0.35)] ring-2 ring-white',
  },
]

function CollageFrame({ src, alt, pos, frame }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-2xl bg-blush-50 ring-1 ring-espresso-900/[0.08] ${frame}`}
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
      <div className="relative mx-auto aspect-square w-full min-h-[260px] max-w-[300px] sm:max-w-[360px]">
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
