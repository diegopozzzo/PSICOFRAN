import { useState } from 'react'
import Reveal from './Reveal'
import { Eyebrow, Icon } from './ui'

export const faqItems = [
  {
    q: '¿Cómo es la primera sesión?',
    a: 'Es una consulta de encuadre gratuita: conversamos sobre tu situación, resolvemos dudas y vemos juntas si el acompañamiento es el adecuado para ti. Sin presión ni compromiso.',
  },
  {
    q: '¿Las sesiones son online o presenciales?',
    a: 'Ofrezco ambas modalidades en Lima. Puedes elegir la que mejor se adapte a tu rutina. Los horarios disponibles para consultas son de 12:00 a 12:45 pm y de 3:00 a 6:00 pm.',
  },
  {
    q: '¿Qué es la terapia DBT y para qué sirve?',
    a: 'La Terapia Dialéctico Conductual enseña habilidades de regulación emocional, tolerancia al malestar, efectividad interpersonal y mindfulness. Es especialmente útil para acompañar emociones intensas en adultos, niños y familias.',
  },
  {
    q: '¿Trabajas solo con madres o también con padres?',
    a: 'Acompaño a madres, padres y cuidadores por igual. También trabajo directamente con niños y adolescentes en evaluación, intervención y acompañamiento psicoeducativo.',
  },
  {
    q: '¿Cómo reservo una cita o me inscribo a un taller?',
    a: 'Puedes reservar desde la web en "Reservar cita", inscribirte en talleres y webinars desde la sección correspondiente, o escribirme por WhatsApp. Respondo en un máximo de 24 horas hábiles.',
  },
]

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-espresso-900/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span
          className={`text-sm font-medium transition-colors duration-500 sm:text-base ${open ? 'text-espresso-900' : 'text-espresso-700'}`}
        >
          {q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open
              ? 'rotate-45 bg-espresso-900 text-cream ring-espresso-900'
              : 'bg-white text-blush-500 ring-espresso-900/10'
          }`}
        >
          <span className="text-lg leading-none">+</span>
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="overflow-hidden pr-12 text-sm leading-relaxed text-espresso-500">{a}</p>
      </div>
    </div>
  )
}

/** embedded=true omite el encabezado (para la página /faq) */
export default function FAQ({ embedded = false }) {
  const [open, setOpen] = useState(0)

  return (
    <section className={`px-4 ${embedded ? 'pb-8 pt-0' : 'py-24 sm:py-32'}`}>
      <div className="mx-auto max-w-3xl">
        {!embedded && (
          <Reveal className="text-center">
            <Eyebrow tone="sage">
              <Icon.Sparkle className="h-3 w-3" /> Preguntas frecuentes
            </Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-5xl">
              Todo lo que necesitas <em className="font-light text-blush-500">saber</em>
            </h2>
          </Reveal>
        )}
        <Reveal delay={embedded ? 0 : 120} className={embedded ? '' : 'mt-12'}>
          {faqItems.map((item, i) => (
            <Item
              key={item.q}
              {...item}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
