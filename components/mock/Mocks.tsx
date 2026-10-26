// Écrans de l'application redessinés pour le site : mêmes surfaces, même
// violet, mêmes pastilles que work.stacbase.com. Données d'illustration.
import type { CSSProperties } from 'react'
import type { Lang } from '@/lib/copy'
import {
  Bell, Calendar, Chart, Chat, Check, Doc, Home, Mail, Megaphone, Pen, Search, Sparkle, Users, Wallet,
} from '../site/icons'
import s from './Mocks.module.css'

const T = {
  en: {
    nav: ['Home', 'Campaigns', 'WhatsApp', 'CRM', 'E-mails', 'Analytics', 'Invoices', 'AI agent'],
    hello: 'Good morning, Jacob', today: 'Here is your day at ACME Studio',
    search: 'Search anything…',
    kpis: [['Spend', '$1,240', '+12%'], ['Clicks', '8,432', '+8%'], ['Conversions', '312', '+21%'], ['E-mails opened', '42%', '+3%']],
    perf: 'Campaign performance', last: 'Last 14 days', clicks: 'Clicks', conv: 'Conversions',
    sheet: 'Day sheet',
    sheetItems: [['09:00', 'Review the Search campaign', 'done'], ['11:30', 'E-mail newsletter · 2,000 contacts', 'live'], ['14:00', 'Send the invoice to Maple Foods', 'todo'], ['16:30', 'Client call · Harbor Hotel', 'todo']],
    campaigns: 'Campaigns', cols: ['Campaign', 'Channel', 'Status', 'Spend'],
    rows: [['Summer sale', 'Search', 'Live', '$420'], ['Brand awareness', 'Display', 'Live', '$310'], ['New collection', 'Meta', 'Paused', '$180']],
    live: 'Live', paused: 'Paused', delivered: 'Delivered', sent: 'Sent', reading: 'Read',
    waHello: 'Hello Cynthia 👋', waBody: 'Our new collection is here: −20% this weekend only. Reply YES to receive the catalogue.',
    waYes: 'YES, please!', sending: 'Sending · Weekend promo',
    pipe: [['Harbor Hotel', 'Proposal', '$2,400'], ['Maple Foods', 'Won', '$1,150'], ['Bloom Studio', 'Contacted', '$900']],
    sessions: 'Sessions', sources: [['Organic search', 46], ['Social', 28], ['Paid', 18], ['Direct', 8]],
    rate: 'Conversion rate', vsLast: 'vs last month',
    invoice: 'Invoice', billed: 'Billed to', total: 'Total', signed: 'Signed',
    lines: [['Search campaign setup', '$350'], ['Monthly management', '$600'], ['Creative pack', '$250']],
    week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    posts: [[0, 'Instagram', 'Teaser'], [1, 'LinkedIn', 'Case study'], [2, 'Facebook', 'Promo'], [3, 'Instagram', 'Reel'], [4, 'LinkedIn', 'Hiring']],
    kanban: [['Contacted', ['Bloom Studio', 'Brooklyn Bikes']], ['Proposal', ['Harbor Hotel']], ['Won', ['Maple Foods', 'Summit Tech']]],
    ask: 'Summarise last week’s campaigns and draft an e-mail follow-up for clients who clicked.',
    answer: 'Spend $1,240 (+12%), 312 conversions. Search performs best (CPC $0.21). Draft ready for 184 contacts:',
    draft: '“Hello {first name}, thanks for your visit! Here is your −20% code: HARBOR20.”',
    agent: 'Stacbase agent',
  },
  fr: {
    nav: ['Accueil', 'Campagnes', 'WhatsApp', 'CRM', 'E-mails', 'Analytics', 'Factures', 'Agent IA'],
    hello: 'Bonjour, Jacob', today: 'Voici votre journée chez ACME Studio',
    search: 'Rechercher…',
    kpis: [['Dépenses', '1 240 $', '+12 %'], ['Clics', '8 432', '+8 %'], ['Conversions', '312', '+21 %'], ['E-mails ouverts', '42 %', '+3 %']],
    perf: 'Performance des campagnes', last: '14 derniers jours', clicks: 'Clics', conv: 'Conversions',
    sheet: 'Feuille de service',
    sheetItems: [['09:00', 'Revoir la campagne Search', 'done'], ['11:30', 'Newsletter e-mail · 2 000 contacts', 'live'], ['14:00', 'Envoyer la facture à Maple Foods', 'todo'], ['16:30', 'Appel client · Harbor Hotel', 'todo']],
    campaigns: 'Campagnes', cols: ['Campagne', 'Canal', 'Statut', 'Dépenses'],
    rows: [['Soldes d’été', 'Search', 'En ligne', '420 $'], ['Notoriété', 'Display', 'En ligne', '310 $'], ['Nouvelle collection', 'Meta', 'En pause', '180 $']],
    live: 'En ligne', paused: 'En pause', delivered: 'Livrés', sent: 'Envoyés', reading: 'Lus',
    waHello: 'Bonjour Cynthia 👋', waBody: 'Notre nouvelle collection est arrivée : −20 % ce week-end seulement. Répondez OUI pour recevoir le catalogue.',
    waYes: 'OUI, avec plaisir !', sending: 'Envoi · Promo du week-end',
    pipe: [['Harbor Hotel', 'Proposition', '2 400 $'], ['Maple Foods', 'Gagné', '1 150 $'], ['Bloom Studio', 'Contacté', '900 $']],
    sessions: 'Sessions', sources: [['Recherche naturelle', 46], ['Réseaux sociaux', 28], ['Payant', 18], ['Direct', 8]],
    rate: 'Taux de conversion', vsLast: 'vs mois dernier',
    invoice: 'Facture', billed: 'Facturé à', total: 'Total', signed: 'Signée',
    lines: [['Mise en place Search', '350 $'], ['Gestion mensuelle', '600 $'], ['Pack créatif', '250 $']],
    week: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    posts: [[0, 'Instagram', 'Teaser'], [1, 'LinkedIn', 'Étude de cas'], [2, 'Facebook', 'Promo'], [3, 'Instagram', 'Reel'], [4, 'LinkedIn', 'Recrutement']],
    kanban: [['Contacté', ['Bloom Studio', 'Brooklyn Bikes']], ['Proposition', ['Harbor Hotel']], ['Gagné', ['Maple Foods', 'Summit Tech']]],
    ask: 'Résume les campagnes de la semaine dernière et prépare une relance par e-mail pour les clients qui ont cliqué.',
    answer: 'Dépenses 1 240 $ (+12 %), 312 conversions. Le Search performe le mieux (CPC 0,21 $). Brouillon prêt pour 184 contacts :',
    draft: '« Bonjour {prénom}, merci de votre visite ! Voici votre code −20 % : HARBOR20. »',
    agent: 'Agent Stacbase',
  },
} as const

const NAV_ICONS = [Home, Megaphone, Chat, Users, Mail, Chart, Wallet, Sparkle]

// Courbes du graphique (14 points), en coordonnées 0–100.
const CLICKS = [38, 42, 40, 51, 48, 57, 55, 63, 60, 70, 66, 74, 79, 86]
const CONV = [18, 20, 19, 24, 22, 27, 30, 29, 34, 33, 38, 41, 40, 47]

function path(points: readonly number[], w = 560, h = 160) {
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

function LineChart({ big = false }: { big?: boolean }) {
  const w = 560
  const h = big ? 170 : 120
  const clicks = path(CLICKS, w, h)
  const conv = path(CONV, w, h)
  return (
    <svg className={s.chart} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio='none' aria-hidden>
      <defs>
        <linearGradient id={`fill-${big}`} x1='0' x2='0' y1='0' y2='1'>
          <stop offset='0%' stopColor='#7c3aed' stopOpacity='0.22' />
          <stop offset='100%' stopColor='#7c3aed' stopOpacity='0' />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1='0' x2={w} y1={h * g} y2={h * g} className={s.grid} />
      ))}
      <path d={`${clicks} L${w},${h} L0,${h} Z`} fill={`url(#fill-${big})`} className={s.area} />
      <path d={clicks} className={s.line} pathLength={1} />
      <path d={conv} className={`${s.line} ${s.line2}`} pathLength={1} />
    </svg>
  )
}

function Pill({ tone, children }: { tone: 'green' | 'amber' | 'violet' | 'slate' | 'pink'; children: React.ReactNode }) {
  return <span className={`${s.pill} ${s[tone]}`}>{children}</span>
}

const channelTone = (c: string) => (c === 'Meta' ? 'pink' : c === 'Display' ? 'slate' : 'violet') as 'pink' | 'slate' | 'violet'

/**
 * La vraie interface de Stacbase (capture du rapport d'une campagne Google
 * Display), dans le cadre de navigateur des maquettes.
 */
export function AppShot({ alt }: { alt: string }) {
  return (
    <div className={s.app}>
      <div className={s.chrome}>
        <span />
        <span />
        <span />
        <p>work.stacbase.com</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.shot} src='/media/dashboard-stacbase.png' alt={alt} width={1920} height={995} />
    </div>
  )
}

/** Le tableau de bord complet, pour la première vue. */
export function AppMock({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.app}>
      <div className={s.chrome}>
        <span />
        <span />
        <span />
        <p>work.stacbase.com</p>
      </div>
      <div className={s.appBody}>
        <aside className={s.side}>
          <div className={s.sideLogo}>
            <span>S</span> Stacbase
          </div>
          {t.nav.map((label, i) => {
            const Icon = NAV_ICONS[i]
            return (
              <div key={label} className={s.sideItem} data-active={i === 0 || undefined}>
                <Icon size={15} /> {label}
              </div>
            )
          })}
        </aside>
        <div className={s.main}>
          <div className={s.top}>
            <div>
              <p className={s.hello}>{t.hello}</p>
              <p className={s.sub}>{t.today}</p>
            </div>
            <div className={s.topEnd}>
              <div className={s.search}>
                <Search size={14} /> {t.search}
              </div>
              <span className={s.iconBtn}>
                <Bell size={15} />
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.avatarImg} src='/media/people/portrait.jpg' alt='' width={30} height={30} />
            </div>
          </div>
          <div className={s.kpis}>
            {t.kpis.map(([label, value, delta], i) => (
              <div key={label} className={s.kpi} style={{ '--i': i } as CSSProperties}>
                <p>{label}</p>
                <strong>{value}</strong>
                <span>{delta}</span>
              </div>
            ))}
          </div>
          <div className={s.grid2}>
            <div className={s.card}>
              <div className={s.cardHead}>
                <p>{t.perf}</p>
                <span className={s.select}>{t.last}</span>
              </div>
              <div className={s.legend}>
                <span>
                  <i className={s.dotViolet} /> {t.clicks}
                </span>
                <span>
                  <i className={s.dotPink} /> {t.conv}
                </span>
              </div>
              <LineChart big />
            </div>
            <div className={s.card}>
              <div className={s.cardHead}>
                <p>{t.sheet}</p>
                <Calendar size={15} />
              </div>
              <ul className={s.sheet}>
                {t.sheetItems.map(([time, label, state], i) => (
                  <li key={label} style={{ '--i': i } as CSSProperties} data-state={state}>
                    <span className={s.check}>{state === 'done' ? <Check size={11} /> : null}</span>
                    <div>
                      <p>{label}</p>
                      <span>{time}</span>
                    </div>
                    {state === 'live' ? <Pill tone='green'>{t.live}</Pill> : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.cardHead}>
              <p>{t.campaigns}</p>
            </div>
            <table className={s.table}>
              <thead>
                <tr>
                  {t.cols.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map(([name, channel, status, spend], i) => (
                  <tr key={name} style={{ '--i': i } as CSSProperties}>
                    <td>{name}</td>
                    <td>
                      <Pill tone={channelTone(channel)}>{channel}</Pill>
                    </td>
                    <td>
                      <Pill tone={status === t.paused ? 'amber' : 'green'}>{status}</Pill>
                    </td>
                    <td>{spend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Petites vues pour les cartes ──────────────────────────────────────── */

export function MiniCampaign({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.mini}>
      <div className={s.cardHead}>
        <p>{t.kpis[1][0]}</p>
        <span className={s.delta}>{t.kpis[1][2]}</span>
      </div>
      <strong className={s.miniValue}>{t.kpis[1][1]}</strong>
      <LineChart />
      <div className={s.chips}>
        <Pill tone='violet'>Search</Pill>
        <Pill tone='slate'>Display</Pill>
        <Pill tone='pink'>Meta</Pill>
      </div>
    </div>
  )
}

export function MiniWhatsApp({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={`${s.mini} ${s.wa}`}>
      <div className={s.bubble}>
        <strong>{t.waHello}</strong>
        <p>{t.waBody}</p>
        <span>11:30 ✓✓</span>
      </div>
      <div className={`${s.bubble} ${s.bubbleOut}`}>
        <p>{t.waYes}</p>
        <span>11:32</span>
      </div>
      <div className={s.progress}>
        <div className={s.progressHead}>
          <span>{t.sending}</span>
          <strong>1 842 / 2 000</strong>
        </div>
        <div className={s.bar}>
          <i style={{ '--w': '92%' } as CSSProperties} />
        </div>
      </div>
    </div>
  )
}

const POSTS = {
  en: { title: 'Scheduled posts', items: [['Mon 09:00', 'Instagram', 'New collection teaser'], ['Wed 12:30', 'LinkedIn', 'Client case study'], ['Fri 18:00', 'Facebook', 'Weekend offer']] },
  fr: { title: 'Posts programmés', items: [['Lun 09:00', 'Instagram', 'Teaser nouvelle collection'], ['Mer 12:30', 'LinkedIn', 'Étude de cas client'], ['Ven 18:00', 'Facebook', 'Offre du week-end']] },
} as const

/** Publication sur les réseaux : trois posts programmés, un par réseau. */
export function MiniPosts({ lang }: { lang: Lang }) {
  const t = POSTS[lang]
  return (
    <div className={s.mini}>
      <div className={s.cardHead}>
        <p>{t.title}</p>
      </div>
      <ul className={s.pipe}>
        {t.items.map(([when, net, label], i) => (
          <li key={label} style={{ '--i': i } as CSSProperties}>
            <span className={s.initials} data-tone={i}>{net[0]}</span>
            <div>
              <p>{label}</p>
              <span>{when}</span>
            </div>
            <Pill tone={net === 'Instagram' ? 'pink' : net === 'LinkedIn' ? 'violet' : 'slate'}>{net}</Pill>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MiniCrm({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.mini}>
      <ul className={s.pipe}>
        {t.pipe.map(([name, stage, amount], i) => (
          <li key={name} style={{ '--i': i } as CSSProperties}>
            <span className={s.initials} data-tone={i}>
              {name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
            <div>
              <p>{name}</p>
              <span>{amount}</span>
            </div>
            <Pill tone={i === 1 ? 'green' : i === 0 ? 'violet' : 'slate'}>{stage}</Pill>
          </li>
        ))}
      </ul>
    </div>
  )
}

const BARS = [42, 55, 48, 66, 58, 74, 88]

export function MiniAnalytics({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.mini}>
      <div className={s.cardHead}>
        <p>{t.sessions}</p>
        <span className={s.delta}>+18 %</span>
      </div>
      <div className={s.bars}>
        {BARS.map((v, i) => (
          <i key={i} style={{ '--h': `${v}%`, '--i': i } as CSSProperties} />
        ))}
      </div>
      <ul className={s.sources}>
        {t.sources.slice(0, 3).map(([label, v], i) => (
          <li key={label} style={{ '--i': i } as CSSProperties}>
            <span>{label}</span>
            <div className={s.bar}>
              <i style={{ '--w': `${v}%` } as CSSProperties} />
            </div>
            <strong>{v} %</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Feuille de service + taux de conversion, pour la section « journée ». */
export function DayMock({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.dayWrap}>
      <div className={`${s.card} ${s.dayCard}`}>
        <div className={s.cardHead}>
          <p>{t.sheet}</p>
          <Calendar size={15} />
        </div>
        <ul className={s.sheet}>
          {t.sheetItems.map(([time, label, state], i) => (
            <li key={label} style={{ '--i': i } as CSSProperties} data-state={state}>
              <span className={s.check}>{state === 'done' ? <Check size={11} /> : null}</span>
              <div>
                <p>{label}</p>
                <span>{time}</span>
              </div>
              {state === 'live' ? <Pill tone='green'>{t.live}</Pill> : null}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${s.card} ${s.ringCard}`}>
        <p className={s.ringLabel}>{t.rate}</p>
        <div className={s.ring}>
          <svg viewBox='0 0 120 120' aria-hidden>
            <circle cx='60' cy='60' r='50' className={s.ringTrack} />
            <circle cx='60' cy='60' r='50' className={s.ringValue} pathLength={100} />
          </svg>
          <strong>78 %</strong>
        </div>
        <p className={s.ringFoot}>
          <span className={s.delta}>+6 %</span> {t.vsLast}
        </p>
      </div>
    </div>
  )
}

/* ── Vues de la boîte à outils (une par onglet) ────────────────────────── */

function AdsView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.pane}>
      <div className={s.kpis}>
        {t.kpis.slice(0, 3).map(([label, value, delta], i) => (
          <div key={label} className={s.kpi} style={{ '--i': i } as CSSProperties}>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{delta}</span>
          </div>
        ))}
      </div>
      <div className={s.card}>
        <LineChart big />
      </div>
      <div className={s.card}>
        <table className={s.table}>
          <tbody>
            {t.rows.map(([name, channel, status, spend], i) => (
              <tr key={name} style={{ '--i': i } as CSSProperties}>
                <td>{name}</td>
                <td>
                  <Pill tone={channelTone(channel)}>{channel}</Pill>
                </td>
                <td>
                  <Pill tone={status === t.paused ? 'amber' : 'green'}>{status}</Pill>
                </td>
                <td>{spend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WhatsAppView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={`${s.pane} ${s.paneSplit}`}>
      <div className={s.card}>
        <div className={s.kpis3}>
          {[[t.sent, '2 000'], [t.delivered, '1 962'], [t.reading, '1 540']].map(([label, value], i) => (
            <div key={label} className={s.kpi} style={{ '--i': i } as CSSProperties}>
              <p>{label}</p>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className={s.progress}>
          <div className={s.progressHead}>
            <span>{t.sending}</span>
            <strong>98 %</strong>
          </div>
          <div className={s.bar}>
            <i style={{ '--w': '98%' } as CSSProperties} />
          </div>
        </div>
      </div>
      <div className={`${s.phone} ${s.wa}`}>
        <div className={s.bubble}>
          <strong>{t.waHello}</strong>
          <p>{t.waBody}</p>
          <span>11:30 ✓✓</span>
        </div>
        <div className={`${s.bubble} ${s.bubbleOut}`}>
          <p>{t.waYes}</p>
          <span>11:32</span>
        </div>
      </div>
    </div>
  )
}

function CrmView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={`${s.pane} ${s.kanban}`}>
      {t.kanban.map(([col, cards], c) => (
        <div key={col} className={s.column}>
          <p>
            {col} <span>{cards.length}</span>
          </p>
          {cards.map((name, i) => (
            <div key={name} className={s.deal} style={{ '--i': c * 2 + i } as CSSProperties}>
              <span className={s.initials} data-tone={(c + i) % 3}>
                {name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              <p>{name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function ContentView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={`${s.pane} ${s.week}`}>
      {t.week.map((day, d) => (
        <div key={day} className={s.day}>
          <p>{day}</p>
          {t.posts
            .filter(([i]) => i === d)
            .map(([, net, label]) => (
              <div key={label} className={s.post} data-net={net} style={{ '--i': d } as CSSProperties}>
                <span>{net}</span>
                <p>{label}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

function DocsView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={s.pane}>
      <div className={`${s.card} ${s.invoice}`}>
        <div className={s.cardHead}>
          <p>
            {t.invoice} <span className={s.mono}>#2026-104</span>
          </p>
          <span className={s.stamp}>
            <Pen size={13} /> {t.signed}
          </span>
        </div>
        <p className={s.billed}>
          {t.billed} <strong>Maple Foods</strong>
        </p>
        <ul>
          {t.lines.map(([label, amount], i) => (
            <li key={label} style={{ '--i': i } as CSSProperties}>
              <span>
                <Doc size={14} /> {label}
              </span>
              <strong>{amount}</strong>
            </li>
          ))}
        </ul>
        <div className={s.total}>
          <span>{t.total}</span>
          <strong>{lang === 'fr' ? '1 200 $' : '$1,200'}</strong>
        </div>
      </div>
    </div>
  )
}

function AiView({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <div className={`${s.pane} ${s.chat}`}>
      <div className={s.ask}>{t.ask}</div>
      <div className={s.answer}>
        <span className={s.agentName}>
          <Sparkle size={14} /> {t.agent}
        </span>
        <p>{t.answer}</p>
        <p className={s.draft}>{t.draft}</p>
      </div>
    </div>
  )
}

export const POWER_VIEWS = [AdsView, WhatsAppView, CrmView, ContentView, DocsView, AiView]
export const POWER_ICONS = [Megaphone, Chat, Users, Calendar, Doc, Sparkle]
