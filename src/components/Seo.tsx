import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'

function upsertMeta(selector: string, attrs: Record<string,string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k,v]) => el!.setAttribute(k, v))
}

export default function Seo({ titleKey, descriptionKey, image = '/DSAU_logo.png' }: { titleKey?: string; descriptionKey?: string; image?: string }) {
  const { t } = useI18n()
  useEffect(() => {
    const site = 'DSAU'
    const titleText = titleKey ? `${site} – ${t(titleKey)}` : `${site}`
    const descText = descriptionKey ? t(descriptionKey) : 'DSAU – Computer Science Student Association at Aarhus University.'
    document.title = titleText
    upsertMeta('meta[name="description"]', { name: 'description', content: descText })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: titleText })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: descText })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: titleText })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: descText })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  }, [t, titleKey, descriptionKey, image])
  return null
}

