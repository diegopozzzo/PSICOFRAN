import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export function getSpreadsheetId() {
  const raw = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''
  // Acepta tanto el ID puro como la URL completa del documento
  const match = raw.match(/\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : raw.trim()
}

export function getSheetsClient() {
  const email = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '').trim()
  const key = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '')
    .trim()
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '\n')
  const auth = new google.auth.JWT({ email, key, scopes: SCOPES })
  return google.sheets({ version: 'v4', auth })
}

/* Los nombres de hoja no admiten estos caracteres y tienen límite de longitud */
export const sanitizeTitle = (t) => t.replace(/[\\/?*[\]:]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90)

export async function ensureSheet(sheets, spreadsheetId, title, header) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const exists = meta.data.sheets.some((s) => s.properties.title === title)
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title } } }] },
    })
  }
  const first = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${title}'!A1:A1`,
  })
  if (!first.data.values) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${title}'!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [header] },
    })
  }
}

export async function appendRow(sheets, spreadsheetId, title, row) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${title}'!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

export const limaNow = () =>
  new Date().toLocaleString('es-PE', { timeZone: 'America/Lima', hour12: false })

export function applyCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return true
  }
  return false
}
