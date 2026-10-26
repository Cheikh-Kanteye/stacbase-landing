// La première vue du site : l'interface de Stacbase redessinée en HTML/CSS,
// fidèle à la mise en page de l'app (rail des hubs, sous-menu Publicité,
// barre du haut, rapport de campagne). Données de démonstration.
import type { CSSProperties } from 'react'
import type { Lang } from '@/lib/copy'
import {
  Bell, Calendar, Chart, Chat, Doc, Globe, Home, Image, Mail, Megaphone, Phone, Search, Sparkle, Thumb, Users,
} from '../site/icons'
import s from './AppReport.module.css'

const T = {
  en: {
    rail: ['Home', 'CollabHub', 'Marketing', 'Ads', 'Tools', 'DocHub'],
    connectors: 'Connectors',
    section: 'Advertising',
    sub: ['Meta', 'Google Display', 'Google Search', 'Max it', 'Bulk WhatsApp', 'E-mailing'],
    simple: 'Simple', advanced: 'Advanced', plan: 'Pro', user: 'Jacob Miller', org: 'Bloom Studio',
    back: 'Campaigns', status: 'Live', serving: 'Serving since Sep 27, 2026',
    periods: ['7 days', '30 days', '90 days'],
    tabs: ['Overview', 'Performance', 'Audience', 'Creatives', 'Placements', 'Devices', 'Locations'],
    kpis: [['Spend', '$2,254', '+22%'], ['Impressions', '416.1K', '+35%'], ['Clicks', '10,735', '+43%'], ['CTR', '2.58%', '+6%'], ['Conversions', '910', '+51%']],
    vs: 'vs previous period',
    perf: 'Performance over time', impressions: 'Impressions', clicks: 'Clicks',
    devices: 'Devices', deviceRows: [['Mobile', '68%'], ['Desktop', '24%'], ['Tablet', '6%'], ['Connected TV', '2%']],
    edit: 'Edit',
  },
  fr: {
    rail: ['Accueil', 'CollabHub', 'Marketing', 'Publicité', 'Outils', 'DocHub'],
    connectors: 'Connecteurs',
    section: 'Publicité',
    sub: ['Meta', 'Google Display', 'Google Search', 'Max it', 'WhatsApp en masse', 'E-mailing'],
    simple: 'Simple', advanced: 'Avancé', plan: 'Pro', user: 'Jacob Miller', org: 'Bloom Studio',
    back: 'Campagnes', status: 'En ligne', serving: 'En diffusion depuis le 27 sept. 2026',
    periods: ['7 jours', '30 jours', '90 jours'],
    tabs: ['Aperçu', 'Performances', 'Audience', 'Créatifs', 'Emplacements', 'Appareils', 'Lieux'],
    kpis: [['Dépense', '2 254 $', '+22 %'], ['Impressions', '416,1 k', '+35 %'], ['Clics', '10 735', '+43 %'], ['CTR', '2,58 %', '+6 %'], ['Conversions', '910', '+51 %']],
    vs: 'vs période précédente',
    perf: 'Performances au fil du temps', impressions: 'Impressions', clicks: 'Clics',
    devices: 'Répartition des appareils', deviceRows: [['Mobile', '68 %'], ['Ordinateur', '24 %'], ['Tablette', '6 %'], ['TV connectée', '2 %']],
    edit: 'Modifier',
  },
} as const

const RAIL_ICONS = [Home, Chat, Chart, Megaphone, Calendar, Doc]
const SUB_ICONS = [Thumb, Image, Globe, Phone, Chat, Mail]
const KPI_ICONS = [Megaphone, Search, Sparkle, Chart, Users]
const DEVICE_COLORS = ['#7c3aed', '#38bdf8', '#2dd4bf', '#94a3b8']

// 30 jours d'impressions et de clics, en coordonnées 0–100.
const IMPRESSIONS = [44, 48, 52, 55, 56, 55, 52, 50, 49, 50, 53, 58, 63, 68, 72, 75, 77, 78, 77, 76, 75, 75, 76, 78, 81, 84, 87, 90, 92, 95]
const CLICKS = [18, 19, 21, 23, 23, 22, 21, 21, 22, 23, 25, 27, 30, 32, 34, 36, 37, 38, 38, 37, 37, 38, 39, 41, 43, 45, 47, 49, 51, 53]

function smooth(points: readonly number[], w: number, h: number) {
  const step = w / (points.length - 1)
  return points
    .map((v, i) => {
      const x = i * step
      const y = h - (v / 100) * h
      if (i === 0) return `M${x},${y}`
      const px = (i - 1) * step
      const py = h - (points[i - 1] / 100) * h
      const cx = (px + x) / 2
      return `C${cx},${py} ${cx},${y} ${x},${y}`
    })
    .join(' ')
}

export function AppReport({ lang }: { lang: Lang }) {
  const t = T[lang]
  const W = 560
  const H = 150
  const imp = smooth(IMPRESSIONS, W, H)
  const clk = smooth(CLICKS, W, H)
  // Anneau des appareils : 68 / 24 / 6 / 2.
  const shares = [68, 24, 6, 2]
  let offset = 0
  return (
    <div className={s.app}>
      <div className={s.chrome}>
        <span />
        <span />
        <span />
        <p>work.stacbase.com</p>
      </div>
      <div className={s.body}>
        {/* Rail sombre des hubs */}
        <nav className={s.rail} aria-hidden>
          <span className={s.org}>BS</span>
          {t.rail.map((label, i) => {
            const Icon = RAIL_ICONS[i]
            return (
              <span key={label} className={s.railItem} data-on={i === 3 || undefined}>
                <Icon size={15} />
                {label}
              </span>
            )
          })}
          <span className={`${s.railItem} ${s.railFoot}`}>
            <Sparkle size={15} />
            {t.connectors}
          </span>
        </nav>

        {/* Sous-menu du hub Publicité */}
        <nav className={s.sub} aria-hidden>
          <p className={s.brand}>
            <span>S</span> Stacbase
          </p>
          <p className={s.section}>{t.section}</p>
          {t.sub.map((label, i) => {
            const Icon = SUB_ICONS[i]
            return (
              <span key={label} className={s.subItem} data-on={i === 1 || undefined}>
                <Icon size={13} />
                {label}
              </span>
            )
          })}
        </nav>

        <div className={s.main}>
          {/* Barre du haut */}
          <div className={s.top}>
            <span className={s.mode}>
              <i>{t.simple}</i>
              <b>{t.advanced}</b>
            </span>
            <span className={s.lang}>EN FR</span>
            <span className={s.plan}>◆ {t.plan}</span>
            <Bell size={14} />
            <span className={s.user}>
              <span>
                <b>{t.user}</b>
                <i>{t.org}</i>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src='/media/people/portrait.jpg' alt='' width={26} height={26} />
            </span>
          </div>

          <div className={s.page}>
            <p className={s.back}>← {t.back}</p>
            <div className={s.head}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.visual} src='/media/people/four-faces.jpg' alt='' width={120} height={70} />
              <div className={s.headText}>
                <p className={s.title}>
                  Summer Sale 2026 <em>● {t.status}</em>
                </p>
                <p className={s.meta}>google · Display · Bloom Studio</p>
                <p className={s.serving}>{t.serving}</p>
              </div>
              <div className={s.headEnd}>
                <span className={s.edit}>✎ {t.edit}</span>
                <span className={s.periods}>
                  {t.periods.map((p, i) => (
                    <i key={p} data-on={i === 1 || undefined}>
                      {p}
                    </i>
                  ))}
                </span>
              </div>
            </div>

            <div className={s.tabs}>
              {t.tabs.map((tab, i) => (
                <span key={tab} data-on={i === 0 || undefined}>
                  {tab}
                </span>
              ))}
            </div>

            <div className={s.kpis}>
              {t.kpis.map(([label, value, delta], i) => {
                const Icon = KPI_ICONS[i]
                return (
                  <div key={label} className={s.kpi} style={{ '--i': i } as CSSProperties}>
                    <span className={s.kpiIcon}>
                      <Icon size={13} />
                    </span>
                    <div>
                      <p>{label}</p>
                      <strong>
                        {value} <em data-up={i > 0 || undefined}>↑ {delta}</em>
                      </strong>
                      <span>{t.vs}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={s.grid}>
              <div className={s.card}>
                <div className={s.cardHead}>
                  <p>{t.perf}</p>
                  <span className={s.legend}>
                    <i style={{ background: '#7c3aed' }} /> {t.impressions}
                    <i style={{ background: '#10b981' }} /> {t.clicks}
                  </span>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} preserveAspectRatio='none' aria-hidden>
                  <defs>
                    <linearGradient id='report-fill' x1='0' x2='0' y1='0' y2='1'>
                      <stop offset='0%' stopColor='#7c3aed' stopOpacity='0.22' />
                      <stop offset='100%' stopColor='#7c3aed' stopOpacity='0' />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((g) => (
                    <line key={g} x1='0' x2={W} y1={H * g} y2={H * g} className={s.gridLine} />
                  ))}
                  <path d={`${imp} L${W},${H} L0,${H} Z`} fill='url(#report-fill)' className={s.area} />
                  <path d={imp} className={s.line} pathLength={1} />
                  <path d={clk} className={`${s.line} ${s.line2}`} pathLength={1} />
                </svg>
              </div>

              <div className={s.card}>
                <div className={s.cardHead}>
                  <p>{t.devices}</p>
                </div>
                <div className={s.devices}>
                  <div className={s.donut}>
                    <svg viewBox='0 0 120 120' aria-hidden>
                      {shares.map((share, i) => {
                        const el = (
                          <circle
                            key={i}
                            cx='60'
                            cy='60'
                            r='46'
                            pathLength={100}
                            className={s.arc}
                            style={{ stroke: DEVICE_COLORS[i], strokeDasharray: `${share} ${100 - share}`, strokeDashoffset: -offset, '--i': i } as CSSProperties}
                          />
                        )
                        offset += share
                        return el
                      })}
                    </svg>
                    <span>
                      <b>416,1 k</b>
                      <i>{t.impressions}</i>
                    </span>
                  </div>
                  <ul>
                    {t.deviceRows.map(([label, value], i) => (
                      <li key={label}>
                        <i style={{ background: DEVICE_COLORS[i] }} />
                        {label}
                        <b>{value}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
