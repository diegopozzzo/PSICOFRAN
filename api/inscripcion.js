import {
  getSheetsClient,
  getSpreadsheetId,
  ensureSheet,
  appendRow,
  sanitizeTitle,
  limaNow,
  applyCors,
} from './_lib/sheets.js'

const HEADER = ['Registrado', 'Nombre', 'Email', 'WhatsApp', 'Tipo', 'Evento', 'Fecha del evento']

export default async function handler(req, res) {
  if (applyCors(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  const { nombre, email, telefono, evento, tipo, fechaEvento } = req.body || {}
  if (!nombre || !email || !evento) {
    return res.status(400).json({ error: 'Faltan datos de la inscripción' })
  }

  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    // Cada taller/webinar tiene su propia hoja, creada al vuelo si no existe
    const sheetName = sanitizeTitle(evento)

    await ensureSheet(sheets, spreadsheetId, sheetName, HEADER)
    await appendRow(sheets, spreadsheetId, sheetName, [
      limaNow(),
      nombre,
      email,
      telefono || '',
      tipo || '',
      evento,
      fechaEvento || '',
    ])

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error al registrar inscripción en Sheets:', err.message)
    res.status(500).json({ error: 'No se pudo registrar en Google Sheets' })
  }
}
