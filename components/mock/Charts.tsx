// Les deux graphiques demandés d'après Qarin (retour d'Abdou, 2026-10-23) :
// la courbe « Statistics » pour les pubs Meta et Google, et l'anneau de barres
// « Sales overview ». Données d'illustration.
import type { CSSProperties } from 'react'
import type { Lang } from '@/lib/copy'
import s from './Charts.module.css'

const T = {
  en: {
    stats: 'Ad performance', statsSub: 'Spend that turned into revenue', meta: 'Meta Ads', google: 'Google Ads',
    ring: 'Campaign goal', ringSub: 'Conversions reached', reached: 'Reached', search: 'Google Search', display: 'Display', social: 'Meta',
  },
  fr: {
    stats: 'Performance des pubs', statsSub: 'Le budget qui a rapporté', meta: 'Meta Ads', google: 'Google Ads',
    ring: 'Objectif de campagne', ringSub: 'Conversions atteintes', reached: 'Atteint', search: 'Google Search', display: 'Display', social: 'Meta',
  },
} as const

const money = (lang: Lang, n: number) =>
  lang === 'fr' ? `${n.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} $` : `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

/** Courbe lissée avec un point culminant annoncé par une info-bulle. */
export function AdsWave({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.card}>
      <p className={s.title}>{t.stats}</p>
      <p className={s.sub}>{t.statsSub}</p>
      <div className={s.waveBox}>
        <svg viewBox='0 0 300 130' className={s.wave} aria-hidden>
          <defs>
            <linearGradient id='wave-fade' x1='0' x2='1'>
              <stop offset='0%' stopColor='#7c3aed' stopOpacity='0' />
              <stop offset='18%' stopColor='#7c3aed' />
              <stop offset='82%' stopColor='#7c3aed' />
              <stop offset='100%' stopColor='#7c3aed' stopOpacity='0' />
            </linearGradient>
            <linearGradient id='wave-area' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='#7c3aed' stopOpacity='0.14' />
              <stop offset='100%' stopColor='#7c3aed' stopOpacity='0' />
            </linearGradient>
          </defs>
          {[30, 60, 90].map((y) => (
            <line key={y} x1='0' x2='300' y1={y} y2={y} className={s.grid} />
          ))}
          <path d='M0 70 C40 40 70 40 95 72 S150 100 185 34 S240 70 265 72 S290 60 300 55 L300 130 L0 130 Z' fill='url(#wave-area)' className={s.area} />
          <path d='M0 70 C40 40 70 40 95 72 S150 100 185 34 S240 70 265 72 S290 60 300 55' fill='none' stroke='url(#wave-fade)' strokeWidth='3' strokeLinecap='round' pathLength={1} className={s.line} />
          <line x1='185' x2='185' y1='34' y2='130' className={s.cursor} />
          <circle cx='185' cy='34' r='5' className={s.dot} />
        </svg>
        <span className={s.tip} style={{ left: `${(185 / 300) * 100}%` } as CSSProperties}>
          {money(lang, 6582)}
        </span>
      </div>
      <div className={s.totals}>
        <div>
          <span className={`${s.badge} ${s.badgeMeta}`}>f</span>
          <p>
            {t.meta}
            <strong>{money(lang, 18495)}</strong>
          </p>
        </div>
        <div>
          <span className={`${s.badge} ${s.badgeGoogle}`}>G</span>
          <p>
            {t.google}
            <strong>{money(lang, 8850)}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

const TICKS = 64
const VALUE = 0.78

/** Anneau de barres radiales : la part atteinte s'allume, le reste reste pâle. */
export function GoalRing({ lang }: { lang: Lang }) {
  const t = T[lang]
  const lit = Math.round(TICKS * VALUE)
  return (
    <div className={s.card}>
      <p className={s.title}>{t.ring}</p>
      <div className={s.ringBox}>
        <svg viewBox='0 0 200 200' className={s.ring} aria-hidden>
          {Array.from({ length: TICKS }, (_, i) => {
            const on = i < lit
            return (
              <line
                key={i}
                x1='100'
                y1='22'
                x2='100'
                y2='44'
                transform={`rotate(${(i / TICKS) * 360} 100 100)`}
                className={on ? s.tickOn : s.tick}
                style={{ '--i': i, stroke: on ? `hsl(${262 - (i / lit) * 70} 85% ${58 + (i / lit) * 6}%)` : undefined } as CSSProperties}
              />
            )
          })}
        </svg>
        <div className={s.ringCenter}>
          <strong>78%</strong>
          <span>{t.ringSub}</span>
        </div>
      </div>
      <ul className={s.legend}>
        <li><i style={{ background: '#7c3aed' }} />{t.search}</li>
        <li><i style={{ background: '#3b82f6' }} />{t.display}</li>
        <li><i style={{ background: '#f42a5c' }} />{t.social}</li>
        <li><i style={{ background: '#e8e6f1' }} />{t.reached} 78%</li>
      </ul>
    </div>
  )
}
