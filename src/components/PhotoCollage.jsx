import { fotos } from '../lib/fotos'

/** Tres fotos en fila — suficiente contexto visual sin saturar la página */
const gallery = [
  {
    src: fotos.escritorio,
    alt: 'Francis en su espacio de consulta',
    pos: 'object-[center_35%]',
  },
  {
    src: fotos.sentada,
    alt: 'Francis Landeo en su consultorio',
    pos: 'object-[center_20%]',
  },
  {
    src: fotos.retrato,
    alt: 'Francis Landeo, retrato profesional',
    pos: 'object-[center_22%]',
  },
]

export default function PhotoCollage({ className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {gallery.map((f) => (
          <div key={f.src} className="overflow-hidden rounded-2xl">
            <img
              src={f.src}
              alt={f.alt}
              className={`aspect-[3/4] w-full object-cover ${f.pos}`}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 bg-cream" aria-hidden="true">
      <img
        src={fotos.hero}
        alt=""
        className="h-full w-full object-contain object-right"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(253,248,245,0.99) 0%, rgba(253,248,245,0.94) 26%, rgba(253,248,245,0.62) 40%, rgba(253,248,245,0.15) 52%, transparent 62%)
          `,
        }}
      />
    </div>
  )
}
