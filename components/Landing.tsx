'use client'

import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { COPY, LINKS, PLAN_PRICES, PLATFORMS, type PlanCode } from '@/lib/copy'
import { InkReveal } from './InkReveal'
import { AppMock, DayMock, MiniAnalytics, MiniCampaign, MiniCrm, MiniWhatsApp, POWER_ICONS, POWER_VIEWS } from './mock/Mocks'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Layers, Rocket, Sparkle } from './site/icons'
import { useLang } from './site/lang'
import { CountUp, Marquee, useAutoTabs, useReveal, useScrollProgress, Words } from './site/motion'
import { Faq } from './site/Faq'
import { SiteFooter, SiteNav } from './site/Shell'
import s from './Landing.module.css'

const MINIS = [MiniCampaign, MiniWhatsApp, MiniCrm, MiniAnalytics]
const PLANS: PlanCode[] = ['free', 'starter', 'pro', 'large']

export function Landing() {
  const [lang, choose] = useLang('en')
  const c = COPY[lang]
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  useReveal(lang)

  const heroVisual = useScrollProgress<HTMLDivElement>()
  const tabs = useAutoTabs(c.power.tabs.length, 6500)
  const PowerView = POWER_VIEWS[tabs.active]

  // Scène finale : l'encre révèle le logo vivant sous la souris.
  const [live, setLive] = useState(false)
  const stageRef = useRef<HTMLElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)
  const onReady = useCallback(() => setLive(true), [])

  return (
    <div className={s.page}>
      <SiteNav lang={lang} onLang={choose} />

      <main>
        {/* ── Première vue ─────────────────────────────────────────────── */}
        <section className={s.hero}>
          <div className={s.heroGlow} aria-hidden />
          <div className={`container ${s.heroText}`}>
            <a className={`badge ${s.heroBadge}`} href='#product'>
              <span className='badge-icon'>
                <Sparkle size={13} />
              </span>
              {c.hero.badge}
              <ArrowUpRight size={14} />
            </a>
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
              <a className='btn btn-ghost' href='#product'>
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
                <AppMock lang={lang} />
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
                  <span>{lang === 'fr' ? 'depuis la campagne WhatsApp' : 'from the WhatsApp campaign'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Plateformes ──────────────────────────────────────────────── */}
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

        {/* ── Découvrez Stacbase ───────────────────────────────────────── */}
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
                <article
                  key={title}
                  className={s.feature}
                  data-reveal
                  style={{ '--d': `${(i % 2) * 120}ms` } as CSSProperties}
                >
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
        </section>

        {/* ── Chiffres ─────────────────────────────────────────────────── */}
        <section className='container'>
          <div className={s.stats} data-reveal='scale'>
            {c.stats.map((stat) => (
              <div key={stat.label} className={s.stat}>
                <strong>
                  <CountUp value={stat.value} suffix={stat.suffix} locale={locale} />
                </strong>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Journée ──────────────────────────────────────────────────── */}
        <section className={`container ${s.section} ${s.split}`}>
          <div className={s.splitText}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <Rocket size={13} />
              </span>
              {c.day.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.day.title} />
            </h2>
            <p className='lead' data-reveal>
              {c.day.lead}
            </p>
            <ul className={s.checklist}>
              {c.day.points.map((point, i) => (
                <li key={point} data-reveal style={{ '--d': `${i * 110}ms` } as CSSProperties}>
                  <span>
                    <Check size={14} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.splitVisual} data-reveal='scale'>
            <div className={s.stripesPanel} aria-hidden />
            <DayMock lang={lang} />
          </div>
        </section>

        {/* ── Boîte à outils (fond sombre) ─────────────────────────────── */}
        <section className={s.darkWrap}>
          <div className={s.dark}>
            <header className={s.center}>
              <span className='badge badge-dark' data-reveal>
                <span className='badge-icon'>
                  <Sparkle size={13} />
                </span>
                {c.power.badge}
              </span>
              <h2 className='h2'>
                <Words text={c.power.title} />
              </h2>
              <p className={`lead ${s.darkLead}`} data-reveal>
                {c.power.lead}
              </p>
            </header>
            <div className={s.power} ref={tabs.ref} {...tabs.hover}>
              <div className={s.powerTabs} role='tablist' aria-label={c.power.badge}>
                {c.power.tabs.map(([title, body], i) => {
                  const Icon = POWER_ICONS[i]
                  const on = tabs.active === i
                  return (
                    <button
                      key={title}
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
                      <span className={s.powerTitle}>{title}</span>
                      <span className={s.powerBody}>
                        <span>{body}</span>
                      </span>
                      {on && tabs.running ? <i className={s.powerProgress} key={`p-${i}`} /> : null}
                    </button>
                  )
                })}
              </div>
              <div className={s.powerPanel} role='tabpanel' data-reveal='scale'>
                <div className={s.powerView} key={`${tabs.active}-${lang}`}>
                  <PowerView lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Comment ça marche ────────────────────────────────────────── */}
        <section id='how' className={`container ${s.section}`}>
          <header className={s.center}>
            <span className='badge' data-reveal>
              <span className='badge-icon'>
                <ArrowRight size={13} />
              </span>
              {c.how.badge}
            </span>
            <h2 className='h2'>
              <Words text={c.how.title} />
            </h2>
          </header>
          <ol className={s.steps}>
            {c.how.steps.map(([title, body], i) => (
              <li key={title} data-reveal style={{ '--d': `${i * 160}ms` } as CSSProperties}>
                <span className={s.stepNum}>0{i + 1}</span>
                <i className={s.stepLine} aria-hidden />
                <h3 className='h3'>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Tarifs ───────────────────────────────────────────────────── */}
        <section id='pricing' className={s.pricingWrap}>
          <div className={s.pricing}>
            <header className={s.center}>
              <span className='badge badge-dark' data-reveal>
                <span className='badge-icon'>
                  <Sparkle size={13} />
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
                return (
                  <article
                    key={code}
                    className={s.plan}
                    data-featured={featured || undefined}
                    data-reveal
                    style={{ '--d': `${i * 100}ms` } as CSSProperties}
                  >
                    <div className={s.planHead}>
                      <h3>{code === 'free' ? 'Free' : code[0].toUpperCase() + code.slice(1)}</h3>
                      {featured ? <span className={s.planTag}>{c.pricing.recommended}</span> : null}
                    </div>
                    <p className={s.price}>
                      <strong>{lang === 'fr' ? `${PLAN_PRICES[code]} $` : `$${PLAN_PRICES[code]}`}</strong>
                      <span>{c.pricing.month}</span>
                    </p>
                    <p className={s.planTagline}>{tagline}</p>
                    <a className={`btn ${featured ? 'btn-primary' : 'btn-dark'} ${s.planCta}`} href={LINKS.signup}>
                      {code === 'free' ? c.pricing.cta.free : `${c.pricing.cta.paid} ${code[0].toUpperCase() + code.slice(1)}`}
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

        {/* ── Questions ────────────────────────────────────────────────── */}
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

        {/* ── Ouvrez Stacbase ──────────────────────────────────────────── */}
        <section className={`container ${s.final}`}>
          <h2 className='h2'>
            <Words text={c.final.title} />
          </h2>
          <p className='lead' data-reveal>
            {c.final.lead}
          </p>
          <div className={s.finalStage} data-reveal='fade'>
            <section ref={stageRef} className='stage' data-live={live ? 'true' : 'false'}>
              <h3 className='mark-wrap'>
                <span className='open'>{c.final.open}</span>
                <span ref={markRef} className='mark'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src='/media/stacbase-wordmark.png' alt='Stacbase' width={1600} height={400} draggable={false} />
                </span>
              </h3>
              <InkReveal stageRef={stageRef} markRef={markRef} videoSrc='/media/stacbase-logo.mp4' onReady={onReady} />
            </section>
          </div>
          <a className='btn btn-primary' href={LINKS.signup} data-reveal>
            {c.final.cta}
            <ArrowUpRight size={17} />
          </a>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
