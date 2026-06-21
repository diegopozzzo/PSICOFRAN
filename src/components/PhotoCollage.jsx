import Reveal from './Reveal'
import { fotos } from '../lib/fotos'

export default function PhotoCollage() {
  return (
    <Reveal>
      <div className="grid grid-cols-6 gap-3 sm:gap-4">
        {/* Imagen principal */}
        <div className="col-span-6 overflow-hidden rounded-[1.75rem] ring-1 ring-espresso-900/[0.06] sm:col-span-4 sm:row-span-2">
          <img
            src={fotos.escritorio}
            alt="Francis Landeo en su espacio de consulta"
            className="h-full min-h-[220px] w-full object-cover object-[center_20%] sm:min-h-[340px]"
            loading="lazy"
          />
        </div>

        {/* Columna derecha */}
        <div className="col-span-3 overflow-hidden rounded-[1.25rem] ring-1 ring-espresso-900/[0.06] sm:col-span-2">
          <img
            src={fotos.tablet}
            alt="Francis Landeo con tablet"
            className="aspect-[4/5] w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <div className="col-span-3 overflow-hidden rounded-[1.25rem] ring-1 ring-espresso-900/[0.06] sm:col-span-2">
          <img
            src={fotos.perfil}
            alt="Francis Landeo, psicóloga clínica"
            className="aspect-[4/5] w-full object-cover object-[center_15%]"
            loading="lazy"
          />
        </div>

        {/* Fila inferior */}
        <div className="col-span-3 overflow-hidden rounded-[1.25rem] ring-1 ring-espresso-900/[0.06]">
          <img
            src={fotos.sentada}
            alt="Francis Landeo sentada con libros"
            className="aspect-square w-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="col-span-3 overflow-hidden rounded-[1.25rem] ring-1 ring-espresso-900/[0.06] sm:col-span-3">
          <img
            src={fotos.retrato}
            alt="Francis Landeo, retrato profesional"
            className="aspect-[5/4] w-full object-cover object-[center_20%] sm:aspect-[16/10]"
            loading="lazy"
          />
        </div>
      </div>
    </Reveal>
  )
}

export function HeroPhoto({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-200/60 via-blush-100/30 to-transparent blur-sm" />
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-1.5 shadow-[0_28px_70px_-30px_rgba(54,34,39,0.35)] ring-1 ring-espresso-900/[0.07]">
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
