import { Link, useParams } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Rc() {
  const { t } = useI18n()
  const { lang } = useParams()
  const prefix = `/${lang === 'en' ? 'en' : 'da'}`
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="rc.title" descriptionKey="rc.p1" />
      <div className="mb-3">
        <Link to={`${prefix}/underforeninger`} className="inline-flex items-center gap-2 text-neutral-600 hover:underline">
          <ArrowLeftCircle className="h-5 w-5" /> {t('common.back')}
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('rc.title')}</h1>
      <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
        <div>
          <img src="/images/rc/rcLogo.png" alt="Regnecentralen Logo" className="h-24 w-auto" />
        </div>
        <p>{t('rc.p1')}</p>
        <address className="not-italic space-y-1">
          <div>
            <b>{t('rc.facebook')}: </b>
            <a className="text-blue-600 hover:underline" href="https://www.facebook.com/groups/regnecentralen.au" target="_blank" rel="noreferrer">regnecentralen.au</a>
          </div>
          <div>
            <b>{t('rc.linkedin')}: </b>
            <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/company/regnecentralen-aarhus-universitet/" target="_blank" rel="noreferrer">Regnecentralen, Aarhus University</a>
          </div>
          <div>
            <b>{t('rc.address')}: </b>
            Åbogade 36, 8200 Aarhus
          </div>
          <div>
            <b>{t('rc.mail')}: </b>
            <a className="text-blue-600 hover:underline" href="mailto:rc@dsau.dk">rc@dsau.dk</a>
          </div>
        </address>
      </div>
    </div>
  );
}
