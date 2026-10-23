export type Lang = 'en' | 'fr'

export const LANGS: Lang[] = ['en', 'fr']

const APP = 'https://work.stacbase.com'

export const LINKS = {
  signup: `${APP}/auth/signup`,
  login: `${APP}/auth/login`,
  privacy: `${APP}/privacy`,
  terms: `${APP}/terms`,
  instagram: 'https://www.instagram.com/app.stacbase/',
  linkedin: 'https://www.linkedin.com/company/stacbase/',
}

/** Les plateformes réellement branchées dans l'application. */
export const PLATFORMS = ['Google Ads', 'Meta', 'Instagram', 'WhatsApp', 'LinkedIn', 'Google Analytics', 'Gmail', 'Orange Max it']

export type PlanCode = 'free' | 'starter' | 'pro' | 'large'

/** Tarifs du catalogue de l'API (`GET /plans`), en dollars par mois. */
export const PLAN_PRICES: Record<PlanCode, number> = { free: 0, starter: 20, pro: 55, large: 150 }

export const COPY = {
  en: {
    hero: {
      badge: 'New · WhatsApp campaigns at scale',
      title: '22+ marketing tools. One system.',
      lead: 'This OS doesn’t add another tab. It makes them disappear. Campaigns, WhatsApp, CRM, e-mails, invoices and analytics, in one workspace built for digital marketers.',
      primary: 'Start free',
      secondary: 'Explore the tools',
      note: 'Free plan at $0 · Upgrade when your team grows',
    },
    platforms: 'Connected to the platforms you already use',
    meet: {
      badge: 'Meet Stacbase',
      title: 'Everything you need to run your marketing',
      lead: 'Stacbase brings advertising, messaging, clients and reporting into one workspace, so your team spends its time on the work, not on switching tabs.',
      cards: [
        ['Google & Meta campaigns', 'Launch Search, Display, Facebook and Instagram campaigns, then follow spend, clicks and conversions in a single report.'],
        ['WhatsApp at scale', 'Send personalised messages to your lists, with images and documents, and follow every delivery live.'],
        ['Clients and pipeline', 'Contacts, deals and follow-ups in one place, connected to your campaigns and your e-mails.'],
        ['Analytics that read clearly', 'Traffic, sources and conversions from Google Analytics, laid out for wide screens.'],
      ],
    },
    stats: [
      { value: 87000, suffix: '+', label: 'campaigns launched since Adafri' },
      { value: 3500, suffix: '', label: 'people who helped shape the product' },
      { value: 22, suffix: '+', label: 'tools in a single workspace' },
      { value: 0, suffix: ' $', label: 'to get started on the Free plan' },
    ],
    day: {
      badge: 'Your day, in one place',
      title: 'See every marketing action at a glance',
      lead: 'Stacbase shows what needs you today and where each campaign stands, so you can act before things slip.',
      points: [
        'A day sheet that lists what needs your attention today',
        'Campaigns, messages and tasks in the same feed',
        'Alerts when a campaign, a payment or a client needs you',
      ],
    },
    power: {
      badge: 'Power pack',
      title: 'Designed for how marketing teams actually work',
      lead: 'Every tool shares the same clients, the same files and the same team. Pick one to see it at work.',
      tabs: [
        ['Advertising', 'Google Search & Display, Meta and Orange Max it campaigns, with full reports on every channel.'],
        ['WhatsApp', 'Bulk campaigns with personalised fields, attachments and live delivery tracking.'],
        ['CRM & e-mails', 'Contacts, pipeline and mailing campaigns that share one list of clients.'],
        ['Content & social', 'Plan and publish posts on Facebook, Instagram and LinkedIn from one calendar.'],
        ['Documents & invoices', 'Quotes, invoices and electronic signatures, sent and tracked from the workspace.'],
        ['AI agent', 'Ask in plain language: the agent drafts, summarises and prepares the next step for you.'],
      ],
    },
    how: {
      badge: 'How it works',
      title: 'Up and running in three steps',
      steps: [
        ['Create your workspace', 'Sign up and invite your team. The Free plan is enough to begin.'],
        ['Connect your accounts', 'Google, Meta, WhatsApp, e-mail: one secure connection each.'],
        ['Launch and follow', 'Run campaigns, send messages, invoice, and read the results in one place.'],
      ],
    },
    pricing: {
      badge: 'Pricing',
      title: 'Simple plans. Room to grow.',
      lead: 'Start free and upgrade when your team grows. Prices in US dollars, per month.',
      month: '/month',
      recommended: 'Recommended',
      cta: { free: 'Start free', paid: 'Choose' },
      plans: {
        free: ['For trying Stacbase on your own', ['Google & Meta campaigns', '3 connected accounts', '250 CRM contacts', '250 e-mails per month', '5 invoices per month', '1 website', 'AI assistant']],
        starter: ['For freelancers who run real campaigns', ['Everything in Free', '1 WhatsApp number · 2,500 messages', '2,500 CRM contacts and e-mails', 'Unlimited projects, invoices and sites', '20 e-signatures per month', 'Analytics and HD video']],
        pro: ['For agencies and growing teams', ['Everything in Starter', '15 connected accounts', '3 WhatsApp numbers · 10,000 messages', '10,000 CRM contacts and e-mails', '10 mailboxes', 'Unlimited e-signatures']],
        large: ['For teams running many brands', ['Everything in Pro', 'Unlimited connected accounts', '10 WhatsApp numbers · 25,000 messages', 'Unlimited CRM contacts', '25,000 e-mails per month', 'Unlimited mailboxes and social accounts']],
      } as Record<PlanCode, [string, string[]]>,
    },
    faq: {
      title: 'Questions, answered',
      items: [
        ['What is Stacbase?', 'A workspace for digital marketers that brings 22+ everyday tools together: advertising, WhatsApp, CRM, e-mailing, social publishing, invoices, e-signature, analytics and more.'],
        ['Is there a free plan?', 'Yes. The Free plan costs $0 and lets you run Google and Meta campaigns, manage your first contacts and send your first invoices. Upgrade only when you need more.'],
        ['Which platforms can I connect?', 'Google Ads, Google Analytics, Meta (Facebook and Instagram), WhatsApp, LinkedIn, Gmail and Orange Max it, each through its own authorisation, which you can revoke at any time.'],
        ['Can my whole team use it?', 'Yes. Invite your teammates into the same workspace: they share clients, files and campaigns, with the access you give them.'],
        ['I used Adafri. What changes?', 'Adafri continues within Stacbase. Advertising stays at the heart of the product, with many more tools around it.'],
      ],
      more: 'Read the Adafri story',
    },
    final: {
      open: 'Open',
      title: 'Ready to make the tabs disappear?',
      lead: 'Move your cursor over the wordmark, then open your workspace.',
      cta: 'Open my workspace',
    },
  },
  fr: {
    hero: {
      badge: 'Nouveau · WhatsApp en masse',
      title: '22+ outils marketing. Un seul système.',
      lead: 'Cet OS n’ajoute pas d’onglet. Il les fait disparaître. Campagnes, WhatsApp, CRM, e-mails, factures et analytics, dans un seul espace pensé pour les marketeurs digitaux.',
      primary: 'Commencer gratuitement',
      secondary: 'Découvrir les outils',
      note: 'Plan Free à 0 $ · Évoluez quand votre équipe grandit',
    },
    platforms: 'Branché sur les plateformes que vous utilisez déjà',
    meet: {
      badge: 'Découvrez Stacbase',
      title: 'Tout ce qu’il faut pour piloter votre marketing',
      lead: 'Stacbase réunit publicité, messagerie, clients et rapports dans un même espace : votre équipe travaille, au lieu de passer d’un onglet à l’autre.',
      cards: [
        ['Campagnes Google et Meta', 'Lancez vos campagnes Search, Display, Facebook et Instagram, puis suivez dépenses, clics et conversions dans un seul rapport.'],
        ['WhatsApp en masse', 'Envoyez des messages personnalisés à vos listes, avec images et documents, et suivez chaque envoi en direct.'],
        ['Clients et pipeline', 'Contacts, opportunités et relances au même endroit, reliés à vos campagnes et à vos e-mails.'],
        ['Des analytics lisibles', 'Trafic, sources et conversions de Google Analytics, présentés pour les grands écrans.'],
      ],
    },
    stats: [
      { value: 87000, suffix: '+', label: 'campagnes lancées depuis Adafri' },
      { value: 3500, suffix: '', label: 'personnes qui ont façonné le produit' },
      { value: 22, suffix: '+', label: 'outils dans un seul espace' },
      { value: 0, suffix: ' $', label: 'pour démarrer avec le plan Free' },
    ],
    day: {
      badge: 'Votre journée, au même endroit',
      title: 'Chaque action marketing, d’un coup d’œil',
      lead: 'Stacbase montre ce qui vous attend aujourd’hui et où en est chaque campagne : vous agissez avant que rien ne vous échappe.',
      points: [
        'Une feuille de service qui liste ce qui demande votre attention',
        'Campagnes, messages et tâches dans le même fil',
        'Une alerte dès qu’une campagne, un paiement ou un client a besoin de vous',
      ],
    },
    power: {
      badge: 'La boîte à outils',
      title: 'Pensé pour la façon dont les équipes marketing travaillent vraiment',
      lead: 'Chaque outil partage les mêmes clients, les mêmes fichiers et la même équipe. Choisissez-en un pour le voir à l’œuvre.',
      tabs: [
        ['Publicité', 'Campagnes Google Search et Display, Meta et Orange Max it, avec un rapport complet pour chaque canal.'],
        ['WhatsApp', 'Campagnes en masse avec champs personnalisés, pièces jointes et suivi des envois en direct.'],
        ['CRM et e-mails', 'Contacts, pipeline et campagnes d’e-mailing qui partagent une seule liste de clients.'],
        ['Contenus et réseaux', 'Planifiez et publiez sur Facebook, Instagram et LinkedIn depuis un seul calendrier.'],
        ['Documents et factures', 'Devis, factures et signatures électroniques, envoyés et suivis depuis l’espace de travail.'],
        ['Agent IA', 'Demandez en langage naturel : l’agent rédige, résume et prépare l’étape suivante pour vous.'],
      ],
    },
    how: {
      badge: 'Comment ça marche',
      title: 'Opérationnel en trois étapes',
      steps: [
        ['Créez votre espace', 'Inscrivez-vous et invitez votre équipe. Le plan Free suffit pour commencer.'],
        ['Connectez vos comptes', 'Google, Meta, WhatsApp, e-mail : une connexion sécurisée pour chacun.'],
        ['Lancez et suivez', 'Campagnes, messages, factures : agissez, puis lisez les résultats au même endroit.'],
      ],
    },
    pricing: {
      badge: 'Tarifs',
      title: 'Des plans simples. De la place pour grandir.',
      lead: 'Commencez gratuitement, évoluez quand votre équipe grandit. Prix en dollars US, par mois.',
      month: '/mois',
      recommended: 'Recommandé',
      cta: { free: 'Commencer gratuitement', paid: 'Choisir' },
      plans: {
        free: ['Pour découvrir Stacbase en solo', ['Campagnes Google et Meta', '3 comptes connectés', '250 contacts CRM', '250 e-mails par mois', '5 factures par mois', '1 site web', 'Assistant IA']],
        starter: ['Pour les freelances qui lancent de vraies campagnes', ['Tout le plan Free', '1 numéro WhatsApp · 2 500 messages', '2 500 contacts CRM et e-mails', 'Projets, factures et sites illimités', '20 signatures électroniques par mois', 'Analytics et vidéo HD']],
        pro: ['Pour les agences et les équipes qui grandissent', ['Tout le plan Starter', '15 comptes connectés', '3 numéros WhatsApp · 10 000 messages', '10 000 contacts CRM et e-mails', '10 boîtes mail', 'Signatures électroniques illimitées']],
        large: ['Pour les équipes qui gèrent plusieurs marques', ['Tout le plan Pro', 'Comptes connectés illimités', '10 numéros WhatsApp · 25 000 messages', 'Contacts CRM illimités', '25 000 e-mails par mois', 'Boîtes mail et comptes sociaux illimités']],
      } as Record<PlanCode, [string, string[]]>,
    },
    faq: {
      title: 'Vos questions, nos réponses',
      items: [
        ['Qu’est-ce que Stacbase ?', 'Un espace de travail pour les marketeurs digitaux qui réunit plus de 22 outils du quotidien : publicité, WhatsApp, CRM, e-mailing, publication sur les réseaux, factures, signature électronique, analytics et plus encore.'],
        ['Existe-t-il un plan gratuit ?', 'Oui. Le plan Free coûte 0 $ : il permet de lancer des campagnes Google et Meta, de gérer vos premiers contacts et d’envoyer vos premières factures. Vous évoluez seulement quand vous en avez besoin.'],
        ['Quelles plateformes puis-je connecter ?', 'Google Ads, Google Analytics, Meta (Facebook et Instagram), WhatsApp, LinkedIn, Gmail et Orange Max it, chacune par sa propre autorisation, que vous pouvez retirer à tout moment.'],
        ['Toute mon équipe peut-elle l’utiliser ?', 'Oui. Invitez vos collègues dans le même espace : ils partagent clients, fichiers et campagnes, avec les accès que vous leur donnez.'],
        ['J’utilisais Adafri. Qu’est-ce qui change ?', 'Adafri continue au sein de Stacbase. La publicité reste au cœur du produit, avec beaucoup plus d’outils autour.'],
      ],
      more: 'Lire l’histoire d’Adafri',
    },
    final: {
      open: 'Ouvrez',
      title: 'Prêt à faire disparaître les onglets ?',
      lead: 'Passez la souris sur le logo, puis ouvrez votre espace.',
      cta: 'Ouvrir mon espace',
    },
  },
}

export type Copy = (typeof COPY)['en']
