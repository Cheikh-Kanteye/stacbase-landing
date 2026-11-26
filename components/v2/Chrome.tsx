'use client'

import { useEffect, useState, type ReactNode } from 'react'
import ui from './ui.module.css'

type NavLink = readonly [href: string, label: string]

/** En-tête posé sur la photo du hero : marque, liens en pastille, langue, bouton. */
export function HeroHeader({
  brand,
  navLabel,
  links,
  lang,
  cta,
}: {
  brand: ReactNode
  navLabel: string
  links: readonly NavLink[]
  lang: ReactNode
  cta: ReactNode
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
  yieldTo,
}: {
  brand: ReactNode
  navLabel: string
  links: readonly NavLink[]
  cta: ReactNode
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
