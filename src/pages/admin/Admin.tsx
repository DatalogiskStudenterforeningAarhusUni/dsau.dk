// Dev-only admin page (http://localhost:5173/#/admin) for adding calendar events, sponsors and sponsor events.
// It talks to the API in vite-plugins/admin-api.ts, which writes to the JSON files in
// src/data. Only available while running `npm run dev` – commit the changed files afterwards.

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

type Localized = { da: string; en: string }
type Sponsor = { name: string; logo: string | null; url: string | null }
type CalendarEvent = {
  id: string; title: Localized; description?: Localized; location?: Localized
  start: string; end: string; facebookUrl?: string
}
type PastEvent = { name: Localized; date: string; sponsors: string[] }
type AdminData = { calendarEvents: CalendarEvent[]; sponsors: Record<string, Sponsor>; pastEvents: PastEvent[] }
type Status = { kind: 'ok' | 'error'; message: string } | null

const emptyLocalized = (): Localized => ({ da: '', en: '' })

// "2026-11-20T16:00:00+01:00" -> "2026-11-20T16:00", the format <input type="datetime-local"> expects.
const toDateTimeLocal = (iso: string) => iso.slice(0, 16)

const FORM_IDS = { calendar: 'calendar-event-form', past: 'past-event-form' }

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function post(path: string, body: unknown) {
  const res = await fetch(`/__admin${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`)
  return data
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

const inputClass = "w-full rounded-md border bg-background px-3 py-2 text-sm dark:border-neutral-700"

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

function LocalizedFields({ label, value, onChange, required, multiline }: {
  label: string; value: Localized; onChange: (v: Localized) => void; required?: boolean; multiline?: boolean
}) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(['da', 'en'] as const).map((l) => (
        <Field key={l} label={`${label} (${l === 'da' ? 'dansk' : 'English'})`}>
          <Input
            className={inputClass + (multiline ? ' min-h-24' : '')}
            value={value[l]}
            required={required}
            onChange={(e) => onChange({ ...value, [l]: e.target.value })}
          />
        </Field>
      ))}
    </div>
  )
}

function StatusLine({ status }: { status: Status }) {
  if (!status) return null
  return (
    <p className={`text-sm ${status.kind === 'ok' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
      {status.message}
    </p>
  )
}

function useSubmit(onDone: () => void) {
  const [status, setStatus] = useState<Status>(null)
  const [busy, setBusy] = useState(false)
  const run = async (action: () => Promise<string>) => {
    setBusy(true)
    setStatus(null)
    try {
      setStatus({ kind: 'ok', message: await action() })
      onDone()
    } catch (err) {
      setStatus({ kind: 'error', message: (err as Error).message })
    } finally {
      setBusy(false)
    }
  }
  return { status, busy, run }
}

// `initial` pre-fills the form when copying an existing event (the ID is never copied).
function CalendarEventForm({ existing, onSaved, initial }: {
  existing: CalendarEvent[]; onSaved: () => void; initial?: CalendarEvent | null
}) {
  const [title, setTitle] = useState(() => ({ ...emptyLocalized(), ...initial?.title }))
  const [description, setDescription] = useState(() => ({ ...emptyLocalized(), ...initial?.description }))
  const [location, setLocation] = useState(() => ({ ...emptyLocalized(), ...initial?.location }))
  const [start, setStart] = useState(() => (initial ? toDateTimeLocal(initial.start) : ''))
  const [end, setEnd] = useState(() => (initial ? toDateTimeLocal(initial.end) : ''))
  const [facebookUrl, setFacebookUrl] = useState(initial?.facebookUrl ?? '')
  const [id, setId] = useState('')
  const [idEdited, setIdEdited] = useState(false)
  const { status, busy, run } = useSubmit(onSaved)

  const autoId = slugify(title.da) + (start ? `-${start.slice(0, 10)}` : '')
  const effectiveId = idEdited ? id : autoId

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(async () => {
      // <input type="datetime-local"> gives "YYYY-MM-DDTHH:MM"; the file uses seconds too.
      await post('/calendar-events', {
        id: effectiveId, title, description, location, facebookUrl,
        start: `${start}:00`, end: `${end}:00`,
      })
      setTitle(emptyLocalized()); setDescription(emptyLocalized()); setLocation(emptyLocalized())
      setStart(''); setEnd(''); setFacebookUrl(''); setId(''); setIdEdited(false)
      return `Added "${title.da}" to calendar_events.json`
    })
  }

  return (
    <form id={FORM_IDS.calendar} onSubmit={submit} className="grid gap-4 scroll-mt-24">
      <LocalizedFields label="Title" value={title} onChange={setTitle} required />
      <LocalizedFields label="Description" value={description} onChange={setDescription} multiline />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Start">
          <input type="datetime-local" className={inputClass} value={start} required
            onChange={(e) => { setStart(e.target.value); if (!end) setEnd(e.target.value) }} />
        </Field>
        <Field label="End">
          <input type="datetime-local" className={inputClass} value={end} min={start} required
            onChange={(e) => setEnd(e.target.value)} />
        </Field>
      </div>
      <LocalizedFields label="Location" value={location} onChange={setLocation} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Facebook link (optional)">
          <input type="url" className={inputClass} value={facebookUrl} placeholder="https://www.facebook.com/events/…"
            onChange={(e) => setFacebookUrl(e.target.value)} />
        </Field>
        <Field label="ID" hint="Generated from the Danish title and start date">
          <input className={inputClass} value={effectiveId} required pattern="[a-z0-9]+(-[a-z0-9]+)*"
            onChange={(e) => { setId(e.target.value); setIdEdited(true) }} />
        </Field>
      </div>
      {existing.some((e) => e.id === effectiveId) && (
        <p className="text-sm text-red-700 dark:text-red-400">An event with this ID already exists.</p>
      )}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>Add calendar event</Button>
        <StatusLine status={status} />
      </div>
    </form>
  )
}

function SponsorForm({ existing, onSaved }: { existing: Record<string, Sponsor>; onSaved: () => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const { status, busy, run } = useSubmit(onSaved)
  const id = slugify(name)

  useEffect(() => {
    if (!logo) { setPreview(null); return }
    const objectUrl = URL.createObjectURL(logo)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [logo])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(async () => {
      const logoPayload = logo ? { filename: logo.name, dataBase64: await readFileAsBase64(logo) } : undefined
      await post('/sponsors', { id, name, url, logo: logoPayload })
      setName(''); setUrl(''); setLogo(null); setFileInputKey((k) => k + 1)
      return `Added sponsor "${name}"${logo ? ' with logo' : ' (placeholder logo)'}`
    })
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" hint={id ? `ID: ${id}` : undefined}>
          <input className={inputClass} value={name} required onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Website (optional)">
          <input type="url" className={inputClass} value={url} placeholder="https://…" onChange={(e) => setUrl(e.target.value)} />
        </Field>
      </div>
      <Field label="Logo (optional)" hint="PNG, JPG, SVG or WebP. Saved as public/images/sponsors/<id>.<ext>. Without a logo, a placeholder is shown.">
        <input key={fileInputKey} type="file" accept=".png,.jpg,.jpeg,.svg,.webp"
          className="text-sm text-muted-foreground cursor-pointer file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground file:shadow-sm file:transition-colors hover:file:bg-primary/90"
          onChange={(e) => setLogo(e.target.files?.[0] ?? null)} />
      </Field>
      {preview && (
        <div className="h-16 w-32 rounded-md bg-white p-2 flex items-center justify-center border">
          <img src={preview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
        </div>
      )}
      {id in existing && <p className="text-sm text-red-700 dark:text-red-400">A sponsor with this ID already exists.</p>}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy || !id}>Add sponsor</Button>
        <StatusLine status={status} />
      </div>
    </form>
  )
}

// `initial` pre-fills the form when copying an existing sponsor event.
function PastEventForm({ sponsors, onSaved, initial }: {
  sponsors: Record<string, Sponsor>; onSaved: () => void; initial?: PastEvent | null
}) {
  const [name, setName] = useState(() => ({ ...emptyLocalized(), ...initial?.name }))
  const [date, setDate] = useState(initial?.date ?? '')
  // Drop sponsor ids that no longer exist in sponsors.json.
  const [selected, setSelected] = useState<string[]>(() => (initial?.sponsors ?? []).filter((id) => id in sponsors))
  const { status, busy, run } = useSubmit(onSaved)

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(async () => {
      await post('/past-events', { name, date, sponsors: selected })
      setName(emptyLocalized()); setDate(''); setSelected([])
      return `Added "${name.da}" to past_events.json`
    })
  }

  return (
    <form id={FORM_IDS.past} onSubmit={submit} className="grid gap-4 scroll-mt-24">
      <LocalizedFields label="Name" value={name} onChange={setName} required />
      <Field label="Date">
        <input type="date" className={inputClass + ' sm:w-60'} value={date} required onChange={(e) => setDate(e.target.value)} />
      </Field>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium mb-1">Sponsors</legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(sponsors).map(([id, s]) => (
            <label key={id} className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm cursor-pointer ${selected.includes(id) ? 'bg-primary text-primary-foreground' : ''}`}>
              <input type="checkbox" className="sr-only" checked={selected.includes(id)} onChange={() => toggle(id)} />
              {s.name}
            </label>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Missing a sponsor? Add it in the form above first.</span>
      </fieldset>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>Add sponsor event</Button>
        <StatusLine status={status} />
      </div>
    </form>
  )
}

function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>{children}</div>
        {aside && <div className="text-sm border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">{aside}</div>}
      </CardContent>
    </Card>
  )
}

type ListItem = { label: string; onCopy?: () => void }

function ExistingList({ title, items }: { title: string; items: ListItem[] }) {
  return (
    <>
      <p className="font-medium mb-2">{title} ({items.length})</p>
      <ul className="space-y-1 text-muted-foreground max-h-64 overflow-auto">
        {items.map((item, i) => (
          <li key={i} className="flex items-start justify-between gap-2">
            <span>{item.label}</span>
            {item.onCopy && (
              <button
                type="button"
                onClick={item.onCopy}
                title="Copy into the form"
                aria-label={`Copy "${item.label}" into the form`}
                className="shrink-0 rounded p-1 hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

// Changing `key` remounts the form, so it starts from the copied values.
type Copied<T> = { key: number; value: T | null }

function useCopy<T>(formId: string) {
  const [copied, setCopied] = useState<Copied<T>>({ key: 0, value: null })
  const copy = (value: T) => {
    setCopied((c) => ({ key: c.key + 1, value }))
    document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return { copied, copy }
}

export default function Admin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const calendarCopy = useCopy<CalendarEvent>(FORM_IDS.calendar)
  const pastCopy = useCopy<PastEvent>(FORM_IDS.past)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/__admin/data')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`)
      setData(json)
      setLoadError(null)
    } catch (err) {
      setLoadError((err as Error).message)
    }
  }, [])

  useEffect(() => { document.title = 'DSAU – Admin'; load() }, [load])

  return (
    <div className="container mx-auto px-4 py-8 grid gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground dark:text-white">Admin</h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          Changes are written straight to the files in <code>src/data</code> (and logos to <code>public/images/sponsors</code>).
          This page only works with <code>npm run dev</code> – remember to commit and push the changed files to publish them.
        </p>
      </div>
      {loadError && <p className="text-red-700 dark:text-red-400">Could not load data: {loadError}</p>}
      {data && (
        <>
          <Section
            title="New calendar event"
            aside={<ExistingList title="Calendar events" items={[...data.calendarEvents]
              .sort((a, b) => b.start.localeCompare(a.start))
              .map((e) => ({ label: `${e.start.slice(0, 10)} – ${e.title.da}`, onCopy: () => calendarCopy.copy(e) }))} />}
          >
            <CalendarEventForm key={calendarCopy.copied.key} initial={calendarCopy.copied.value}
              existing={data.calendarEvents} onSaved={load} />
          </Section>
          <Section
            title="New sponsor"
            aside={<ExistingList title="Sponsors" items={Object.entries(data.sponsors)
              .map(([, s]) => ({ label: `${s.name}${s.logo ? '' : ' – no logo'}` }))} />}
          >
            <SponsorForm existing={data.sponsors} onSaved={load} />
          </Section>
          <Section
            title="New sponsor event"
            aside={<ExistingList title="Sponsor events" items={data.pastEvents
              .map((e) => ({ label: `${e.date} – ${e.name.da} (${e.sponsors.length} sponsors)`, onCopy: () => pastCopy.copy(e) }))} />}
          >
            <PastEventForm key={pastCopy.copied.key} initial={pastCopy.copied.value}
              sponsors={data.sponsors} onSaved={load} />
          </Section>
        </>
      )}
    </div>
  )
}
