import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";
import PastEvents from "../components/PastEvents";

export default function Sponsors() {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="sponsors.title" descriptionKey="sponsors.intro" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('sponsors.title')}</h1>
      <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
        <p>{t('sponsors.intro')}</p>
        <p>
          {t('sponsors.become')}{" "}
          <a className="text-primary hover:underline" href="mailto:dsau@dsau.dk">dsau@dsau.dk</a>.
        </p>
      </div>
      <div className="mt-10">
        <PastEvents />
      </div>
    </div>
  );
}
