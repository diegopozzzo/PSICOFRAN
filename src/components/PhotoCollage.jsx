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
  // Máscara: nítido solo rostro + libros (centro-inferior)
  const envMask =
    'radial-gradient(ellipse 78% 58% at 50% 82%, transparent 24%, black 72%)'

  return (
    <div className={`relative flex w-full justify-center lg:justify-end ${className}`}>
      <div className="relative aspect-[4/5] w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px]">
        {/* Foto nítida — persona y libros sin difuminar */}
        <img
          src={fotos.hero}
          alt="Francis Landeo, psicóloga clínica especializada en crianza consciente"
          className="relative z-10 h-full w-full rounded-[1.75rem] object-cover object-[center_12%]"
          loading="eager"
        />

        {/* Difuminado solo del entorno (techo, paredes, bordes) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.75rem]"
          style={{ WebkitMaskImage: envMask, maskImage: envMask }}
        >
          <img
            src={fotos.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_12%] blur-[3.5rem] sm:blur-[4rem]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, rgba(${cream},1) 0%, rgba(${cream},0.75) 28%, rgba(${cream},0.35) 45%, transparent 58%),
                linear-gradient(to right, rgba(${cream},0.85) 0%, transparent 18%, transparent 82%, rgba(${cream},0.85) 100%),
                linear-gradient(to left, rgba(${cream},0.55) 0%, transparent 35%)
              `,
            }}
          />
        </div>
      </div>
    </div>
  )
}
