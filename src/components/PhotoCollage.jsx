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
  const cream = '253,248,245'

  return (
    <div className={`relative flex w-full justify-center lg:justify-end ${className}`}>
      <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px]">
        {/* Foto nítida — persona visible abajo */}
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[center_12%]"
          loading="eager"
        />

        {/* Difuminado intenso solo en la parte superior */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.6) 48%, transparent 62%)',
            maskImage:
              'linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.6) 48%, transparent 62%)',
          }}
        >
          <img
            src={fotos.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_12%] blur-[3.5rem]"
          />
        </div>

        {/* Fundido superior más marcado hacia el fondo crema */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            background: `linear-gradient(to bottom, rgba(${cream},1) 0%, rgba(${cream},0.82) 14%, rgba(${cream},0.45) 28%, transparent 50%)`,
          }}
        />
      </div>
    </div>
  )
}
