import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import BreathingOrb from '../components/BreathingOrb'
import FAQ from '../components/FAQ'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { useDb, fmtFecha, fmtHora, fmtPrecio } from '../lib/store'

const credenciales = [
  { num: 'UPCH', label: 'Egresada con mención en clínica' },
  { num: 'DBT', label: 'Formación en Centro CONTEXTO' },
  { num: '1+', label: 'Año de experiencia en infancia' },
  { num: '100%', label: 'Confidencialidad y contención' },
]

const metodo = [
  {
    n: '01',
    icon: Icon.Heart,
    titulo: 'Escucha sin juicio',
    desc: 'Creamos un espacio seguro donde puedes expresarte con libertad. Todo lo que sientes tiene valor.',
  },
  {
    n: '02',
    icon: Icon.Sparkle,
    titulo: 'Comprensión profunda',
    desc: 'Identificamos juntas los patrones emocionales y relacionales detrás de los retos que enfrentas.',
  },
  {
    n: '03',
    icon: Icon.Leaf,
    titulo: 'Herramientas reales',
    desc: 'Estrategias concretas de DBT y crianza consciente que puedes aplicar hoy con tus hijos.',
  },
  {
    n: '04',
    icon: Icon.Users,
    titulo: 'Cambio sostenible',
    desc: 'No buscamos la perfección, sino cultivar un vínculo que crezca con el tiempo.',
  },
]

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
  const { events, services } = useDb()
  const proximos = events
    .filter((e) => e.publicado && new Date(e.fecha) > new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 3)

  return (
    <main className="overflow-x-clip">
      {/* ───────── HERO ───────── */}
      <section className="relative flex min-h-[100dvh] items-center px-4 pb-20 pt-28 sm:pt-36">
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-blush-200/50 blur-[120px]" />
        <div className="pointer-events-none absolute left-[-12%] top-72 h-[26rem] w-[26rem] rounded-full bg-sage-100 blur-[100px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-blush-600 ring-1 ring-blush-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-500" />
                Psicóloga clínica · Lima, Perú
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.06] tracking-tight text-espresso-900">
                Criar con{' '}
                <em className="font-light text-blush-500">consciencia,</em>
                <br />
                vivir en calma.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-espresso-500 sm:text-lg lg:mx-0">
                Soy <strong className="font-semibold text-espresso-900">Francis Landeo</strong>,
                psicóloga clínica y mamá. Te acompaño a entender las emociones de tus hijos —y las
                tuyas— para construir una crianza con límites, respeto y conexión.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                <Link to="/reservar">
                  <PillButton variant="primary">Reservar primera cita</PillButton>
                </Link>
                <button
                  type="button"
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-2 text-sm font-medium text-espresso-900 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-blush-300 cursor-pointer"
                >
                  Explorar servicios
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-900/5 ring-1 ring-espresso-900/10 transition-transform duration-500 group-hover:translate-x-0.5">
                    <Icon.Arrow className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-espresso-400 lg:justify-start">
                <Icon.Heart className="h-3.5 w-3.5 text-blush-400" />
                Sesiones online y presencial · Total confidencialidad
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="flex justify-center lg:justify-end">
            <BreathingOrb />
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-espresso-400 sm:flex">
          <span>Descubrir</span>
          <div className="h-8 w-px bg-gradient-to-b from-espresso-400/50 to-transparent" />
        </div>
      </section>

      {/* ───────── CREDENCIALES (trust strip honesto) ───────── */}
      <section className="bg-espresso-900 py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:gap-6">
          {credenciales.map((c, i) => (
            <Reveal key={c.label} delay={i * 80} className="text-center">
              <span className="font-serif text-3xl font-light text-cream sm:text-4xl">{c.num}</span>
              <p className="mt-2 text-xs leading-relaxed text-cream/55 sm:text-sm">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── SERVICIOS CON PRECIOS ───────── */}
      <section id="servicios" className="scroll-mt-28 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>
              <Icon.Heart className="h-3 w-3" /> Cómo puedo ayudarte
            </Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
              Servicios para ti <em className="font-light text-blush-500">y tu familia</em>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso-500">
              Cada espacio está pensado para darte herramientas concretas que puedas aplicar desde
              hoy en tu vida cotidiana.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
                <Bezel className="h-full">
                  <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-7 sm:p-8">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blush-500">
                      {s.modalidad}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-espresso-900">
                      {s.nombre}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-500">{s.desc}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-espresso-900/8 pt-5">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-espresso-400">
                          {Number(s.precio) === 0 ? 'Gratuita' : 'Desde'}
                        </span>
                        <span className="font-serif text-xl text-espresso-900">
                          {fmtPrecio(s.precio)}
                        </span>
                      </div>
                      <Link to="/reservar">
                        <PillButton variant="blush" className="!pl-4 !pr-2 text-xs">
                          Agendar
                        </PillButton>
                      </Link>
                    </div>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── QUIÉN SOY ───────── */}
      <section
        id="sobre-mi"
        className="scroll-mt-28 bg-gradient-to-b from-blush-50/80 to-cream px-4 py-24 sm:py-32"
      >
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
              <blockquote className="relative mt-6 border-l-[3px] border-blush-400 pl-5 font-serif text-xl italic leading-snug text-espresso-900">
                Criar no es perfecto, es un proceso vivo. Acompañarlo desde la consciencia lo cambia
                todo.
              </blockquote>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base leading-relaxed text-espresso-500">
                Soy mamá, psicóloga y una mujer que entendió que la forma en la que acompañamos las
                emociones de un niño puede cambiar su vida entera. Comparto herramientas desde la
                experiencia, el amor y las ganas de construir una sociedad emocionalmente más sana.
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

      {/* ───────── MÉTODO ───────── */}
      <section id="metodo" className="scroll-mt-28 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-espresso-900/[0.07]">
              <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-espresso-900 px-6 py-16 sm:px-12 sm:py-20">
                <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blush-500/15 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blush-300/10 blur-[80px]" />
                <Eyebrow tone="espresso">Mi enfoque</Eyebrow>
                <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-cream sm:text-5xl">
                  Así es como <em className="text-blush-300">acompaño el cambio</em>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/55 sm:text-base">
                  No existe una fórmula mágica, pero sí un proceso que respeta tu tiempo, tu historia
                  y tu ritmo.
                </p>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {metodo.map((m, i) => (
                    <Reveal key={m.n} delay={i * 90}>
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                        <span className="font-serif text-4xl font-light text-white/10">{m.n}</span>
                        <m.icon className="mt-3 h-5 w-5 text-blush-300" />
                        <h3 className="mt-4 font-serif text-xl text-cream">{m.titulo}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-cream/50">{m.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CÓMO TE AYUDO (bento) ───────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Eyebrow>
              <Icon.Heart className="h-3 w-3" /> Áreas de acompañamiento
            </Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
              Para cada etapa de la crianza
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-12">
            {ayudas.map((a, i) => (
              <Reveal key={a.titulo} delay={(i % 3) * 90} className={a.span}>
                <Bezel className="h-full">
                  <div className="group flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8">
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
              <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-blush-100 via-cream to-blush-50 px-8 py-20 text-center sm:px-16 sm:py-24">
                <Eyebrow>Mi motorcito</Eyebrow>
                <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-snug tracking-tight text-espresso-900 sm:text-4xl">
                  Creo en la crianza consciente, en los límites con respeto y en{' '}
                  <em className="text-blush-500">
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
        <section id="proximos" className="scroll-mt-28 px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <Eyebrow tone="sage">
                  <Icon.Calendar className="h-3 w-3" /> Próximos eventos
                </Eyebrow>
                <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
                  Talleres y webinars <em className="font-light text-blush-500">que se vienen</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <Link to="/talleres">
                  <PillButton variant="ghost">Ver todos</PillButton>
                </Link>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {proximos.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 110}>
                  <Bezel className="h-full">
                    <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-7">
                      <Eyebrow tone={ev.tipo === 'webinar' ? 'sage' : 'blush'}>{ev.tipo}</Eyebrow>
                      <h3 className="mt-4 font-serif text-xl leading-snug text-espresso-900">
                        {ev.titulo}
                      </h3>
                      <p className="mt-2 flex-1 text-xs capitalize text-espresso-400">
                        {fmtFecha(ev.fecha)} · {fmtHora(ev.fecha)}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-espresso-900/8 pt-4">
                        <span className="font-serif text-lg text-espresso-900">
                          {fmtPrecio(ev.precio)}
                        </span>
                        <Link to="/talleres">
                          <PillButton variant="blush" className="!pl-4 !pr-2 text-xs">
                            Inscribirme
                          </PillButton>
                        </Link>
                      </div>
                    </div>
                  </Bezel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ />

      {/* ───────── CTA FINAL ───────── */}
      <section id="contacto" className="scroll-mt-28 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-espresso-900 px-8 py-16 text-center sm:px-16 sm:py-20">
              <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blush-500/20 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blush-300/15 blur-[70px]" />
              <h2 className="relative font-serif text-4xl leading-tight text-cream sm:text-5xl">
                ¿Lista para dar el <em className="text-blush-300">primer paso?</em>
              </h2>
              <p className="relative mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/60 sm:text-base">
                La primera consulta de encuadre es gratuita. Sin compromisos, con total
                confidencialidad.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/reservar">
                  <PillButton variant="blush">Agendar mi consulta</PillButton>
                </Link>
                <Link to="/links">
                  <PillButton variant="ghost" className="!bg-white/10 !text-cream !ring-white/20">
                    Ver todos mis enlaces
                  </PillButton>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
