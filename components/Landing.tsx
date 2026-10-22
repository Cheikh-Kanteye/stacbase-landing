'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { COPY, LANGS, LINKS, type Lang } from '@/lib/copy'
import { InkReveal } from './InkReveal'

const STORAGE_KEY = 'stacbase-landing-lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    /* stockage indisponible : on retombe sur l'anglais */
  }
  // Anglais pour tout le monde (décision du 2026-10-11) : la langue du
  // navigateur n'est pas consultée, seul le choix EN/FR l'emporte.
  return 'en'
}

function InstagramIcon() {
  return (
    <svg viewBox='0 0 24 24' width='26' height='26' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden>
      <rect x='3' y='3' width='18' height='18' rx='5' />
      <circle cx='12' cy='12' r='4.2' />
      <circle cx='17.3' cy='6.7' r='1' fill='currentColor' stroke='none' />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox='0 0 24 24' width='26' height='26' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden>
      <path d='M5 9.5v10M5 5.2v.3' strokeLinecap='round' />
      <path d='M10 19.5v-10M10 13.6c0-2.4 1.6-4.3 3.9-4.3 2.4 0 3.6 1.6 3.6 4.4v5.8' strokeLinecap='round' />
    </svg>
  )
}

export function Landing() {
  const [lang, setLang] = useState<Lang>('en')
  const [live, setLive] = useState(false)
  const stageRef = useRef<HTMLElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)
  const copy = COPY[lang]

  useEffect(() => setLang(initialLang()), [])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const choose = (next: Lang) => {
    setLang(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* préférence non mémorisée, sans conséquence */
    }
  }

  const onReady = useCallback(() => setLive(true), [])

  return (
    <main className='page'>
      <header className='top'>
        <div className='intro'>
          <p className='headline'>{copy.headline}</p>
          <p className='subline'>{copy.subline}</p>
        </div>

        {/* Un lien, simplement : le mot et une flèche légère. */}
        <a className='cta' href={LINKS.signup} aria-label={copy.ctaLabel}>
          {copy.cta}
          <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden>
            <path d='M5 12h13M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </a>

        <nav className='social' aria-label='Social'>
          <a href={LINKS.instagram} target='_blank' rel='noreferrer' aria-label={copy.instagram}>
            <InstagramIcon />
          </a>
          <a href={LINKS.linkedin} target='_blank' rel='noreferrer' aria-label={copy.linkedin}>
            <LinkedInIcon />
          </a>
        </nav>
      </header>

      <section ref={stageRef} className='stage' data-live={live ? 'true' : 'false'}>
        <h1 className='mark-wrap'>
          <span className='open'>{copy.open}</span>
          <span ref={markRef} className='mark'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/media/stacbase-wordmark.png' alt={copy.wordmarkAlt} width={1600} height={400} draggable={false} />
          </span>
        </h1>
        <InkReveal
          stageRef={stageRef}
          markRef={markRef}
          videoSrc='/media/stacbase-logo.mp4'
          onReady={onReady}
        />
      </section>

      <footer className='bottom'>
        <p className='tagline'>
          {copy.tagline.map((segment, index) => {
            const content =
              segment.tone === 'highlight' ? (
                <span className='chip'>{segment.text}</span>
              ) : segment.tone === 'strong' ? (
                <strong>{segment.text}</strong>
              ) : (
                segment.text
              )
            return <span key={index}>{content}</span>
          })}
        </p>

        <div className='legal'>
          <a href='/adafri'>{lang === 'fr' ? 'Adafri devient Stacbase' : 'Adafri becomes Stacbase'}</a>
          <span aria-hidden>|</span>
          <a href='/careers'>{lang === 'fr' ? 'Carrières' : 'Careers'}</a>
          <span aria-hidden>|</span>
          <a href={LINKS.privacy}>{copy.privacy}</a>
          <span aria-hidden>|</span>
          <a href={LINKS.terms}>{copy.terms}</a>
          <div className='lang' role='group' aria-label={copy.langLabel}>
            {LANGS.map((code) => (
              <button
                key={code}
                type='button'
                aria-pressed={lang === code}
                onClick={() => choose(code)}
                lang={code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
