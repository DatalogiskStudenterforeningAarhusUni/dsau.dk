import React, { createContext, useContext, useMemo } from 'react'
import en from './en.json'
import da from './da.json'

export type Lang = 'en' | 'da'

type Dict = typeof en

const DICTS: Record<Lang, Dict> = { en, da }

interface I18nValue {
  lang: Lang
  t: (path: string) => string
}

const I18nContext = createContext<I18nValue>({
  lang: 'da',
  t: (k) => k,
})

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const dict = DICTS[lang] ?? DICTS.da
  const t = useMemo(() => (path: string) => get(dict, path) ?? path, [dict])
  const value = useMemo(() => ({ lang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

function get(obj: any, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, key) => (acc && key in acc ? acc[key] : undefined), obj)
}

