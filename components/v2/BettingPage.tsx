import type { Metadata } from 'next'
import type { Lang } from '@/lib/copy'
import { BETTING, BETTING_META, BETTING_PATH } from '@/lib/betting'
import { Betting } from './Betting'

const SITE = 'https://stacbase.com'

/** Métadonnées d'une des deux versions : canonique, hreflang croisés, aperçu de partage. */
export function bettingMetadata(lang: Lang): Metadata {
  const meta = BETTING_META[lang]
  const url = `${SITE}${BETTING_PATH[lang]}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: { fr: `${SITE}${BETTING_PATH.fr}`, en: `${SITE}${BETTING_PATH.en}`, 'x-default': `${SITE}${BETTING_PATH.fr}` },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: '/media/people/four-faces.jpg', width: 1199, height: 685, alt: BETTING[lang].hero.alt }],
    },
  }
}

/** La page, avec ses questions en données structurées (FAQPage) pour les moteurs. */
export function BettingPage({ lang }: { lang: Lang }) {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: BETTING[lang].faq.items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\u003c') }} />
      <Betting lang={lang} />
    </>
  )
}
