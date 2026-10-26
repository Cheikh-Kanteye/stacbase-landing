'use client'

import { useState, type CSSProperties } from 'react'
import { COPY, LINKS, PLAN_PRICES, PLATFORMS, TOOL_HUBS, type PlanCode } from '@/lib/copy'
import { AdsWave, GoalRing } from './mock/Charts'
import { AppShot, MiniCrm, MiniPosts } from './mock/Mocks'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bolt, Calendar, Chart, Chat, Check, Compass, Doc, Layers, Megaphone, Pen, Rocket,
  Sparkle, Users, Wallet,
} from './site/icons'
import { Faq } from './site/Faq'
import { Manifesto } from './site/Manifesto'
import { useLang } from './site/lang'
import { CountUp, Marquee, Swap, useAutoTabs, useReveal, useScrollProgress, Words } from './site/motion'
import { SiteFooter, SiteNav } from './site/Shell'
import s from './Landing.module.css'

// Courbe Meta / Google et anneau d'objectif : les graphiques repris de Qarin.
const MINIS = [AdsWave, MiniPosts, MiniCrm, GoalRing]
const PLANS: PlanCode[] = ['free', 'starter', 'pro', 'large']
const HUB_ICONS = [Megaphone, Chart, Chat, Layers, Doc, Sparkle]
const BENEFIT_ICONS = [Calendar, Pen, Bolt, Wallet]
const AUDIENCE_ICONS = [Megaphone, Users, Sparkle, Rocket]
// Montants d'illustration de la pile d'abonnements, en dollars par mois.
const BILLS = [12, 29, 19, 49, 25, 15, 39]

export function Landing() {
  const [lang, choose] = useLang('en')
  const c = COPY[lang]
  const hubs = TOOL_HUBS[lang]
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  useReveal(lang)

  const heroVisual = useScrollProgress<HTMLDivElement>()
  const tabs = useAutoTabs(hubs.length, 6500)
  const hub = hubs[tabs.active]
  const HubIcon = HUB_ICONS[tabs.active]
  const money = (n: number) => (lang === 'fr' ? `${n} $` : `$${n}`)

  const [manifesto, setManifesto] = useState(false)

  return (
    <div className={s.page}>
      <SiteNav lang={lang} onLang={choose} />

      <main>
        {/* ── 1. Hero ─────────────────────────────────────────────────── */}
        <section className={s.hero}>
          <div className={s.heroGlow} aria-hidden />
          <div className={`container ${s.heroText}`}>
            <span className={`badge ${s.heroBadge}`}>
              <span className='badge-icon'>
                <Sparkle size={13} />
              </span>
              {c.hero.badge}
            </span>
            <h1 className='display'>
              <Words text={c.hero.title} delay={120} />
            </h1>
            <p className={`lead ${s.heroLead}`} data-reveal style={{ '--d': '450ms' } as CSSProperties}>
              {c.hero.lead}
            </p>
            <div className={s.heroCtas} data-reveal style={{ '--d': '600ms' } as CSSProperties}>
              <a className='btn btn-primary' href={LINKS.signup}>
                {c.hero.primary}
                <ArrowUpRight size={17} />
              </a>
              <a className='btn btn-ghost' href='#tools'>
                {c.hero.secondary}
                <ArrowDown size={17} />
              </a>
            </div>
            <p className={s.heroNote} data-reveal='fade' style={{ '--d': '750ms' } as CSSProperties}>
              {c.hero.note}
            </p>
          </div>

          <div className={s.heroStage} ref={heroVisual}>
            <div className={s.stripes} aria-hidden />
            <div className={`container ${s.heroFrame}`} data-reveal='scale' style={{ '--d': '500ms' } as CSSProperties}>
              <div className={s.tilt}>
                <AppShot alt={lang === 'fr' ? 'Le rapport d’une campagne Google Display dans Stacbase' : 'A Google Display campaign report in Stacbase'} />
              </div>
              <div className={`${s.float} ${s.floatA}`}>
                <span className={s.floatIcon}>
                  <Check size={14} />
                </span>
                <div>
                  <strong>{lang === 'fr' ? 'Campagne approuvée' : 'Campaign approved'}</strong>
                  <span>Google Search · {lang === 'fr' ? 'à l’instant' : 'just now'}</span>
                </div>
              </div>
              <div className={`${s.float} ${s.floatB}`}>
                <span className={`${s.floatIcon} ${s.floatPink}`}>+</span>
                <div>
                  <strong>{lang === 'fr' ? '184 nouveaux contacts' : '184 new contacts'}</strong>
                  <span>{lang === 'fr' ? 'depuis la campagne Meta' : 'from the Meta campaign'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Plateformes ─────────────────────────────────────────────── */}
        <section className={s.platforms} aria-label={c.platforms}>
          <p data-reveal>{c.platforms}</p>
          <Marquee speed={34}>
            {PLATFORMS.map((name) => (
              <span key={name} className={s.platform}>
                <i aria-hidden />
                {name}
              </span>
            ))}
          </Marquee>
        </section>

        {/* ── 2. La douleur ───────────────────────────────────────────── */}
        <section className={`container ${s.section} ${s.split}`}>
          <div className={s.splitText}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Compass size={13} />
              </span>
              {c.pain.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.pain.title} />
            </h2>
            <p className='lead' data-reveal>
              {c.pain.lead}
            </p>
            <p className={s.painBody} data-reveal>
              {c.pain.body}
            </p>
          </div>
          <div className={s.painVisual} data-reveal='scale'>
            {/* Les onglets s'empilent, la note grimpe. */}
            <div className={s.tabPile}>
              {c.pain.tabs.map((label, k) => (
                <div key={label} className={s.tabCard} style={{ '--k': k } as CSSProperties}>
                  <span />
                  {label}
                  <i aria-hidden>×</i>
                </div>
              ))}
            </div>
            <div className={s.bill}>
              <strong>
                <CountUp value={BILLS.reduce((a, b) => a + b, 0)} locale={locale} prefix={lang === 'fr' ? '' : '$'} suffix={lang === 'fr' ? ' $' : ''} />
              </strong>
              <span>
                {BILLS.length} {c.pain.bills}
              </span>
              <ul>
                {c.pain.tabs.slice(0, 4).map((label, i) => (
                  <li key={label}>
                    <span>{label}</span>
                    <b>{money(BILLS[i])}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 3. La solution ──────────────────────────────────────────── */}
        <section id='product' className={`container ${s.section}`}>
          <header className={s.center}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Layers size={13} />
              </span>
              {c.meet.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.meet.title} />
            </h2>
            <p className='lead' data-reveal style={{ '--d': '200ms' } as CSSProperties}>
              {c.meet.lead}
            </p>
          </header>
          <div className={s.bento}>
            {c.meet.cards.map(([title, body], i) => {
              const Mini = MINIS[i]
              return (
                <article key={title} className={s.feature} data-reveal style={{ '--d': `${(i % 2) * 120}ms` } as CSSProperties}>
                  <div className={s.featureText}>
                    <h3 className='h3'>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <div className={s.featureVisual}>
                    <Mini lang={lang} />
                  </div>
                </article>
              )
            })}
          </div>
          <div className={s.ctaRow} data-reveal>
            <a className='btn btn-primary' href={LINKS.signup}>
              {c.meet.cta}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        {/* ── 4. Les bénéfices ────────────────────────────────────────── */}
        <section className={`container ${s.section}`}>
          <header className={s.center}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Rocket size={13} />
              </span>
              {c.benefits.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.benefits.title} />
            </h2>
          </header>
          <div className={s.benefits}>
            {c.benefits.items.map(([title, body], i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <article key={title} className={s.benefit} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                  <span className={s.benefitIcon}>
                    <Icon size={20} />
                  </span>
                  <h3 className='h3'>{title}</h3>
                  <p>{body}</p>
                </article>
              )
            })}
          </div>
          <div className={s.ctaRow} data-reveal>
            <a className='btn btn-dark' href={LINKS.signup}>
              {c.benefits.cta}
              <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {/* ── 5. La boîte à outils, par hub ───────────────────────────── */}
        <section id='tools' className={s.darkWrap}>
          <div className={s.dark}>
            <header className={s.center}>
              <span className='badge badge-dark' data-reveal>
                <span className='badge-icon'>
                  <Sparkle size={13} />
                </span>
                {c.tools.badge}
              </span>
              <h2 className='h2'>
                <Words text={c.tools.title} />
              </h2>
              <p className={`lead ${s.darkLead}`} data-reveal>
                {c.tools.lead}
              </p>
            </header>
            <div className={s.power} ref={tabs.ref} {...tabs.hover}>
              <div className={s.powerTabs} role='tablist' aria-label={c.tools.badge}>
                {hubs.map((h, i) => {
                  const Icon = HUB_ICONS[i]
                  const on = tabs.active === i
                  return (
                    <button
                      key={h.hub}
                      type='button'
                      role='tab'
                      aria-selected={on}
                      className={s.powerTab}
                      onClick={() => tabs.select(i)}
                      data-reveal
                      style={{ '--d': `${i * 70}ms` } as CSSProperties}
                    >
                      <span className={s.powerIcon}>
                        <Icon size={17} />
                      </span>
                      <span className={s.powerTitle}>
                        {h.hub} <em className={s.count}>{h.tools.length}</em>
                      </span>
                      {on && tabs.running ? <i className={s.powerProgress} key={`p-${i}`} /> : null}
                    </button>
                  )
                })}
              </div>
              <div className={s.powerPanel} role='tabpanel' data-reveal='scale'>
                <div className={s.powerView}>
                  <Swap id={`${tabs.active}-${lang}`}>
                    <div className={s.toolGrid}>
                      {hub.tools.map((tool, i) => (
                        <div key={tool.name} className={s.tool} style={{ '--i': i } as CSSProperties} data-soon={tool.soon || undefined}>
                          <span className={s.toolIcon}>
                            <HubIcon size={16} />
                          </span>
                          <div>
                            <p className={s.toolName}>
                              {tool.name}
                              {tool.soon ? <em>{c.tools.soon}</em> : null}
                            </p>
                            <p className={s.toolDesc}>{tool.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Swap>
                </div>
              </div>
            </div>
            <div className={s.ctaRow} data-reveal>
              <a className='btn btn-light' href={LINKS.signup}>
                {c.tools.cta}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* ── 6. Pour qui ─────────────────────────────────────────────── */}
        <section className={`container ${s.section}`}>
          <header className={s.center}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Users size={13} />
              </span>
              {c.audience.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.audience.title} />
            </h2>
          </header>
          <figure className={s.faces} data-reveal='scale'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/media/people/stacbase-grid.jpg' alt={c.audience.photoAlt} width={1280} height={721} loading='lazy' />
          </figure>
          <div className={s.audience}>
            {c.audience.items.map(([title, body], i) => {
              const Icon = AUDIENCE_ICONS[i]
              return (
                <article key={title} className={s.persona} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                  <span className={s.personaHead}>
                    <span className={s.personaFace} style={{ '--x': `${[0, 33, 68, 100][i]}%` } as CSSProperties} aria-hidden />
                    <span className={s.personaIcon} data-tone={i}>
                      <Icon size={16} />
                    </span>
                  </span>
                  <h3 className='h3'>{title}</h3>
                  <p>{body}</p>
                </article>
              )
            })}
          </div>
          <p className={s.closing} data-reveal>
            {c.audience.closing}
          </p>
        </section>

        {/* ── 7. La différence ────────────────────────────────────────── */}
        <section className={`container ${s.section}`}>
          <header className={s.center}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Bolt size={13} />
              </span>
              {c.difference.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.difference.title} />
            </h2>
          </header>
          <div className={s.diff}>
            <div className={s.before} data-reveal>
              <p className={s.diffLabel}>{c.difference.before}</p>
              <ol>
                {c.difference.steps.map((step, i) => (
                  <li key={step} style={{ '--i': i } as CSSProperties}>
                    <span>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.after} data-reveal style={{ '--d': '150ms' } as CSSProperties}>
              <p className={s.diffLabel}>{c.difference.after}</p>
              <div className={s.afterCard}>
                <span className={s.afterLogo}>S</span>
                <p>{c.difference.afterBody}</p>
                <div className={s.afterIcons}>
                  {HUB_ICONS.map((Icon, i) => (
                    <span key={i} style={{ '--i': i } as CSSProperties}>
                      <Icon size={16} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <figure className={s.band} data-reveal='scale'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/media/people/group.jpg' alt='' width={1199} height={800} loading='lazy' />
            <figcaption>{c.difference.punch}</figcaption>
          </figure>
          <div className={s.ctaRow} data-reveal>
            <a className='btn btn-ghost' href='#tools'>
              {c.difference.cta}
              <ArrowDown size={17} />
            </a>
          </div>
        </section>

        {/* ── 8. Tarifs ───────────────────────────────────────────────── */}
        <section id='pricing' className={s.pricingWrap}>
          <div className={s.pricing}>
            <header className={s.center}>
              <span className='badge badge-dark' data-reveal>
                <span className='badge-icon'>
                  <Wallet size={13} />
                </span>
                {c.pricing.badge}
              </span>
              <h2 className='h2'>
                <Words text={c.pricing.title} />
              </h2>
              <p className={`lead ${s.pricingLead}`} data-reveal>
                {c.pricing.lead}
              </p>
            </header>
            <div className={s.plans}>
              {PLANS.map((code, i) => {
                const [tagline, features] = c.pricing.plans[code]
                const featured = code === 'pro'
                const name = code[0].toUpperCase() + code.slice(1)
                return (
                  <article key={code} className={s.plan} data-featured={featured || undefined} data-reveal style={{ '--d': `${i * 100}ms` } as CSSProperties}>
                    <div className={s.planHead}>
                      <h3>{name}</h3>
                      {featured ? <span className={s.planTag}>{c.pricing.recommended}</span> : null}
                    </div>
                    <p className={s.price}>
                      <strong>{money(PLAN_PRICES[code])}</strong>
                      <span>{c.pricing.month}</span>
                    </p>
                    <p className={s.planTagline}>{tagline}</p>
                    <a className={`btn ${featured ? 'btn-primary' : 'btn-dark'} ${s.planCta}`} href={LINKS.signup}>
                      {code === 'free' ? c.pricing.cta.free : `${c.pricing.cta.paid} ${name}`}
                    </a>
                    <ul>
                      {features.map((f) => (
                        <li key={f}>
                          <span>
                            <Check size={12} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 9. Investir : devenir co-propriétaire (après les tarifs) ──────────────────── */}
        <section id='invest' className={s.investWrap}>
          <div className={s.invest} data-reveal='scale'>
            <div className={s.investGlow} aria-hidden />
            <div className={s.investText}>
              <span className='badge badge-dark'>
                <span className='badge-icon'>
                  <Sparkle size={13} />
                </span>
                {c.invest.badge}
              </span>
              <h2 className='h2'>
                <Words text={c.invest.title} />
              </h2>
              <p className={s.investLead}>{c.invest.lead}</p>
              <ul className={s.investPoints}>
                {c.invest.points.map((point, i) => (
                  <li key={point} style={{ '--i': i } as CSSProperties}>
                    <span>
                      <Check size={13} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className={s.investCtas}>
                <a className='btn btn-light' href={LINKS.invest}>
                  {c.invest.cta}
                  <ArrowUpRight size={17} />
                </a>
                <button type='button' className={`btn ${s.investGhost}`} onClick={() => setManifesto(true)}>
                  {c.invest.manifesto}
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* ── 10. Questions ────────────────────────────────────────────── */}
        <section className={`container ${s.section} ${s.faqGrid}`}>
          <div>
            <h2 className='h2'>
              <Words text={c.faq.title} />
            </h2>
            <a className={`link-arrow ${s.faqMore}`} href='/adafri' data-reveal>
              {c.faq.more}
              <ArrowRight size={16} />
            </a>
          </div>
          <Faq items={c.faq.items as [string, string][]} />
        </section>

      </main>

      <Manifesto lang={lang} open={manifesto} onClose={() => setManifesto(false)} />
      <SiteFooter lang={lang} />
    </div>
  )
}

