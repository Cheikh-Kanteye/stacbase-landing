'use client'

// Le bloc « workspace » : l'application redessinée en HTML/CSS, épinglée à
// l'écran pendant qu'on fait défiler. Chaque cran de défilement ouvre un
// produit, comme si le visiteur cliquait dans l'app. Sur petit écran (ou si
// les animations sont réduites), les produits se choisissent au doigt.
//
// L'ordre suit ce que les community managers demandent d'abord : publier,
// écouter, noter. La publicité et la messagerie d'équipe viennent ensuite.
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { TOOL_HUBS, type Lang } from '@/lib/copy'
import { Bell, Calendar, Chart, Chat, Doc, Megaphone, Pen, Search } from '../site/icons'
import ui from './ui.module.css'
import s from './Workspace.module.css'

/** Le rail de l'app : ses cinq hubs, et leur rang dans `TOOL_HUBS`. */
const RAIL = [
  { id: 'collab', registry: 2, Icon: Chat },
  { id: 'marketing', registry: 1, Icon: Chart },
  { id: 'ads', registry: 0, Icon: Megaphone },
  { id: 'tools', registry: 3, Icon: Calendar },
  { id: 'docs', registry: 4, Icon: Doc },
] as const

/**
 * Les produits montrés, dans l'ordre. `rail` : le hub qui s'allume ; `tool` :
 * l'entrée active du sous-menu ; `soon` : annoncé dans l'app, pas encore ouvert.
 */
const TABS = [
  { id: 'publisher', path: 'post-publisher', rail: 1, tool: 0, Icon: Pen, soon: false },
  { id: 'listening', path: 'social-listening', rail: 1, tool: 2, Icon: Search, soon: true },
  { id: 'notes', path: 'notes', rail: 4, tool: 0, Icon: Doc, soon: false },
  { id: 'ads', path: 'advertising', rail: 2, tool: 0, Icon: Megaphone, soon: false },
  { id: 'collab', path: 'collabhub', rail: 0, tool: 0, Icon: Chat, soon: false },
] as const

const T = {
  en: {
    title: 'Then, the workspace.',
    lead: 'It starts where community managers start: publish, listen, take notes. Ads and the team inbox sit one click away.',
    note: 'Sample workspace with example data. Social listening is on the way.',
    group: 'Products',
    tabs: ['Post Publisher', 'Social listening', 'Notes', 'Ads', 'Collab'],
    titles: ['Write once, publish everywhere', 'What people say about your brand', 'Briefs and notes, shared', 'Meta, Google Search and Display', 'Mailing and team chat'],
    rail: ['Collab', 'Marketing', 'Ads', 'Tools', 'Docs'],
    search: 'Search',
    soon: 'Soon',
    publisher: {
      draft: 'New post',
      text: 'Spring weekends are back at Harbor Hotel. Rooftop brunch from Saturday, book your table before Friday.',
      alt: 'Post visual',
      to: 'Publish to',
      nets: ['Instagram', 'Facebook', 'LinkedIn'],
      when: 'Thu, 6:00 PM',
      schedule: 'Schedule',
      queue: 'This week',
      count: '4 posts',
      slots: [
        ['Mon 09:00', 'Rooftop teaser, reel', 'Instagram', 'Published'],
        ['Wed 12:30', 'Chef interview', 'LinkedIn', 'Scheduled'],
        ['Thu 18:00', 'Rooftop brunch', 'Instagram + Facebook', 'Draft'],
        ['Fri 10:00', 'Weekend offer', 'Facebook', 'Scheduled'],
      ],
    },
    listening: {
      kpis: [['Mentions, this week', '128'], ['Positive', '72%'], ['To answer', '3']],
      mood: 'Sentiment',
      moods: ['Positive', 'Neutral', 'Negative'],
      feed: 'Latest mentions',
      mentions: [
        ['Instagram', '@lea.voyage', 'Best weekend at Harbor Hotel, the rooftop is unreal.', 0],
        ['Facebook', 'Marc D.', 'Booked through the spring offer, smooth check-in.', 0],
        ['Google', 'Sam K.', 'Waited 20 minutes at reception on Saturday.', 2],
      ],
      reply: 'Reply',
      topics: 'Trending words',
      words: ['rooftop', 'spring offer', 'brunch', 'check-in'],
    },
    notes: {
      list: 'Notes',
      items: [['Kickoff with Harbor Hotel', 'Today'], ['Brief, summer launch', 'Yesterday'], ['Content ideas, May', 'Monday'], ['Client call recap', 'Last week']],
      shared: 'Shared with 3 people',
      heading: 'Kickoff with Harbor Hotel',
      body: [
        'Goal: fill the spring weekends. Budget split 60% Meta, 40% Google.',
        'Weekly report every Friday, shared from the workspace.',
        'Next: proposal for the summer launch, signed before May.',
      ],
      split: 'Budget split',
    },
    ads: {
      kpis: [['Spend, last 30 days', '$2,510'], ['Clicks', '9,340'], ['New contacts', '184']],
      chart: 'Clicks per day',
      cols: ['Campaign', 'Channel', 'Spend', 'Clicks', 'Contacts'],
      rows: [
        ['Summer sale', 'Meta Ads', '$1,240', '5,120', '112'],
        ['Brand search', 'Google Search', '$860', '2,980', '58'],
        ['Retargeting', 'Google Display', '$410', '1,240', '14'],
      ],
    },
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
  },
  fr: {
    title: 'Ensuite, l’espace de travail.',
    lead: 'Il commence là où commencent les community managers : publier, écouter, prendre des notes. La publicité et la messagerie d’équipe sont à un clic.',
    note: 'Espace de démonstration, données d’exemple. Le social listening arrive bientôt.',
    group: 'Produits',
    tabs: ['Post Publisher', 'Social listening', 'Notes', 'Publicité', 'Collab'],
    titles: ['Écrire une fois, publier partout', 'Ce qu’on dit de votre marque', 'Briefs et notes, partagés', 'Meta, Google Search et Display', 'Messagerie et chat d’équipe'],
    rail: ['Collab', 'Marketing', 'Publicité', 'Outils', 'Docs'],
    search: 'Rechercher',
    soon: 'Bientôt',
    publisher: {
      draft: 'Nouveau post',
      text: 'Les week-ends de printemps sont de retour au Harbor Hotel. Brunch sur le toit dès samedi, réservez votre table avant vendredi.',
      alt: 'Visuel du post',
      to: 'Publier sur',
      nets: ['Instagram', 'Facebook', 'LinkedIn'],
      when: 'Jeu. 18:00',
      schedule: 'Programmer',
      queue: 'Cette semaine',
      count: '4 posts',
      slots: [
        ['Lun 09:00', 'Teaser du toit, reel', 'Instagram', 'Publié'],
        ['Mer 12:30', 'Interview du chef', 'LinkedIn', 'Programmé'],
        ['Jeu 18:00', 'Brunch sur le toit', 'Instagram + Facebook', 'Brouillon'],
        ['Ven 10:00', 'Offre du week-end', 'Facebook', 'Programmé'],
      ],
    },
    listening: {
      kpis: [['Mentions, cette semaine', '128'], ['Positives', '72 %'], ['À traiter', '3']],
      mood: 'Tonalité',
      moods: ['Positive', 'Neutre', 'Négative'],
      feed: 'Dernières mentions',
      mentions: [
        ['Instagram', '@lea.voyage', 'Meilleur week-end au Harbor Hotel, le toit est incroyable.', 0],
        ['Facebook', 'Marc D.', 'Réservé avec l’offre de printemps, arrivée sans attente.', 0],
        ['Google', 'Sam K.', 'Vingt minutes d’attente à la réception samedi.', 2],
      ],
      reply: 'Répondre',
      topics: 'Mots qui montent',
      words: ['toit', 'offre de printemps', 'brunch', 'arrivée'],
    },
    notes: {
      list: 'Notes',
      items: [['Lancement avec Harbor Hotel', 'Aujourd’hui'], ['Brief, lancement d’été', 'Hier'], ['Idées de contenus, mai', 'Lundi'], ['Compte rendu d’appel client', 'La semaine dernière']],
      shared: 'Partagée avec 3 personnes',
      heading: 'Lancement avec Harbor Hotel',
      body: [
        'Objectif : remplir les week-ends de printemps. Budget réparti 60 % Meta, 40 % Google.',
        'Rapport chaque vendredi, partagé depuis l’espace de travail.',
        'Ensuite : proposition pour le lancement d’été, signée avant mai.',
      ],
      split: 'Répartition du budget',
    },
    ads: {
      kpis: [['Dépense, 30 derniers jours', '2 510 $'], ['Clics', '9 340'], ['Nouveaux contacts', '184']],
      chart: 'Clics par jour',
      cols: ['Campagne', 'Canal', 'Dépense', 'Clics', 'Contacts'],
      rows: [
        ['Soldes d’été', 'Meta Ads', '1 240 $', '5 120', '112'],
        ['Recherche de marque', 'Google Search', '860 $', '2 980', '58'],
        ['Reciblage', 'Google Display', '410 $', '1 240', '14'],
      ],
    },
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
  },
} as const

type Tx = (typeof T)[Lang]

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

function initials(name: string) {
  return name
    .replace('@', '')
    .split(/[ .]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .join('')
    .slice(0, 2)
}

/* ── Les cinq vues ─────────────────────────────────────────────────────── */

/** Post Publisher : un post en cours d'écriture, et la file de la semaine. */
function PublisherView({ t }: { t: Tx }) {
  const p = t.publisher
  const [nets, setNets] = useState<readonly boolean[]>([true, true, false])
  return (
    <div className={`${s.view} ${s.publisher}`}>
      <div className={s.compose}>
        <p className={s.label}>{p.draft}</p>
        <div className={s.post}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='/media/people/four-faces.jpg' alt={p.alt} width={1199} height={685} loading='lazy' />
          <p>
            {p.text}
            <i aria-hidden />
          </p>
        </div>
        <p className={s.label}>{p.to}</p>
        <div className={s.nets}>
          {p.nets.map((net, i) => (
            <button key={net} type='button' aria-pressed={nets[i]} onClick={() => setNets(nets.map((on, k) => (k === i ? !on : on)))}>
              {net}
            </button>
          ))}
        </div>
        <div className={s.send}>
          <span>
            <Calendar size={15} /> {p.when}
          </span>
          <b>{p.schedule}</b>
        </div>
      </div>
      <div className={s.queue}>
        <p className={s.label}>
          {p.queue} <em>{p.count}</em>
        </p>
        {p.slots.map(([when, title, net, state], i) => (
          <div key={title} className={s.slot} data-state={i === 0 ? 'done' : i === 2 ? 'draft' : 'planned'} style={stagger(i)}>
            <time>{when}</time>
            <div>
              <b>{title}</b>
              <span>{net}</span>
            </div>
            <em>{state}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Social listening : mentions, tonalité, mots qui montent. Annoncé, pas encore ouvert. */
function ListeningView({ t }: { t: Tx }) {
  const l = t.listening
  const shares = [72, 21, 7]
  return (
    <div className={`${s.view} ${s.listening}`}>
      <div className={s.kpis}>
        {l.kpis.map(([label, value], i) => (
          <div key={label} className={s.kpi} style={stagger(i)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className={s.mood} style={stagger(2)}>
        <p className={s.label}>{l.mood}</p>
        <div className={s.moodBar} aria-hidden>
          {shares.map((share, i) => (
            <i key={i} data-tone={i} style={{ '--w': share } as CSSProperties} />
          ))}
        </div>
        <ul>
          {l.moods.map((mood, i) => (
            <li key={mood} data-tone={i}>
              {mood} <b>{shares[i]}%</b>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.feed}>
        <p className={s.label}>{l.feed}</p>
        {l.mentions.map(([net, who, text, tone], i) => (
          <div key={who} className={s.mention} style={stagger(i + 3)}>
            <span className={s.avatar} data-tone={i}>
              {initials(who)}
            </span>
            <div>
              <p>
                <b>{who}</b>
                <span>{net}</span>
              </p>
              <span>{text}</span>
            </div>
            <em data-tone={tone}>{tone === 2 ? l.reply : l.moods[tone]}</em>
          </div>
        ))}
      </div>
      <div className={s.words}>
        <p className={s.label}>{l.topics}</p>
        {l.words.map((word, i) => (
          <span key={word} style={stagger(i + 5)}>
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Notes : la liste des notes de l'équipe, et la note ouverte. */
function NotesView({ t }: { t: Tx }) {
  const n = t.notes
  return (
    <div className={`${s.view} ${s.notes}`}>
      <div className={s.noteList}>
        <p className={s.label}>{n.list}</p>
        {n.items.map(([title, when], i) => (
          <div key={title} className={s.noteItem} data-on={i === 0 || undefined} style={stagger(i)}>
            <b>{title}</b>
            <span>{when}</span>
          </div>
        ))}
      </div>
      <article className={s.note}>
        <p className={s.label}>
          <em>{n.shared}</em>
        </p>
        <h4>{n.heading}</h4>
        {n.body.map((line, i) => (
          <p key={line} style={stagger(i)}>
            {line}
          </p>
        ))}
        <div className={s.split}>
          <p className={s.label}>{n.split}</p>
          {([['Meta', 60], ['Google', 40]] as const).map(([name, share]) => (
            <p key={name}>
              <span>{name}</span>
              <i style={{ '--w': share / 100 } as CSSProperties} />
              <b>{share}%</b>
            </p>
          ))}
        </div>
      </article>
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

const VIEWS = [PublisherView, ListeningView, NotesView, AdsView, CollabView]
const PIN_QUERY = '(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)'
const AUTO_MS = 6500
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export function Workspace({ lang }: { lang: Lang }) {
  const t = T[lang]
  const section = useRef<HTMLElement>(null)
  const pills = useRef<HTMLDivElement>(null)
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

  // Le défilement pilote tout : l'entrée de l'écran (--enter), le produit
  // ouvert et l'avancée dans le produit courant (--lp). Écrit en variables
  // CSS, React n'est sollicité que lorsque le produit change.
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
      const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 0.9999) * TABS.length
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

  // Sans épinglage, les produits avancent seuls tant que personne n'a choisi.
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
    const id = window.setTimeout(() => setActive((a) => (a + 1) % TABS.length), AUTO_MS)
    return () => window.clearTimeout(id)
  }, [auto, active])

  // Sur petit écran les pastilles débordent : celle du produit ouvert est
  // ramenée au centre de la rangée (sans faire défiler la page).
  useEffect(() => {
    const row = pills.current
    const pill = row?.children[active] as HTMLElement | undefined
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  const select = (i: number) => {
    const el = section.current
    if (pinned && el) {
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      window.scrollTo({ top: window.scrollY + r.top + (span * (i + 0.08)) / TABS.length, behavior: 'smooth' })
      return
    }
    setManual(true)
    setActive(i)
  }

  const tab = TABS[active]
  const View = VIEWS[active]
  const registry = TOOL_HUBS[lang][RAIL[tab.rail].registry]

  return (
    <section
      id='workspace'
      ref={section}
      className={s.section}
      data-pinned={pinned}
      data-auto={auto || undefined}
      aria-labelledby='ws-title'
      style={{ '--hubs': TABS.length, '--auto': `${AUTO_MS}ms` } as CSSProperties}
    >
      <div className={s.sticky}>
        <div className={`${ui.wrap} ${s.inner}`}>
          <div className={s.head}>
            <h2 id='ws-title' className={ui.h2}>
              {t.title}
            </h2>
            <p>{t.lead}</p>
          </div>

          <div role='group' aria-label={t.group} className={s.pills} ref={pills}>
            {TABS.map((item, i) => (
              <button key={item.id} type='button' aria-pressed={active === i} onClick={() => select(i)}>
                <item.Icon size={16} />
                {t.tabs[i]}
                {item.soon ? <em>{t.soon}</em> : null}
                <i aria-hidden />
              </button>
            ))}
          </div>

          <div className={s.stage}>
            <div className={s.glow} data-hub={tab.id} aria-hidden />
            <div className={s.frame}>
              <div className={s.chrome} aria-hidden>
                <span />
                <span />
                <span />
                <p>
                  work.stacbase.com/<b>{tab.path}</b>
                </p>
              </div>
              <div className={s.app}>
                <nav className={s.rail} aria-hidden>
                  <span className={s.org}>Sb</span>
                  {RAIL.map((hub, i) => {
                    // Un hub du rail ouvre son premier produit montré, s'il en a un.
                    const target = TABS.findIndex((item) => item.rail === i)
                    return (
                      <button key={hub.id} type='button' tabIndex={-1} data-on={tab.rail === i || undefined} disabled={target < 0} onClick={() => select(target)}>
                        <hub.Icon size={17} />
                        {t.rail[i]}
                      </button>
                    )
                  })}
                </nav>

                <div className={s.sub} aria-hidden>
                  <p className={s.subTitle}>{registry.hub}</p>
                  <div key={tab.id} className={s.subList}>
                    {registry.tools.map((tool, i) => (
                      <span key={tool.name} data-on={i === tab.tool || undefined} style={stagger(i)}>
                        {tool.name}
                        {tool.soon ? <em>{t.soon}</em> : null}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.main}>
                  <div className={s.top}>
                    <p aria-live='polite'>
                      <b>
                        {t.tabs[active]}
                        {tab.soon ? <em>{t.soon}</em> : null}
                      </b>
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
                  <View key={`${tab.id}-${lang}`} t={t} />
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
