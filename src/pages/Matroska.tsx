import { Link, useParams } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Matroska() {
  const { t } = useI18n()
  const { lang } = useParams()
  const prefix = `/${lang === 'en' ? 'en' : 'da'}`
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="matroska.title" descriptionKey="matroska.p1" />
      <div className="mb-3">
        <Link to={`${prefix}/underforeninger`} className="inline-flex items-center gap-2 text-neutral-600 hover:underline">
          <ArrowLeftCircle className="h-5 w-5" /> {t('common.back')}
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('matroska.title')}</h1>
      <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
        <div>
          <img src="/images/matroska/matroskaLogo.png" alt="Matroska Logo" className="h-24 w-auto" />
        </div>
        <p>{t('matroska.p1')}</p>
        <p>{t('matroska.p2')}</p>
        <p>{t('matroska.p3')}</p>
        <address className="not-italic space-y-1">
          <div>
            <b>{t('matroska.facebook')}: </b>
            <a className="text-blue-600 hover:underline" href="https://www.facebook.com/groups/matroskaFilmKlub" target="_blank" rel="noreferrer">matroskaFilmKlub</a>
          </div>
          <div>
            <b>{t('matroska.linkedin')}: </b>
            <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/company/matroska-aarhus-universitet/" target="_blank" rel="noreferrer">Matroska, Aarhus Universitet</a>
          </div>
          <div>
            <b>{t('matroska.mail')}: </b>
            <a className="text-blue-600 hover:underline" href="mailto:matroska.au@gmail.com">matroska.au@gmail.com</a>
          </div>
        </address>
        <p>{t('matroska.popcornLink')} <Link to={`${prefix}/popcorn`} className="text-blue-600 hover:underline">→</Link></p>
      </div>
    </div>
  );
}
