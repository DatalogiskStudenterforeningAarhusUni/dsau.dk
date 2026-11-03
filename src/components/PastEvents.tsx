import pastEvents from "../data/past_events.json";
import { useI18n } from "../i18n/I18nContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Localized = { da: string; en: string }
type Sponsor = { name: string; logo?: string | null; url?: string | null }
type PastEvent = { name: Localized; date: string; sponsors: Sponsor[] }

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const logo = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} className="h-16 w-32 object-contain" />
  ) : (
    // Placeholder until a real logo is added to the sponsor's "logo" field
    <div
      role="img"
      aria-label={`${sponsor.name} logo`}
      className="h-16 w-32 rounded-md border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-lg font-semibold text-neutral-500 dark:text-neutral-400"
    >
      {sponsor.name}
    </div>
  )
  return (
    <div className="flex flex-col items-center gap-1">
      {sponsor.url ? <a href={sponsor.url} target="_blank" rel="noreferrer">{logo}</a> : logo}
      <span className="text-sm text-neutral-700 dark:text-neutral-300">{sponsor.name}</span>
    </div>
  )
}

export default function PastEvents() {
  const { t, lang } = useI18n()
  const sorted = [...(pastEvents as PastEvent[])].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-foreground dark:text-white">{t('pastEvents.title')}</h2>
      <div className="grid gap-4">
        {sorted.map((e) => (
          <Card key={`${e.date}-${e.name.da}`}>
            <CardHeader>
              <CardTitle>{e.name[lang]}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(e.date).toLocaleDateString(lang === 'da' ? 'da-DK' : 'en-GB', { year: 'numeric', month: 'long' })}
              </p>
            </CardHeader>
            {e.sponsors.length > 0 && (
              <CardContent>
                <p className="text-sm font-medium mb-3">{t('pastEvents.sponsoredBy')}</p>
                <div className="flex flex-wrap gap-6">
                  {e.sponsors.map((s) => <SponsorLogo key={s.name} sponsor={s} />)}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
