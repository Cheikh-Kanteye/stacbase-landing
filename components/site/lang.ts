'use client'

import { useEffect, useState } from 'react'
import type { Lang } from '@/lib/copy'

const STORAGE_KEY = 'stacbase-landing-lang'

/**
 * Langue partagée par toutes les pages du site : le choix EN/FR fait sur une
 * page suit le visiteur sur les autres. Sans choix enregistré, chaque page
 * garde sa langue par défaut (anglais pour l'accueil, décision du 2026-10-11).
 */
export function useLang(fallback: Lang) {
  const [lang, setLang] = useState<Lang>(fallback)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'fr') setLang(saved)
    } catch {
      /* stockage indisponible : la langue par défaut de la page */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    // Les liens vers l'application emportent la langue : sans elle, un visiteur
    // qui lisait le site en français tombait sur une inscription en anglais.
    // Posée au clic, pour couvrir aussi les liens montés après coup (menu
    // mobile, cartes qui s'échangent).
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="https://work.stacbase.com/"]') as HTMLAnchorElement | null
      if (!link) return
      try {
        const url = new URL(link.href)
        url.searchParams.set('lang', lang)
        link.href = url.toString()
      } catch {
        /* lien inattendu : laissé tel quel */
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [lang])

  const choose = (next: Lang) => {
    setLang(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* préférence non mémorisée, sans conséquence */
    }
  }

  return [lang, choose] as const
}
