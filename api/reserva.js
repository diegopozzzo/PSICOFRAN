import {
  getSheetsClient,
  getSpreadsheetId,
  ensureSheet,
  appendRow,
  limaNow,
  applyCors,
} from './_lib/sheets.js'

const HEADER = ['Registrado', 'Nombre', 'Email', 'WhatsApp', 'Servicio', 'Fecha cita', 'Hora', 'Motivo']

export default async function handler(req, res) {
  if (applyCors(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  const { nombre, email, telefono, servicio, fecha, hora, motivo } = req.body || {}
  if (!nombre || !email || !servicio || !fecha || !hora) {
    return res.status(400).json({ error: 'Faltan datos de la reserva' })
  }

  try {
    const sheets = getSheetsClient()
    const spreadsheetId = getSpreadsheetId()
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Consultas PSICO FRAN'

    await ensureSheet(sheets, spreadsheetId, sheetName, HEADER)
    await appendRow(sheets, spreadsheetId, sheetName, [
      limaNow(),
      nombre,
      email,
      telefono || '',
      servicio,
      fecha,
      hora,
      motivo || '',
    ])

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error al registrar reserva en Sheets:', err.message)
    res.status(500).json({ error: 'No se pudo registrar en Google Sheets' })
  }
}
