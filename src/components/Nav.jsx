import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Icon } from './ui'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/talleres', label: 'Talleres y webinars' },
  { to: '/reservar', label: 'Reservar cita' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const go = (to) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <>
      {/* Isla flotante */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <div className="flex w-max items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-[0_18px_50px_-22px_rgba(70,58,47,0.35)] ring-1 ring-espresso-900/[0.07] backdrop-blur-2xl">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-4 py-2 font-serif text-[15px] font-medium tracking-tight text-espresso-900"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blush-100 text-blush-600">
              <Icon.Heart className="h-3.5 w-3.5" />
            </span>
            Francis Landeo
          </Link>

          <nav className="hidden items-center md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isActive
                      ? 'bg-espresso-900 text-cream'
                      : 'text-espresso-500 hover:text-espresso-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Hamburguesa que muta a X */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900 text-cream md:hidden cursor-pointer"
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

      {/* Overlay móvil con revelado escalonado */}
      <div
        className={`fixed inset-0 z-[45] flex flex-col items-center justify-center gap-2 bg-cream/85 backdrop-blur-3xl transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((l, i) => (
          <button
            key={l.to}
            onClick={() => go(l.to)}
            style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
            className={`font-serif text-3xl text-espresso-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
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
