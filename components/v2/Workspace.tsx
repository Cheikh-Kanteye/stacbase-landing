'use client'

// Le bloc « workspace » : l'application redessinée en HTML/CSS, épinglée à
// l'écran pendant qu'on fait défiler. Chaque cran de défilement ouvre un hub,
// comme si le visiteur cliquait dans le rail. Sur petit écran (ou si les
// animations sont réduites), les hubs se choisissent au doigt.
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { TOOL_HUBS, type Lang } from '@/lib/copy'
import { Bell, Calendar, Chart, Chat, Check, Doc, Megaphone, Search } from '../site/icons'
import ui from './ui.module.css'
import s from './Workspace.module.css'

/** Les cinq hubs montrés, et leur rang dans `TOOL_HUBS` (le registre de l'app). */
const HUBS = [
  { id: 'collab', registry: 2, Icon: Chat },
  { id: 'marketing', registry: 1, Icon: Chart },
  { id: 'ads', registry: 0, Icon: Megaphone },
  { id: 'tools', registry: 3, Icon: Calendar },
  { id: 'docs', registry: 4, Icon: Doc },
] as const

const T = {
  en: {
    title: 'Then, the workspace.',
    lead: 'Five hubs, one login. Keep scrolling and look around: this is what members open every morning.',
    note: 'Sample workspace with example data.',
    group: 'Hubs',
    hubs: ['Collab', 'Marketing', 'Ads', 'Tools', 'Docs'],
    titles: ['Mailing and team chat', 'CRM and editorial calendar', 'Meta, Google Search and Display', 'Tasks and invoices', 'Notes and e-signature'],
    search: 'Search',
    soon: 'Soon',
    collab: {
      inbox: 'Inbox',
      unread: '3 unread',
      mails: [
        ['Harbor Hotel', 'Can we push the spring campaign live on Monday?', '09:12'],
        ['Maple Foods', 'Invoice received, thanks. Paying this week.', '08:40'],
        ['Bloom Studio', 'New brief attached for the summer launch.', 'Yesterday'],
      ],
      channel: '#harbor-hotel',
      team: 'Team chat',
      chat: [
        ['in', 'Client wants Monday. Creatives are ready, budget approved.'],
        ['out', 'Scheduling it now. I’ll reply from the shared inbox.'],
        ['in', 'Perfect. Task added for the Monday check.'],
      ],
      typing: 'Lena is typing',
      compose: 'Message #harbor-hotel',
    },
    marketing: {
      columns: [
        ['Lead', [['Bloom Studio', '$2,400', 'from Meta campaign'], ['Northline Gym', '$900', 'from newsletter']]],
        ['Proposal', [['Harbor Hotel', '$4,800', 'e-sign sent']]],
        ['Won', [['Maple Foods', '$1,800', 'invoiced']]],
      ],
      deals: ['2 deals', '1 deal', '1 deal'],
      calendar: 'Editorial calendar, this week',
      week: [['Mon', 'Instagram reel'], ['Tue', 'LinkedIn post'], ['Wed', 'Blog article'], ['Thu', 'Facebook story'], ['Fri', 'Newsletter']],
    },
    ads: {
      kpis: [['Spend, last 30 days', '$2,510'], ['Clicks', '9,340'], ['New contacts in CRM', '184']],
      chart: 'Clicks per day',
      cols: ['Campaign', 'Channel', 'Spend', 'Clicks', 'Contacts'],
      rows: [
        ['Summer sale', 'Meta Ads', '$1,240', '5,120', '112'],
        ['Brand search', 'Google Search', '$860', '2,980', '58'],
        ['Retargeting', 'Google Display', '$410', '1,240', '14'],
      ],
    },
    tools: {
      tasks: 'Tasks, this week',
      progress: '{done} of {all} done',
      items: ['Approve Harbor Hotel creatives', 'Monday check: spring campaign live', 'Send Bloom Studio proposal', 'Brief the summer launch'],
      invoice: 'Invoice INV-0042',
      sent: 'Sent',
      client: 'Maple Foods',
      lines: [['Campaign management', '$1,200'], ['Content production', '$600']],
      total: 'Total',
      amount: '$1,800',
    },
    docs: {
      note: 'Notes',
      heading: 'Kickoff with Harbor Hotel',
      body: [
        'Goal: fill the spring weekends. Budget split 60% Meta, 40% Google.',
        'Weekly report every Friday, shared from the workspace.',
        'Next: proposal for the summer launch, signed before May.',
      ],
      split: 'Budget split',
      proposal: 'Proposal, Harbor Hotel',
      esign: 'E-signature',
      you: 'You',
      signed: 'Signed',
      them: 'Client',
      waiting: 'Waiting',
    },
  },
  fr: {
    title: 'Ensuite, l’espace de travail.',
    lead: 'Cinq hubs, une seule connexion. Continuez à défiler et regardez autour de vous : c’est ce que les membres ouvrent chaque matin.',
    note: 'Espace de démonstration, données d’exemple.',
    group: 'Hubs',
    hubs: ['Collab', 'Marketing', 'Publicité', 'Outils', 'Docs'],
    titles: ['Messagerie et chat d’équipe', 'CRM et calendrier éditorial', 'Meta, Google Search et Display', 'Tâches et factures', 'Notes et signature électronique'],
    search: 'Rechercher',
    soon: 'Bientôt',
    collab: {
      inbox: 'Boîte de réception',
      unread: '3 non lus',
      mails: [
        ['Harbor Hotel', 'Peut-on lancer la campagne de printemps lundi ?', '09:12'],
        ['Maple Foods', 'Facture bien reçue, merci. Paiement cette semaine.', '08:40'],
        ['Bloom Studio', 'Nouveau brief en pièce jointe pour le lancement d’été.', 'Hier'],
      ],
      channel: '#harbor-hotel',
      team: 'Chat d’équipe',
      chat: [
        ['in', 'Le client veut lundi. Les visuels sont prêts, le budget est validé.'],
        ['out', 'Je la programme. Je réponds depuis la boîte partagée.'],
        ['in', 'Parfait. Tâche ajoutée pour le contrôle de lundi.'],
      ],
      typing: 'Lena écrit',
      compose: 'Écrire dans #harbor-hotel',
    },
    marketing: {
      columns: [
        ['Prospect', [['Bloom Studio', '2 400 $', 'via la campagne Meta'], ['Northline Gym', '900 $', 'via la newsletter']]],
        ['Proposition', [['Harbor Hotel', '4 800 $', 'signature envoyée']]],
        ['Gagné', [['Maple Foods', '1 800 $', 'facturé']]],
      ],
      deals: ['2 affaires', '1 affaire', '1 affaire'],
      calendar: 'Calendrier éditorial, cette semaine',
      week: [['Lun', 'Reel Instagram'], ['Mar', 'Post LinkedIn'], ['Mer', 'Article de blog'], ['Jeu', 'Story Facebook'], ['Ven', 'Newsletter']],
    },
    ads: {
      kpis: [['Dépense, 30 derniers jours', '2 510 $'], ['Clics', '9 340'], ['Nouveaux contacts CRM', '184']],
      chart: 'Clics par jour',
      cols: ['Campagne', 'Canal', 'Dépense', 'Clics', 'Contacts'],
      rows: [
        ['Soldes d’été', 'Meta Ads', '1 240 $', '5 120', '112'],
        ['Recherche de marque', 'Google Search', '860 $', '2 980', '58'],
        ['Reciblage', 'Google Display', '410 $', '1 240', '14'],
      ],
    },
    tools: {
      tasks: 'Tâches, cette semaine',
      progress: '{done} sur {all} terminées',
      items: ['Valider les visuels Harbor Hotel', 'Contrôle de lundi : campagne de printemps en ligne', 'Envoyer la proposition Bloom Studio', 'Préparer le brief du lancement d’été'],
      invoice: 'Facture INV-0042',
      sent: 'Envoyée',
      client: 'Maple Foods',
      lines: [['Gestion de campagne', '1 200 $'], ['Production de contenu', '600 $']],
      total: 'Total',
      amount: '1 800 $',
    },
    docs: {
      note: 'Notes',
      heading: 'Lancement avec Harbor Hotel',
      body: [
        'Objectif : remplir les week-ends de printemps. Budget réparti 60 % Meta, 40 % Google.',
        'Rapport chaque vendredi, partagé depuis l’espace de travail.',
        'Ensuite : proposition pour le lancement d’été, signée avant mai.',
      ],
      split: 'Répartition du budget',
      proposal: 'Proposition, Harbor Hotel',
      esign: 'Signature électronique',
      you: 'Vous',
      signed: 'Signé',
      them: 'Client',
      waiting: 'En attente',
    },
  },
} as const

type Tx = (typeof T)[Lang]

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
}

/* ── Les cinq vues ─────────────────────────────────────────────────────── */

function CollabView({ t }: { t: Tx }) {
  const c = t.collab
  return (
    <div className={`${s.view} ${s.collab}`}>
      <div className={s.inbox}>
        <p className={s.label}>
          {c.inbox} <em>{c.unread}</em>
        </p>
        {c.mails.map(([from, line, time], i) => (
          <div key={from} className={s.mail} data-on={i === 0 || undefined} style={stagger(i)}>
            <span className={s.avatar} data-tone={i}>
              {initials(from)}
            </span>
            <div>
              <p>
                <b>{from}</b>
                <time>{time}</time>
              </p>
              <span>{line}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={s.thread}>
        <p className={s.label}>
          {c.team} <em>{c.channel}</em>
        </p>
        {c.chat.map(([side, text], i) => (
          <p key={text} className={s.bubble} data-side={side} style={stagger(i)}>
            {text}
          </p>
        ))}
        <p className={s.typing} style={stagger(3)}>
          <i />
          <i />
          <i />
          <span>{c.typing}</span>
        </p>
        <p className={s.composer}>
          {c.compose}
          <i>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M5 12h14M13 6l6 6-6 6' />
            </svg>
          </i>
        </p>
      </div>
    </div>
  )
}

function MarketingView({ t }: { t: Tx }) {
  const m = t.marketing
  return (
    <div className={`${s.view} ${s.marketing}`}>
      <div className={s.kanban}>
        {m.columns.map(([name, cards], col) => (
          <div key={name} className={s.column}>
            <p className={s.label}>
              {name} <em>{m.deals[col]}</em>
            </p>
            {cards.map(([client, amount, source], i) => (
              <div key={client} className={s.deal} style={stagger(col * 2 + i)}>
                <b>{client}</b>
                <span>
                  <strong>{amount}</strong> · {source}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className={s.label}>{m.calendar}</p>
      <div className={s.week}>
        {m.week.map(([day, post], i) => (
          <div key={day} className={s.day} style={stagger(i + 4)}>
            <span>{day}</span>
            <b data-tone={i % 3}>{post}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

// 30 jours de clics, en coordonnées 0–100.
const CLICKS = [22, 26, 24, 31, 35, 33, 38, 44, 41, 47, 52, 49, 55, 61, 58, 63, 60, 66, 72, 69, 74, 79, 76, 82, 80, 86, 90, 88, 93, 97]

function curve(points: readonly number[], w: number, h: number) {
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

function AdsView({ t }: { t: Tx }) {
  const a = t.ads
  const W = 640
  const H = 120
  const line = curve(CLICKS, W, H)
  return (
    <div className={`${s.view} ${s.ads}`}>
      <div className={s.kpis}>
        {a.kpis.map(([label, value], i) => (
          <div key={label} className={s.kpi} style={stagger(i)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className={s.chartCard} style={stagger(3)}>
        <p className={s.label}>{a.chart}</p>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio='none' aria-hidden>
          <defs>
            <linearGradient id='ws-fill' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='#5b2be0' stopOpacity='0.24' />
              <stop offset='100%' stopColor='#5b2be0' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path d={`${line} L${W},${H} L0,${H} Z`} fill='url(#ws-fill)' className={s.area} />
          <path d={line} pathLength={1} className={s.line} />
        </svg>
      </div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              {a.cols.map((col, i) => (
                <th key={col} data-num={i > 1 || undefined}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {a.rows.map(([name, channel, spend, clicks, contacts], i) => (
              <tr key={name} style={stagger(i + 4)}>
                <td>{name}</td>
                <td>
                  <span className={s.channel} data-tone={i}>
                    {channel}
                  </span>
                </td>
                <td data-num>{spend}</td>
                <td data-num>{clicks}</td>
                <td data-num>{contacts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ToolsView({ t }: { t: Tx }) {
  const c = t.tools
  const [done, setDone] = useState<readonly boolean[]>([true, false, false, false])
  const count = done.filter(Boolean).length
  return (
    <div className={`${s.view} ${s.toolsView}`}>
      <div className={s.tasks}>
        <p className={s.label}>
          {c.tasks} <em>{c.progress.replace('{done}', String(count)).replace('{all}', String(done.length))}</em>
        </p>
        <i className={s.meter} style={{ '--w': count / done.length } as CSSProperties} />
        {c.items.map((item, i) => (
          <label key={item} className={s.task} data-done={done[i] || undefined} style={stagger(i)}>
            <input type='checkbox' checked={done[i]} onChange={() => setDone(done.map((d, k) => (k === i ? !d : d)))} />
            <span className={s.box}>
              <Check size={12} />
            </span>
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className={s.invoice} style={stagger(2)}>
        <p>
          <b>{c.invoice}</b>
          <span className={s.ok}>{c.sent}</span>
        </p>
        <span className={s.dim}>{c.client}</span>
        <ul>
          {c.lines.map(([label, amount]) => (
            <li key={label}>
              <span>{label}</span>
              <span>{amount}</span>
            </li>
          ))}
        </ul>
        <p className={s.total}>
          <span>{c.total}</span>
          <strong>{c.amount}</strong>
        </p>
      </div>
    </div>
  )
}

function DocsView({ t }: { t: Tx }) {
  const d = t.docs
  return (
    <div className={`${s.view} ${s.docs}`}>
      <article className={s.note}>
        <p className={s.label}>{d.note}</p>
        <h4>{d.heading}</h4>
        {d.body.map((line, i) => (
          <p key={line} style={stagger(i)}>
            {line}
          </p>
        ))}
        <div className={s.split}>
          <p className={s.label}>{d.split}</p>
          {([['Meta', 60], ['Google', 40]] as const).map(([name, share]) => (
            <p key={name}>
              <span>{name}</span>
              <i style={{ '--w': share / 100 } as CSSProperties} />
              <b>{share}%</b>
            </p>
          ))}
        </div>
      </article>
      <div className={s.sign} style={stagger(2)}>
        <b>{d.proposal}</b>
        <span className={s.dim}>{d.esign}</span>
        <svg viewBox='0 0 220 64' className={s.signature} aria-hidden>
          <path pathLength={1} d='M8 44c10-22 20-34 26-30 8 6-14 40-6 42 9 2 16-30 26-30 7 0-4 22 4 22 9 0 12-20 22-20 8 0-3 20 6 20 12 0 16-26 30-26 9 0-4 24 8 24 14 0 26-14 56-18' />
        </svg>
        <p>
          <span>{d.you}</span>
          <span className={s.ok}>{d.signed}</span>
        </p>
        <p>
          <span>{d.them}</span>
          <span className={s.wait}>{d.waiting}</span>
        </p>
      </div>
    </div>
  )
}

const VIEWS = [CollabView, MarketingView, AdsView, ToolsView, DocsView]
const PIN_QUERY = '(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)'
const AUTO_MS = 6500
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export function Workspace({ lang }: { lang: Lang }) {
  const t = T[lang]
  const section = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [manual, setManual] = useState(false)
  const [visible, setVisible] = useState(false)

  // Épinglé seulement là où ça tient : grand écran, animations acceptées.
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY)
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Le défilement pilote tout : l'entrée de l'écran (--enter), le hub ouvert
  // et l'avancée dans le hub courant (--lp). Écrit en variables CSS, React
  // n'est sollicité que lorsque le hub change.
  useEffect(() => {
    const el = section.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      el.style.setProperty('--enter', clamp((vh - r.top) / vh).toFixed(3))
      if (!pinned) return
      const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 0.9999) * HUBS.length
      const i = Math.floor(p)
      el.style.setProperty('--lp', (p - i).toFixed(3))
      setActive((prev) => (prev === i ? prev : i))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pinned])

  // Sans épinglage, les hubs avancent seuls tant que personne n'a choisi.
  useEffect(() => {
    const el = section.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const auto = !pinned && !manual && visible
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % HUBS.length), AUTO_MS)
    return () => window.clearTimeout(id)
  }, [auto, active])

  const select = (i: number) => {
    const el = section.current
    if (pinned && el) {
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      window.scrollTo({ top: window.scrollY + r.top + (span * (i + 0.08)) / HUBS.length, behavior: 'smooth' })
      return
    }
    setManual(true)
    setActive(i)
  }

  const hub = HUBS[active]
  const View = VIEWS[active]
  const registry = TOOL_HUBS[lang][hub.registry]

  return (
    <section
      id='workspace'
      ref={section}
      className={s.section}
      data-pinned={pinned}
      data-auto={auto || undefined}
      aria-labelledby='ws-title'
      style={{ '--hubs': HUBS.length, '--auto': `${AUTO_MS}ms` } as CSSProperties}
    >
      <div className={s.sticky}>
        <div className={`${ui.wrap} ${s.inner}`}>
          <div className={s.head}>
            <h2 id='ws-title' className={ui.h2}>
              {t.title}
            </h2>
            <p>{t.lead}</p>
          </div>

          <div role='group' aria-label={t.group} className={s.pills}>
            {HUBS.map((h, i) => (
              <button key={h.id} type='button' aria-pressed={active === i} data-past={i < active || undefined} onClick={() => select(i)}>
                <h.Icon size={16} />
                {t.hubs[i]}
                <i aria-hidden />
              </button>
            ))}
          </div>

          <div className={s.stage}>
            <div className={s.glow} data-hub={hub.id} aria-hidden />
            <div className={s.frame}>
              <div className={s.chrome} aria-hidden>
                <span />
                <span />
                <span />
                <p>
                  work.stacbase.com/<b>{hub.id}</b>
                </p>
              </div>
              <div className={s.app}>
                <nav className={s.rail} aria-hidden>
                  <span className={s.org}>Sb</span>
                  {HUBS.map((h, i) => (
                    <button key={h.id} type='button' tabIndex={-1} data-on={active === i || undefined} onClick={() => select(i)}>
                      <h.Icon size={17} />
                      {t.hubs[i]}
                    </button>
                  ))}
                </nav>

                <div className={s.sub} aria-hidden>
                  <p className={s.subTitle}>{registry.hub}</p>
                  <div key={hub.id} className={s.subList}>
                    {registry.tools.map((tool, i) => (
                      <span key={tool.name} data-on={i === 0 || undefined} style={stagger(i)}>
                        {tool.name}
                        {tool.soon ? <em>{t.soon}</em> : null}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.main}>
                  <div className={s.top}>
                    <p aria-live='polite'>
                      <b>{registry.hub}</b>
                      <span>{t.titles[active]}</span>
                    </p>
                    <span className={s.search} aria-hidden>
                      <Search size={14} /> {t.search}
                    </span>
                    <Bell size={16} />
                    <span className={s.me} aria-hidden>
                      AM
                    </span>
                  </div>
                  <View key={`${hub.id}-${lang}`} t={t} />
                </div>
              </div>
            </div>
          </div>

          <p className={s.note}>{t.note}</p>
        </div>
      </div>
    </section>
  )
}
