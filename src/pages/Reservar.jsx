import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import { Eyebrow, Bezel, PillButton, Field, TextArea, Icon } from '../components/ui'
import { useDb, actions, takenSlots } from '../lib/store'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function Calendar({ workDays, selected, onSelect }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7 // lunes primero
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
    ]
  }, [view])

  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => canGoBack && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={!canGoBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-espresso-900/25 active:scale-95 disabled:opacity-30 cursor-pointer"
          aria-label="Mes anterior"
        >
          <Icon.Chevron className="h-4 w-4 rotate-180" />
        </button>
        <p className="font-serif text-lg text-espresso-900">
          {MESES[view.getMonth()]} {view.getFullYear()}
        </p>
        <button
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-espresso-900/25 active:scale-95 cursor-pointer"
          aria-label="Mes siguiente"
        >
          <Icon.Chevron className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {DIAS.map((d) => (
          <span key={d} className="py-1 text-[10px] font-semibold uppercase tracking-widest text-espresso-400">
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`x${i}`} />
          const disabled = d < today || !workDays.includes(d.getDay())
          const isSel = selected === toKey(d)
          return (
            <button
              key={toKey(d)}
              disabled={disabled}
              onClick={() => onSelect(toKey(d))}
              className={`aspect-square rounded-full text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                isSel
                  ? 'bg-espresso-900 font-semibold text-cream'
                  : disabled
                    ? 'text-espresso-900/20'
                    : 'text-espresso-700 hover:bg-blush-100'
              }`}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const StepDot = ({ n, label, active, done }) => (
  <div className="flex items-center gap-2.5">
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        done
          ? 'bg-sage-100 text-sage-600'
          : active
            ? 'bg-espresso-900 text-cream'
            : 'bg-white text-espresso-400 ring-1 ring-espresso-900/10'
      }`}
    >
      {done ? <Icon.Check className="h-3.5 w-3.5" /> : n}
    </span>
    <span className={`hidden text-xs font-medium sm:block ${active ? 'text-espresso-900' : 'text-espresso-400'}`}>
      {label}
    </span>
  </div>
)

export default function Reservar() {
  const { services, settings } = useDb()
  const [step, setStep] = useState(0)
  const [service, setService] = useState(null)
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', motivo: '' })
  const [done, setDone] = useState(null)

  const ocupadas = fecha ? takenSlots(fecha) : []

  const confirmar = (e) => {
    e.preventDefault()
    const b = actions.addBooking({
      serviceId: service.id,
      servicio: service.nombre,
      fecha,
      hora,
      ...form,
    })
    setDone(b)
    setStep(3)
  }

  const fechaLegible = fecha
    ? new Date(fecha + 'T12:00').toLocaleDateString('es-PE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : ''

  return (
    <main className="px-4 pb-12 pt-36 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow>
            <Icon.Calendar className="h-3 w-3" /> Reserva tu cita
          </Eyebrow>
          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-6xl">
            Un espacio <em className="font-light text-blush-500">para ti</em>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-espresso-500">
            Elige el tipo de sesión, la fecha y la hora que mejor te acomoden. Te confirmaré por
            WhatsApp o correo.
          </p>
        </Reveal>

        {/* Pasos */}
        <Reveal delay={120}>
          <div className="mt-12 flex items-center justify-center gap-3 sm:gap-6">
            <StepDot n="1" label="Sesión" active={step === 0} done={step > 0} />
            <span className="h-px w-6 bg-espresso-900/15 sm:w-10" />
            <StepDot n="2" label="Fecha y hora" active={step === 1} done={step > 1} />
            <span className="h-px w-6 bg-espresso-900/15 sm:w-10" />
            <StepDot n="3" label="Tus datos" active={step === 2} done={step > 2} />
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <Bezel>
            <div className="rounded-[calc(2rem-0.375rem)] p-6 sm:p-10">
              {/* PASO 1: servicio */}
              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setService(s)
                        setStep(1)
                      }}
                      className={`group rounded-3xl p-6 text-left ring-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer active:scale-[0.99] ${
                        service?.id === s.id
                          ? 'bg-blush-50 ring-blush-300'
                          : 'bg-cream ring-espresso-900/10 hover:ring-blush-300'
                      }`}
                    >
                      <h3 className="font-serif text-lg leading-snug text-espresso-900">
                          {s.nombre}
                        </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-espresso-500">{s.desc}</p>
                      <p className="mt-4 flex items-center gap-3 text-xs text-espresso-400">
                        <span className="inline-flex items-center gap-1">
                          <Icon.Clock className="h-3.5 w-3.5" /> {s.duracion} min
                        </span>
                        <span>{s.modalidad}</span>
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* PASO 2: fecha + hora */}
              {step === 1 && (
                <div className="grid gap-10 md:grid-cols-2">
                  <Calendar
                    workDays={settings.workDays}
                    selected={fecha}
                    onSelect={(f) => {
                      setFecha(f)
                      setHora(null)
                    }}
                  />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso-500">
                      {fecha ? `Horarios · ${fechaLegible}` : 'Elige primero una fecha'}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                      {fecha &&
                        settings.slots.map((s) => {
                          const taken = ocupadas.includes(s)
                          return (
                            <button
                              key={s}
                              disabled={taken}
                              onClick={() => setHora(s)}
                              className={`rounded-full py-2.5 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                                hora === s
                                  ? 'bg-espresso-900 font-semibold text-cream'
                                  : taken
                                    ? 'bg-cream text-espresso-900/20 line-through ring-1 ring-espresso-900/5'
                                    : 'bg-white text-espresso-700 ring-1 ring-espresso-900/10 hover:ring-blush-300'
                              }`}
                            >
                              {s}
                            </button>
                          )
                        })}
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={() => setStep(0)}
                        className="text-sm text-espresso-400 transition-colors duration-500 hover:text-espresso-900 cursor-pointer"
                      >
                        ← Volver
                      </button>
                      <PillButton disabled={!fecha || !hora} onClick={() => setStep(2)}>
                        Continuar
                      </PillButton>
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3: datos */}
              {step === 2 && (
                <form onSubmit={confirmar} className="mx-auto max-w-lg">
                  <div className="mb-8 rounded-3xl bg-blush-50 p-5 ring-1 ring-blush-200">
                    <p className="font-serif text-lg text-espresso-900">{service.nombre}</p>
                    <p className="mt-1 text-sm capitalize text-espresso-500">
                      {fechaLegible} · {hora}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <Field
                      label="Nombre completo"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="María Pérez"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Correo"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="maria@correo.com"
                      />
                      <Field
                        label="WhatsApp"
                        required
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="+51 999 999 999"
                      />
                    </div>
                    <TextArea
                      label="Cuéntame brevemente el motivo (opcional)"
                      value={form.motivo}
                      onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                      placeholder="Ej. berrinches muy intensos, dificultades con el sueño…"
                    />
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-espresso-400 transition-colors duration-500 hover:text-espresso-900 cursor-pointer"
                    >
                      ← Volver
                    </button>
                    <PillButton type="submit" variant="blush">
                      Confirmar reserva
                    </PillButton>
                  </div>
                </form>
              )}

              {/* PASO 4: confirmación */}
              {step === 3 && done && (
                <div className="mx-auto max-w-md py-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                    <Icon.Check className="h-7 w-7" />
                  </span>
                  <h2 className="mt-6 font-serif text-3xl text-espresso-900">¡Reserva recibida!</h2>
                  <p className="mt-4 text-sm leading-relaxed text-espresso-500">
                    Gracias, <strong className="text-espresso-900">{done.nombre}</strong>. Tu
                    solicitud para <strong className="text-espresso-900">{done.servicio}</strong> el{' '}
                    <span className="capitalize">{fechaLegible}</span> a las {done.hora} fue
                    registrada. Francis la confirmará por WhatsApp o correo muy pronto.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <a
                      href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                        `Hola Francis, soy ${done.nombre}. Acabo de reservar "${done.servicio}" para el ${fechaLegible} a las ${done.hora}.`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PillButton variant="primary">Confirmar por WhatsApp</PillButton>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Bezel>
        </Reveal>
      </div>
    </main>
  )
}
