import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Contact() {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="contact.title" descriptionKey="contact.p1" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('contact.title')}</h1>
      <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
        <p>{t('contact.p1')}</p>
        <p>{t('contact.p2')}</p>
        <p>
          {t('contact.p3')} {" "}
          <a className="text-primary hover:underline" href="https://www.facebook.com/DSAUdk/" target="_blank" rel="noreferrer">Facebook</a>.
        </p>
        <address className="not-italic space-y-1">
          <div>
            <b>{t('contact.address')}: </b>Åbogade 34, Ada 124 - 8200 Aarhus N
          </div>
          <div>
            <b>{t('contact.mail')}: </b>
            <a className="text-primary hover:underline" href="mailto:dsau@dsau.dk">dsau@dsau.dk</a>
          </div>
        </address>
      </div>
    </div>
  );
}
