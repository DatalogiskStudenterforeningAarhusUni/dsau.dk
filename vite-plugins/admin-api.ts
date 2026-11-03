// Dev-only API backing the /admin page.
//
// The site is static (GitHub Pages), so there is no real backend. Instead, while
// `npm run dev` is running, this plugin lets the admin page write directly to the
// JSON files in src/data and save sponsor logos to public/images/sponsors.
// The changes are then committed like any other change.
//
// `apply: 'serve'` means this never runs as part of `npm run build`.

import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '..')
const DATA_DIR = path.join(ROOT, 'src/data')
const FILES = {
  calendarEvents: path.join(DATA_DIR, 'calendar_events.json'),
  sponsors: path.join(DATA_DIR, 'sponsors.json'),
  pastEvents: path.join(DATA_DIR, 'past_events.json'),
}
const LOGO_DIR = path.join(ROOT, 'public/images/sponsors')
const LOGO_URL_PREFIX = '/images/sponsors/'
const LOGO_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'webp']
const MAX_BODY_BYTES = 10 * 1024 * 1024

type Localized = { da: string; en: string }

class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
// Matches the formats already used in calendar_events.json, with or without a UTC offset.
const DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z)?$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(file, 'utf8')) as T
}

async function writeJson(file: string, data: unknown) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new HttpError(413, 'Request too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch {
        reject(new HttpError(400, 'Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') throw new HttpError(400, `"${field}" is required`)
  return value.trim()
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function requireLocalized(value: unknown, field: string): Localized {
  const v = (value ?? {}) as Record<string, unknown>
  return { da: requireString(v.da, `${field} (da)`), en: requireString(v.en, `${field} (en)`) }
}

function optionalLocalized(value: unknown, field: string): Localized | undefined {
  const v = (value ?? {}) as Record<string, unknown>
  if (!optionalString(v.da) && !optionalString(v.en)) return undefined
  return requireLocalized(v, field)
}

function optionalUrl(value: unknown, field: string): string | undefined {
  const url = optionalString(value)
  if (url && !/^https?:\/\//.test(url)) throw new HttpError(400, `"${field}" must start with http:// or https://`)
  return url
}

function requireId(value: unknown, field: string): string {
  const id = requireString(value, field)
  if (!ID_PATTERN.test(id)) throw new HttpError(400, `"${field}" may only contain lowercase letters, digits and dashes`)
  return id
}

async function addCalendarEvent(body: Record<string, unknown>) {
  const id = requireId(body.id, 'id')
  const start = requireString(body.start, 'start')
  const end = requireString(body.end, 'end')
  if (!DATETIME_PATTERN.test(start)) throw new HttpError(400, '"start" must be a date and time')
  if (!DATETIME_PATTERN.test(end)) throw new HttpError(400, '"end" must be a date and time')
  if (new Date(end) < new Date(start)) throw new HttpError(400, '"end" must be after "start"')

  const event: Record<string, unknown> = { id, title: requireLocalized(body.title, 'title') }
  const description = optionalLocalized(body.description, 'description')
  if (description) event.description = description
  event.start = start
  event.end = end
  const location = optionalLocalized(body.location, 'location')
  if (location) event.location = location
  const facebookUrl = optionalUrl(body.facebookUrl, 'facebookUrl')
  if (facebookUrl) event.facebookUrl = facebookUrl

  const events = await readJson<{ id: string }[]>(FILES.calendarEvents)
  if (events.some((e) => e.id === id)) throw new HttpError(409, `A calendar event with id "${id}" already exists`)
  // New events go first, matching how the file has been maintained by hand.
  await writeJson(FILES.calendarEvents, [event, ...events])
  return event
}

async function addSponsor(body: Record<string, unknown>) {
  const id = requireId(body.id, 'id')
  const name = requireString(body.name, 'name')
  const url = optionalUrl(body.url, 'url') ?? null

  const sponsors = await readJson<Record<string, unknown>>(FILES.sponsors)
  if (id in sponsors) throw new HttpError(409, `A sponsor with id "${id}" already exists`)

  let logo: string | null = null
  const upload = body.logo as { filename?: unknown; dataBase64?: unknown } | undefined
  if (upload && upload.dataBase64) {
    const ext = path.extname(requireString(upload.filename, 'logo filename')).slice(1).toLowerCase()
    if (!LOGO_EXTENSIONS.includes(ext)) throw new HttpError(400, `Logo must be one of: ${LOGO_EXTENSIONS.join(', ')}`)
    const filename = `${id}.${ext}`
    await fs.mkdir(LOGO_DIR, { recursive: true })
    // 'wx' refuses to overwrite an existing logo file.
    try {
      await fs.writeFile(path.join(LOGO_DIR, filename), Buffer.from(String(upload.dataBase64), 'base64'), { flag: 'wx' })
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'EEXIST') throw new HttpError(409, `public/images/sponsors/${filename} already exists`)
      throw err
    }
    logo = LOGO_URL_PREFIX + filename
  }

  const sponsor = { name, logo, url }
  await writeJson(FILES.sponsors, { ...sponsors, [id]: sponsor })
  return { id, ...sponsor }
}

async function addPastEvent(body: Record<string, unknown>) {
  const date = requireString(body.date, 'date')
  if (!DATE_PATTERN.test(date)) throw new HttpError(400, '"date" must be a date (YYYY-MM-DD)')
  if (!Array.isArray(body.sponsors)) throw new HttpError(400, '"sponsors" must be a list')

  const sponsors = await readJson<Record<string, unknown>>(FILES.sponsors)
  const sponsorIds = body.sponsors.map((s) => String(s))
  const unknown = sponsorIds.filter((s) => !(s in sponsors))
  if (unknown.length) throw new HttpError(400, `Unknown sponsor id(s): ${unknown.join(', ')}`)

  const event = { name: requireLocalized(body.name, 'name'), date, sponsors: sponsorIds }
  const events = await readJson<{ date: string }[]>(FILES.pastEvents)
  // Keep the file newest-first, like the page shows it.
  const next = [...events, event].sort((a, b) => b.date.localeCompare(a.date))
  await writeJson(FILES.pastEvents, next)
  return event
}

function isLoopback(req: IncomingMessage) {
  const addr = req.socket.remoteAddress ?? ''
  return addr === '127.0.0.1' || addr === '::1' || addr === '::ffff:127.0.0.1'
}

function send(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default function adminApi(): Plugin {
  return {
    name: 'dsau-admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin', async (req, res) => {
        // The dev server listens on the network (host: true); only allow edits from this machine.
        if (!isLoopback(req)) return send(res, 403, { error: 'The admin API is only available from localhost' })
        try {
          if (req.method === 'GET' && req.url === '/data') {
            return send(res, 200, {
              calendarEvents: await readJson(FILES.calendarEvents),
              sponsors: await readJson(FILES.sponsors),
              pastEvents: await readJson(FILES.pastEvents),
            })
          }
          if (req.method === 'POST') {
            const body = (await readBody(req)) as Record<string, unknown>
            if (req.url === '/calendar-events') return send(res, 201, await addCalendarEvent(body))
            if (req.url === '/sponsors') return send(res, 201, await addSponsor(body))
            if (req.url === '/past-events') return send(res, 201, await addPastEvent(body))
          }
          send(res, 404, { error: 'Not found' })
        } catch (err) {
          if (err instanceof HttpError) return send(res, err.status, { error: err.message })
          server.config.logger.error(String(err))
          send(res, 500, { error: 'Internal error – see the terminal running `npm run dev`' })
        }
      })
    },
  }
}
