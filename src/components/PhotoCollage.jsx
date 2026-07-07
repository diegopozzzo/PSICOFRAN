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
      <div className="relative aspect-[4/5] w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px]">
        {/* Foto difuminada en todo el marco */}
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_12%] blur-[2.75rem] sm:blur-[3.25rem]"
          loading="eager"
        />

        {/* Fundido en todos los bordes → se integra con el fondo crema */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 88% at 50% 52%, transparent 8%, rgba(${cream},0.35) 42%, rgba(${cream},0.88) 72%, rgba(${cream},1) 100%),
              linear-gradient(to bottom, rgba(${cream},0.92) 0%, rgba(${cream},0.25) 22%, rgba(${cream},0.15) 55%, rgba(${cream},0.55) 82%, rgba(${cream},0.95) 100%),
              linear-gradient(to right, rgba(${cream},0.85) 0%, transparent 16%, transparent 84%, rgba(${cream},0.85) 100%)
            `,
          }}
        />
      </div>
    </div>
  )
}
