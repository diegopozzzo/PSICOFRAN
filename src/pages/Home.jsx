import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { HeroBackground } from '../components/PhotoCollage'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { useDb, fmtFecha, fmtHora } from '../lib/store'
import { exploreCards } from '../lib/content'

export default function Home() {
  const { events } = useDb()
  const proximo = events
    .filter((e) => e.publicado && new Date(e.fecha) > new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0]

  return (
    <main className="overflow-x-clip">
      {/* Hero — marco contenido: foto + texto dentro del área visible */}
      <section className="px-4 pb-6 pt-24 sm:pb-8 sm:pt-28">
        <div className="relative mx-auto flex min-h-[min(78vh,820px)] max-w-6xl items-center overflow-hidden rounded-[1.75rem] sm:min-h-[min(82vh,860px)] sm:rounded-[2rem]">
          <HeroBackground />

          <div className="relative z-10 w-full px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-md lg:text-left xl:max-w-lg">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold tracking-wide text-blush-600 shadow-sm ring-1 ring-white/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-500" />
                Psicóloga clínica · Lima, Perú
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.06] tracking-tight text-espresso-900 sm:mt-6">
                Criar con{' '}
                <em className="font-light text-blush-500">consciencia,</em>
                <br />
                vivir en calma.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/reservar">
                  <PillButton variant="blush">Agendar mi cita</PillButton>
                </Link>
                <Link to="/servicios">
                  <PillButton variant="ghost" className="bg-white/90 shadow-sm backdrop-blur-md">
                    Conocer servicios
                  </PillButton>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-espresso-600 sm:text-lg lg:mx-0">
                Soy Francis Landeo. Te acompaño en la crianza con herramientas reales, calidez y un
                enfoque basado en evidencia.
              </p>
            </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Explorar */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 text-center">
            <Eyebrow tone="sage">
              <Icon.Sparkle className="h-3 w-3" /> Explora
            </Eyebrow>
            <h2 className="mt-4 font-serif text-3xl text-espresso-900 sm:text-4xl">
              Todo en su <em className="font-light text-blush-500">propio espacio</em>
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {exploreCards.map((card, i) => (
              <Reveal key={card.to} delay={i * 90}>
                <Link to={card.to} className="group block h-full">
                  <Bezel className="h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                    <div
                      className={`flex h-full min-h-[130px] items-center gap-5 rounded-[calc(2rem-0.375rem)] bg-gradient-to-br ${card.gradient} p-6 sm:p-7`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-blush-500 shadow-sm ring-1 ring-white/80 transition-transform duration-500 group-hover:scale-105">
                        <card.icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl text-espresso-900 sm:text-2xl">{card.titulo}</h3>
                        <p className="mt-1 text-sm text-espresso-500">{card.desc}</p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso-900/5 text-espresso-500 transition-all duration-500 group-hover:translate-x-0.5 group-hover:bg-espresso-900 group-hover:text-cream">
                        <Icon.Arrow className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Bezel>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {proximo && (
        <section className="px-4 pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Bezel>
                <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-espresso-900 via-espresso-900 to-blush-600/30 p-8 sm:p-10">
                  <Eyebrow tone="espresso">Próximo evento</Eyebrow>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-cream sm:text-3xl">
                    {proximo.titulo}
                  </h3>
                  <p className="mt-3 text-sm capitalize text-cream/55">
                    {fmtFecha(proximo.fecha)} · {fmtHora(proximo.fecha)}
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

      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-espresso-900 sm:text-3xl">
              “Criar niños que no tengan que{' '}
              <em className="text-blush-500">recuperarse de su infancia</em> para ser felices.”
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
