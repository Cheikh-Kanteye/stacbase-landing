'use client'

import { useEffect, useState } from 'react'
import { LANGS, LINKS, type Lang } from '@/lib/copy'
import { ArrowUpRight, InstagramIcon, LinkedInIcon } from './icons'

const NAV = {
  en: {
    links: [['/#product', 'Product'], ['/#tools', 'Tools'], ['/#pricing', 'Pricing'], ['/adafri', 'Adafri']],
    login: 'Sign in', start: 'Get started for free', menu: 'Menu', lang: 'Language',
  },
  fr: {
    links: [['/#product', 'Produit'], ['/#tools', 'Outils'], ['/#pricing', 'Tarifs'], ['/adafri', 'Adafri']],
    login: 'Se connecter', start: 'Commencer gratuitement', menu: 'Menu', lang: 'Langue',
  },
} as const

function LangSwitch({ lang, onLang, label }: { lang: Lang; onLang: (l: Lang) => void; label: string }) {
  return (
    <div className='lang-switch' role='group' aria-label={label}>
      {LANGS.map((code) => (
        <button key={code} type='button' lang={code} aria-pressed={lang === code} onClick={() => onLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

/** Barre de navigation commune à toutes les pages du site. */
export function SiteNav({ lang, onLang, current }: { lang: Lang; onLang: (l: Lang) => void; current?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = NAV[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className='nav-shell' data-scrolled={scrolled || open} data-open={open}>
      <header className='nav'>
        <a href='/' className='nav-brand' aria-label='Stacbase'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/media/stacbase-wordmark-color.png' alt='Stacbase' width={1600} height={290} />
        </a>
        <ul className='nav-links'>
          {t.links.map(([href, label]) => (
            <li key={href}>
              <a href={href} aria-current={current === href ? 'page' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className='nav-end'>
          <LangSwitch lang={lang} onLang={onLang} label={t.lang} />
          <a className='nav-login' href={LINKS.login}>
            {t.login}
          </a>
          <a className='btn btn-primary btn-sm' href={LINKS.signup}>
            {t.start}
          </a>
          <button
            type='button'
            className='nav-burger'
            aria-expanded={open}
            aria-label={t.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className='nav-sheet'>
        <div>
          <nav aria-label={t.menu}>
            {t.links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a href={LINKS.login}>{t.login}</a>
            <a href={LINKS.signup}>{t.start}</a>
            <LangSwitch lang={lang} onLang={onLang} label={t.lang} />
          </nav>
        </div>
      </div>
    </div>
  )
}

const FOOT = {
  en: {
    pitch: 'Less app juggling. More marketing done.',
    cols: [
      ['Product', [['/#tools', 'Explore all tools'], ['/#product', 'Features'], ['/#pricing', 'Pricing']]],
      ['Company', [['/adafri', 'About Stacbase'], [LINKS.linkedin, 'Community'], ['/careers', 'Careers']]],
      ['Legal', [[LINKS.privacy, 'Privacy'], [LINKS.terms, 'Terms']]],
    ],
    rights: 'Stacbase. All rights reserved.',
  },
  fr: {
    pitch: 'Moins de jonglage. Plus de marketing.',
    cols: [
      ['Produit', [['/#tools', 'Tous les outils'], ['/#product', 'Fonctionnalités'], ['/#pricing', 'Tarifs']]],
      ['Entreprise', [['/adafri', 'À propos de Stacbase'], [LINKS.linkedin, 'Communauté'], ['/careers', 'Carrières']]],
      ['Légal', [[LINKS.privacy, 'Confidentialité'], [LINKS.terms, 'Conditions']]],
    ],
    rights: 'Stacbase. Tous droits réservés.',
  },
} as const

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = FOOT[lang]
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-grid'>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/media/stacbase-wordmark-color.png' alt='Stacbase' width={1600} height={290} />
            <p>{t.pitch}</p>
          </div>
          {t.cols.map(([title, links]) => (
            <div className='footer-col' key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='footer-bottom'>
          <span>
            © {new Date().getFullYear()} {t.rights}
          </span>
          <div className='footer-social'>
            <a href={LINKS.instagram} target='_blank' rel='noreferrer' aria-label='Instagram'>
              <InstagramIcon />
            </a>
            <a href={LINKS.linkedin} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
              <LinkedInIcon />
            </a>
            <a href={LINKS.signup} aria-label={lang === 'fr' ? 'Ouvrir Stacbase' : 'Open Stacbase'}>
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
