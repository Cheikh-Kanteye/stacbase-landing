'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import ui from './ui.module.css'

type NavLink = readonly [href: string, label: string]

export type MenuLabels = { open: string; close: string }

/**
 * Menu des petits écrans : un bouton, et une feuille plein écran avec les
 * liens en grand. Un <dialog> natif : le focus y reste, Échap le ferme.
 */
function Menu({ labels, brand, links, children }: { labels: MenuLabels; brand: ReactNode; links: readonly NavLink[]; children?: ReactNode }) {
  const sheet = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button type='button' className={ui.burger} aria-label={labels.open} aria-haspopup='dialog' onClick={() => sheet.current?.showModal()}>
        <span />
        <span />
      </button>
      <dialog
        ref={sheet}
        className={ui.sheet}
        aria-label={labels.open}
        onClick={(event) => {
          // Un lien choisi : la feuille se referme, la page défile vers sa section.
          if ((event.target as HTMLElement).closest('a')) sheet.current?.close()
        }}
      >
        <div className={ui.sheetTop}>
          <span className={ui.brand}>{brand}</span>
          <button type='button' className={ui.sheetClose} aria-label={labels.close} onClick={() => sheet.current?.close()}>
            <svg aria-hidden width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <path d='M6 6l12 12M18 6 6 18' />
            </svg>
          </button>
        </div>
        <nav aria-label={labels.open}>
          {links.map(([href, label], i) => (
            <a key={href} href={href} style={{ animationDelay: `${80 + i * 60}ms` }}>
              {label}
            </a>
          ))}
        </nav>
        <div className={ui.sheetEnd}>{children}</div>
      </dialog>
    </>
  )
}

/** En-tête posé sur la photo du hero : marque, liens en pastille, langue, bouton. */
export function HeroHeader({
  brand,
  navLabel,
  links,
  lang,
  cta,
  menu,
}: {
  brand: ReactNode
  navLabel: string
  links: readonly NavLink[]
  lang: ReactNode
  cta: ReactNode
  menu: MenuLabels
}) {
  return (
    <header className={ui.header}>
      <a href='/' className={ui.brand}>
        {brand}
      </a>
      <nav aria-label={navLabel} className={ui.navPill}>
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className={ui.headEnd}>
        {lang}
        {cta}
        <Menu labels={menu} brand={brand} links={links}>
          {lang}
          {cta}
        </Menu>
      </div>
    </header>
  )
}

/**
 * Barre flottante : absente tant que le hero est à l'écran (il porte déjà la
 * navigation), elle descend dès qu'on l'a dépassé.
 */
export function Dock({
  brand,
  navLabel,
  links,
  cta,
  menu,
  yieldTo,
}: {
  brand: ReactNode
  navLabel: string
  links: readonly NavLink[]
  cta: ReactNode
  menu: MenuLabels
  /** Sélecteur d'une section épinglée plein écran : la barre s'efface tant qu'elle occupe la fenêtre. */
  yieldTo?: string
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85
      const pinned = yieldTo ? document.querySelector(`${yieldTo}[data-pinned='true']`)?.getBoundingClientRect() : null
      const immersed = !!pinned && pinned.top < 90 && pinned.bottom > window.innerHeight * 0.6
      setShown(past && !immersed)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [yieldTo])

  return (
    <div className={ui.dock} data-shown={shown} inert={!shown}>
      <a href='#top' className={ui.brand}>
        {brand}
      </a>
      <nav aria-label={navLabel}>
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      {cta}
      <Menu labels={menu} brand={brand} links={links}>
        {cta}
      </Menu>
    </div>
  )
}

/** Questions dépliables : du HTML natif, lisible et indexable sans JavaScript. */
export function Questions({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className={ui.faq}>
      {items.map(([q, a], i) => (
        <details key={q} name='faq' open={i === 0} data-reveal>
          <summary>
            <h3>{q}</h3>
            <i aria-hidden />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

export const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M7 17 17 7M9 7h8v8' />
  </svg>
)
