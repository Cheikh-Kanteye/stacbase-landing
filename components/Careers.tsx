'use client'

import type { CSSProperties } from 'react'
import { LINKS } from '@/lib/copy'
import { ArrowDown, ArrowRight, ArrowUpRight } from './site/icons'
import { useLang } from './site/lang'
import { useReveal, Words } from './site/motion'
import { SiteFooter, SiteNav } from './site/Shell'
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
  const [lang, choose] = useLang('fr')
  useReveal(lang)
  const c = copy[lang]
  return <div className={styles.page} lang={lang}>
    <SiteNav lang={lang} onLang={choose} />
    <main className='container'>
      <section className={styles.hero}>
        <p className={styles.label} data-reveal><span className={styles.dot} />{c.label}</p>
        <h1 className='display'><Words text={c.title} delay={100} /></h1>
        <p className='lead' data-reveal style={{ '--d': '400ms' } as CSSProperties}>{c.lead}</p>
        <a className='link-arrow' href='#mission' data-reveal style={{ '--d': '550ms' } as CSSProperties}>{c.missionLabel} <ArrowDown size={16} /></a>
      </section>
      <section id='mission' className={styles.section} aria-labelledby='mission-title'>
        <p className={styles.label} data-reveal>{c.missionLabel}</p>
        <div data-reveal><h2 id='mission-title' className='h2'>{c.missionTitle}</h2><p className='lead'>{c.mission}</p><a className='link-arrow' href='/adafri'>{c.story} <ArrowRight size={16} /></a></div>
      </section>
      <section className={styles.join} aria-labelledby='join-title' data-reveal='scale'>
        <p className={styles.label}>{c.joinLabel}</p>
        <div><h2 id='join-title' className='h2'>{c.joinTitle}</h2><p>{c.join}</p><a className='btn btn-light' href={LINKS.linkedin} target='_blank' rel='noopener noreferrer'>{c.linkedin} <ArrowUpRight size={17} /></a></div>
      </section>
    </main>
    <SiteFooter lang={lang} />
  </div>
}
