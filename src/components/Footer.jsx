import { Link } from 'react-router-dom'
import { useDb } from '../lib/store'
import { Icon } from './ui'

const cols = [
  {
    title: 'Explorar',
    links: [
      { to: '/servicios', label: 'Servicios' },
      { to: '/sobre-mi', label: 'Sobre mí' },
      { to: '/metodo', label: 'Mi método' },
      { to: '/faq', label: 'Preguntas frecuentes' },
    ],
  },
  {
    title: 'Agenda',
    links: [
      { to: '/reservar', label: 'Reservar cita' },
      { to: '/talleres', label: 'Talleres y webinars' },
      { to: '/links', label: 'Enlaces (bio)' },
    ],
  },
]

export default function Footer() {
  const { settings } = useDb()
  return (
    <footer className="px-4 pb-10 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-espresso-900/[0.07]">
        <div className="rounded-[calc(2rem-0.375rem)] bg-espresso-900 px-8 py-14 text-cream sm:px-14">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
                Criar niños que no tengan que{' '}
                <em className="text-blush-300">recuperarse de su infancia</em> para ser felices.
              </p>
              <p className="mt-4 text-sm text-cream/60">
                Francis Landeo · Psicóloga clínica · DBT en formación
              </p>
            </div>
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/35">
                  {col.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-cream/60 transition-colors duration-500 hover:text-cream"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm">
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream"
            >
              <Icon.Whatsapp className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`https://www.instagram.com/${settings.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream"
            >
              <Icon.Instagram className="h-4 w-4" /> @{settings.instagram}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream"
            >
              {settings.email}
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-xs text-cream/40 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Francis Landeo</span>
            <Link to="/admin" className="hover:text-cream/70">
              Acceso profesional
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
