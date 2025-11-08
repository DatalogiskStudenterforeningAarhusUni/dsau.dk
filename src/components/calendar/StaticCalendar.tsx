import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { useI18n } from '../../i18n/I18nContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { ExternalLink, MapPin } from 'lucide-react'

type Lang = 'da' | 'en'

const AU_FIND_BASE_URL = 'https://www.au.dk/om/organisation/find-au/bygningskort?b='

export interface CalendarEventLink {
  href: string
  label?: { da: string; en: string }
}

export interface CalendarEvent {
  id: string
  title: { da: string; en: string }
  description?: { da: string; en: string }
  start: string // ISO
  end: string   // ISO
  location?: { da: string; en: string }
  facebookUrl?: string
  links?: CalendarEventLink[]
}

export default function StaticCalendar({ events, initialDate }: { events: CalendarEvent[]; initialDate?: Date }) {
  const { t, lang } = useI18n()
  const [view, setView] = useState<'month' | 'week'>('month')
  const [cursor, setCursor] = useState<Date>(initialDate ?? new Date())
  const [selected, setSelected] = useState<(Omit<CalendarEvent, 'start'|'end'> & { start: Date; end: Date }) | null>(null)

  const locale = lang === 'da' ? 'da-DK' : 'en-GB'

  const onPrev = () => setCursor(prev => add(prev, view === 'month' ? { months: -1 } : { weeks: -1 }))
  const onNext = () => setCursor(prev => add(prev, view === 'month' ? { months: 1 } : { weeks: 1 }))
  const onToday = () => setCursor(new Date())

  const headerLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(cursor)

  const normalized = useMemo(() => events.map(e => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  })), [events])
  const auFindHref = selected?.location ? buildAuFindHref(selected.location) : null

  return (
    <div className="rounded-lg border bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToday}>{t('calendar.today')}</Button>
          <Button variant="outline" size="sm" onClick={onPrev}>‹</Button>
          <Button variant="outline" size="sm" onClick={onNext}>›</Button>
        </div>
        <div className="font-medium capitalize">{headerLabel}</div>
        <div className="flex items-center gap-2">
          <Button variant={view === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setView('month')}>{t('calendar.month')}</Button>
          <Button variant={view === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setView('week')}>{t('calendar.week')}</Button>
        </div>
      </div>
      {view === 'month' ? (
        <MonthView date={cursor} locale={locale} events={normalized} lang={lang} onSelect={setSelected} />
      ) : (
        <WeekView date={cursor} locale={locale} events={normalized} lang={lang} onSelect={setSelected} />
      )}

      <Dialog open={!!selected} onOpenChange={(o: boolean) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <div className="space-y-2">
              <DialogHeader>
                <DialogTitle>{selected.title[lang]}</DialogTitle>
                <DialogDescription>
                  {formatFullRange(selected.start, selected.end, locale)}
                </DialogDescription>
              </DialogHeader>
              {selected.location && (
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                    <span>{selected.location[lang]}</span>
                  </div>
                  {auFindHref && (
                    <Button asChild size="sm" variant="outline" className="shrink-0">
                      <a href={auFindHref} target="_blank" rel="noreferrer">
                        AU Find
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
              {selected.description && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{selected.description[lang]}</p>
              )}
              {selected.links?.length ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selected.links.map((link, idx) => (
                    <Button key={`${selected.id}-link-${idx}`} asChild variant="outline">
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {(link.label && link.label[lang]) || t('calendar.defaultLinkLabel')}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  ))}
                </div>
              ) : null}
              {selected.facebookUrl && (
                <div className="pt-2">
                  <Button asChild>
                    <a href={selected.facebookUrl} target="_blank" rel="noreferrer">
                      Facebook <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MonthView({ date, locale, events, lang, onSelect }: { date: Date; locale: string; events: (Omit<CalendarEvent, 'start'|'end'> & { start: Date; end: Date })[]; lang: Lang; onSelect: (e: any) => void }) {
  const start = startOfWeek(startOfMonth(date))
  const days: Date[] = []
  for (let i = 0; i < 42; i++) days.push(add(start, { days: i }))
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const dayFmt = new Intl.DateTimeFormat(locale, { day: 'numeric' })

  const weekDays = [0,1,2,3,4,5,6].map(i => weekdayFmt.format(add(startOfWeek(new Date()), { days: i })))

  return (
    <div className="grid grid-rows-[auto,1fr]">
      <div className="grid grid-cols-7 text-xs text-neutral-600 dark:text-neutral-300 border-b dark:border-neutral-800">
        {weekDays.map((d,i) => (
          <div key={i} className="px-2 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((d,i) => {
          const inMonth = d.getMonth() === date.getMonth()
          const todaysEvents = events.filter(e => spansDay(e, d))
          return (
            <div key={i} className={`min-h-28 border-b border-r p-2 ${inMonth ? 'bg-background' : 'bg-neutral-50 dark:bg-neutral-800/60'}`}>
              <div className={`text-xs mb-1 ${isSameDay(d, new Date()) ? 'font-bold' : 'text-neutral-600 dark:text-neutral-400'}`}>{dayFmt.format(d)}</div>
              <div className="space-y-1">
                {todaysEvents.slice(0,3).map(ev => (
                  <button key={ev.id} onClick={() => onSelect(ev)} className="w-full text-left">
                    <div className="text-xs rounded bg-primary/15 dark:bg-primary/25 border border-primary/30 dark:border-primary/40 px-1 py-1">
                      <div className="font-medium text-foreground dark:text-white truncate">{ev.title[lang]}</div>
                      <div className="text-[10px] text-neutral-700 dark:text-neutral-200 truncate">
                        {formatTimeRange(ev.start, ev.end, locale)}{ev.location ? ` · ${ev.location[lang]}` : ''}
                      </div>
                    </div>
                  </button>
                ))}
                {todaysEvents.length === 0 ? (
                  <div className="text-[10px] text-neutral-400 dark:text-neutral-500">&nbsp;</div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({ date, locale, events, lang, onSelect }: { date: Date; locale: string; events: (Omit<CalendarEvent, 'start'|'end'> & { start: Date; end: Date })[]; lang: Lang; onSelect: (e: any) => void }) {
  const weekStart = startOfWeek(date)
  const days = [0,1,2,3,4,5,6].map(i => add(weekStart, { days: i }))
  const headerFmt = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="grid grid-cols-7">
      {days.map((d,i) => {
        const todaysEvents = events.filter(e => spansDay(e, d))
        return (
          <div key={i} className="min-h-40 border-r p-2">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">{headerFmt.format(d)}</div>
            <div className="space-y-2">
              {todaysEvents.length === 0 ? (
                <div className="text-xs text-neutral-400 dark:text-neutral-500 italic">—</div>
              ) : todaysEvents.map(ev => (
                <button key={ev.id} onClick={() => onSelect(ev)} className="w-full text-left">
                  <div className="rounded border px-2 py-1 bg-white dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="text-xs font-medium text-foreground dark:text-white truncate">{ev.title[lang]}</div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-300 truncate">{formatTimeRange(ev.start, ev.end, locale)}{ev.location ? ` · ${ev.location[lang]}` : ''}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function spansDay(e: { start: Date; end: Date }, day: Date) {
  const start = startOfDay(day)
  const end = endOfDay(day)
  return e.start <= end && e.end >= start
}

function formatTimeRange(start: Date, end: Date, locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' })
  const sameDay = isSameDay(start, end)
  if (sameDay) return `${fmt.format(start)} – ${fmt.format(end)}`
  const dayFmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' })
  return `${dayFmt.format(start)} ${fmt.format(start)} – ${dayFmt.format(end)} ${dayFmt.format(end)}`
}
function formatFullRange(start: Date, end: Date, locale: string) {
  const dayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short', day: '2-digit', month: 'short' })
  const timeFmt = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' })
  const sameDay = isSameDay(start, end)
  if (sameDay) return `${dayFmt.format(start)} ${timeFmt.format(start)} – ${timeFmt.format(end)}`
  return `${dayFmt.format(start)} ${timeFmt.format(start)} – ${dayFmt.format(end)} ${timeFmt.format(end)}`
}

function buildAuFindHref(location?: CalendarEvent['location']) {
  const query = deriveBuildingQuery(location)
  return query ? `${AU_FIND_BASE_URL}${encodeURIComponent(query)}` : null
}

function deriveBuildingQuery(location?: CalendarEvent['location']) {
  if (!location) return null
  const values = Object.values(location).filter((value): value is string => Boolean(value))
  for (const value of values) {
    const buildingNumber = value.match(/\b(\d{4})\b/)
    if (buildingNumber) return buildingNumber[1]
  }
  for (const value of values) {
    const nameBeforeDigits = value.match(/([A-Za-zÀ-ÿ]+)(?=[-\s]*\d+)/)
    if (nameBeforeDigits) return slugifyBuildingToken(nameBeforeDigits[1])
  }
  for (const value of values) {
    const primarySegment = value.split(/[,(]/)[0].split('\n')[0]
    const slug = slugifyBuildingToken(primarySegment)
    if (slug) return slug
  }
  return null
}

function slugifyBuildingToken(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

// Date helpers
function add(date: Date, by: { days?: number; weeks?: number; months?: number }) {
  const d = new Date(date)
  if (by.days) d.setDate(d.getDate() + by.days)
  if (by.weeks) d.setDate(d.getDate() + 7 * by.weeks)
  if (by.months) d.setMonth(d.getMonth() + by.months)
  return d
}
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x }
function endOfDay(d: Date) { const x = new Date(d); x.setHours(23,59,59,999); return x }
function startOfMonth(d: Date) { const x = new Date(d.getFullYear(), d.getMonth(), 1); return x }
function startOfWeek(d: Date) {
  // Monday as first day of week
  const x = startOfDay(d)
  const day = x.getDay() || 7 // Sun=0 => 7
  x.setDate(x.getDate() - (day - 1))
  return x
}
function isSameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate() }
