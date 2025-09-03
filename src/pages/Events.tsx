import frequentEvents from "../data/frequent_events.json";
import events from "../data/calendar_events.json";
import { Button } from "../components/ui/button";
import { ExternalLink } from "lucide-react";
import StaticCalendar from "../components/calendar/StaticCalendar";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Events() {
  const { t, lang } = useI18n()
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="events.title" descriptionKey="events.intro" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('events.title')}</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t('events.intro')}</p>

      <div className="mb-6">
        <StaticCalendar events={events} />
      </div>

      <div className="mb-10">
        <Button asChild>
          <a href="https://www.facebook.com/DSAUdk/" target="_blank" rel="noreferrer">
            {t('events.ctaFacebook')} <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">{t('events.annualTitle')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {frequentEvents.map((e: any, i: number) => (
            <Card key={e?.name?.da || e?.name?.en || e?.name || i}>
              <CardHeader>
                <CardTitle>
                  {(e.name && e.name[lang]) || e.name}
                </CardTitle>
                {(e.quarter || e.quarter === 0) && (
                  <p className="text-sm text-muted-foreground">
                    {/* if quarter 0 then it is all year around*/}
                    {e.quarter === 0 ? 'Hele året' : `Q${e.quarter}`}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {(e.description && e.description[lang]) || e.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
