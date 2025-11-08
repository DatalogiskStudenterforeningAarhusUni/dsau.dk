import data from "../data/data.json";
import Member from "../components/Member";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Board() {
  const { t, lang } = useI18n()
  return (
    <div className="container mx-auto px-4 py-8">
      <Seo titleKey="board.title" descriptionKey="board.intro" />
      <h1 className="text-3xl font-bold mb-4 text-foreground dark:text-white">{t('board.title')}</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t('board.intro')}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d: any) => (
          <Member
            key={d.name}
            name={d.name}
            image={d.image}
            imagePosition={d.imagePosition}
            imageFocus={d.imageFocus}
            title={(d.title && d.title[lang]) || d.title}
            email={d.email}
            class={d.class}
          />
        ))}
      </div>
    </div>
  );
}
