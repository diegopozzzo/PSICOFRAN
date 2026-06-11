import { readFileSync } from 'fs'
import { google } from 'googleapis'

for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const { getSheetsClient, getSpreadsheetId, ensureSheet, appendRow, limaNow } = await import(
  './api/_lib/sheets.js'
)

const sheets = getSheetsClient()
const id = getSpreadsheetId()
console.log('Spreadsheet ID:', id)

const meta = await sheets.spreadsheets.get({ spreadsheetId: id })
console.log('Documento:', meta.data.properties.title)
console.log('Hojas existentes:', meta.data.sheets.map((s) => s.properties.title).join(' | '))

const name = process.env.GOOGLE_SHEETS_SHEET_NAME
await ensureSheet(sheets, id, name, ['Registrado', 'Nombre', 'Email', 'WhatsApp', 'Servicio', 'Fecha cita', 'Hora', 'Motivo'])
await appendRow(sheets, id, name, [limaNow(), 'PRUEBA (borrar)', 'test@test.com', '999', 'Test de conexión', '2026-06-11', '12:00', 'fila de prueba'])
console.log('OK: fila de prueba escrita en', name)
