import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PhotoCollage from '../components/PhotoCollage'
import { Eyebrow, Bezel, PillButton, Icon } from '../components/ui'
import { credenciales, sobreMi } from '../lib/content'

export default function SobreMi() {
  return (
    <main>
      {/* Intro + collage lado a lado */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:pb-14 sm:pt-32">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-blush-200/40 blur-[90px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <Reveal>
              <Eyebrow tone="sage">
                <Icon.Sparkle className="h-3 w-3" /> Sobre mí
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-espresso-900 sm:text-5xl">
                Hola, soy <em className="font-light text-blush-500">Francis</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-espresso-500 lg:mx-0">
                Mamá, psicóloga clínica y psicoterapeuta DBT en formación. Acompaño familias desde
                la experiencia, no desde la perfección.
              </p>
            </Reveal>
          </div>

          <PhotoCollage className="mx-auto w-full max-w-[360px] lg:mx-0 lg:ml-auto" />
        </div>
      </section>

      <section className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <Reveal>
            <blockquote className="relative border-l-[3px] border-blush-400 pl-5 font-serif text-xl italic leading-snug text-espresso-900 sm:text-2xl">
              Criar no es perfecto, es un proceso vivo. Acompañarlo desde la consciencia lo cambia
              todo.
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-espresso-500 sm:text-base">
              Entendí que la forma en la que acompañamos las emociones de un niño puede cambiar su
              vida entera. Con experiencia en evaluación, observación e intervención infantil comparto
              herramientas, reflexión y aprendizaje real.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-espresso-500 sm:text-base">
              Me especializo en terapia DBT, crianza consciente y gestión emocional. Mi enfoque
              combina evidencia científica con la calidez que cada familia necesita.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {sobreMi.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <Bezel>
                  <div className="flex items-start gap-3 rounded-[calc(2rem-0.375rem)] p-4 sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-500">
                      <Icon.Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-xs font-medium leading-snug text-espresso-700 sm:text-sm">
                      {item}
                    </p>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-espresso-900 py-10 sm:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:gap-8">
          {credenciales.map((c, i) => (
            <Reveal key={c.label} delay={i * 50} className="text-center">
              <span className="font-serif text-2xl font-light text-cream sm:text-3xl">{c.num}</span>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cream/55 sm:text-xs">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 text-center sm:py-16">
        <Reveal>
          <Link to="/reservar">
            <PillButton variant="blush">Trabajar con Francis</PillButton>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
