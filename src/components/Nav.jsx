import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './ui'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Servicios' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/metodo', label: 'Método' },
  { to: '/talleres', label: 'Talleres' },
  { to: '/reservar', label: 'Reservar' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
    setClosing(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = (then) => {
    if (!open) {
      then?.()
      return
    }
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
      then?.()
    }, 280)
  }

  const go = (to) => closeMenu(() => navigate(to))

  const navClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
      isActive
        ? 'bg-espresso-900 text-cream'
        : 'text-espresso-500 hover:bg-blush-50 hover:text-espresso-900'
    }`

  const menuVisible = open && !closing

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 pb-2 sm:pt-5">
        <div className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-full bg-white/80 p-1.5 shadow-[0_18px_50px_-22px_rgba(54,34,39,0.35)] ring-1 ring-espresso-900/[0.07] backdrop-blur-2xl lg:w-auto">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-3 py-2 font-serif text-[14px] font-medium tracking-tight text-espresso-900 sm:px-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blush-100 text-blush-600">
              <Icon.Heart className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">Francis Landeo</span>
            <span className="sm:hidden">Francis</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900 text-cream lg:hidden cursor-pointer"
            aria-label="Menú"
            aria-expanded={open}
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
        className={`fixed inset-0 z-[45] bg-cream/95 backdrop-blur-2xl transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          menuVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-3 px-6">
          {links.map((l, i) => (
            <button
              key={l.to}
              type="button"
              onClick={() => go(l.to)}
              style={{ transitionDelay: menuVisible ? `${80 + i * 45}ms` : '0ms' }}
              className={`font-serif text-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer sm:text-3xl ${
                menuVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${(l.end && pathname === '/') || pathname === l.to ? 'text-blush-500' : 'text-espresso-900'}`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
