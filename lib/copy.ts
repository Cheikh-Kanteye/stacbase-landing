export type Lang = 'en' | 'fr'

export const LANGS: Lang[] = ['en', 'fr']

/** Un fragment de la phrase du bas : texte simple, mot fort, ou mot qui change de couleur. */
export type Segment = { text: string; tone?: 'strong' | 'highlight' }

export interface Copy {
  headline: string
  subline: string
  cta: string
  ctaLabel: string
  open: string
  wordmarkAlt: string
  tagline: Segment[]
  privacy: string
  terms: string
  langLabel: string
  instagram: string
  linkedin: string
}

export const COPY: Record<Lang, Copy> = {
  en: {
    headline: '+22 Tools free into One system',
    subline: 'This OS doesn’t add another tab. It makes them disappear.',
    cta: 'Try now',
    ctaLabel: 'Try Stacbase now — create your account',
    open: 'Open',
    wordmarkAlt: 'Stacbase',
    tagline: [
      { text: 'The everyday tools for ' },
      { text: 'modern', tone: 'strong' },
      { text: ' ' },
      { text: 'digital marketers', tone: 'highlight' },
      { text: ' into one stack' },
    ],
    privacy: 'Privacy',
    terms: 'Terms',
    langLabel: 'Language',
    instagram: 'Stacbase on Instagram',
    linkedin: 'Stacbase on LinkedIn',
  },
  fr: {
    headline: '+22 outils gratuits dans un seul système',
    subline: 'Cet OS n’ajoute pas d’onglet. Il les fait disparaître.',
    cta: 'Essayer',
    ctaLabel: 'Essayer Stacbase — créer votre compte',
    open: 'Ouvrez',
    wordmarkAlt: 'Stacbase',
    tagline: [
      { text: 'Les outils du quotidien des ' },
      { text: 'marketeurs digitaux', tone: 'highlight' },
      { text: ' ' },
      { text: 'modernes', tone: 'strong' },
      { text: ', réunis en une seule stack' },
    ],
    privacy: 'Confidentialité',
    terms: 'Conditions',
    langLabel: 'Langue',
    instagram: 'Stacbase sur Instagram',
    linkedin: 'Stacbase sur LinkedIn',
  },
}

const APP = 'https://work.stacbase.com'

export const LINKS = {
  signup: `${APP}/auth/signup`,
  privacy: `${APP}/privacy`,
  terms: `${APP}/terms`,
  // À CONFIRMER : aucun compte social n'est référencé dans le dépôt.
  instagram: 'https://www.instagram.com/stacbase',
  linkedin: 'https://www.linkedin.com/company/stacbase',
}
