import { Link, useParams } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Underforeninger() {
  const { t } = useI18n()
  const { lang } = useParams()
  const prefix = `/${lang === 'en' ? 'en' : 'da'}`
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="underforeninger.title" descriptionKey="underforeninger.intro" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('underforeninger.title')}</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t('underforeninger.intro')}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Link to={`${prefix}/rc`} className="group rounded-lg border overflow-hidden bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:border-primary/50">
          <div className="relative">
            <img src="/images/rc/rcLogo.png" alt="Regnecentralen Logo" className="h-40 w-full object-contain p-6" />
          </div>
          <div className="px-4 pb-4">
            <div className="text-lg font-medium group-hover:underline">{t('underforeninger.rc')}</div>
          </div>
        </Link>
        <Link to={`${prefix}/matroska`} className="group rounded-lg border overflow-hidden bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:border-primary/50">
          <div className="relative">
            <img src="/images/matroska/matroskaLogo.png" alt="Matroska Logo" className="h-40 w-full object-contain p-6" />
          </div>
          <div className="px-4 pb-4">
            <div className="text-lg font-medium group-hover:underline">{t('underforeninger.matroska')}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
