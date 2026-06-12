import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './ui'

const routes = [
  { to: '/talleres', label: 'Talleres' },
  { to: '/reservar', label: 'Reservar' },
]

const sections = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'metodo', label: 'Método' },
  { id: 'faq', label: 'FAQ' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const go = (to) => {
    setOpen(false)
    navigate(to)
  }

  const goSection = (id) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 pb-2 sm:pt-5">
        <div className="flex w-full max-w-4xl items-center justify-between gap-1 rounded-full bg-white/75 p-1.5 shadow-[0_18px_50px_-22px_rgba(70,58,47,0.35)] ring-1 ring-espresso-900/[0.07] backdrop-blur-2xl sm:w-max sm:justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-3 py-2 font-serif text-[14px] font-medium tracking-tight text-espresso-900 sm:px-4 sm:text-[15px]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blush-100 text-blush-600">
              <Icon.Heart className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">Francis Landeo</span>
            <span className="sm:hidden">Francis</span>
          </Link>

          <nav className="hidden items-center lg:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isActive ? 'bg-espresso-900 text-cream' : 'text-espresso-500 hover:text-espresso-900'
                }`
              }
            >
              Inicio
            </NavLink>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goSection(s.id)}
                className="rounded-full px-3 py-2 text-sm text-espresso-500 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-espresso-900 cursor-pointer"
              >
                {s.label}
              </button>
            ))}
            {routes.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isActive ? 'bg-espresso-900 text-cream' : 'text-espresso-500 hover:text-espresso-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900 text-cream lg:hidden cursor-pointer"
            aria-label="Menú"
          >
            <span
              className={`absolute h-px w-4 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[45] flex flex-col items-center justify-center gap-1 overflow-y-auto bg-cream/90 px-6 py-24 backdrop-blur-3xl transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => go('/')}
          style={{ transitionDelay: open ? '80ms' : '0ms' }}
          className={`font-serif text-2xl text-espresso-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer sm:text-3xl ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          Inicio
        </button>
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goSection(s.id)}
            style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
            className={`font-serif text-2xl text-espresso-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer sm:text-3xl ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {s.label}
          </button>
        ))}
        {routes.map((l, i) => (
          <button
            key={l.to}
            type="button"
            onClick={() => go(l.to)}
            style={{ transitionDelay: open ? `${320 + i * 50}ms` : '0ms' }}
            className={`font-serif text-2xl text-espresso-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer sm:text-3xl ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  )
}
