'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CO_OWN_PLANS, COPY, LANGS, LINKS, PLAN_NAMES, PLAN_PRICES, annualPrice, type Lang, type PlanCode } from '@/lib/copy'
import { CALC_DEFAULTS, HOME } from '@/lib/home'
import { Manifesto } from '../site/Manifesto'
import { useLang } from '../site/lang'
import { useReveal, Words } from '../site/motion'
import { Arrow, Dock, HeroHeader, Questions } from './Chrome'
import { Workspace } from './Workspace'
import ui from './ui.module.css'
import s from './Home.module.css'

const PLANS: PlanCode[] = ['free', 'starter', 'pro', 'large']
const PRO_YEARLY = annualPrice(PLAN_PRICES.pro)

/**
 * Les huit visages de la photo « stacbase », recadrés un par un : centre de
 * chaque visage dans `faces.jpg` (836 × 471).
 */
const FACES = [[105, 60], [312, 75], [530, 58], [742, 65], [102, 295], [315, 305], [522, 295], [737, 290]] as const
const FACE_ZOOM = 0.55
const faceStyle = ([x, y]: readonly [number, number]): CSSProperties => ({
  backgroundSize: `${836 * FACE_ZOOM}px auto`,
  backgroundPosition: `${26 - x * FACE_ZOOM}px ${26 - y * FACE_ZOOM}px`,
})

const money = (n: number, lang: Lang) => {
  const v = Math.round(n).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')
  return lang === 'fr' ? `${v} $` : `$${v}`
}

/** Un nombre qui glisse vers sa nouvelle valeur au lieu de sauter. */
function useTween(target: number) {
  const [shown, setShown] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target
      setShown(target)
      return
    }
    const start = performance.now()
    const origin = from.current
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 500)
      const value = origin + (target - origin) * (1 - Math.pow(1 - p, 4))
      from.current = value
      setShown(value)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return shown
}

function Calculator({ lang }: { lang: Lang }) {
  const t = HOME[lang].calc
  const [tools, setTools] = useState(() => CALC_DEFAULTS.map((d) => ({ ...d })))
  const [years, setYears] = useState(5)

  const patch = (i: number, next: Partial<{ on: boolean; price: number }>) => setTools((list) => list.map((tool, k) => (k === i ? { ...tool, ...next } : tool)))
  const monthly = tools.reduce((sum, tool) => sum + (tool.on ? tool.price : 0), 0)
  const rented = monthly * 12 * years
  const stac = PRO_YEARLY * years
  const keep = rented - stac
  const rentedShown = useTween(rented)
  const stacShown = useTween(stac)
  // Les deux barres partagent la même échelle : la plus longue fait toute la largeur.
  const scale = Math.max(rented, stac, 1)

  return (
    <section className={`${ui.wrap} ${s.calc}`} aria-labelledby='calc-title'>
      <div className={s.calcForm}>
        <h2 id='calc-title' className={ui.h2}>
          <Words text={t.title} />
        </h2>
        <p className={ui.lead} data-reveal>
          {t.lead}
        </p>
        <div className={s.toolList} data-reveal>
          {t.tools.map((name, i) => (
            <div key={name} className={s.toolRow} data-off={!tools[i].on || undefined}>
              <label className={s.toolName}>
                <input type='checkbox' checked={tools[i].on} onChange={() => patch(i, { on: !tools[i].on })} />
                <span>{name}</span>
              </label>
              <label className={s.toolPrice}>
                <span aria-hidden>$</span>
                <input
                  type='number'
                  min={0}
                  step={1}
                  inputMode='numeric'
                  value={tools[i].price}
                  aria-label={t.priceLabel.replace('{tool}', name)}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value)
                    patch(i, { price: Number.isFinite(v) && v > 0 ? v : 0 })
                  }}
                />
                <span aria-hidden>{t.perMonth}</span>
              </label>
            </div>
          ))}
        </div>
        <label className={s.years} data-reveal>
          <span>{t.years.replace('{n}', String(years))}</span>
          <input
            type='range'
            min={1}
            max={10}
            step={1}
            value={years}
            style={{ '--fill': `${((years - 1) / 9) * 100}%` } as CSSProperties}
            onChange={(e) => setYears(parseInt(e.target.value, 10) || 1)}
          />
        </label>
      </div>

      <div className={s.calcResult} aria-live='polite' data-reveal='scale'>
        <div className={s.rented}>
          <span>{t.rented}</span>
          <strong aria-label={money(rented, lang)}>
            <span aria-hidden>{money(rentedShown, lang)}</span>
          </strong>
          <i aria-hidden style={{ '--w': rented / scale } as CSSProperties} />
          <p>{t.nothing}</p>
        </div>
        <div className={s.owned}>
          <span>{years === 1 ? t.stacOne : t.stac.replace('{n}', String(years))}</span>
          <strong aria-label={money(stac, lang)}>
            <span aria-hidden>{money(stacShown, lang)}</span>
          </strong>
          <i aria-hidden style={{ '--w': stac / scale } as CSSProperties} />
          <p>{t.own}</p>
          <p className={s.keep}>{keep > 0 ? t.keep.replace('{amount}', money(keep, lang)) : t.keepNone}</p>
        </div>
        <p className={s.legal}>{t.legal}</p>
      </div>
    </section>
  )
}

export function Home() {
  const [lang, choose] = useLang('en')
  const t = HOME[lang]
  const c = COPY[lang]
  useReveal(lang)

  const [paused, setPaused] = useState(false)
  const [manifesto, setManifesto] = useState(false)

  const navLinks = [...t.nav, [LINKS.login, t.signIn]] as const
  const langSwitch = (
    <div className={ui.lang} role='group' aria-label={t.langLabel}>
      {LANGS.map((code) => (
        <button key={code} type='button' lang={code} aria-pressed={lang === code} onClick={() => choose(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <div id='top' className={`${ui.theme} ${s.home}`}>
      <Dock
        brand='stacbase'
        navLabel={t.navLabel}
        links={t.nav}
        menu={t.menu}
        yieldTo='#workspace'
        cta={
          <a href={LINKS.signup} className={`${ui.btn} ${ui.btnPop}`}>
            {t.join}
          </a>
        }
      />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className={ui.heroWrap}>
          <section className={ui.hero} aria-label='Stacbase'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={`${ui.heroImg} ${s.heroImg}`} src='/media/people/group.jpg' alt={t.hero.alt} width={1199} height={800} fetchPriority='high' />
            <div className={ui.heroShade} aria-hidden />
            <HeroHeader
              brand='stacbase'
              navLabel={t.navLabel}
              links={navLinks}
              menu={t.menu}
              lang={langSwitch}
              cta={
                <a href={LINKS.signup} className={`${ui.btn} ${ui.btnWhite} ${ui.btnSm}`}>
                  {t.join}
                </a>
              }
            />
            <div className={`${ui.heroBody} ${s.heroBody}`}>
              <div className={s.heroText}>
                <h1 className={ui.h1}>
                  <Words text={t.hero.title} delay={150} />
                </h1>
                <p className={ui.heroLead} data-reveal style={{ '--d': '500ms' } as CSSProperties}>
                  {t.hero.lead}
                </p>
                <ul className={s.chips} aria-label={t.hero.chipsLabel} data-reveal style={{ '--d': '620ms' } as CSSProperties}>
                  {t.hero.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <div className={s.heroCta} data-reveal style={{ '--d': '740ms' } as CSSProperties}>
                  <a href={LINKS.signup} className={`${ui.btn} ${ui.btnPop}`}>
                    {t.join}
                    <Arrow />
                  </a>
                  <span>{t.hero.note}</span>
                </div>
              </div>

              <aside className={s.crowd} data-reveal='fade' style={{ '--d': '900ms' } as CSSProperties}>
                <div className={s.crowdHead}>
                  <span>{t.crowd.title}</span>
                  <button type='button' aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
                    {paused ? t.crowd.play : t.crowd.pause}
                  </button>
                </div>
                <div className={s.crowdWindow} aria-label={t.crowd.label}>
                  <ul data-paused={paused || undefined}>
                    {[0, 1].map((copy) =>
                      t.crowd.people.map(([role, line], i) => (
                        <li key={`${copy}-${role}`} aria-hidden={copy === 1 || undefined}>
                          <span className={s.face} style={faceStyle(FACES[i])} aria-hidden />
                          <div>
                            <b>{role}</b>
                            <span>{line}</span>
                          </div>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              </aside>
            </div>
          </section>
        </div>

        {/* ── Use. Pay. Co-own. : trois panneaux qui s'empilent ───────── */}
        <div className={s.trio}>
          {t.trio.map(([word, body], i) => (
            <section key={word} className={s.trioPanel} data-tone={i} aria-label={word}>
              <h2>
                <Words text={word} />
              </h2>
              <p data-reveal style={{ '--d': '180ms' } as CSSProperties}>
                {body}
              </p>
              {i === 2 ? (
                <a href='#manifesto' className={`${ui.btn} ${ui.btnPop} ${ui.btnSm}`} data-reveal style={{ '--d': '300ms' } as CSSProperties}>
                  {t.trioCta}
                </a>
              ) : null}
            </section>
          ))}
        </div>

        {/* ── L'espace de travail, épinglé ────────────────────────────── */}
        <Workspace lang={lang} />

        {/* ── Combien avez-vous loué ? ────────────────────────────────── */}
        <Calculator lang={lang} />

        {/* ── Adhésion ────────────────────────────────────────────────── */}
        <section id='membership' className={`${ui.wrap} ${s.membership}`} aria-labelledby='mem-title'>
          <header>
            <h2 id='mem-title' className={ui.h2}>
              <Words text={c.pricing.title} />
            </h2>
            <p className={ui.lead} data-reveal>
              {t.membership.lead}
            </p>
          </header>
          <div className={s.plans}>
            {PLANS.map((code, i) => {
              const [tagline, features] = c.pricing.plans[code]
              const price = PLAN_PRICES[code]
              const name = PLAN_NAMES[code]
              const featured = code === 'pro'
              const perDay = (price / 30).toFixed(2)
              return (
                <article key={code} className={s.plan} data-featured={featured || undefined} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                  <div className={s.planHead}>
                    <h3>{name}</h3>
                    {featured ? <span>{c.pricing.recommended}</span> : null}
                  </div>
                  <p className={s.planDesc}>{tagline}</p>
                  <div className={s.planPrice}>
                    <p>
                      <strong>{money(price, lang)}</strong>
                      <span>{c.pricing.month}</span>
                    </p>
                    {price > 0 ? (
                      <>
                        <span>{c.pricing.perDay.replace('{price}', lang === 'fr' ? `${perDay.replace('.', ',')} $` : `$${perDay}`)}</span>
                        <b>{c.pricing.yearly.replace('{price}', money(annualPrice(price), lang))}</b>
                      </>
                    ) : null}
                  </div>
                  <div className={s.planCtas}>
                    <a href={LINKS.signup} className={`${ui.btn} ${ui.btnSm} ${featured ? ui.btnPop : ui.btnInk}`}>
                      {code === 'free' ? c.pricing.cta.free : `${c.pricing.cta.paid} ${name}`}
                    </a>
                    {CO_OWN_PLANS.includes(code) ? (
                      <a href='#manifesto' className={`${ui.btn} ${ui.btnSm} ${ui.btnLine}`}>
                        {c.pricing.coOwn}
                      </a>
                    ) : null}
                  </div>
                  <ul>
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        {/* ── Le manifeste ────────────────────────────────────────────── */}
        <div id='manifesto' className={s.ownWrap}>
          <section className={s.own} aria-labelledby='own-title'>
            <span className={s.ownBadge} data-reveal>
              <i aria-hidden>
                <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <rect x='3' y='5' width='18' height='14' rx='2' />
                  <path d='M3 10h18' />
                </svg>
              </i>
              {c.invest.badge}
            </span>
            <h2 id='own-title'>
              <Words text={c.invest.title} />
            </h2>
            <p data-reveal>{c.invest.lead}</p>
            <ul>
              {c.invest.points.map((point, i) => (
                <li key={point} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                  <i aria-hidden>
                    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.6' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M5 12l5 5L20 7' />
                    </svg>
                  </i>
                  {point}
                </li>
              ))}
            </ul>
            <div className={s.ownCtas} data-reveal>
              <a href={LINKS.invest} className={`${ui.btn} ${ui.btnWhite}`}>
                {c.invest.cta}
                <Arrow />
              </a>
              <button type='button' className={`${ui.btn} ${ui.btnLine}`} onClick={() => setManifesto(true)}>
                {c.invest.manifesto}
              </button>
            </div>
          </section>
        </div>

        {/* ── Questions ───────────────────────────────────────────────── */}
        <section className={`${ui.wrap} ${s.faq}`} aria-labelledby='faq-title'>
          <h2 id='faq-title' className={ui.h2}>
            <Words text={t.faqTitle} />
          </h2>
          <Questions items={c.faq.items as unknown as readonly (readonly [string, string])[]} />
        </section>

      </main>

      <footer className={`${ui.wrap} ${ui.footer}`}>
        <div className={ui.footBrand}>
          <a href='#top' className={ui.brand}>
            stacbase
          </a>
          <small>Use. Pay. Co-own.</small>
        </div>
        <nav aria-label={t.footer.nav}>
          {t.footer.links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a href={LINKS.privacy}>{t.footer.privacy}</a>
          <a href={LINKS.terms}>{t.footer.terms}</a>
          <a href={LINKS.linkedin} target='_blank' rel='noreferrer'>
            LinkedIn
          </a>
          <a href={LINKS.instagram} target='_blank' rel='noreferrer'>
            Instagram
          </a>
        </nav>
        <span className={ui.footMeta}>© {new Date().getFullYear()} Stacbase</span>
      </footer>

      <Manifesto lang={lang} open={manifesto} onClose={() => setManifesto(false)} />
    </div>
  )
}
