import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Icon } from '../components/ui'

const LINKS = [
  {
    href: '#/reservar',
    interno: true,
    icon: Icon.Calendar,
    titulo: 'Reservar una cita',
    desc: 'Primera consulta de encuadre gratuita',
    destacado: true,
  },
  {
    href: '#/talleres',
    interno: true,
    icon: Icon.Users,
    titulo: 'Talleres y webinars',
    desc: 'Próximas fechas e inscripciones',
  },
  {
    href: 'https://wa.me/51949364050',
    icon: Icon.Whatsapp,
    titulo: 'WhatsApp',
    desc: '+51 949 364 050',
  },
  {
    href: 'https://www.instagram.com/psico.fran2026/',
    icon: Icon.Instagram,
    titulo: 'Instagram',
    desc: '@psico.fran2026',
  },
  {
    href: 'https://www.linkedin.com/in/francis-cecilia-landeo-salda%C3%B1a-28539b2a2/',
    icon: Icon.Sparkle,
    titulo: 'LinkedIn',
    desc: 'Francis Cecilia Landeo Saldaña',
  },
]

function LinkCard({ href, interno, icon: IconCmp, titulo, desc, destacado, delay }) {
  const inner = (
    <span
      className={`group flex w-full items-center gap-3.5 rounded-[calc(2rem-0.375rem)] p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:gap-4 sm:p-5 ${
        destacado ? 'bg-espresso-900 text-cream' : 'bg-white text-espresso-900'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-11 sm:w-11 ${
          destacado ? 'bg-white/10 text-blush-300 ring-white/15' : 'bg-blush-50 text-blush-500 ring-blush-200/60'
        }`}
      >
        <IconCmp className="h-5 w-5" />
      </span>
      <span className="flex-1 text-left">
        <span className="block text-sm font-semibold">{titulo}</span>
        <span className={`block text-xs ${destacado ? 'text-cream/60' : 'text-espresso-400'}`}>
          {desc}
        </span>
      </span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px ${
          destacado ? 'bg-white/10 ring-white/15' : 'bg-espresso-900/5 ring-espresso-900/10'
        }`}
      >
        <Icon.Arrow className="h-3.5 w-3.5" />
      </span>
    </span>
  )

  const shell = `block rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-espresso-900/[0.07] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.99]`

  return (
    <Reveal delay={delay}>
      {interno ? (
        <Link to={href.replace('#', '')} className={shell}>
          {inner}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer" className={shell}>
          {inner}
        </a>
      )}
    </Reveal>
  )
}

export default function Links() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-x-clip px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-16">
      <div className="pointer-events-none absolute -top-24 right-[-15%] h-[26rem] w-[26rem] rounded-full bg-blush-200/60 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-15%] h-[24rem] w-[24rem] rounded-full bg-sage-100 blur-[100px]" />

      <div className="relative w-full max-w-md">
        {/* Cabecera */}
        <Reveal className="text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 via-cream to-sage-100 font-serif text-2xl text-blush-500 ring-1 ring-espresso-900/[0.07] shadow-[0_24px_60px_-30px_rgba(54,34,39,0.4)] sm:h-24 sm:w-24 sm:text-3xl">
            FL
          </span>
          <h1 className="mt-4 font-serif text-[1.65rem] tracking-tight text-espresso-900 sm:mt-5 sm:text-3xl">
            Francis Landeo
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-espresso-500 sm:text-sm">
            Psicóloga clínica · Crianza consciente
            <br />
            Psicoterapeuta DBT en formación
          </p>
        </Reveal>

        {/* Enlaces */}
        <div className="mt-7 grid gap-3 sm:mt-9 sm:gap-3.5">
          {LINKS.map((l, i) => (
            <LinkCard key={l.titulo} {...l} delay={120 + i * 80} />
          ))}
        </div>

        <Reveal delay={600} className="mt-7 text-center sm:mt-9">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.2em] text-espresso-400 transition-colors duration-500 hover:text-espresso-900"
          >
            francislandeo.com →
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
