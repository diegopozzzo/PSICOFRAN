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

export function HeroPhoto({ className = '' }) {
  return (
    <div className={`relative flex justify-center lg:justify-end ${className}`}>
      {/* Halo difuso detrás */}
      <img
        src={fotos.hero}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute aspect-[4/5] w-full max-w-[340px] scale-110 rounded-[2rem] object-cover object-[center_12%] opacity-45 blur-3xl sm:max-w-[400px]"
      />

      <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[center_12%]"
          loading="eager"
        />
        {/* Bordes que se funden con el fondo crema */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 55%, rgba(253,248,245,0.92) 100%), linear-gradient(to right, rgba(253,248,245,0.55) 0%, transparent 14%, transparent 86%, rgba(253,248,245,0.55) 100%)',
          }}
        />
      </div>
    </div>
  )
}
