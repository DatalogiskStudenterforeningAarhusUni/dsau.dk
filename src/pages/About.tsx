import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function About() {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="about.title" descriptionKey="about.body1" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('about.title')}</h1>
      <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
        <p>{t('about.body1')}</p>
        <div className="space-y-2">
          <h3 className="font-semibold">{t('about.links')}</h3>
          <ul className="list-disc pl-5">
            <li>
              <a className="text-primary hover:underline" href="https://github.com/DatalogiskStudenterforeningAarhusUni/vedtaegter/blob/master/vedtaegter.pdf" target="_blank" rel="noreferrer">{t('about.vedtaegter')}</a>
            </li>
            <li>
              <a className="text-primary hover:underline" href="https://github.com/DatalogiskStudenterforeningAarhusUni/Referater" target="_blank" rel="noreferrer">{t('about.referater')}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
