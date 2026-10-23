'use client'

import { useEffect, useRef } from 'react'
import type { Lang } from '@/lib/copy'
import s from './Manifesto.module.css'

const LETTER: Record<Lang, { image: string; file: string; name: string }> = {
  fr: { image: '/media/manifeste-fr.webp', file: '/media/manifeste-stacbase-fr.jpeg', name: 'manifeste-stacbase.jpeg' },
  en: { image: '/media/manifesto-en.webp', file: '/media/manifesto-stacbase-en.jpeg', name: 'stacbase-manifesto.jpeg' },
}

const T = {
  fr: { title: 'Le manifeste', subtitle: 'Lettre de l’associé · co-owner Stacbase', download: 'Télécharger la lettre', close: 'Fermer', alt: 'Lettre de l’associé, co-owner Stacbase. Objet : manifeste.' },
  en: { title: 'The manifesto', subtitle: 'Letter from a partner · Stacbase co-owner', download: 'Download the letter', close: 'Close', alt: 'Letter from a partner, Stacbase co-owner. Subject: manifesto.' },
}

/**
 * La lettre à la communauté, en fenêtre au-dessus de la page, avec son
 * téléchargement. Elle renvoyait vers une note de l'application où le
 * manifeste se perdait au milieu d'autres sujets (retour d'Abdou, 2026-10-22).
 */
export function Manifesto({ lang, open, onClose }: { lang: Lang; open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const letter = LETTER[lang]
  const t = T[lang]

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-labelledby='manifesto-title'
      onClose={onClose}
      onClick={(event) => {
        // Un clic sur le voile (hors de la fenêtre) ferme.
        if (event.target === dialog.current) onClose()
      }}
    >
      <div className={s.panel}>
        <header className={s.head}>
          <div>
            <h2 id='manifesto-title'>{t.title}</h2>
            <p>{t.subtitle}</p>
          </div>
          <div className={s.actions}>
            <a className='btn btn-primary btn-sm' href={letter.file} download={letter.name}>
              <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
                <path d='M12 4v11M7 10l5 5 5-5M5 20h14' />
              </svg>
              {t.download}
            </a>
            <button type='button' className={s.close} onClick={onClose} aria-label={t.close}>
              <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' aria-hidden>
                <path d='M6 6l12 12M18 6 6 18' />
              </svg>
            </button>
          </div>
        </header>
        <div className={s.body}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={letter.image} alt={t.alt} width={758} height={1072} />
        </div>
      </div>
    </dialog>
  )
}
