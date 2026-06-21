import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import PhotoCollage from '../components/PhotoCollage'
import { Bezel, PillButton, Icon } from '../components/ui'
import { credenciales, sobreMi } from '../lib/content'

export default function SobreMi() {
  return (
    <main>
      <PageHero
        eyebrow={<><Icon.Sparkle className="h-3 w-3" /> Sobre mí</>}
        title={
          <>
            Hola, soy <em className="font-light text-blush-500">Francis</em>
          </>
        }
        lead="Mamá, psicóloga clínica y psicoterapeuta DBT en formación. Acompaño familias desde la experiencia, no desde la perfección."
      />

      <section className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <PhotoCollage />
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <blockquote className="relative border-l-[3px] border-blush-400 pl-6 font-serif text-2xl italic leading-snug text-espresso-900 sm:text-3xl">
              Criar no es perfecto, es un proceso vivo. Acompañarlo desde la consciencia lo cambia
              todo.
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-espresso-500">
              Entendí que la forma en la que acompañamos las emociones de un niño puede cambiar su
              vida entera. Con experiencia en evaluación, observación e intervención infantil comparto
              herramientas, reflexión y aprendizaje real.
            </p>
            <p className="mt-4 text-base leading-relaxed text-espresso-500">
              Me especializo en terapia DBT, crianza consciente y gestión emocional. Mi enfoque
              combina evidencia científica con la calidez que cada familia necesita.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {sobreMi.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <Bezel>
                  <div className="flex items-start gap-4 rounded-[calc(2rem-0.375rem)] p-6">
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
      </section>

      <section className="bg-espresso-900 py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4">
          {credenciales.map((c, i) => (
            <Reveal key={c.label} delay={i * 70} className="text-center">
              <span className="font-serif text-3xl font-light text-cream">{c.num}</span>
              <p className="mt-2 text-xs leading-relaxed text-cream/55 sm:text-sm">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:py-28">
        <Reveal>
          <Link to="/reservar">
            <PillButton variant="blush">Trabajar con Francis</PillButton>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
