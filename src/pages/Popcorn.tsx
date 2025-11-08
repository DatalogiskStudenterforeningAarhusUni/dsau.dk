import { Link, useParams } from "react-router-dom";
import { ArrowLeftCircle, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Popcorn() {
  const { t } = useI18n()
  const { lang } = useParams()
  const prefix = `/${lang === 'en' ? 'en' : 'da'}`
  const mailto = `mailto:matroska.au@gmail.com?cc=&bcc=&subject=Leje%20af%20popcornmaskinen&body=
Hej Matroska,%0D%0A
%0D%0A
—————— Ansøgning ——————%0D%0A%0D%0A
Hvem er I? %0D%0A
Navn på begivenhed: %0D%0A
Lokation: %0D%0A
Email til kontaktperson: %0D%0A
Telefonnummer til kontaktperson: %0D%0A
Hvem skal regningen sendes til? (Fulde navn på person, virksomhed eller organisation): %0D%0A
Betalingsform (EAN, Faktura): %0D%0A
Forventet forbrug: %0D%0A
Kommentarer: %0D%0A%0D%0A
—————— Ansøgning ——————%0D%0A%0D%0A`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="popcorn.title" descriptionKey="popcorn.intro" />
      <div className="mb-3">
        <Link to={`${prefix}/matroska`} className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:underline">
          <ArrowLeftCircle className="h-5 w-5" /> {t('common.back')}
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('popcorn.title')}</h1>
      <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
        <img src="/images/matroska/matroskaPopcornmaskine.jpg" alt="Matroska Popcornmaskine" className="h-56 w-auto" />
        <div>
          <h3 className="text-xl font-semibold mb-2">{t('popcorn.rules')}</h3>
          <p className="mb-2">{t('popcorn.intro')}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('popcorn.li1')}</li>
            <li>{t('popcorn.li2')}</li>
            <li>{t('popcorn.li3')}</li>
            <li>{t('popcorn.li4')}</li>
          </ul>
          <p className="mt-2">&nbsp;</p>
        </div>
        <div>
          <Button asChild>
            <a href={mailto} target="_top">
              {t('popcorn.cta')} <ArrowUpRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
