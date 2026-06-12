import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import { Eyebrow, PillButton, Icon } from '../components/ui'
import { metodo } from '../lib/content'

export default function Metodo() {
  return (
    <main>
      <PageHero
        eyebrow={<><Icon.Leaf className="h-3 w-3" /> Mi enfoque</>}
        tone="sage"
        title={
          <>
            Así es como <em className="font-light text-blush-500">acompaño el cambio</em>
          </>
        }
        lead="No hay fórmula mágica, pero sí un proceso que respeta tu tiempo, tu historia y tu ritmo."
      />

      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metodo.map((m, i) => (
            <Reveal key={m.n} delay={i * 90}>
              <div className="group h-full rounded-[2rem] border border-espresso-900/8 bg-white p-7 shadow-[0_8px_40px_-20px_rgba(54,34,39,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-blush-200 hover:shadow-[0_20px_50px_-20px_rgba(204,90,138,0.2)]">
                <span className="font-serif text-5xl font-light text-blush-200">{m.n}</span>
                <m.icon className="mt-4 h-5 w-5 text-blush-500" />
                <h2 className="mt-4 font-serif text-xl text-espresso-900">{m.titulo}</h2>
                <p className="mt-3 text-sm leading-relaxed text-espresso-500">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-100 via-cream to-blush-50 px-8 py-16 text-center sm:px-14 sm:py-20">
              <Eyebrow>Mi motorcito</Eyebrow>
              <p className="mx-auto mt-6 max-w-2xl font-serif text-2xl leading-snug text-espresso-900 sm:text-4xl">
                Creo en la crianza consciente, en los límites con respeto y en{' '}
                <em className="text-blush-500">
                  criar niños que no tengan que recuperarse de su infancia
                </em>{' '}
                para poder ser felices.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link to="/reservar">
                  <PillButton variant="primary">Reservar cita</PillButton>
                </Link>
                <Link to="/faq">
                  <PillButton variant="ghost">Ver preguntas frecuentes</PillButton>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
