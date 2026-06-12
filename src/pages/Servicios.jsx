import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { useDb, fmtPrecio } from '../lib/store'
import { ayudas } from '../lib/content'

export default function Servicios() {
  const { services } = useDb()

  return (
    <main>
      <PageHero
        eyebrow={<><Icon.Heart className="h-3 w-3" /> Servicios</>}
        title={
          <>
            Acompañamiento para ti <em className="font-light text-blush-500">y tu familia</em>
          </>
        }
        lead="Cada espacio está pensado para darte herramientas concretas que puedas aplicar desde hoy."
      />

      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <Bezel className="h-full">
                <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blush-500">
                    {s.modalidad} · {s.duracion} min
                  </span>
                  <h2 className="mt-3 font-serif text-2xl leading-snug text-espresso-900">
                    {s.nombre}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso-500">{s.desc}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-espresso-900/8 pt-5">
                    <span className="font-serif text-2xl text-espresso-900">{fmtPrecio(s.precio)}</span>
                    <Link to="/reservar">
                      <PillButton variant="blush">Agendar</PillButton>
                    </Link>
                  </div>
                </div>
              </Bezel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-blush-50/60 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Eyebrow tone="sage">Áreas de acompañamiento</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-espresso-900 sm:text-4xl">
              ¿En qué te puedo <em className="font-light text-blush-500">ayudar?</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-12">
            {ayudas.map((a, i) => (
              <Reveal key={a.titulo} delay={(i % 3) * 80} className={a.span}>
                <Bezel className="h-full">
                  <div className="group flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blush-500 ring-1 ring-blush-200/60 transition-transform duration-500 group-hover:-translate-y-0.5">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-serif text-xl text-espresso-900">{a.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-espresso-500">{a.desc}</p>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
