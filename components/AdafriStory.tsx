'use client'

import { useState, type CSSProperties } from 'react'
import { LINKS, TOOL_HUBS, type Lang } from '@/lib/copy'
import { AdHub } from './AdHub'
import { MiniCampaign, MiniCrm } from './mock/Mocks'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bolt, Calendar, Chart, Chat, Compass, Doc, Globe, Heart, Mail, Megaphone, Pen,
  Quote, Rocket, Sparkle, Users, Wallet,
} from './site/icons'
import { Faq } from './site/Faq'
import { useLang } from './site/lang'
import { CountUp, Swap, useAutoTabs, useReveal, Words } from './site/motion'
import { Manifesto } from './site/Manifesto'
import { SiteFooter, SiteNav } from './site/Shell'
import s from './AdafriStory.module.css'

const PRODUCTS = 'https://work.stacbase.com/share/projects/434b611f-08c8-4a40-8834-3c0a8b4dc502'

const story = {
  fr: {
    eyebrow: 'Une nouvelle étape, ensemble',
    title1: 'Adafri va + loin',
    title2: 'avec',
    lead: 'Tout a commencé avec vos campagnes. Aujourd’hui, notre ambition accompagne tout votre quotidien.',
    cta: 'Découvrir Stacbase', read: 'Lire notre histoire',
    chapters: [
      { tab: 'Nos origines', label: '01 — Nos origines', title: 'La publicité nous a réunis.', body: 'Adafri est né d’une idée simple : rendre la publicité Google accessible aux petites entreprises. D’une campagne à l’autre, d’un pays à l’autre, vous avez donné vie à cette idée, campagne après campagne.', link: 'Les chiffres de notre évolution' },
      { tab: 'Ce que nous avons appris', label: '02 — Ce que nous avons appris', title: 'Votre journée ne s’arrête pas à une campagne.', body: 'Il y a aussi les clients à suivre, les projets à faire avancer et l’équipe à coordonner. À vos côtés, nous avons vu les onglets s’accumuler, les données se disperser et les outils se multiplier.', link: 'Lire la lettre à notre communauté' },
      { tab: 'Le prochain chapitre', label: '03 — Le prochain chapitre', title: 'Ouvrez Stacbase.', body: 'Adafri, c’était la publicité. Stacbase va plus loin : autour du hub Publicité, cinq autres hubs réunissent marketing, échanges d’équipe, outils, documents et agent IA, dans un même espace.', link: 'Explorer les outils' },
      { tab: 'La communauté', label: '04 — La communauté', title: 'La suite se construit avec vous.', body: 'Vos usages ont fait grandir Adafri. Ils continuent de guider Stacbase. Notre ambition : construire avec notre communauté un environnement qui répond à la réalité de votre travail.', link: 'Lire la lettre à notre communauté' },
    ],
    storyKicker: 'Notre histoire', storyTitle: 'D’Adafri à Stacbase, en quatre chapitres.',
    campaigns: 'campagnes lancées avec Adafri', people: 'personnes avec qui repenser le parcours',
    tabsPile: ['Google Ads', 'WhatsApp', 'Tableur', 'Gmail', 'Factures', 'Agenda'],
    toolsLabel: '6 hubs, 25+ outils, un seul espace',
    routeFrom: 'Local', routeTo: 'International',
    hubAdafri: 'Là où Adafri a commencé', hubNew: 'Nouveau avec Stacbase',
    quote: 'Un outil nous a réunis. Un espace de travail nous fait avancer.',
    quoteBy: 'L’équipe Stacbase',
    mid: { eyebrow: 'Ce qui ne change pas', title: 'La même envie de vous faire avancer.', lead: 'La publicité reste au cœur de notre histoire. Autour d’elle, Stacbase ajoute tout ce qui fait votre journée : vos clients, vos projets, vos documents et votre équipe.', cta: 'Ouvrir mon espace' },
    split: {
      badge: 'Stacbase', title: '25+ outils, un seul espace.',
      rows: [
        ['Faire connaître', 'Les campagnes publicitaires restent au cœur de notre histoire : Google, Meta et Orange Max it, avec des rapports complets.'],
        ['Organiser', 'Clients, projets et documents trouvent leur place dans le même espace, reliés à vos campagnes.'],
        ['Travailler ensemble', 'Une base commune pour les échanges et le travail de votre équipe, avec les accès que vous choisissez.'],
      ],
      more: 'Explorer les outils',
    },
    team: { title: 'Lancement · Harbor Hotel', comments: [['Jacob', 'Visuels validés, on lance lundi ?'], ['Marc', 'Oui, budget et ciblage prêts.'], ['Cynthia', 'Je prépare la relance WhatsApp.']], tasks: 'tâches terminées' },
    questions: 'Vous connaissiez Adafri ?',
    faq: [
      ['Comment Adafri va plus loin avec Stacbase ?', 'Adafri poursuit son histoire dans un espace de travail plus large : Stacbase. La publicité reste une partie de cet écosystème.'],
      ['À qui s’adresse Stacbase ?', 'Aux agences, aux freelances et aux équipes marketing qui souhaitent retrouver leurs outils dans un espace de travail commun.'],
      ['Où découvrir la plateforme ?', 'Vous pouvez explorer les outils depuis cette page, créer un compte sur Stacbase ou vous connecter si vous possédez déjà un compte Stacbase.'],
    ],
    end: 'Un nouvel horizon, la même ambition.', endLead: 'Créez votre espace en quelques minutes. Le plan Free suffit pour commencer.',
    signup: 'Ouvrir mon espace', login: 'Se connecter',
  },
  en: {
    eyebrow: 'Our next chapter, together',
    title1: 'Adafri goes further',
    title2: 'with',
    lead: 'It started with your campaigns. Today, our ambition reaches across your working day.',
    cta: 'Discover Stacbase', read: 'Read our story',
    chapters: [
      { tab: 'Where we started', label: '01 — Where we started', title: 'Advertising brought us together.', body: 'Adafri began with a simple idea: make Google advertising accessible to small businesses. Campaign after campaign, country after country, you brought that idea to life, one campaign at a time.', link: 'The numbers behind our evolution' },
      { tab: 'What we learned', label: '02 — What we learned', title: 'Your day goes beyond a campaign.', body: 'There are clients to follow up with, projects to move forward and a team to coordinate. Working alongside you, we saw tabs pile up, information scatter and tools multiply.', link: 'Read our letter to the community' },
      { tab: 'What comes next', label: '03 — What comes next', title: 'Open Stacbase.', body: 'Adafri was advertising. Stacbase goes further: around the Advertising hub, five more hubs bring marketing, team communication, tools, documents and an AI agent into one workspace.', link: 'Explore the tools' },
      { tab: 'Our community', label: '04 — Our community', title: 'The next chapter is built with you.', body: 'The way you work helped Adafri grow. It continues to guide Stacbase. Our ambition is to build with our community a workspace that reflects the reality of your day.', link: 'Read our letter to the community' },
    ],
    storyKicker: 'Our story', storyTitle: 'From Adafri to Stacbase, in four chapters.',
    campaigns: 'campaigns launched with Adafri', people: 'people who helped rethink the experience',
    tabsPile: ['Google Ads', 'WhatsApp', 'Spreadsheet', 'Gmail', 'Invoices', 'Calendar'],
    toolsLabel: '6 hubs, 25+ tools, one workspace',
    routeFrom: 'Local', routeTo: 'Worldwide',
    hubAdafri: 'Where Adafri started', hubNew: 'New with Stacbase',
    quote: 'One tool brought us together. One workspace moves us forward.',
    quoteBy: 'The Stacbase team',
    mid: { eyebrow: 'What stays the same', title: 'The same drive to move you forward.', lead: 'Advertising remains at the heart of our story. Around it, Stacbase adds everything that makes your day: your clients, your projects, your documents and your team.', cta: 'Open my workspace' },
    split: {
      badge: 'Stacbase', title: '25+ tools. One workspace.',
      rows: [
        ['Reach your audience', 'Advertising campaigns remain at the heart of our story: Google, Meta and Orange Max it, with complete reports.'],
        ['Get organised', 'Clients, projects and documents belong in the same workspace, connected to your campaigns.'],
        ['Work together', 'A shared base for your team’s conversations and daily work, with the access you choose.'],
      ],
      more: 'Explore the tools',
    },
    team: { title: 'Launch · Harbor Hotel', comments: [['Jacob', 'Visuals approved, launch on Monday?'], ['Marc', 'Yes, budget and targeting are ready.'], ['Cynthia', 'I’m preparing the WhatsApp follow-up.']], tasks: 'tasks done' },
    questions: 'Already know Adafri?',
    faq: [
      ['How does Adafri continue with Stacbase?', 'Adafri continues its story within a broader workspace: Stacbase. Advertising remains part of this ecosystem.'],
      ['Who is Stacbase for?', 'Agencies, freelancers and marketing teams who want their tools together in a shared workspace.'],
      ['Where can I explore the platform?', 'Explore the tools from this page, create a Stacbase account, or sign in if you already have a Stacbase account.'],
    ],
    end: 'A new horizon, the same ambition.', endLead: 'Create your workspace in minutes. The Free plan is enough to begin.',
    signup: 'Open my workspace', login: 'Sign in',
  },
}

const CHAPTER_ICONS = [Compass, Bolt, Rocket, Heart]
// `null` : le chapitre ouvre le manifeste (la lettre à la communauté).
const CHAPTER_LINKS: (string | null)[] = [null, null, PRODUCTS, null]
// Un pictogramme par hub, dans l'ordre de `TOOL_HUBS`.
const HUB_ICONS = [Megaphone, Chart, Chat, Calendar, Doc, Sparkle]
const SPLIT_ICONS = [Megaphone, Users, Chat]

type Copy = (typeof story)['fr']

/** Le visuel qui accompagne chaque chapitre. */
function ChapterVisual({ i, c, lang }: { i: number; c: Copy; lang: Lang }) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  if (i === 0)
    return (
      <div className={`${s.visual} ${s.vOrigins}`}>
        <div className={s.statCard}>
          <strong>
            <CountUp value={87000} suffix='+' locale={locale} />
          </strong>
          <span>{c.campaigns}</span>
        </div>
        <div className={`${s.statCard} ${s.statCardB}`}>
          <strong>
            <CountUp value={3500} locale={locale} />
          </strong>
          <span>{c.people}</span>
        </div>
        <div className={s.route}>
          <span>{c.routeFrom}</span>
          <i />
          <span>{c.routeTo}</span>
        </div>
      </div>
    )
  if (i === 1)
    return (
      // Une vraie photo : quelqu'un noyé sous les papiers, plutôt qu'une pile
      // d'onglets dessinés (retour du 2026-10-26).
      <div className={`${s.visual} ${s.vPhoto}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/media/people/gars.jpeg' alt='' width={1080} height={810} loading='lazy' />
      </div>
    )
  if (i === 2)
    return (
      <div className={`${s.visual} ${s.vTools}`}>
        {/* Les outils rangés par hub, comme dans l'application. */}
        <div className={s.hubGrid}>
          {TOOL_HUBS[lang].map((h, k) => {
            const Icon = HUB_ICONS[k]
            return (
              <div key={h.hub} className={s.hubCard} style={{ '--k': k } as CSSProperties}>
                <span className={s.hubIcon} data-tone={k}>
                  <Icon size={18} />
                </span>
                <p className={s.hubName}>{h.hub}</p>
                {/* La publicité, c'était Adafri ; tout le reste, Stacbase l'ajoute. */}
                <span className={s.hubTag} data-origin={k === 0 || undefined}>{k === 0 ? c.hubAdafri : c.hubNew}</span>
                <p className={s.hubTools}>{h.tools.filter((tool) => !tool.soon).map((tool) => tool.name).join(' · ')}</p>
              </div>
            )
          })}
        </div>
        <p>{c.toolsLabel}</p>
      </div>
    )
  return (
    <div className={`${s.visual} ${s.vQuote}`}>
      <Quote size={28} />
      <p>{c.quote}</p>
      <span>{c.quoteBy}</span>
    </div>
  )
}

function TeamMock({ c }: { c: Copy }) {
  return (
    <div className={s.team}>
      <div className={s.teamHead}>
        <strong>{c.team.title}</strong>
        <div className={s.faces}>
          {c.team.comments.map(([name], k) => (
            <span key={name} data-tone={k}>
              {name[0]}
            </span>
          ))}
        </div>
      </div>
      {c.team.comments.map(([name, text], k) => (
        <div key={name} className={s.comment} style={{ '--i': k } as CSSProperties}>
          <span data-tone={k}>{name[0]}</span>
          <div>
            <strong>{name}</strong>
            <p>{text}</p>
          </div>
        </div>
      ))}
      <div className={s.teamFoot}>
        <div className={s.teamBar}>
          <i />
        </div>
        <span>8/10 {c.team.tasks}</span>
      </div>
    </div>
  )
}

export function AdafriStory() {
  const [lang, choose] = useLang('fr')
  const c = story[lang]
  useReveal(lang)
  const rows = useAutoTabs<HTMLElement>(c.split.rows.length, 5500)
  const [manifesto, setManifesto] = useState(false)

  return (
    <div className={s.page}>
      <SiteNav lang={lang} onLang={choose} current='/adafri' />

      <main>
        {/* ── Première vue, encadrée ───────────────────────────────────── */}
        <section className={s.heroWrap}>
          <div className={s.hero}>
            <div className={s.heroText}>
              <p className={s.eyebrow} data-reveal>
                <span className={s.dot} />
                {c.eyebrow}
              </p>
              <h1 className='display'>
                <Words text={c.title1} delay={100} />
                <br />
                <span className={s.titleLine}>
                  <Words text={c.title2} delay={350} />{' '}
                  <span className={`grad-text ${s.newName}`}>Stacbase.</span>
                </span>
              </h1>
              <p className={`lead ${s.lead}`} data-reveal style={{ '--d': '500ms' } as CSSProperties}>
                {c.lead}
              </p>
              <div className={s.ctas} data-reveal style={{ '--d': '650ms' } as CSSProperties}>
                <a className='btn btn-primary' href={LINKS.signup}>
                  {c.cta}
                  <ArrowUpRight size={17} />
                </a>
                <a className='btn btn-ghost' href='#histoire'>
                  {c.read}
                  <ArrowDown size={17} />
                </a>
              </div>
            </div>

            {/* Le hub Publicité, là où l'histoire d'Adafri continue. */}
            <AdHub lang={lang} />
          </div>
        </section>

        {/* ── Notre histoire, en quatre chapitres ─────────────────────── */}
        <section id='histoire' className={`container ${s.story}`}>
          <header className={s.storyHead}>
            <p className={s.kicker} data-reveal>
              {c.storyKicker}
            </p>
            <h2 className='h2'>
              <Words text={c.storyTitle} />
            </h2>
          </header>
          <div className={s.chapters}>
            {c.chapters.map((ch, i) => {
              const Icon = CHAPTER_ICONS[i]
              return (
                <article key={ch.tab} className={s.chapter} data-reveal style={{ '--d': `${(i % 2) * 120}ms` } as CSSProperties}>
                  <ChapterVisual i={i} c={c} lang={lang} />
                  <div className={s.chapterText}>
                    <p className={s.chapterLabel}>
                      <Icon size={15} /> {ch.label}
                    </p>
                    <h3 className={s.chapterTitle}>{ch.title}</h3>
                    <p className={s.chapterBody}>{ch.body}</p>
                    {CHAPTER_LINKS[i] ? (
                      <a className='link-arrow' href={CHAPTER_LINKS[i]!}>
                        {ch.link}
                        <ArrowRight size={16} />
                      </a>
                    ) : (
                      <button type='button' className={`link-arrow ${s.linkButton}`} onClick={() => setManifesto(true)}>
                        {ch.link}
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ── Ce qui ne change pas ─────────────────────────────────────── */}
        <section className={`container ${s.mid}`}>
          <p className={s.kicker} data-reveal>
            {c.mid.eyebrow}
          </p>
          <h2 className='h2'>
            <Words text={c.mid.title} />
          </h2>
          <p className='lead' data-reveal>
            {c.mid.lead}
          </p>
          <a className='btn btn-dark' href={LINKS.signup} data-reveal>
            {c.mid.cta}
            <ArrowUpRight size={17} />
          </a>
        </section>

        {/* ── Ce qui change : accordéon + visuel ───────────────────────── */}
        <section className={`container ${s.split}`} ref={rows.ref} {...rows.hover}>
          <div className={s.splitText}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Sparkle size={13} />
              </span>
              {c.split.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.split.title} />
            </h2>
            <div className={s.rows}>
              {c.split.rows.map(([title, body], i) => {
                const Icon = SPLIT_ICONS[i]
                const on = rows.active === i
                return (
                  <button
                    key={title}
                    type='button'
                    className={s.row}
                    aria-expanded={on}
                    onClick={() => rows.select(i)}
                    data-reveal
                    style={{ '--d': `${i * 90}ms` } as CSSProperties}
                  >
                    <span className={s.rowHead}>
                      <Icon size={20} />
                      {title}
                      <ArrowUpRight size={16} />
                    </span>
                    <span className={s.rowBody}>
                      <span>{body}</span>
                    </span>
                    <i className={s.rowLine}>{on && rows.running ? <b key={`l-${i}`} /> : null}</i>
                  </button>
                )
              })}
            </div>
            <a className='link-arrow' href={PRODUCTS} data-reveal>
              {c.split.more}
              <ArrowRight size={16} />
            </a>
          </div>
          <div className={s.splitVisual} data-reveal='scale'>
            <div className={s.splitPanel} data-tone={rows.active} aria-hidden />
            <Swap id={`${rows.active}-${lang}`} className={s.splitView}>
              {rows.active === 0 ? <MiniCampaign lang={lang} /> : rows.active === 1 ? <MiniCrm lang={lang} /> : <TeamMock c={c} />}
            </Swap>
          </div>
        </section>

        {/* ── Questions ────────────────────────────────────────────────── */}
        <section className={`container ${s.faqGrid}`}>
          <h2 className='h2'>
            <Words text={c.questions} />
          </h2>
          <Faq items={c.faq as [string, string][]} />
        </section>

        {/* ── Fin ──────────────────────────────────────────────────────── */}
        <section className={s.endWrap}>
          <div className={s.end} data-reveal='scale'>
            <div className={s.endGlow} aria-hidden />
            <h2 className='h2'>{c.end}</h2>
            <p>{c.endLead}</p>
            <div className={s.ctas}>
              <a className='btn btn-light' href={LINKS.signup}>
                {c.signup}
                <ArrowUpRight size={17} />
              </a>
              <a className={`btn ${s.endGhost}`} href={LINKS.login}>
                {c.login}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Manifesto lang={lang} open={manifesto} onClose={() => setManifesto(false)} />
      <SiteFooter lang={lang} />
    </div>
  )
}
