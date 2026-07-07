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
    <div className={`relative flex justify-center lg:justify-end ${className}`}>
      <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
        {/* Foto nítida — persona visible abajo */}
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[center_12%]"
          loading="eager"
        />

        {/* Difuminado solo en la parte superior */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 28%, transparent 52%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 28%, transparent 52%)',
          }}
        >
          <img
            src={fotos.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_12%] blur-2xl"
          />
        </div>

        {/* Fundido superior hacia el fondo crema */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            background: `linear-gradient(to bottom, rgba(${cream},0.95) 0%, rgba(${cream},0.55) 18%, transparent 42%)`,
          }}
        />
      </div>
    </div>
  )
}
