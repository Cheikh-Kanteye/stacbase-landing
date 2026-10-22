'use client'

import { useEffect, useState } from 'react'
import { LINKS, type Lang } from '@/lib/copy'
import styles from './Careers.module.css'

const copy = {
  fr: {
    back: 'Retour à l’accueil', label: 'CARRIÈRES · STACBASE',
    title: 'Le prochain chapitre se construit ensemble.',
    lead: 'Stacbase réunit les outils du quotidien des agences, des freelances et des équipes marketing. Nous construisons un espace de travail qui donne plus de place aux idées et moins aux tâches dispersées.',
    missionLabel: 'NOTRE MISSION', missionTitle: 'Faire de la place pour ce qui compte.',
    mission: 'Adafri nous a appris à simplifier la publicité. Avec Stacbase, nous élargissons cette ambition aux opérations qui entourent chaque campagne : projets, clients, documents et collaboration.',
    story: 'Découvrir notre histoire',
    joinLabel: 'NOUS SUIVRE', joinTitle: 'Envie de prendre part à la suite ?',
    join: 'Les opportunités de rejoindre Stacbase seront annoncées sur notre page LinkedIn. Suivez-nous pour découvrir les prochaines ouvertures et les nouvelles du projet.',
    linkedin: 'Voir Stacbase sur LinkedIn',
    footer: 'Stacbase · Un espace pour avancer ensemble.',
  },
  en: {
    back: 'Back to home', label: 'CAREERS · STACBASE',
    title: 'The next chapter is built together.',
    lead: 'Stacbase brings everyday tools together for agencies, freelancers and marketing teams. We are building a workspace with more room for ideas and less time lost across scattered tasks.',
    missionLabel: 'OUR MISSION', missionTitle: 'Make room for what matters.',
    mission: 'Adafri taught us how to make advertising simpler. With Stacbase, that ambition now extends to the work around every campaign: projects, clients, documents and collaboration.',
    story: 'Read our story',
    joinLabel: 'STAY IN TOUCH', joinTitle: 'Want to be part of what comes next?',
    join: 'Opportunities to join Stacbase will be announced on our LinkedIn page. Follow us for future openings and updates from the team.',
    linkedin: 'Visit Stacbase on LinkedIn',
    footer: 'Stacbase · A workspace to move forward together.',
  },
}

export function Careers() {
  const [lang, setLang] = useState<Lang>('fr')
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stacbase-landing-lang')
      if (saved === 'en' || saved === 'fr') setLang(saved)
    } catch { /* Language preference is optional. */ }
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  function choose(next: Lang) {
    setLang(next)
    try { localStorage.setItem('stacbase-landing-lang', next) } catch { /* Optional. */ }
  }
  const c = copy[lang]
  return <div className={styles.page} lang={lang}>
    <header className={styles.header}>
      <a className={styles.brand} href='/' aria-label={c.back}><img src='/media/stacbase-wordmark.png' width={1600} height={400} alt='Stacbase' /></a>
      <nav className={styles.nav} aria-label={lang === 'fr' ? 'Navigation' : 'Navigation'}>
        <a href='/'>{c.back} ↗</a>
        <div className={styles.lang} role='group' aria-label='Language / Langue'>
          {(['fr', 'en'] as const).map(code => <button key={code} type='button' lang={code} aria-pressed={lang === code} onClick={() => choose(code)}>{code.toUpperCase()}</button>)}
        </div>
      </nav>
    </header>
    <main>
      <section className={styles.hero}>
        <p className={styles.label}><span className={styles.dot} />{c.label}</p>
        <h1>{c.title}</h1>
        <p className={styles.lead}>{c.lead}</p>
        <a className={styles.scroll} href='#mission'>{c.missionLabel} ↓</a>
      </section>
      <section id='mission' className={styles.section} aria-labelledby='mission-title'>
        <p className={styles.label}>{c.missionLabel}</p>
        <div><h2 id='mission-title'>{c.missionTitle}</h2><p>{c.mission}</p><a className={styles.link} href='/adafri'>{c.story} ↗</a></div>
      </section>
      <section className={styles.join} aria-labelledby='join-title'>
        <p className={styles.label}>{c.joinLabel}</p>
        <div><h2 id='join-title'>{c.joinTitle}</h2><p>{c.join}</p><a className={styles.button} href={LINKS.linkedin} target='_blank' rel='noopener noreferrer'>{c.linkedin} ↗</a></div>
      </section>
    </main>
    <footer className={styles.footer}><span>{c.footer}</span><a href='/'>{c.back} ↗</a></footer>
  </div>
}
