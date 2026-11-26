'use client'

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { LANGS, type Lang } from '@/lib/copy'
import { BETTING, BETTING_EMAIL, BETTING_PATH, targetingSentence } from '@/lib/betting'
import { CountUp, useReveal, Words } from '../site/motion'
import { Arrow, Dock, HeroHeader, Questions } from './Chrome'
import ui from './ui.module.css'
import s from './Betting.module.css'

const STORY_IMAGES = [
  { src: '/media/people/group.jpg', width: 1199, height: 800 },
  { src: '/media/people/grid-1400.jpg', width: 1400, height: 788 },
] as const

function ContactForm({ lang }: { lang: Lang }) {
  const t = BETTING[lang].contact
  const [company, setCompany] = useState('')
  const [countries, setCountries] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const value = email.trim()
    if (value === '') return setError(t.empty)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setError(t.invalid)
    // Le site est statique : la demande part de la messagerie du visiteur,
    // déjà rédigée. Rien n'est annoncé comme envoyé tant qu'il ne l'a pas fait.
    const [hello, intro, labelCompany, labelCountries, labelContact] = t.mail
    const body = [hello, '', intro, '', `${labelCompany} : ${company.trim() || '—'}`, `${labelCountries} : ${countries.trim() || '—'}`, `${labelContact} : ${value}`].join('\n')
    window.location.href = `mailto:${BETTING_EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`
    setDone(true)
  }

  if (done) {
    return (
      <div role='status' className={s.done}>
        <b>{t.doneTitle}</b>
        <p>
          {t.done} <a href={`mailto:${BETTING_EMAIL}`}>{BETTING_EMAIL}</a>.
        </p>
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label>
        {t.company}
        <input type='text' autoComplete='organization' placeholder={t.companyHint} value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label>
        {t.countries}
        <input type='text' placeholder={t.countriesHint} value={countries} onChange={(e) => setCountries(e.target.value)} />
      </label>
      <label>
        {t.email}
        <input
          type='email'
          autoComplete='email'
          placeholder={t.emailHint}
          value={email}
          aria-invalid={error !== ''}
          aria-describedby={error ? 'bt-error' : undefined}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
        />
      </label>
      {error ? (
        <p id='bt-error' role='alert' className={s.error}>
          {error}
        </p>
      ) : null}
      <button type='submit' className={`${ui.btn} ${ui.btnPop}`}>
        {t.send}
        <Arrow />
      </button>
      <span className={s.or}>
        {t.or} <a href={`mailto:${BETTING_EMAIL}`}>{BETTING_EMAIL}</a>
      </span>
    </form>
  )
}

export function Betting({ lang }: { lang: Lang }) {
  const t = BETTING[lang]
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  useReveal(lang)

  // La langue vient de l'adresse : le document l'annonce aux lecteurs d'écran.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const [direct, setDirect] = useState(true)
  const [format, setFormat] = useState(0)
  const [picks, setPicks] = useState<Record<string, readonly number[]>>(() => Object.fromEntries(t.targeting.groups.map((g) => [g.key, g.picked])))

  // Chaque groupe garde au moins un choix : un ciblage vide n'existe pas.
  const toggle = (key: string, option: number) =>
    setPicks((current) => {
      const list = current[key]
      if (!list.includes(option)) return { ...current, [key]: [...list, option].sort() }
      return list.length > 1 ? { ...current, [key]: list.filter((i) => i !== option) } : current
    })

  const fmt = t.formats.items[format]
  const cta = (
    <a href='#contact' className={`${ui.btn} ${ui.btnWhite} ${ui.btnSm}`}>
      {t.cta}
    </a>
  )
  const brand = (
    <>
      stacbase <span>× Betting</span>
    </>
  )

  return (
    <div id='top' className={`${ui.theme} ${s.betting}`}>
      <Dock
        brand={brand}
        navLabel={t.navLabel}
        links={t.nav}
        cta={
          <a href='#contact' className={`${ui.btn} ${ui.btnPop}`}>
            {t.cta}
          </a>
        }
      />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className={ui.heroWrap}>
          <section className={ui.hero} aria-label='Stacbase × Betting'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={`${ui.heroImg} ${s.heroImg}`} src='/media/people/four-faces.jpg' alt={t.hero.alt} width={1199} height={685} fetchPriority='high' />
            <div className={`${ui.heroShade} ${s.shade}`} aria-hidden />
            <HeroHeader
              brand={brand}
              navLabel={t.navLabel}
              links={t.nav}
              lang={
                <div className={ui.lang} role='group' aria-label={t.langLabel}>
                  {LANGS.map((code) => (
                    <a key={code} href={BETTING_PATH[code]} hrefLang={code} lang={code} aria-current={lang === code ? 'true' : undefined}>
                      {code.toUpperCase()}
                    </a>
                  ))}
                </div>
              }
              cta={cta}
            />
            <div className={`${ui.heroBody} ${s.heroBody}`}>
              <span className={s.tag} data-reveal>
                {t.hero.tag}
              </span>
              <h1 className={`${ui.h1} ${s.h1}`}>
                <Words text={t.hero.title[0]} delay={120} />
                <br />
                <Words text={t.hero.title[1]} delay={380} />
              </h1>
              <p className={ui.heroLead} data-reveal style={{ '--d': '620ms' } as CSSProperties}>
                {t.hero.lead}
              </p>
              <div className={s.heroCta} data-reveal style={{ '--d': '740ms' } as CSSProperties}>
                <a href='#contact' className={`${ui.btn} ${ui.btnPop}`}>
                  {t.cta}
                  <Arrow />
                </a>
                <span>
                  <b>18+</b>
                  {t.hero.legal}
                </span>
              </div>
              <dl className={s.facts} data-reveal='fade' style={{ '--d': '880ms' } as CSSProperties}>
                {t.hero.facts.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value.includes('@') ? <a href={`mailto:${value}`}>{value}</a> : value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        {/* ── Chiffres ────────────────────────────────────────────────── */}
        <section className={`${ui.wrap} ${s.figures}`} aria-labelledby='bt-figures'>
          <h2 id='bt-figures' className={`${ui.h2} ${s.h2}`}>
            <Words text={t.figures.title} />
          </h2>
          <div className={s.figureGrid}>
            {t.figures.items.map((item, i) => (
              <div key={item.label} className={s.figure} data-soft={i < 2 || undefined} data-reveal style={{ '--d': `${i * 90}ms` } as CSSProperties}>
                <strong>{'text' in item ? item.text : <CountUp value={item.value} locale={locale} suffix={item.suffix} />}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Lien direct ─────────────────────────────────────────────── */}
        <section id='lien-direct' className={`${ui.wrap} ${s.direct}`} aria-labelledby='bt-direct'>
          <div className={s.sectionHead}>
            <h2 id='bt-direct' className={`${ui.h2} ${s.h2}`}>
              <Words text={t.direct.title} />
            </h2>
            <div role='group' aria-label={t.direct.group} className={s.toggle} data-reveal>
              <button type='button' aria-pressed={!direct} data-tone='ink' onClick={() => setDirect(false)}>
                {t.direct.before}
              </button>
              <button type='button' aria-pressed={direct} onClick={() => setDirect(true)}>
                {t.direct.after}
              </button>
            </div>
          </div>

          <div className={s.route} aria-live='polite' data-direct={direct} data-reveal='scale'>
            {direct ? (
              <div key='after' className={s.path}>
                <span className={s.node}>{t.direct.ad}</span>
                <i className={s.track} aria-hidden />
                <span className={s.node} data-you>
                  {t.direct.yourSite}
                </span>
                <span className={s.badge}>{t.direct.badge}</span>
              </div>
            ) : (
              <div key='before' className={s.path}>
                <span className={s.node}>{t.direct.ad}</span>
                <i className={s.track} aria-hidden />
                <span className={s.node} data-detour>
                  {t.direct.middle}
                </span>
                <i className={s.track} aria-hidden />
                <span className={s.node}>{t.direct.site}</span>
                <span className={s.lost}>{t.direct.lost}</span>
              </div>
            )}
          </div>

          <div className={s.directGrid}>
            <div className={s.directText}>
              {t.direct.body.map(([before, bold, after], i) => (
                <p key={bold} data-reveal style={{ '--d': `${i * 110}ms` } as CSSProperties}>
                  {before}
                  <b>{bold}</b>
                  {after}
                </p>
              ))}
            </div>
            <div className={s.promise} data-reveal style={{ '--d': '160ms' } as CSSProperties}>
              <span className={ui.eyebrow}>{t.direct.promiseTag}</span>
              <strong>{t.direct.promise}</strong>
              <p>{t.direct.promiseNote}</p>
            </div>
          </div>
        </section>

        {/* ── Formats ─────────────────────────────────────────────────── */}
        <section id='formats' className={s.formats} aria-labelledby='bt-formats'>
          <div className={`${ui.wrap} ${s.formatsInner}`}>
            <div className={s.sectionHead}>
              <h2 id='bt-formats' className={`${ui.h2} ${s.h2}`}>
                <Words text={t.formats.title} />
              </h2>
              <div role='group' aria-label={t.formats.group} className={s.toggle} data-on-sand data-reveal>
                {t.formats.items.map((item, i) => (
                  <button key={item.name} type='button' aria-pressed={format === i} data-tone='ink' onClick={() => setFormat(i)}>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.formatCard} data-reveal='scale'>
              <div key={fmt.name} className={s.formatText}>
                <h3>{fmt.name}</h3>
                <span>{fmt.tag}</span>
                <p>
                  {fmt.text} <b>{fmt.bold}</b>
                </p>
              </div>
              <figure className={s.screen}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/media/people/gars.jpeg' alt={t.formats.alt} width={1080} height={810} loading='lazy' />
                {format === 0 ? (
                  <figcaption key='display' className={s.adDisplay}>
                    <div>
                      <span>{t.formats.adLabel}</span>
                      <b>{t.formats.adTitle}</b>
                    </div>
                    <i>{t.formats.adCta}</i>
                  </figcaption>
                ) : (
                  <figcaption key='native' className={s.adNative}>
                    <span>{t.formats.sponsored}</span>
                    <b>{t.formats.nativeTitle}</b>
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </section>

        {/* ── Ciblage ─────────────────────────────────────────────────── */}
        <section id='ciblage' className={`${ui.wrap} ${s.targeting}`} aria-labelledby='bt-target'>
          <header>
            <h2 id='bt-target' className={`${ui.h2} ${s.h2}`}>
              <Words text={t.targeting.title} />
            </h2>
            <p className={ui.lead} data-reveal>
              {t.targeting.lead}
            </p>
          </header>
          <div className={s.groups}>
            {t.targeting.groups.map((group, g) => (
              <fieldset key={group.key} data-reveal style={{ '--d': `${g * 70}ms` } as CSSProperties}>
                <legend>{group.title}</legend>
                <span>{group.hint}</span>
                <div>
                  {group.options.map((option, i) => (
                    <button key={option} type='button' aria-pressed={picks[group.key].includes(i)} onClick={() => toggle(group.key, i)}>
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className={s.adults} data-reveal style={{ '--d': '350ms' } as CSSProperties}>
              <b>{t.targeting.adults}</b>
              <span>{t.targeting.adultsHint}</span>
              <i>
                <svg aria-hidden width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                  <rect x='5' y='11' width='14' height='10' rx='2' />
                  <path d='M8 11V7a4 4 0 0 1 8 0v4' />
                </svg>
                18+
              </i>
            </div>
          </div>
          <div className={s.summary} aria-live='polite' data-reveal>
            <span className={ui.eyebrow}>{t.targeting.yours}</span>
            <p>{targetingSentence(lang, format, picks)}</p>
          </div>
          <div className={s.model} data-reveal>
            <span className={ui.eyebrow}>{t.targeting.model}</span>
            <b>CPM</b>
          </div>
        </section>

        {/* ── Adafri → Stacbase ───────────────────────────────────────── */}
        <section className={`${ui.wrap} ${s.story}`} aria-labelledby='bt-story'>
          <h2 id='bt-story' className={`${ui.h2} ${s.h2}`}>
            <Words text={t.story.title} />
          </h2>
          <div>
            {t.story.cards.map((card, i) => (
              <article key={card.title} data-reveal style={{ '--d': `${i * 120}ms` } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...STORY_IMAGES[i]} alt={card.alt} loading='lazy' />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Questions ───────────────────────────────────────────────── */}
        <section id='faq' className={`${ui.wrap} ${s.faq}`} aria-labelledby='bt-faq'>
          <h2 id='bt-faq' className={`${ui.h2} ${s.h2}`}>
            <Words text={t.faq.title} />
          </h2>
          <Questions items={t.faq.items} />
        </section>

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <div id='contact' className={s.contactWrap}>
          <section className={s.contact} aria-labelledby='bt-contact'>
            <div className={s.contactText}>
              <h2 id='bt-contact' className={ui.h2}>
                <Words text={t.contact.title} />
              </h2>
              <p data-reveal>{t.contact.lead}</p>
              <ol>
                {t.contact.steps.map((step, i) => (
                  <li key={step} data-reveal style={{ '--d': `${i * 60}ms` } as CSSProperties}>
                    <span>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.contactCard} data-reveal='scale'>
              <h3>{t.contact.formTitle}</h3>
              <ContactForm lang={lang} />
            </div>
          </section>
        </div>
      </main>

      <footer className={`${ui.wrap} ${ui.footer} ${s.footer}`}>
        <a href='/' className={ui.brand}>
          {brand}
        </a>
        <span>{t.footer}</span>
        <span className={ui.footMeta}>© {new Date().getFullYear()} Stacbase</span>
      </footer>
    </div>
  )
}
