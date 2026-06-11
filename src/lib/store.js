import { useSyncExternalStore } from 'react'

const KEY = 'landeo_db_v2'

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

const inDays = (n, h = '19:00') => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10) + 'T' + h
}

const seed = () => ({
  settings: {
    pin: '1234',
    whatsapp: '51949364050',
    email: 'francis.landeo@upch.pe',
    instagram: 'psico.fran2026',
    // 0 = domingo ... 6 = sábado
    workDays: [1, 2, 3, 4, 5, 6],
    // 12:00–12:45 y de 3 a 6 pm
    slots: ['12:00', '15:00', '16:00', '17:00'],
  },
  services: [
    {
      id: 'svc-orientacion',
      nombre: 'Orientación a madres, padres y cuidadores',
      desc: 'Sesión individual para acompañarte en los retos de la crianza: berrinches, límites, rutinas y conexión.',
      duracion: 50,
      precio: 120,
      modalidad: 'Online · Presencial',
    },
    {
      id: 'svc-infantil',
      nombre: 'Evaluación y acompañamiento infantil',
      desc: 'Espacio terapéutico para niños y niñas, centrado en la regulación emocional y el desarrollo de habilidades.',
      duracion: 50,
      precio: 140,
      modalidad: 'Presencial',
    },
    {
      id: 'svc-familiar',
      nombre: 'Gestión emocional para familias',
      desc: 'Trabajo conjunto con la familia para construir hábitos, normas con conexión y un clima emocional sano.',
      duracion: 60,
      precio: 160,
      modalidad: 'Online · Presencial',
    },
    {
      id: 'svc-primera',
      nombre: 'Primera consulta (encuadre)',
      desc: 'Conversamos sobre tu situación, resolvemos dudas y definimos juntos el plan de acompañamiento.',
      duracion: 30,
      precio: 0,
      modalidad: 'Online',
    },
  ],
  events: [
    {
      id: uid(),
      tipo: 'taller',
      titulo: 'Berrinches sin gritos: límites con conexión',
      desc: 'Taller práctico para entender qué hay detrás de un berrinche y cómo acompañarlo sin perder la calma ni el vínculo.',
      fecha: inDays(9, '18:00'),
      duracion: 90,
      modalidad: 'Presencial · Lima',
      precio: 60,
      cupos: 15,
      link: '',
      publicado: true,
    },
    {
      id: uid(),
      tipo: 'webinar',
      titulo: 'Regulación emocional en la primera infancia',
      desc: 'Webinar en vivo: herramientas concretas para acompañar las emociones grandes de los más pequeños.',
      fecha: inDays(16, '20:00'),
      duracion: 60,
      modalidad: 'Online · Zoom',
      precio: 0,
      cupos: 100,
      link: '',
      publicado: true,
    },
    {
      id: uid(),
      tipo: 'taller',
      titulo: 'Rutinas y hábitos que sí funcionan',
      desc: 'Diseña rutinas realistas para tu familia: sueño, pantallas y momentos de conexión diaria.',
      fecha: inDays(23, '18:30'),
      duracion: 90,
      modalidad: 'Online · Zoom',
      precio: 45,
      cupos: 30,
      link: '',
      publicado: true,
    },
  ],
  bookings: [],
  registrations: [],
})

let db = load()

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* almacenamiento corrupto: re-sembrar */
  }
  const fresh = seed()
  localStorage.setItem(KEY, JSON.stringify(fresh))
  return fresh
}

const listeners = new Set()

function persist(next) {
  db = next
  localStorage.setItem(KEY, JSON.stringify(db))
  listeners.forEach((l) => l())
}

export function useDb() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => db,
  )
}

/* Envía los datos a Google Sheets vía las funciones serverless de Vercel.
   Si la API no está disponible (entorno local o GitHub Pages), falla en silencio:
   la reserva igual queda guardada en el navegador. */
function syncToSheets(endpoint, payload) {
  fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})
}

export const actions = {
  addBooking(data) {
    const booking = { id: uid(), estado: 'pendiente', creadaEn: new Date().toISOString(), ...data }
    persist({ ...db, bookings: [...db.bookings, booking] })
    syncToSheets('reserva', {
      nombre: booking.nombre,
      email: booking.email,
      telefono: booking.telefono,
      servicio: booking.servicio,
      fecha: booking.fecha,
      hora: booking.hora,
      motivo: booking.motivo,
    })
    return booking
  },
  setBookingStatus(id, estado) {
    persist({ ...db, bookings: db.bookings.map((b) => (b.id === id ? { ...b, estado } : b)) })
  },
  deleteBooking(id) {
    persist({ ...db, bookings: db.bookings.filter((b) => b.id !== id) })
  },
  saveEvent(ev) {
    const exists = db.events.some((e) => e.id === ev.id)
    const events = exists
      ? db.events.map((e) => (e.id === ev.id ? { ...e, ...ev } : e))
      : [...db.events, { ...ev, id: uid() }]
    persist({ ...db, events })
  },
  deleteEvent(id) {
    persist({
      ...db,
      events: db.events.filter((e) => e.id !== id),
      registrations: db.registrations.filter((r) => r.eventId !== id),
    })
  },
  addRegistration(data) {
    const reg = { id: uid(), creadaEn: new Date().toISOString(), ...data }
    persist({ ...db, registrations: [...db.registrations, reg] })
    syncToSheets('inscripcion', {
      nombre: reg.nombre,
      email: reg.email,
      telefono: reg.telefono,
      evento: reg.evento,
      tipo: reg.tipo,
      fechaEvento: reg.fechaEvento,
    })
    return reg
  },
  deleteRegistration(id) {
    persist({ ...db, registrations: db.registrations.filter((r) => r.id !== id) })
  },
  saveSettings(patch) {
    persist({ ...db, settings: { ...db.settings, ...patch } })
  },
}

export function takenSlots(dateStr) {
  return db.bookings
    .filter((b) => b.fecha === dateStr && b.estado !== 'cancelada')
    .map((b) => b.hora)
}

export const fmtFecha = (iso, opts = {}) =>
  new Date(iso).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...opts,
  })

export const fmtHora = (iso) =>
  new Date(iso).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })

export const fmtPrecio = (n) => (Number(n) === 0 ? 'Gratuito' : `S/ ${Number(n).toFixed(0)}`)
