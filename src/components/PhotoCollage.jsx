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
    <div className="absolute inset-0" aria-hidden="true">
      <img
        src={fotos.hero}
        alt=""
        className="h-full w-full object-cover object-[center_40%] lg:object-[58%_30%]"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(253,248,245,0.98) 0%, rgba(253,248,245,0.94) 22%, rgba(253,248,245,0.72) 42%, rgba(253,248,245,0.25) 62%, transparent 82%),
            linear-gradient(to bottom, rgba(253,248,245,0.55) 0%, transparent 22%, transparent 78%, rgba(253,248,245,0.45) 100%)
          `,
        }}
      />
    </div>
  )
}
