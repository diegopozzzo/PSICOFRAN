import { Link } from 'react-router-dom'
import { useDb } from '../lib/store'
import { Icon } from './ui'

export default function Footer() {
  const { settings } = useDb()
  return (
    <footer className="px-4 pb-10 pt-24">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-espresso-900/[0.07]">
        <div className="rounded-[calc(2rem-0.375rem)] bg-espresso-900 px-8 py-14 text-cream sm:px-14">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <p className="font-serif text-3xl leading-snug tracking-tight">
                Criar niños que no tengan que{' '}
                <em className="text-blush-300">recuperarse de su infancia</em> para ser felices.
              </p>
              <p className="mt-4 text-sm text-cream/60">
                Francis Landeo · Psicóloga clínica · Psicoterapeuta DBT en formación
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream/70 transition-colors duration-500 hover:text-cream"
              >
                <Icon.Whatsapp className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`https://www.instagram.com/${settings.instagram}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream/70 transition-colors duration-500 hover:text-cream"
              >
                <Icon.Instagram className="h-4 w-4" /> @{settings.instagram}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 text-cream/70 transition-colors duration-500 hover:text-cream"
              >
                <Icon.Arrow className="h-4 w-4" /> {settings.email}
              </a>
              <a
                href="https://linkedin.com/in/francislandeo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream/70 transition-colors duration-500 hover:text-cream"
              >
                <Icon.Users className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Francis Landeo. Todos los derechos reservados.</span>
            <Link to="/admin" className="transition-colors duration-500 hover:text-cream/70">
              Acceso profesional
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
