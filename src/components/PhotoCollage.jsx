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
    <div className="pointer-events-none absolute inset-0 bg-cream" aria-hidden="true">
      <img
        src={fotos.hero}
        alt=""
        className="mx-auto block h-[min(88vh,880px)] w-auto max-w-full object-contain sm:ml-auto sm:mr-0 lg:max-w-[min(100%,820px)]"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(253,248,245,0.9) 0%, rgba(253,248,245,0.72) 18%, rgba(253,248,245,0.32) 36%, transparent 52%)
          `,
        }}
      />
    </div>
  )
}
