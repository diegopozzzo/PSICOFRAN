import { useState } from 'react'
import Reveal from '../components/Reveal'
import { Eyebrow, Bezel, PillButton, Field, TextArea, Modal, Icon } from '../components/ui'
import { useDb, actions, fmtFecha, fmtHora, fmtPrecio } from '../lib/store'

const TABS = [
  { id: 'citas', label: 'Citas' },
  { id: 'eventos', label: 'Talleres y webinars' },
  { id: 'inscripciones', label: 'Inscripciones' },
  { id: 'ajustes', label: 'Disponibilidad' },
]

const ESTADOS = {
  pendiente: 'bg-blush-100 text-blush-600 ring-blush-200',
  confirmada: 'bg-sage-100 text-sage-600 ring-sage-400/30',
  cancelada: 'bg-espresso-100 text-espresso-400 ring-espresso-400/20',
}

const eventoVacio = {
  tipo: 'taller',
  titulo: '',
  desc: '',
  fecha: '',
  duracion: 90,
  modalidad: 'Online · Zoom',
  precio: 0,
  cupos: 20,
  link: '',
  publicado: true,
}

function PinGate({ pin, onOk }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (value === pin) onOk()
    else {
      setError(true)
      setValue('')
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4">
      <Reveal className="w-full max-w-sm">
        <Bezel>
          <form onSubmit={submit} className="rounded-[calc(2rem-0.375rem)] p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush-100 text-blush-500">
              <Icon.Heart className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-serif text-2xl text-espresso-900">Acceso profesional</h1>
            <p className="mt-2 text-sm text-espresso-500">
              Espacio de gestión para Francis. Ingresa tu PIN.
            </p>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError(false)
              }}
              className={`mt-6 w-full rounded-2xl bg-cream px-4 py-3 text-center text-lg tracking-[0.5em] ring-1 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus:ring-2 focus:ring-blush-300 ${
                error ? 'ring-blush-500' : 'ring-espresso-900/10'
              }`}
              placeholder="••••"
            />
            {error && <p className="mt-2 text-xs text-blush-600">PIN incorrecto, intenta de nuevo.</p>}
            <div className="mt-6 flex justify-center">
              <PillButton type="submit">Entrar</PillButton>
            </div>
          </form>
        </Bezel>
      </Reveal>
    </main>
  )
}

function Citas() {
  const { bookings } = useDb()
  const orden = [...bookings].sort((a, b) => (a.fecha + a.hora < b.fecha + b.hora ? -1 : 1))

  if (orden.length === 0)
    return (
      <p className="py-16 text-center font-serif text-xl text-espresso-400">
        Aún no hay citas reservadas.
      </p>
    )

  return (
    <div className="grid gap-4">
      {orden.map((b) => (
        <Bezel key={b.id}>
          <div className="flex flex-col gap-4 rounded-[calc(2rem-0.375rem)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="font-serif text-lg text-espresso-900">{b.nombre}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1 ${ESTADOS[b.estado]}`}
                >
                  {b.estado}
                </span>
              </div>
              <p className="mt-1 text-sm text-espresso-500">{b.servicio}</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-espresso-400">
                <span className="inline-flex items-center gap-1 capitalize">
                  <Icon.Calendar className="h-3.5 w-3.5" />
                  {new Date(b.fecha + 'T12:00').toLocaleDateString('es-PE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon.Clock className="h-3.5 w-3.5" /> {b.hora}
                </span>
                <span>{b.email}</span>
                <span>{b.telefono}</span>
              </p>
              {b.motivo && (
                <p className="mt-2 rounded-xl bg-cream px-3 py-2 text-xs italic text-espresso-500 ring-1 ring-espresso-900/5">
                  “{b.motivo}”
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {b.estado !== 'confirmada' && (
                <button
                  onClick={() => actions.setBookingStatus(b.id, 'confirmada')}
                  className="rounded-full bg-sage-100 px-4 py-2 text-xs font-semibold text-sage-600 ring-1 ring-sage-400/30 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-95 active:scale-95 cursor-pointer"
                >
                  Confirmar
                </button>
              )}
              {b.estado !== 'cancelada' && (
                <button
                  onClick={() => actions.setBookingStatus(b.id, 'cancelada')}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-espresso-500 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-espresso-900 active:scale-95 cursor-pointer"
                >
                  Cancelar
                </button>
              )}
              <a
                href={`https://wa.me/${b.telefono.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-espresso-500 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-espresso-900"
                title="Escribir por WhatsApp"
              >
                <Icon.Whatsapp className="h-4 w-4" />
              </a>
              <button
                onClick={() => actions.deleteBooking(b.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-espresso-300 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-blush-600 active:scale-95 cursor-pointer"
                title="Eliminar"
              >
                <Icon.X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Bezel>
      ))}
    </div>
  )
}

function Eventos() {
  const { events, registrations } = useDb()
  const [editing, setEditing] = useState(null)
  const orden = [...events].sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
  const inscritos = (id) => registrations.filter((r) => r.eventId === id).length

  const guardar = (e) => {
    e.preventDefault()
    actions.saveEvent({
      ...editing,
      duracion: Number(editing.duracion),
      precio: Number(editing.precio),
      cupos: Number(editing.cupos),
    })
    setEditing(null)
  }

  const set = (k) => (e) =>
    setEditing((v) => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <>
      <div className="mb-6 flex justify-end">
        <PillButton variant="blush" onClick={() => setEditing({ ...eventoVacio })}>
          Nuevo evento
        </PillButton>
      </div>
      <div className="grid gap-4">
        {orden.map((ev) => (
          <Bezel key={ev.id}>
            <div className="flex flex-col gap-4 rounded-[calc(2rem-0.375rem)] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Eyebrow tone={ev.tipo === 'webinar' ? 'sage' : 'blush'}>{ev.tipo}</Eyebrow>
                  {!ev.publicado && <Eyebrow tone="espresso">Borrador</Eyebrow>}
                </div>
                <p className="mt-2.5 font-serif text-lg text-espresso-900">{ev.titulo}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-espresso-400">
                  <span className="capitalize">
                    {fmtFecha(ev.fecha)} · {fmtHora(ev.fecha)}
                  </span>
                  <span>{ev.modalidad}</span>
                  <span>{fmtPrecio(ev.precio)}</span>
                  <span className="font-semibold text-espresso-700">
                    {inscritos(ev.id)} / {ev.cupos} inscritos
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setEditing({ ...ev })}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-espresso-700 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-espresso-900/25 active:scale-95 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar "${ev.titulo}" y sus inscripciones?`)) actions.deleteEvent(ev.id)
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-espresso-300 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-blush-600 active:scale-95 cursor-pointer"
                  title="Eliminar"
                >
                  <Icon.X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Bezel>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} wide>
        {editing && (
          <form onSubmit={guardar}>
            <h2 className="font-serif text-2xl text-espresso-900">
              {editing.id ? 'Editar evento' : 'Nuevo evento'}
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="flex gap-2">
                {['taller', 'webinar'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEditing((v) => ({ ...v, tipo: t }))}
                    className={`rounded-full px-5 py-2 text-sm capitalize transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                      editing.tipo === t
                        ? 'bg-espresso-900 text-cream'
                        : 'bg-white text-espresso-500 ring-1 ring-espresso-900/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Field label="Título" required value={editing.titulo} onChange={set('titulo')} />
              <TextArea label="Descripción" required value={editing.desc} onChange={set('desc')} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  label="Fecha y hora"
                  type="datetime-local"
                  required
                  value={editing.fecha}
                  onChange={set('fecha')}
                />
                <Field
                  label="Duración (min)"
                  type="number"
                  min="15"
                  required
                  value={editing.duracion}
                  onChange={set('duracion')}
                />
                <Field label="Modalidad" required value={editing.modalidad} onChange={set('modalidad')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  label="Precio (S/, 0 = gratis)"
                  type="number"
                  min="0"
                  required
                  value={editing.precio}
                  onChange={set('precio')}
                />
                <Field
                  label="Cupos"
                  type="number"
                  min="1"
                  required
                  value={editing.cupos}
                  onChange={set('cupos')}
                />
                <Field
                  label="Link (Zoom/Meet)"
                  value={editing.link}
                  onChange={set('link')}
                  placeholder="https://…"
                />
              </div>
              <label className="flex w-max cursor-pointer items-center gap-3 text-sm text-espresso-700">
                <input
                  type="checkbox"
                  checked={editing.publicado}
                  onChange={set('publicado')}
                  className="h-4 w-4 accent-blush-500"
                />
                Publicado (visible en la web)
              </label>
            </div>
            <div className="mt-7 flex justify-end">
              <PillButton type="submit" variant="blush">
                Guardar
              </PillButton>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}

function Inscripciones() {
  const { events, registrations } = useDb()
  if (registrations.length === 0)
    return (
      <p className="py-16 text-center font-serif text-xl text-espresso-400">
        Aún no hay inscripciones.
      </p>
    )

  const grupos = events
    .map((ev) => ({ ev, regs: registrations.filter((r) => r.eventId === ev.id) }))
    .filter((g) => g.regs.length > 0)

  return (
    <div className="grid gap-6">
      {grupos.map(({ ev, regs }) => (
        <Bezel key={ev.id}>
          <div className="rounded-[calc(2rem-0.375rem)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Eyebrow tone={ev.tipo === 'webinar' ? 'sage' : 'blush'}>{ev.tipo}</Eyebrow>
                <p className="mt-2 font-serif text-lg text-espresso-900">{ev.titulo}</p>
              </div>
              <span className="rounded-full bg-cream px-4 py-1.5 text-xs font-semibold text-espresso-700 ring-1 ring-espresso-900/10">
                {regs.length} / {ev.cupos} cupos
              </span>
            </div>
            <div className="mt-5 grid gap-2">
              {regs.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-cream px-4 py-3 ring-1 ring-espresso-900/5"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-espresso-900">{r.nombre}</span>
                    <span className="text-xs text-espresso-400">{r.email}</span>
                    <span className="text-xs text-espresso-400">{r.telefono}</span>
                  </div>
                  <button
                    onClick={() => actions.deleteRegistration(r.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-espresso-300 ring-1 ring-espresso-900/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-blush-600 active:scale-95 cursor-pointer"
                    title="Eliminar inscripción"
                  >
                    <Icon.X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Bezel>
      ))}
    </div>
  )
}

function Ajustes() {
  const { settings } = useDb()
  const [draft, setDraft] = useState({ ...settings, slots: settings.slots.join(', ') })
  const [saved, setSaved] = useState(false)

  const DIAS = [
    [1, 'Lun'], [2, 'Mar'], [3, 'Mié'], [4, 'Jue'], [5, 'Vie'], [6, 'Sáb'], [0, 'Dom'],
  ]

  const toggleDay = (d) =>
    setDraft((v) => ({
      ...v,
      workDays: v.workDays.includes(d) ? v.workDays.filter((x) => x !== d) : [...v.workDays, d],
    }))

  const guardar = (e) => {
    e.preventDefault()
    actions.saveSettings({
      ...draft,
      slots: draft.slots
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Bezel>
      <form onSubmit={guardar} className="rounded-[calc(2rem-0.375rem)] p-6 sm:p-8">
        <h3 className="font-serif text-xl text-espresso-900">Días de atención</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {DIAS.map(([d, label]) => (
            <button
              key={d}
              type="button"
              onClick={() => toggleDay(d)}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                draft.workDays.includes(d)
                  ? 'bg-espresso-900 text-cream'
                  : 'bg-white text-espresso-400 ring-1 ring-espresso-900/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          <Field
            label="Horarios disponibles (separados por coma)"
            value={draft.slots}
            onChange={(e) => setDraft({ ...draft, slots: e.target.value })}
            placeholder="09:00, 10:00, 16:00…"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="WhatsApp (con código de país)"
              value={draft.whatsapp}
              onChange={(e) => setDraft({ ...draft, whatsapp: e.target.value })}
              placeholder="51999999999"
            />
            <Field
              label="Correo de contacto"
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Usuario de Instagram"
              value={draft.instagram}
              onChange={(e) => setDraft({ ...draft, instagram: e.target.value })}
            />
            <Field
              label="PIN de acceso"
              value={draft.pin}
              onChange={(e) => setDraft({ ...draft, pin: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          {saved && <span className="text-sm text-sage-600">Cambios guardados ✓</span>}
          <PillButton type="submit">Guardar cambios</PillButton>
        </div>
      </form>
    </Bezel>
  )
}

export default function Admin() {
  const { settings, bookings, registrations } = useDb()
  const [auth, setAuth] = useState(() => sessionStorage.getItem('landeo_auth') === '1')
  const [tab, setTab] = useState('citas')

  if (!auth)
    return (
      <PinGate
        pin={settings.pin}
        onOk={() => {
          sessionStorage.setItem('landeo_auth', '1')
          setAuth(true)
        }}
      />
    )

  const pendientes = bookings.filter((b) => b.estado === 'pendiente').length

  return (
    <main className="px-4 pb-12 pt-36 sm:pt-44">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>
                <Icon.Sparkle className="h-3 w-3" /> Panel de Francis
              </Eyebrow>
              <h1 className="mt-5 font-serif text-4xl tracking-tight text-espresso-900 sm:text-5xl">
                Tu espacio de trabajo
              </h1>
              <p className="mt-3 text-sm text-espresso-500">
                {pendientes > 0
                  ? `Tienes ${pendientes} cita${pendientes > 1 ? 's' : ''} por confirmar · ${registrations.length} inscripciones en total`
                  : `Todo al día · ${registrations.length} inscripciones en total`}
              </p>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('landeo_auth')
                setAuth(false)
              }}
              className="w-max text-sm text-espresso-400 transition-colors duration-500 hover:text-espresso-900 cursor-pointer"
            >
              Cerrar sesión →
            </button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex gap-1 overflow-x-auto rounded-full bg-white p-1.5 ring-1 ring-espresso-900/[0.07] sm:w-max">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                  tab === t.id ? 'bg-espresso-900 text-cream' : 'text-espresso-500 hover:text-espresso-900'
                }`}
              >
                {t.label}
                {t.id === 'citas' && pendientes > 0 && (
                  <span className="ml-2 rounded-full bg-blush-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {pendientes}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180} className="mt-8">
          {tab === 'citas' && <Citas />}
          {tab === 'eventos' && <Eventos />}
          {tab === 'inscripciones' && <Inscripciones />}
          {tab === 'ajustes' && <Ajustes />}
        </Reveal>
      </div>
    </main>
  )
}
