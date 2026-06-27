import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PhotoCollage from '../components/PhotoCollage'
import { Eyebrow, PillButton, Icon } from '../components/ui'
import { credenciales, sobreMi } from '../lib/content'

export default function SobreMi() {
  return (
    <main>
      {/* Intro: texto primero, fotos después en móvil */}
      <section className="relative px-4 pb-8 pt-28 sm:pb-12 sm:pt-32">
        <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-blush-100/60 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow tone="sage">
              <Icon.Sparkle className="h-3 w-3" /> Sobre mí
            </Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-espresso-900 sm:text-5xl">
              Hola, soy <em className="font-light text-blush-500">Francis</em>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso-500 sm:text-lg">
              Mamá, psicóloga clínica y psicoterapeuta DBT en formación. Acompaño familias desde
              la experiencia, no desde la perfección.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <PhotoCollage className="mt-8 sm:mt-10" />
          </Reveal>
        </div>
      </section>

      {/* Historia: una columna legible, sin competir con las fotos */}
      <section className="border-t border-espresso-900/[0.06] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl space-y-6">
          <Reveal>
            <blockquote className="font-serif text-xl italic leading-snug text-espresso-900 sm:text-2xl">
              “Criar no es perfecto, es un proceso vivo. Acompañarlo desde la consciencia lo cambia
              todo.”
            </blockquote>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-base leading-[1.75] text-espresso-500">
              Entendí que la forma en la que acompañamos las emociones de un niño puede cambiar su
              vida entera. Con experiencia en evaluación, observación e intervención infantil comparto
              herramientas, reflexión y aprendizaje real.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-[1.75] text-espresso-500">
              Me especializo en terapia DBT, crianza consciente y gestión emocional. Mi enfoque
              combina evidencia científica con la calidez que cada familia necesita.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Formación: lista limpia, sin marcos pesados */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blush-500">
              Formación y experiencia
            </p>
          </Reveal>
          <ul className="mt-6 space-y-5">
            {sobreMi.map((item, i) => (
              <Reveal key={item} delay={i * 50} as="li" className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-500">
                  <Icon.Check className="h-3 w-3" />
                </span>
                <p className="text-sm leading-relaxed text-espresso-600 sm:text-base">{item}</p>
              </Reveal>
            ))}
          </ul>
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
