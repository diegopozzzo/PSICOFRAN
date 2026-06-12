import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'
import { PillButton, Icon } from '../components/ui'

export default function FAQPage() {
  return (
    <main>
      <PageHero
        eyebrow={<><Icon.Sparkle className="h-3 w-3" /> Preguntas frecuentes</>}
        tone="sage"
        title={
          <>
            Todo lo que necesitas <em className="font-light text-blush-500">saber</em>
          </>
        }
        lead="Respuestas claras antes de dar el primer paso."
      />
      <FAQ embedded />
      <section className="px-4 pb-24 text-center sm:pb-32">
        <Reveal>
          <p className="mb-6 text-sm text-espresso-500">¿Te quedó alguna duda?</p>
          <Link to="/reservar">
            <PillButton variant="blush">Escríbeme y agendamos</PillButton>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
