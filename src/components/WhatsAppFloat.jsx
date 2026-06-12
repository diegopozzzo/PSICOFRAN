import { useDb } from '../lib/store'
import { Icon } from './ui'

export default function WhatsAppFloat() {
  const { settings } = useDb()
  const msg = encodeURIComponent('Hola Francis, quisiera reservar una consulta.')

  return (
    <a
      href={`https://wa.me/${settings.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="wa-float fixed bottom-6 right-6 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:-translate-y-0.5 sm:bottom-8 sm:right-8 sm:h-[3.75rem] sm:w-[3.75rem]"
    >
      <Icon.Whatsapp className="relative z-10 h-7 w-7" />
    </a>
  )
}
