import type { Lang } from './copy'

export const BETTING_EMAIL = 'betting@stacbase.com'

/** Les deux adresses de la page : une par langue, reliées par hreflang. */
export const BETTING_PATH: Record<Lang, string> = {
  fr: '/publicite-paris-sportifs',
  en: '/en/sports-betting-advertising',
}

export const BETTING_META: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Publicité paris sportifs Afrique et Europe | Stacbase',
    description:
      'Régie publicitaire pour opérateurs de paris licenciés : display et native en lien direct, ciblage par pays, opérateur mobile et heure du match. 18+.',
  },
  en: {
    title: 'Sports betting advertising, Africa and Europe | Stacbase',
    description:
      'Ad network for licensed betting operators: display and native ads on a direct link, targeted by country, mobile carrier and match time. 18+.',
  },
}

type Group = { key: string; title: string; hint: string; options: readonly string[]; picked: readonly number[] }

export const BETTING = {
  fr: {
    navLabel: 'Principal',
    langLabel: 'Langue',
    nav: [['#lien-direct', 'Lien direct'], ['#formats', 'Formats'], ['#ciblage', 'Ciblage'], ['#contact', 'Contact']],
    cta: 'Parlons de vos marchés',
    hero: {
      alt: 'Quatre personnes qui rient devant des panneaux de couleurs vives',
      tag: 'Lien direct · Sans page intermédiaire',
      title: ['Publicité paris sportifs :', 'annonce, clic, votre site.'],
      lead: 'La régie digitale des opérateurs de paris licenciés, qui mène vos parieurs droit à votre site, en Afrique et en Europe.',
      legal: 'Uniquement dans les pays où vous êtes licencié.',
      facts: [['Cible', 'Opérateurs de paris'], ['Zone', 'Afrique et Europe'], ['Contact', BETTING_EMAIL]],
    },
    figures: {
      title: 'Une expérience terrain unique de la publicité digitale en Afrique.',
      items: [
        { value: 3500, suffix: '+', label: 'clients' },
        { value: 110, suffix: ' K+', label: 'campagnes' },
        { value: 11, suffix: '', label: 'opérateurs de paris' },
        { text: 'USA', label: 'siège social' },
      ],
    },
    direct: {
      title: 'Publicité betting en lien direct : zéro détour entre votre annonce et vos parieurs.',
      group: 'Parcours',
      before: 'Avant',
      after: 'Avec Stacbase',
      ad: 'Annonce',
      middle: 'Page intermédiaire',
      site: 'Site',
      yourSite: 'Votre site',
      lost: 'Clics perdus en route',
      badge: 'Lien direct',
      body: [
        ['Une ', 'verticale dédiée aux paris sportifs', ' dans nos nouveaux inventaires.'],
        ['Le parieur qui clique arrive ', 'directement sur votre site', ' : moins de clics perdus, plus de premiers dépôts.'],
      ],
      promiseTag: 'La promesse',
      promise: 'Chaque clic arrive chez vous.',
      promiseNote: 'Uniquement dans les pays où vous êtes licencié.',
    },
    formats: {
      title: 'Formats display et native pour les opérateurs de paris sportifs.',
      group: 'Format',
      alt: 'Un homme lit son journal, entouré d’autres lecteurs',
      items: [
        { name: 'Display', tag: 'La bannière sur les sites', text: 'Bannières sur des sites et applications à forte audience.', bold: 'Un clic mène droit à votre site.' },
        { name: 'Native', tag: 'Intégrée au contenu', text: 'L’annonce prend le style du site qui l’accueille : lue, pas ignorée.', bold: 'Lien direct vers votre site.' },
      ],
      adLabel: 'Annonce',
      adTitle: 'Bonus 100 %',
      adCta: 'Parier',
      sponsored: 'Sponsorisé',
      nativeTitle: 'Les meilleures cotes du week-end',
    },
    targeting: {
      title: 'Ciblage des parieurs : le bon public, au bon moment du match.',
      lead: 'Composez votre ciblage. La phrase en bas se met à jour.',
      groups: [
        { key: 'country', title: 'Pays licenciés', hint: 'Pays et villes où vous opérez', options: ['Mes pays licenciés', 'Villes précises'], picked: [0] },
        { key: 'carrier', title: 'Opérateur mobile', hint: 'Orange, MTN, Airtel…', options: ['Orange', 'MTN', 'Airtel'], picked: [0, 1] },
        { key: 'device', title: 'Appareil et OS', hint: 'Android, iOS, gamme de prix', options: ['Android', 'iOS'], picked: [0] },
        { key: 'lang', title: 'Langue', hint: 'Français, anglais, langues locales', options: ['Français', 'Anglais', 'Langues locales'], picked: [0] },
        { key: 'time', title: 'Heure du match', hint: 'Avant et pendant le direct', options: ['Avant le match', 'Pendant le direct'], picked: [1] },
      ] as readonly Group[],
      adults: 'Adultes uniquement',
      adultsHint: 'Toujours actif. Aucun public mineur.',
      yours: 'Votre ciblage',
      model: 'Modèle d’achat',
    },
    story: {
      title: 'Adafri va plus loin avec Stacbase.',
      cards: [
        { title: 'Nos origines', body: 'Adafri est né d’une idée simple : rendre la publicité Google accessible aux entreprises africaines, campagne après campagne, d’un pays à l’autre.', alt: 'Trois amies qui rient, vues d’en bas sur un ciel bleu' },
        { title: 'Le prochain chapitre', body: 'Adafri devient Stacbase : un espace de travail de 6 hubs et 25+ outils, porté par une société basée aux États-Unis. La publicité reste au cœur.', alt: 'Huit personnes souriantes sur fonds colorés, avec les lettres de stacbase' },
      ],
    },
    faq: {
      title: 'Questions fréquentes sur la publicité paris sportifs',
      items: [
        ['Quels formats publicitaires proposez-vous pour les paris sportifs ?', 'Deux formats : le display, des bannières sur des sites et applications à forte audience, et le native, une annonce qui prend le style du site qui l’accueille. Dans les deux cas, le clic mène directement à votre site.'],
        ['Qu’est-ce que le lien direct ?', 'Le parieur qui clique sur l’annonce arrive directement sur votre site, sans page intermédiaire. Il y a moins de clics perdus en route, et plus de premiers dépôts.'],
        ['Dans quels pays pouvez-vous diffuser mes annonces ?', 'En Afrique et en Europe, uniquement dans les pays où votre opérateur est licencié. Le ciblage descend jusqu’aux villes où vous opérez.'],
        ['Comment ciblez-vous les parieurs ?', 'Par pays licencié, opérateur mobile (Orange, MTN, Airtel…), appareil et système, langue, et moment du match : avant le coup d’envoi ou pendant le direct.'],
        ['Comment protégez-vous les mineurs ?', 'Les campagnes betting ciblent uniquement les adultes de 18 ans et plus. Ce réglage est verrouillé et ne peut pas être retiré.'],
        ['Quel est le modèle d’achat ?', 'Les campagnes sont achetées au CPM, c’est-à-dire au coût pour mille impressions.'],
      ],
    },
    contact: {
      title: 'Campagnes paris sportifs : de l’annonce au premier dépôt.',
      lead: 'Stacbase réunit 110 000 campagnes d’expérience en Afrique, une verticale betting sans page intermédiaire et des formats display et native ciblés par pays licencié, en Afrique comme en Europe. Prochaine étape : un premier échange sur vos marchés.',
      steps: ['Lien direct', 'Display et native', 'Pays licenciés', 'Heure du match', 'Mesure au dépôt', 'Audiences adultes'],
      formTitle: 'Parlons de vos marchés.',
      company: 'Opérateur',
      companyHint: 'Nom de votre marque',
      countries: 'Pays où vous êtes licencié',
      countriesHint: 'Ex. : Sénégal, France',
      email: 'Email professionnel',
      emailHint: 'vous@operateur.com',
      send: 'Préparer ma demande',
      or: 'Ou écrivez-nous :',
      empty: 'Indiquez votre email professionnel.',
      invalid: 'Cet email semble incomplet. Exemple : vous@operateur.com',
      doneTitle: 'Votre demande est prête.',
      done: 'Elle s’est ouverte dans votre messagerie : il ne reste qu’à l’envoyer. Rien ne s’est ouvert ? Écrivez-nous à',
      subject: 'Publicité paris sportifs : premier échange',
      mail: ['Bonjour,', 'Nous souhaitons échanger sur nos campagnes paris sportifs.', 'Opérateur', 'Pays licenciés', 'Contact'],
    },
    footer: 'Publicité réservée aux opérateurs licenciés. 18+. Jouez de manière responsable.',
  },
  en: {
    navLabel: 'Main',
    langLabel: 'Language',
    nav: [['#lien-direct', 'Direct link'], ['#formats', 'Formats'], ['#ciblage', 'Targeting'], ['#contact', 'Contact']],
    cta: 'Let’s talk about your markets',
    hero: {
      alt: 'Four people laughing in front of bright colour panels',
      tag: 'Direct link · No page in between',
      title: ['Sports betting advertising:', 'ad, click, your site.'],
      lead: 'The digital ad network for licensed betting operators, taking your bettors straight to your site, in Africa and in Europe.',
      legal: 'Only in the countries where you hold a licence.',
      facts: [['For', 'Betting operators'], ['Where', 'Africa and Europe'], ['Contact', BETTING_EMAIL]],
    },
    figures: {
      title: 'Hands-on experience of digital advertising in Africa, like no one else.',
      items: [
        { value: 3500, suffix: '+', label: 'clients' },
        { value: 110, suffix: 'K+', label: 'campaigns' },
        { value: 11, suffix: '', label: 'betting operators' },
        { text: 'USA', label: 'head office' },
      ],
    },
    direct: {
      title: 'Betting ads on a direct link: no detour between your ad and your bettors.',
      group: 'Journey',
      before: 'Before',
      after: 'With Stacbase',
      ad: 'Ad',
      middle: 'Page in between',
      site: 'Site',
      yourSite: 'Your site',
      lost: 'Clicks lost on the way',
      badge: 'Direct link',
      body: [
        ['A ', 'vertical dedicated to sports betting', ' in our new inventories.'],
        ['The bettor who clicks lands ', 'directly on your site', ': fewer lost clicks, more first deposits.'],
      ],
      promiseTag: 'The promise',
      promise: 'Every click lands on your site.',
      promiseNote: 'Only in the countries where you hold a licence.',
    },
    formats: {
      title: 'Display and native formats for sports betting operators.',
      group: 'Format',
      alt: 'A man reading his newspaper, surrounded by other readers',
      items: [
        { name: 'Display', tag: 'The banner across sites', text: 'Banners on high-audience sites and apps.', bold: 'One click leads straight to your site.' },
        { name: 'Native', tag: 'Part of the content', text: 'The ad takes on the style of the site that hosts it: read, not ignored.', bold: 'Direct link to your site.' },
      ],
      adLabel: 'Ad',
      adTitle: '100% bonus',
      adCta: 'Bet now',
      sponsored: 'Sponsored',
      nativeTitle: 'The best odds of the weekend',
    },
    targeting: {
      title: 'Bettor targeting: the right audience, at the right moment of the match.',
      lead: 'Build your targeting. The sentence below updates as you go.',
      groups: [
        { key: 'country', title: 'Licensed countries', hint: 'Countries and cities where you operate', options: ['My licensed countries', 'Specific cities'], picked: [0] },
        { key: 'carrier', title: 'Mobile carrier', hint: 'Orange, MTN, Airtel…', options: ['Orange', 'MTN', 'Airtel'], picked: [0, 1] },
        { key: 'device', title: 'Device and OS', hint: 'Android, iOS, price range', options: ['Android', 'iOS'], picked: [0] },
        { key: 'lang', title: 'Language', hint: 'French, English, local languages', options: ['French', 'English', 'Local languages'], picked: [0] },
        { key: 'time', title: 'Match time', hint: 'Before and during the live match', options: ['Before the match', 'During the live match'], picked: [1] },
      ] as readonly Group[],
      adults: 'Adults only',
      adultsHint: 'Always on. No under-age audience.',
      yours: 'Your targeting',
      model: 'Buying model',
    },
    story: {
      title: 'Adafri goes further with Stacbase.',
      cards: [
        { title: 'Where we come from', body: 'Adafri was born from a simple idea: making Google advertising accessible to African businesses, campaign after campaign, from one country to the next.', alt: 'Three friends laughing, seen from below against a blue sky' },
        { title: 'The next chapter', body: 'Adafri becomes Stacbase: a workspace of 6 hubs and 25+ tools, backed by a company based in the United States. Advertising stays at the heart of it.', alt: 'Eight smiling people on coloured backgrounds, with the letters of stacbase' },
      ],
    },
    faq: {
      title: 'Frequently asked questions about sports betting advertising',
      items: [
        ['Which ad formats do you offer for sports betting?', 'Two formats: display, banners on high-audience sites and apps, and native, an ad that takes on the style of the site hosting it. In both cases, the click leads directly to your site.'],
        ['What is the direct link?', 'The bettor who clicks on the ad lands directly on your site, with no page in between. Fewer clicks are lost on the way, and more first deposits follow.'],
        ['In which countries can you run my ads?', 'In Africa and in Europe, only in the countries where your operator holds a licence. Targeting goes down to the cities where you operate.'],
        ['How do you target bettors?', 'By licensed country, mobile carrier (Orange, MTN, Airtel…), device and operating system, language, and moment of the match: before kick-off or during the live match.'],
        ['How do you protect minors?', 'Betting campaigns only target adults aged 18 and over. This setting is locked and cannot be removed.'],
        ['What is the buying model?', 'Campaigns are bought on a CPM basis, meaning the cost per thousand impressions.'],
      ],
    },
    contact: {
      title: 'Sports betting campaigns: from the ad to the first deposit.',
      lead: 'Stacbase brings together 110,000 campaigns of experience in Africa, a betting vertical with no page in between, and display and native formats targeted by licensed country, in Africa as in Europe. Next step: a first conversation about your markets.',
      steps: ['Direct link', 'Display and native', 'Licensed countries', 'Match time', 'Measured at deposit', 'Adult audiences'],
      formTitle: 'Let’s talk about your markets.',
      company: 'Operator',
      companyHint: 'Your brand name',
      countries: 'Countries where you hold a licence',
      countriesHint: 'E.g. Senegal, France',
      email: 'Work email',
      emailHint: 'you@operator.com',
      send: 'Prepare my request',
      or: 'Or write to us:',
      empty: 'Enter your work email.',
      invalid: 'That email looks incomplete. Example: you@operator.com',
      doneTitle: 'Your request is ready.',
      done: 'It opened in your mail app: all that is left is to send it. Nothing opened? Write to us at',
      subject: 'Sports betting advertising: first conversation',
      mail: ['Hello,', 'We would like to talk about our sports betting campaigns.', 'Operator', 'Licensed countries', 'Contact'],
    },
    footer: 'Advertising reserved for licensed operators. 18+. Please gamble responsibly.',
  },
} as const

/** La phrase vivante du ciblage, recomposée à chaque choix. */
export function targetingSentence(lang: Lang, format: number, picks: Record<string, readonly number[]>) {
  const groups = BETTING[lang].targeting.groups
  const labels = (key: string) => {
    const group = groups.find((g) => g.key === key)!
    return picks[key].map((i) => group.options[i])
  }
  const and = lang === 'fr' ? ' et ' : ' and '
  const join = (list: readonly string[]) => (list.length <= 1 ? (list[0] ?? '') : `${list.slice(0, -1).join(', ')}${and}${list[list.length - 1]}`)
  const cities = picks.country.includes(1)
  if (lang === 'fr') {
    const where = cities ? 'dans les villes choisies de vos pays licenciés' : 'dans vos pays licenciés'
    const what = format === 0 ? 'Vos bannières display' : 'Vos annonces native'
    return `${what} s’affichent ${where}, chez ${join(labels('carrier'))}, sur ${join(labels('device'))}, en ${join(labels('lang')).toLowerCase()}, ${join(labels('time')).toLowerCase()}. Adultes uniquement. Chaque clic mène droit à votre site.`
  }
  const where = cities ? 'in the chosen cities of your licensed countries' : 'in your licensed countries'
  const what = format === 0 ? 'Your display banners' : 'Your native ads'
  const langs = join(labels('lang').map((l) => (l === 'Local languages' ? 'local languages' : l)))
  return `${what} run ${where}, on ${join(labels('carrier'))}, on ${join(labels('device'))}, in ${langs}, ${join(labels('time')).toLowerCase()}. Adults only. Every click leads straight to your site.`
}
