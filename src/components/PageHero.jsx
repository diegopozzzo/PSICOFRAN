import Reveal from './Reveal'
import { Eyebrow } from './ui'

export default function PageHero({ eyebrow, title, lead, tone = 'blush', compact = false, children }) {
  return (
    <section
      className={`relative overflow-hidden px-4 pt-28 sm:pt-36 ${
        compact ? 'pb-6 sm:pb-8' : 'pb-16 sm:pb-20 sm:pt-40'
      }`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blush-200/50 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sage-100 blur-[80px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className={`mt-6 font-serif leading-[1.08] tracking-tight text-espresso-900 ${
            compact ? 'text-3xl sm:text-5xl' : 'text-4xl sm:text-6xl'
          }`}>
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-espresso-500 sm:text-lg">
              {lead}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
