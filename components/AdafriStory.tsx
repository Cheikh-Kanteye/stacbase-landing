'use client'

import { useEffect, useState } from 'react'
import { LINKS, type Lang } from '@/lib/copy'
import styles from './AdafriStory.module.css'

const NOTE = 'https://work.stacbase.com/share/notes/c9227acb-882e-42bf-bb0f-139bd67a8c98'
const PRODUCTS = 'https://work.stacbase.com/share/projects/434b611f-08c8-4a40-8834-3c0a8b4dc502'
const story = {
  fr: {
    home: 'Accueil Stacbase', login: 'Se connecter', language: 'Langue',
    eyebrow: 'Une nouvelle étape, ensemble.', becomes: 'devient',
    lead: 'Tout a commencé avec vos campagnes. Aujourd’hui, notre ambition accompagne tout votre quotidien.',
    cta: 'Découvrir Stacbase', read: 'Lire notre histoire',
    chapter: '01 — Nos origines', title: 'La publicité nous a réunis.',
    intro: 'Adafri est né d’une idée simple : rendre la publicité Google plus accessible aux PME africaines. De Dakar à Brazzaville, vous avez donné vie à cette idée, campagne après campagne.',
    campaigns: 'campagnes lancées avec Adafri', people: 'personnes avec qui repenser le parcours',
    source: 'Les chiffres et l’histoire de notre évolution',
    next: '02 — Ce que nous avons appris', nextTitle: 'Votre journée ne s’arrête pas à une campagne.',
    nextBody: 'Il y a aussi les clients à suivre, les projets à faire avancer et l’équipe à coordonner. À vos côtés, nous avons vu les onglets s’accumuler, les données se disperser et les outils se multiplier.',
    quote: 'Un outil nous a réunis. Un espace de travail nous fait avancer.',
    future: '03 — Le prochain chapitre', futureTitle: 'Ouvrez Stacbase.',
    futureBody: 'Adafri évolue au sein d’un écosystème plus large : Stacbase. Un même espace pour réunir les outils du quotidien des agences, des freelances et des équipes marketing.',
    tools: '22+ outils, un seul espace.',
    rows: [
      ['Faire connaître', 'Les campagnes publicitaires restent au cœur de notre histoire.'],
      ['Organiser', 'Clients, projets et documents trouvent leur place dans le même espace.'],
      ['Travailler ensemble', 'Une base commune pour les échanges et le travail de votre équipe.'],
    ],
    products: 'Explorer les outils',
    community: 'La suite se construit avec vous.',
    communityBody: 'Vos usages ont fait grandir Adafri. Ils continuent de guider Stacbase. Notre ambition : construire avec notre communauté un environnement qui répond à la réalité de votre travail.',
    letter: 'Lire la lettre à notre communauté',
    questions: 'Vous connaissiez Adafri ?',
    faq: [
      ['Pourquoi ce nouveau nom ?', 'Stacbase exprime une ambition plus large : réunir les outils et les opérations du quotidien dans une même base. La publicité reste une partie de cette histoire.'],
      ['À qui s’adresse Stacbase ?', 'Aux agences, aux freelances et aux équipes marketing qui souhaitent retrouver leurs outils dans un espace de travail commun.'],
      ['Où découvrir la plateforme ?', 'Vous pouvez explorer les outils depuis cette page, créer un compte sur Stacbase ou vous connecter si vous possédez déjà un compte Stacbase.'],
    ],
    end: 'La même envie de vous faire avancer. Un nouvel horizon.',
    signup: 'Ouvrir mon espace', back: 'Retour à l’accueil',
    privacy: 'Confidentialité', terms: 'Conditions',
  },
  en: {
    home: 'Stacbase home', login: 'Sign in', language: 'Language',
    eyebrow: 'Our next chapter. Together.', becomes: 'becomes',
    lead: 'It started with your campaigns. Today, our ambition reaches across your working day.',
    cta: 'Discover Stacbase', read: 'Read our story',
    chapter: '01 — Where we started', title: 'Advertising brought us together.',
    intro: 'Adafri began with a simple idea: make Google advertising more accessible to African small businesses. From Dakar to Brazzaville, you brought that idea to life, one campaign at a time.',
    campaigns: 'campaigns launched with Adafri', people: 'people who helped rethink the experience',
    source: 'The numbers and story behind our evolution',
    next: '02 — What we learned', nextTitle: 'Your day goes beyond a campaign.',
    nextBody: 'There are clients to follow up with, projects to move forward and a team to coordinate. Working alongside you, we saw tabs pile up, information scatter and tools multiply.',
    quote: 'One tool brought us together. One workspace moves us forward.',
    future: '03 — What comes next', futureTitle: 'Open Stacbase.',
    futureBody: 'Adafri is evolving within a broader ecosystem: Stacbase. One workspace bringing together everyday tools for agencies, freelancers and marketing teams.',
    tools: '22+ tools. One workspace.',
    rows: [
      ['Reach your audience', 'Advertising campaigns remain at the heart of our story.'],
      ['Get organised', 'Clients, projects and documents belong in the same workspace.'],
      ['Work together', 'A shared base for your team’s conversations and daily work.'],
    ],
    products: 'Explore the tools',
    community: 'The next chapter is built with you.',
    communityBody: 'The way you work helped Adafri grow. It continues to guide Stacbase. Our ambition is to build with our community a workspace that reflects the reality of your day.',
    letter: 'Read our letter to the community',
    questions: 'Already know Adafri?',
    faq: [
      ['Why a new name?', 'Stacbase reflects a broader ambition: bringing everyday tools and operations into one shared base. Advertising remains part of that story.'],
      ['Who is Stacbase for?', 'Agencies, freelancers and marketing teams who want their tools together in a shared workspace.'],
      ['Where can I explore the platform?', 'Explore the tools from this page, create a Stacbase account, or sign in if you already have a Stacbase account.'],
    ],
    end: 'The same drive to move you forward. A new horizon.',
    signup: 'Open my workspace', back: 'Back to home',
    privacy: 'Privacy', terms: 'Terms',
  },
}

export function AdafriStory() {
  const [lang, setLang] = useState<Lang>('fr')
  const copy = story[lang]
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stacbase-landing-lang')
      if (saved === 'en' || saved === 'fr') setLang(saved)
    } catch { /* Keep the page's default language when storage is unavailable. */ }
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  function choose(next: Lang) {
    setLang(next)
    try { localStorage.setItem('stacbase-landing-lang', next) } catch { /* Optional preference. */ }
  }
  return (
    <div className={styles.page} lang={lang}>
      <header className={styles.header}>
        <a href='/' aria-label={copy.home} className={styles.brand}>
          <img src='/media/stacbase-wordmark.png' alt='Stacbase' width={1600} height={400} />
        </a>
        <nav aria-label={copy.language} className={styles.navigation}>
          <div className={styles.languages}>
            {(['fr', 'en'] as const).map(code => <button key={code} type='button' lang={code} aria-pressed={lang === code} onClick={() => choose(code)}>{code.toUpperCase()}</button>)}
          </div>
          <a className={styles.login} href='https://work.stacbase.com/auth/login'>{copy.login} <span aria-hidden>↗</span></a>
        </nav>
      </header>
      <main>
        <section className={styles.hero} aria-labelledby='transition-title'>
          <p className={styles.eyebrow}><span className={styles.dot} />{copy.eyebrow}</p>
          <h1 id='transition-title' className={styles.title}>
            <span className={styles.oldName}>Adafri<span className={styles.becomes}>{copy.becomes} <span aria-hidden>↘</span></span></span>
            <span className={styles.newName}>Stacbase<span className={styles.period}>.</span></span>
          </h1>
          <div className={styles.heroBottom}>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.actions}>
              <a href={LINKS.signup} className={styles.primary}>{copy.cta} <span aria-hidden>↗</span></a>
              <a href='#histoire' className={styles.textLink}>{copy.read} <span aria-hidden>↓</span></a>
            </div>
          </div>
        </section>
        <section id='histoire' className={styles.chapter} aria-labelledby='origins-title'>
          <p className={styles.label}>{copy.chapter}</p>
          <div>
            <h2 id='origins-title'>{copy.title}</h2>
            <p className={styles.body}>{copy.intro}</p>
            <dl className={styles.stats}>
              <div><dt>87 000<span>+</span></dt><dd>{copy.campaigns}</dd></div>
              <div><dt>3 500</dt><dd>{copy.people}</dd></div>
            </dl>
            <a href={NOTE} className={styles.source}>{copy.source} ↗</a>
          </div>
        </section>
        <section className={styles.chapter} aria-labelledby='lesson-title'>
          <p className={styles.label}>{copy.next}</p>
          <div><h2 id='lesson-title'>{copy.nextTitle}</h2><p className={styles.body}>{copy.nextBody}</p></div>
        </section>
        <div className={styles.manifesto}><p>{copy.quote}</p><span aria-hidden>↘</span></div>
        <section className={styles.chapter} aria-labelledby='future-title'>
          <p className={styles.label}>{copy.future}</p>
          <div>
            <h2 id='future-title'>{copy.futureTitle}</h2><p className={styles.body}>{copy.futureBody}</p>
            <p className={styles.tools}>{copy.tools}</p>
            <div className={styles.rows}>{copy.rows.map(([title, body], i) => <div className={styles.row} key={title}><span className={styles.number}>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div><span aria-hidden>↗</span></div>)}</div>
            <a href={PRODUCTS} className={styles.textLink}>{copy.products} <span aria-hidden>↗</span></a>
          </div>
        </section>
        <section className={styles.community} aria-labelledby='community-title'>
          <span className={styles.communityMark} aria-hidden>↗</span>
          <div><h2 id='community-title'>{copy.community}</h2><p className={styles.body}>{copy.communityBody}</p><a href={NOTE} className={styles.textLink}>{copy.letter} <span aria-hidden>↗</span></a></div>
        </section>
        <section className={styles.chapter} aria-labelledby='faq-title'>
          <h2 id='faq-title' className={styles.faqTitle}>{copy.questions}</h2>
          <div className={styles.faq}>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div>
        </section>
        <section className={styles.closing}>
          <p>{copy.end}</p>
          <a href={LINKS.signup} className={styles.primary}>{copy.signup} <span aria-hidden>↗</span></a>
        </section>
      </main>
      <footer className={styles.footer}><a href='/'>{copy.back} ↗</a><span>Adafri → Stacbase</span><div><a href={LINKS.privacy}>{copy.privacy}</a><a href={LINKS.terms}>{copy.terms}</a></div></footer>
    </div>
  )
}
