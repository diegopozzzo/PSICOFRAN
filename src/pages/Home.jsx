import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import BreathingOrb from '../components/BreathingOrb'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { useDb, fmtFecha, fmtHora, fmtPrecio } from '../lib/store'
import { exploreCards } from '../lib/content'

export default function Home() {
  const { events } = useDb()
  const proximo = events
    .filter((e) => e.publicado && new Date(e.fecha) > new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0]

  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] flex-col justify-center px-4 pb-16 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-blush-300/35 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-20 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-blush-100 blur-[90px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[11px] font-semibold tracking-wide text-blush-600 shadow-sm ring-1 ring-blush-200/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-500" />
                Psicóloga clínica · Lima, Perú
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-7 font-serif text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.05] tracking-tight text-espresso-900">
                Criar con{' '}
                <em className="font-light text-blush-500">consciencia,</em>
                <br />
                vivir en calma.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-espresso-500 sm:text-lg lg:mx-0">
                Soy Francis Landeo. Te acompaño en la crianza con herramientas reales, calidez y un
                enfoque basado en evidencia.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/reservar">
                  <PillButton variant="primary">Reservar primera cita</PillButton>
                </Link>
                <Link to="/servicios">
                  <PillButton variant="ghost">Conocer servicios</PillButton>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="order-1 flex justify-center lg:order-2">
            <BreathingOrb />
          </Reveal>
        </div>
      </section>

      {/* Explorar */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <Eyebrow tone="sage">
              <Icon.Sparkle className="h-3 w-3" /> Explora
            </Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-espresso-900 sm:text-4xl">
              Todo en su <em className="font-light text-blush-500">propio espacio</em>
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {exploreCards.map((card, i) => (
              <Reveal key={card.to} delay={i * 90}>
                <Link to={card.to} className="group block h-full">
                  <Bezel className="h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                    <div
                      className={`flex h-full min-h-[140px] items-center gap-5 rounded-[calc(2rem-0.375rem)] bg-gradient-to-br ${card.gradient} p-7 sm:p-8`}
                    >
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-blush-500 shadow-sm ring-1 ring-white/80 transition-transform duration-500 group-hover:scale-105">
                        <card.icon className="h-6 w-6" />
                      </span>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl text-espresso-900">{card.titulo}</h3>
                        <p className="mt-1 text-sm text-espresso-500">{card.desc}</p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-espresso-900/5 text-espresso-500 transition-all duration-500 group-hover:translate-x-0.5 group-hover:bg-espresso-900 group-hover:text-cream">
                        <Icon.Arrow className="h-4 w-4" />
                      </span>
                    </div>
                  </Bezel>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Próximo evento (solo uno) */}
      {proximo && (
        <section className="px-4 pb-20 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Bezel>
                <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-espresso-900 via-espresso-900 to-blush-600/30 p-8 sm:p-10">
                  <Eyebrow tone="espresso">Próximo evento</Eyebrow>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-cream sm:text-3xl">
                    {proximo.titulo}
                  </h3>
                  <p className="mt-3 text-sm capitalize text-cream/55">
                    {fmtFecha(proximo.fecha)} · {fmtHora(proximo.fecha)} · {fmtPrecio(proximo.precio)}
                  </p>
                  <div className="mt-7">
                    <Link to="/talleres">
                      <PillButton variant="blush">Ver e inscribirme</PillButton>
                    </Link>
                  </div>
                </div>
              </Bezel>
            </Reveal>
          </div>
        </section>
      )}

      {/* Cita */}
      <section className="px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-espresso-900 sm:text-3xl">
              “Criar niños que no tengan que{' '}
              <em className="text-blush-500">recuperarse de su infancia</em> para ser felices.”
            </p>
            <div className="mt-10">
              <Link to="/reservar">
                <PillButton variant="blush">Agendar mi consulta gratuita</PillButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
