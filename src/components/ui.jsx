import { useEffect } from 'react'

/* Iconos de trazo ultraligero, dibujados a mano (1.25px) */
export const Icon = {
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.4 3.6 4.5 6.7 4.5c2 0 3.6 1.1 4.3 2.7h2c.7-1.6 2.3-2.7 4.3-2.7 3.1 0 5.3 2.9 4 6.3C19.5 15.4 12 20 12 20Z" strokeLinejoin="round" />
    </svg>
  ),
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" strokeLinejoin="round" />
      <path d="M5 19c3-5 6-8 10-10" strokeLinecap="round" />
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <circle cx="9" cy="8.5" r="3.25" />
      <path d="M3.5 19.5c.7-3.2 2.9-5 5.5-5s4.8 1.8 5.5 5M15.5 5.8a3.25 3.25 0 1 1 0 5.4M16.5 14.7c2.1.4 3.6 2 4 4.8" strokeLinecap="round" />
    </svg>
  ),
  Video: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <rect x="3" y="6.5" width="13" height="11" rx="3" />
      <path d="m16 11 5-3v8l-5-3" strokeLinejoin="round" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M12 3c.6 4.8 1.8 6 6.5 6.5C13.8 10 12.6 11.2 12 16c-.6-4.8-1.8-6-6.5-6.5C10.2 9 11.4 7.8 12 3ZM19 15l.4 2.6L22 18l-2.6.4L19 21l-.4-2.6L16 18l2.6-.4L19 15Z" strokeLinejoin="round" />
    </svg>
  ),
  Whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" strokeLinejoin="round" />
      <path d="M9 8.8c-.3 2.6 3.6 6.5 6.2 6.2l.6-1.5-2-1.2-.9.7c-.9-.4-1.5-1-1.9-1.9l.7-.9-1.2-2L9 8.8Z" strokeLinejoin="round" />
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  ),
}

/* Eyebrow: micro-etiqueta sobre títulos */
export function Eyebrow({ children, tone = 'blush' }) {
  const tones = {
    blush: 'bg-blush-100 text-blush-600 ring-blush-200',
    sage: 'bg-sage-100 text-sage-600 ring-sage-400/30',
    espresso: 'bg-espresso-100 text-espresso-700 ring-espresso-400/20',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

/* Doble bisel: carcasa exterior + núcleo interior con curvas concéntricas */
export function Bezel({ children, className = '', inner = '', tone = 'light' }) {
  const shell =
    tone === 'dark'
      ? 'bg-espresso-900/5 ring-espresso-900/10'
      : 'bg-espresso-900/[0.04] ring-espresso-900/[0.07]'
  return (
    <div className={`rounded-[2rem] p-1.5 ring-1 ${shell} ${className}`}>
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_24px_60px_-30px_rgba(70,58,47,0.25)] ${inner}`}
      >
        {children}
      </div>
    </div>
  )
}

/* Botón píldora con icono anidado en su propio círculo */
export function PillButton({ children, icon = true, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-espresso-900 text-cream hover:bg-espresso-700',
    blush: 'bg-blush-500 text-white hover:bg-blush-600',
    ghost: 'bg-white text-espresso-900 ring-1 ring-espresso-900/10 hover:ring-espresso-900/25',
  }
  return (
    <button
      className={`group inline-flex items-center gap-3 rounded-full pl-6 ${icon ? 'pr-2' : 'pr-6'} py-2 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="py-1">{children}</span>
      {icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 [.bg-white_&]:bg-espresso-900/5 [.bg-white_&]:ring-espresso-900/10">
          <Icon.Arrow className="h-4 w-4" />
        </span>
      )}
    </button>
  )
}

export function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso-500">
        {label}
      </span>
      <input
        className="w-full rounded-2xl bg-cream px-4 py-3 text-sm ring-1 ring-espresso-900/10 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-espresso-400/60 focus:ring-2 focus:ring-blush-300"
        {...props}
      />
    </label>
  )
}

export function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso-500">
        {label}
      </span>
      <textarea
        rows={3}
        className="w-full resize-none rounded-2xl bg-cream px-4 py-3 text-sm ring-1 ring-espresso-900/10 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-espresso-400/60 focus:ring-2 focus:ring-blush-300"
        {...props}
      />
    </label>
  )
}

export function Modal({ open, onClose, children, wide = false }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-espresso-900/40 backdrop-blur-xl"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[88dvh] overflow-y-auto rounded-[2rem] bg-espresso-900/[0.04] p-1.5 ring-1 ring-white/40`}
      >
        <div className="rounded-[calc(2rem-0.375rem)] bg-cream p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-espresso-500 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-espresso-900 active:scale-95 cursor-pointer"
            aria-label="Cerrar"
          >
            <Icon.X className="h-4 w-4" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
