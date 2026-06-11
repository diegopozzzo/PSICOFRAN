import { useState } from 'react'
import Reveal from '../components/Reveal'
import { Eyebrow, Bezel, PillButton, Field, Modal, Icon } from '../components/ui'
import { useDb, actions, fmtFecha, fmtHora, fmtPrecio } from '../lib/store'

export default function Talleres() {
  const { events, registrations } = useDb()
  const [filtro, setFiltro] = useState('todos')
  const [sel, setSel] = useState(null)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [ok, setOk] = useState(false)

  const visibles = events
    .filter((e) => e.publicado && new Date(e.fecha) > new Date())
    .filter((e) => filtro === 'todos' || e.tipo === filtro)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

  const inscritos = (id) => registrations.filter((r) => r.eventId === id).length

  const abrir = (ev) => {
    setSel(ev)
    setOk(false)
    setForm({ nombre: '', email: '', telefono: '' })
  }

  const inscribir = (e) => {
    e.preventDefault()
    actions.addRegistration({ eventId: sel.id, evento: sel.titulo, ...form })
    setOk(true)
  }

  return (
    <main className="px-4 pb-12 pt-36 sm:pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <Eyebrow tone="sage">
            <Icon.Users className="h-3 w-3" /> Aprendamos juntas
          </Eyebrow>
          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-espresso-900 sm:text-6xl">
            Talleres y <em className="font-light text-blush-500">webinars</em>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-espresso-500">
            Espacios grupales, presenciales y online, para aprender herramientas reales de crianza
            consciente y gestión emocional.
          </p>
        </Reveal>

        {/* Filtros */}
        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <div className="flex gap-1 rounded-full bg-white p-1.5 ring-1 ring-espresso-900/[0.07]">
              {[
                ['todos', 'Todos'],
                ['taller', 'Talleres'],
                ['webinar', 'Webinars'],
              ].map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setFiltro(v)}
                  className={`rounded-full px-5 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                    filtro === v
                      ? 'bg-espresso-900 text-cream'
                      : 'text-espresso-500 hover:text-espresso-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Lista */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((ev, i) => {
            const llenos = inscritos(ev.id)
            const agotado = llenos >= ev.cupos
            return (
              <Reveal key={ev.id} delay={(i % 3) * 90}>
                <Bezel className="h-full">
                  <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-7">
                    <div className="flex items-center justify-between">
                      <Eyebrow tone={ev.tipo === 'webinar' ? 'sage' : 'blush'}>
                        {ev.tipo === 'webinar' ? (
                          <Icon.Video className="h-3 w-3" />
                        ) : (
                          <Icon.Users className="h-3 w-3" />
                        )}
                        {ev.tipo}
                      </Eyebrow>
                      <span className="text-sm font-semibold text-espresso-900">
                        {fmtPrecio(ev.precio)}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-xl leading-snug text-espresso-900">
                      {ev.titulo}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-500">{ev.desc}</p>
                    <div className="mt-5 space-y-1.5 text-xs text-espresso-400">
                      <p className="flex items-center gap-1.5 capitalize">
                        <Icon.Calendar className="h-3.5 w-3.5" /> {fmtFecha(ev.fecha)}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Icon.Clock className="h-3.5 w-3.5" /> {fmtHora(ev.fecha)} · {ev.duracion}{' '}
                        min · {ev.modalidad}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Icon.Users className="h-3.5 w-3.5" /> {Math.max(ev.cupos - llenos, 0)} cupos
                        disponibles
                      </p>
                    </div>
                    <div className="mt-6">
                      <PillButton
                        variant={agotado ? 'ghost' : 'blush'}
                        disabled={agotado}
                        onClick={() => abrir(ev)}
                      >
                        {agotado ? 'Cupos agotados' : 'Inscribirme'}
                      </PillButton>
                    </div>
                  </div>
                </Bezel>
              </Reveal>
            )
          })}
        </div>

        {visibles.length === 0 && (
          <Reveal delay={150} className="mt-14 text-center">
            <p className="font-serif text-2xl text-espresso-400">
              Pronto anunciaremos nuevas fechas ✨
            </p>
            <p className="mt-3 text-sm text-espresso-400">
              Sígueme en Instagram para enterarte primero.
            </p>
          </Reveal>
        )}
      </div>

      {/* Modal de inscripción */}
      <Modal open={!!sel} onClose={() => setSel(null)}>
        {sel && !ok && (
          <form onSubmit={inscribir}>
            <Eyebrow tone={sel.tipo === 'webinar' ? 'sage' : 'blush'}>{sel.tipo}</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl leading-snug text-espresso-900">{sel.titulo}</h2>
            <p className="mt-2 text-sm capitalize text-espresso-500">
              {fmtFecha(sel.fecha)} · {fmtHora(sel.fecha)} · {fmtPrecio(sel.precio)}
            </p>
            <div className="mt-7 grid gap-4">
              <Field
                label="Nombre completo"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="María Pérez"
              />
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
            <div className="mt-7 flex justify-end">
              <PillButton type="submit" variant="blush">
                Reservar mi cupo
              </PillButton>
            </div>
          </form>
        )}
        {sel && ok && (
          <div className="py-4 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <Icon.Check className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-serif text-2xl text-espresso-900">¡Cupo reservado!</h2>
            <p className="mt-3 text-sm leading-relaxed text-espresso-500">
              Te llegará la confirmación y los detalles de acceso a tu correo. ¡Nos vemos en{' '}
              <strong className="text-espresso-900">{sel.titulo}</strong>!
            </p>
            <div className="mt-6 flex justify-center">
              <PillButton variant="ghost" icon={false} onClick={() => setSel(null)}>
                Cerrar
              </PillButton>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
