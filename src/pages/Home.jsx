import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { useDb, fmtFecha, fmtHora, fmtPrecio } from '../lib/store'

const ayudas = [
  {
    icon: Icon.Leaf,
    titulo: 'Crianza respetuosa y consciente',
    desc: 'Acompañamiento para criar con presencia, sin gritos ni castigos que dañan el vínculo.',
    span: 'md:col-span-7',
  },
  {
    icon: Icon.Heart,
    titulo: 'Manejo de berrinches y conductas difíciles',
    desc: 'Entiende qué hay detrás de cada berrinche y cómo responder con calma.',
    span: 'md:col-span-5',
  },
  {
    icon: Icon.Sparkle,
    titulo: 'Límites y normas con conexión',
    desc: 'Firmeza y ternura pueden convivir: límites claros que cuidan la relación.',
    span: 'md:col-span-5',
  },
  {
    icon: Icon.Users,
    titulo: 'Gestión emocional para niños y familias',
    desc: 'Herramientas de regulación emocional para toda la familia, basadas en DBT.',
    span: 'md:col-span-7',
  },
  {
    icon: Icon.Clock,
    titulo: 'Hábitos y rutinas saludables',
    desc: 'Sueño, pantallas y rutinas realistas que se sostienen en el tiempo.',
    span: 'md:col-span-6',
  },
  {
    icon: Icon.Video,
    titulo: 'Orientación a madres, padres y cuidadores',
    desc: 'Sesiones online o presenciales para resolver tus dudas de crianza.',
    span: 'md:col-span-6',
  },
]

const sobreMi = [
  'Psicóloga egresada de la UPCH, con mención en clínica',
  'Formación en Terapia Dialéctica Conductual (DBT) · Centro CONTEXTO',
  'Experiencia en evaluación e intervención con niños y adolescentes',
  'Ponente en "Maternidad y salud mental" · Mamá de una nena de 3 años',
]

export default function Home() {
  const { events } = useDb()
  const proximos = events
    .filter((e) => e.publicado && new Date(e.fecha) > new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 2)

  return (
    <main className="overflow-x-clip">
      {/* ───────── HERO ───────── */}
      <section className="relative px-4 pb-24 pt-36 sm:pt-44">
        {/* halos suaves */}
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-blush-200/50 blur-[120px]" />
        <div className="pointer-events-none absolute left-[-12%] top-72 h-[26rem] w-[26rem] rounded-full bg-sage-100 blur-[100px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>
                <Icon.Heart className="h-3 w-3" /> Psicóloga clínica · Crianza consciente
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-tight text-espresso-900 sm:text-7xl">
                Cuando criar se vuelve difícil,{' '}
                <em className="font-light text-blush-500">no tienes que hacerlo sol@</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-espresso-500">
                Soy <strong className="font-semibold text-espresso-900">Francis Landeo</strong>,
                psicóloga clínica y mamá. Te acompaño a entender las emociones de tus hijos —y las
                tuyas— para construir una crianza con límites, respeto y conexión.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/reservar">
                  <PillButton variant="primary">Reservar una cita</PillButton>
                </Link>
                <Link to="/talleres">
                  <PillButton variant="ghost">Ver talleres y webinars</PillButton>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Composición visual */}
          <div className="relative lg:col-span-5">
            <Reveal delay={200}>
              <Bezel>
                <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-blush-100 via-cream to-sage-100 p-8 sm:p-10">
                  <Icon.Leaf className="h-10 w-10 text-blush-400" />
                  <p className="mt-6 font-serif text-2xl leading-snug text-espresso-900">
                    “La forma en la que acompañamos las emociones de un niño puede cambiar su vida
                    entera.”
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-espresso-400">
                    Francis Landeo
                  </p>
                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blush-300/40 blur-2xl" />
                </div>
              </Bezel>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-4 hidden -rotate-2 sm:block lg:absolute lg:-bottom-10 lg:-left-10 lg:mt-0 lg:w-64">
                <Bezel>
                  <div className="flex items-center gap-4 rounded-[calc(2rem-0.375rem)] p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                      <Icon.Calendar className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-espresso-900">Agenda abierta</p>
                      <p className="text-xs text-espresso-400">Online y presencial · Lima</p>
                    </div>
                  </div>
                </Bezel>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── QUIÉN SOY ───────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="sage">
                <Icon.Sparkle className="h-3 w-3" /> Quién soy
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
                Hola, soy <em className="font-light text-blush-500">Francis</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-base leading-relaxed text-espresso-500">
                Soy mamá, psicóloga y una mujer que entendió que la forma en la que acompañamos las
                emociones de un niño puede cambiar su vida entera. Con experiencia en evaluación,
                observación e intervención infantil —y acompañamiento psicoeducativo individual—
                comparto herramientas, reflexión y aprendizaje real: no desde la perfección, sino
                desde la experiencia, el amor y las ganas profundas de construir una sociedad
                emocionalmente más sana.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {sobreMi.map((item, i) => (
                <Reveal key={item} delay={i * 90}>
                  <Bezel>
                    <div className="flex items-center gap-4 rounded-[calc(2rem-0.375rem)] p-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-500">
                        <Icon.Check className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-medium leading-snug text-espresso-700">{item}</p>
                    </div>
                  </Bezel>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CÓMO TE AYUDO (bento) ───────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Eyebrow>
              <Icon.Heart className="h-3 w-3" /> ¿Cómo te ayudo?
            </Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
              Acompañamiento para cada etapa de la crianza
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-12">
            {ayudas.map((a, i) => (
              <Reveal key={a.titulo} delay={(i % 3) * 90} className={a.span}>
                <Bezel className="h-full">
                  <div className="group flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-50 text-blush-500 ring-1 ring-blush-200/60 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-serif text-xl leading-snug text-espresso-900">
                      {a.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-espresso-500">{a.desc}</p>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── MANIFIESTO ───────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-espresso-900/[0.07]">
              <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-espresso-900 px-8 py-20 text-center sm:px-16 sm:py-28">
                <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blush-500/20 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sage-400/20 blur-[90px]" />
                <Eyebrow tone="espresso">Mi motorcito</Eyebrow>
                <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-snug tracking-tight text-cream sm:text-5xl">
                  Creo en la crianza consciente, en los límites con respeto y en{' '}
                  <em className="text-blush-300">
                    criar niños que no tengan que recuperarse de su infancia
                  </em>{' '}
                  para poder ser felices.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── PRÓXIMOS EVENTOS ───────── */}
      {proximos.length > 0 && (
        <section className="px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <Eyebrow tone="sage">
                  <Icon.Calendar className="h-3 w-3" /> Agenda
                </Eyebrow>
                <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
                  Próximos talleres y webinars
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <Link to="/talleres">
                  <PillButton variant="ghost">Ver todos</PillButton>
                </Link>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {proximos.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 110}>
                  <Bezel className="h-full">
                    <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8">
                      <div className="flex items-center justify-between">
                        <Eyebrow tone={ev.tipo === 'webinar' ? 'sage' : 'blush'}>
                          {ev.tipo === 'webinar' ? (
                            <Icon.Video className="h-3 w-3" />
                          ) : (
                            <Icon.Users className="h-3 w-3" />
                          )}
                          {ev.tipo}
                        </Eyebrow>
                        <span className="text-sm font-semibold text-espresso-900">
                          {fmtPrecio(ev.precio)}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl leading-snug text-espresso-900">
                        {ev.titulo}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-500">
                        {ev.desc}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-espresso-400">
                        <span className="inline-flex items-center gap-1.5 capitalize">
                          <Icon.Calendar className="h-3.5 w-3.5" /> {fmtFecha(ev.fecha)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon.Clock className="h-3.5 w-3.5" /> {fmtHora(ev.fecha)} ·{' '}
                          {ev.duracion} min
                        </span>
                      </div>
                      <Link to="/talleres" className="mt-7">
                        <PillButton variant="blush">Inscribirme</PillButton>
                      </Link>
                    </div>
                  </Bezel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── CTA FINAL ───────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
              Demos el primer paso, <em className="font-light text-blush-500">juntas</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-espresso-500">
              La primera consulta de encuadre es gratuita: conversamos sobre tu situación y vemos
              cómo puedo acompañarte.
            </p>
            <div className="mt-10 flex justify-center">
              <Link to="/reservar">
                <PillButton variant="blush">Agendar mi primera consulta</PillButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
