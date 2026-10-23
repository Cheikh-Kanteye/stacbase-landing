'use client'

// Le hub Publicité de l'application, produit par produit — comme les onglets
// de produits de Calendly : une icône par produit, une carte qui change.
import { useEffect, useRef, type CSSProperties } from 'react'
import type { Lang } from '@/lib/copy'
import { MiniWhatsApp } from './mock/Mocks'
import { ArrowRight, Chat, Globe, Image, Mail, Phone, Search, Thumb } from './site/icons'
import { Swap, useAutoTabs } from './site/motion'
import s from './AdHub.module.css'

const APP = 'https://work.stacbase.com/dashboard'

const HUB = {
  fr: {
    hub: 'Le hub Publicité', more: 'En savoir plus',
    tags: { new: 'Nouveau', early: 'Accès anticipé', sn: 'Sénégal' },
    products: [
      { name: 'Google Search', title: 'Apparaissez quand vos clients vous cherchent.', body: 'Choisissez vos mots-clés, rédigez vos annonces et fixez un budget quotidien : Stacbase publie la campagne et vous montre ce que chaque mot-clé rapporte.' },
      { name: 'Google Display', title: 'Vos visuels sur des millions de sites.', body: 'Importez vos images, ciblez par lieu et par centres d’intérêt, puis suivez impressions, clics et emplacements dans un rapport complet.' },
      { name: 'Meta', title: 'Facebook et Instagram, au même endroit.', body: 'Créez vos publicités Meta, choisissez votre audience et comparez les résultats de chaque plateforme sans quitter Stacbase.' },
      { name: 'Max it', title: 'Touchez les utilisateurs de Max it.', body: 'En partenariat avec Orange, diffusez vos offres auprès des utilisateurs de l’application Max it au Sénégal. Votre demande est transmise à Orange et traitée sous 48 h.' },
      { name: 'WhatsApp en masse', title: 'Vos messages, lus en quelques minutes.', body: 'Importez vos contacts, personnalisez chaque message avec le prénom, joignez une image ou un document et suivez les envois en direct.' },
      { name: 'E-mailing', title: 'Des e-mails à l’image de votre marque.', body: 'Composez vos campagnes à partir de modèles, envoyez-les à vos listes CRM et suivez ouvertures et clics.' },
    ],
    v: {
      sponsored: 'Sponsorisé', adTitle: 'Teranga Hotel | Séjour à Dakar −20 % | Réservez en ligne',
      adDesc: 'Chambres vue mer, petit-déjeuner inclus. Offre valable ce week-end seulement.',
      keywords: ['hôtel dakar', 'séjour vue mer', 'week-end sénégal'],
      banner: 'Séjour à Dakar', bannerSub: '−20 % ce week-end', book: 'Réserver',
      page: 'Teranga Hotel', postText: 'Le week-end parfait commence ici. −20 % sur votre séjour 🌊', likes: '1,2 k', cta: 'Réserver',
      offer: 'Offre partenaire', offerTitle: '−20 % sur votre séjour', offerBtn: 'Profiter de l’offre',
      subject: 'Votre week-end à Dakar vous attend', mailHi: 'Bonjour Fatou,', mailBody: 'Profitez de −20 % sur votre séjour ce week-end.', mailBtn: 'Je réserve', opens: 'Ouvertures', clicks: 'Clics',
    },
  },
  en: {
    hub: 'The Advertising hub', more: 'Learn more',
    tags: { new: 'New', early: 'Early access', sn: 'Senegal' },
    products: [
      { name: 'Google Search', title: 'Show up when your customers search for you.', body: 'Pick your keywords, write your ads and set a daily budget: Stacbase publishes the campaign and shows what each keyword brings in.' },
      { name: 'Google Display', title: 'Your visuals across millions of sites.', body: 'Upload your images, target by place and interests, then follow impressions, clicks and placements in a full report.' },
      { name: 'Meta', title: 'Facebook and Instagram, in one place.', body: 'Create your Meta ads, choose your audience and compare the results of each platform without leaving Stacbase.' },
      { name: 'Max it', title: 'Reach Max it users.', body: 'In partnership with Orange, promote your offers to users of the Max it app in Senegal. Your request is sent to Orange and handled within 48 hours.' },
      { name: 'Bulk WhatsApp', title: 'Your messages, read within minutes.', body: 'Import your contacts, personalise each message with a first name, attach an image or a document and follow every delivery live.' },
      { name: 'E-mailing', title: 'E-mails that look like your brand.', body: 'Build campaigns from templates, send them to your CRM lists and follow opens and clicks.' },
    ],
    v: {
      sponsored: 'Sponsored', adTitle: 'Teranga Hotel | Stay in Dakar −20% | Book online',
      adDesc: 'Sea-view rooms, breakfast included. Offer valid this weekend only.',
      keywords: ['hotel dakar', 'sea view stay', 'senegal weekend'],
      banner: 'Stay in Dakar', bannerSub: '−20% this weekend', book: 'Book',
      page: 'Teranga Hotel', postText: 'The perfect weekend starts here. −20% on your stay 🌊', likes: '1.2k', cta: 'Book now',
      offer: 'Partner offer', offerTitle: '−20% on your stay', offerBtn: 'Get the offer',
      subject: 'Your weekend in Dakar is waiting', mailHi: 'Hello Fatou,', mailBody: 'Enjoy −20% on your stay this weekend.', mailBtn: 'Book my stay', opens: 'Opens', clicks: 'Clicks',
    },
  },
}

const ICONS = [Search, Image, Thumb, Phone, Chat, Mail]
const ROUTES = ['google-search', 'google-display', 'meta', 'maxit', 'bulk-whatsapp', 'mass-mailing']
// Une couleur par produit, comme chez Calendly : l'onglet actif, le fond et
// le panneau de l'aperçu prennent la teinte du produit.
const COLORS = [
  { c: '#7c3aed', soft: '#ede7fe', glow: ['#c4b5fd', '#8b5cf6', '#f0abfc'] },
  { c: '#2563eb', soft: '#dbeafe', glow: ['#93c5fd', '#3b82f6', '#a5f3fc'] },
  { c: '#e11d48', soft: '#ffe4ec', glow: ['#fda4af', '#f472b6', '#c4b5fd'] },
  { c: '#ea580c', soft: '#ffedd5', glow: ['#fdba74', '#fb923c', '#fde68a'] },
  { c: '#16a34a', soft: '#dcfce7', glow: ['#86efac', '#2dd4bf', '#bef264'] },
  { c: '#150c78', soft: '#e0e7ff', glow: ['#a5b4fc', '#6366f1', '#93c5fd'] },
]
const TONES = ['violet', 'indigo', 'pink', 'amber', 'green', 'navy']

type V = (typeof HUB)['fr']['v']

function Visual({ i, v, lang }: { i: number; v: V; lang: Lang }) {
  if (i === 0)
    return (
      <div className={s.searchAd}>
        <div className={s.searchBar}>
          <Search size={14} /> {v.keywords[0]}
        </div>
        <div className={s.result}>
          <p className={s.sponsored}>{v.sponsored}</p>
          <p className={s.site}>
            <span>T</span> teranga-hotel.sn
          </p>
          <p className={s.adTitle}>{v.adTitle}</p>
          <p className={s.adDesc}>{v.adDesc}</p>
        </div>
        <div className={s.kw}>
          {v.keywords.map((k, n) => (
            <span key={k} style={{ '--i': n } as CSSProperties}>
              {k}
            </span>
          ))}
        </div>
      </div>
    )
  if (i === 1)
    return (
      <div className={s.site2}>
        <div className={s.siteBar}>
          <i />
          <i />
          <i />
        </div>
        <div className={s.siteBody}>
          <div className={s.lines}>
            <b />
            <b />
            <b />
            <b />
            <b />
          </div>
          <div className={s.banner}>
            <strong>{v.banner}</strong>
            <span>{v.bannerSub}</span>
            <em>{v.book}</em>
            <small>Ad</small>
          </div>
        </div>
      </div>
    )
  if (i === 2)
    return (
      <div className={s.post}>
        <div className={s.postHead}>
          <span className={s.avatar}>T</span>
          <div>
            <strong>{v.page}</strong>
            <p>{v.sponsored}</p>
          </div>
        </div>
        <p className={s.postText}>{v.postText}</p>
        <div className={s.postImage}>
          <Globe size={30} />
        </div>
        <div className={s.postFoot}>
          <span>👍 {v.likes}</span>
          <em>{v.cta}</em>
        </div>
      </div>
    )
  if (i === 3)
    return (
      <div className={s.phone}>
        <div className={s.phoneTop}>Max it</div>
        <div className={s.offer}>
          <p>{v.offer}</p>
          <strong>{v.offerTitle}</strong>
          <span>Teranga Hotel</span>
          <em>{v.offerBtn}</em>
        </div>
        <div className={s.phoneGrid}>
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    )
  if (i === 4)
    return (
      <div className={s.wa}>
        <MiniWhatsApp lang={lang} />
      </div>
    )
  return (
    <div className={s.mail}>
      <p className={s.subject}>{v.subject}</p>
      <div className={s.mailCard}>
        <div className={s.mailHero}>Teranga Hotel</div>
        <p>
          <strong>{v.mailHi}</strong>
          <br />
          {v.mailBody}
        </p>
        <em>{v.mailBtn}</em>
      </div>
      <div className={s.mailStats}>
        <span>
          {v.opens} <strong>{lang === 'fr' ? '42 %' : '42%'}</strong>
        </span>
        <span>
          {v.clicks} <strong>{lang === 'fr' ? '9,8 %' : '9.8%'}</strong>
        </span>
      </div>
    </div>
  )
}

export function AdHub({ lang, id }: { lang: Lang; id?: string }) {
  const t = HUB[lang]
  const tabs = useAutoTabs(t.products.length, 7000)
  const active = tabs.active
  const p = t.products[active]
  const Icon = ICONS[active]
  const tag = active === 3 ? [t.tags.early, t.tags.sn] : active === 4 ? [t.tags.new] : []
  const color = COLORS[active]

  // Sens de l'échange : vers la droite quand on avance, vers la gauche sinon.
  const last = useRef(active)
  const dir = active >= last.current ? 1 : -1
  useEffect(() => {
    last.current = active
  }, [active])

  // Au défilement, le fond s'élargit jusqu'aux bords de l'écran (`--e`).
  useEffect(() => {
    const el = tabs.ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const e = Math.min(1, Math.max(0, (h * 0.8 - r.top) / (h * 0.6)))
      el.style.setProperty('--e', e.toFixed(3))
      el.style.setProperty('--bleed', `${Math.max(0, (window.innerWidth - r.width) / 2 - 24)}px`)
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
  }, [tabs.ref])

  return (
    <div
      id={id}
      className={s.stage}
      ref={tabs.ref}
      {...tabs.hover}
      data-reveal='scale'
      style={{ '--d': '300ms', '--c': color.c, '--soft': color.soft, '--i': active } as CSSProperties}
    >
      {/* Un fond flou par produit ; on passe de l'un à l'autre en fondu. */}
      <div className={s.backdrop} aria-hidden>
        {COLORS.map((col, i) => (
          <div
            key={i}
            className={s.glow}
            data-on={i === active || undefined}
            style={{ '--g1': col.glow[0], '--g2': col.glow[1], '--g3': col.glow[2] } as CSSProperties}
          />
        ))}
      </div>

      <div className={s.tabs} role='tablist' aria-label={t.hub}>
        <span className={s.indicator} aria-hidden />
        {t.products.map((product, i) => {
          const TabIcon = ICONS[i]
          const on = active === i
          return (
            <button
              key={product.name}
              type='button'
              role='tab'
              aria-selected={on}
              aria-label={product.name}
              title={product.name}
              className={s.tab}
              onClick={() => tabs.select(i)}
            >
              <TabIcon size={24} />
              {on && tabs.running ? (
                <svg className={s.ring} viewBox='0 0 60 60' aria-hidden key={`r-${i}`}>
                  <rect x='2' y='2' width='56' height='56' rx='19' pathLength={1} />
                </svg>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className={s.card} role='tabpanel'>
        <Swap id={`${active}-${lang}`} dir={dir} className={s.textSwap}>
          <div className={s.text}>
            <p className={s.badge}>
              <span className={s.badgeIcon}>
                <Icon size={14} />
              </span>
              {p.name}
              {tag.map((label) => (
                <em key={label}>{label}</em>
              ))}
            </p>
            <h2 className={s.title}>{p.title}</h2>
            <p className={s.body}>{p.body}</p>
            <a className={s.more} href={`${APP}/${ROUTES[active]}`}>
              {t.more}
              <ArrowRight size={16} />
            </a>
          </div>
        </Swap>
        <div className={s.visual} data-tone={TONES[active]}>
          <i className={s.pillL} aria-hidden />
          <i className={s.pillR} aria-hidden />
          <Swap id={`${active}-${lang}`} dir={dir} className={s.visualSwap}>
            <Visual i={active} v={t.v} lang={lang} />
          </Swap>
        </div>
      </div>
    </div>
  )
}
