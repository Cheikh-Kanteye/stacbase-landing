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
  /** Devenir co-propriétaire de Stacbase (page « Own the thing you use » de l'app). */
  invest: `${APP}/dashboard/build-with-us`,
}

/** Les plateformes réellement branchées dans l'application. */
export const PLATFORMS = ['Google Ads', 'Meta', 'Instagram', 'WhatsApp', 'LinkedIn', 'Google Analytics', 'Gmail', 'Orange Max it']

export type PlanCode = 'free' | 'starter' | 'pro' | 'large'

/** Tarifs du catalogue de l'API (`GET /plans`), en dollars par mois. */
export const PLAN_PRICES: Record<PlanCode, number> = { free: 0, starter: 20, pro: 55, large: 150 }

export const COPY = {
  en: {
    hero: {
      badge: 'Stacbase — your marketing workspace',
      title: 'Stop collecting tools. Start getting shit done.',
      lead: 'You’re a digital marketer, not a full-time app manager. Stacbase brings your everyday marketing tools into one workspace, so you spend less time switching between apps and more time getting shit done.',
      primary: 'Get started for free',
      secondary: 'Explore the tools',
      note: 'Less app juggling. More marketing done.',
    },
    platforms: 'Connected to the platforms you already use',
    pain: {
      badge: 'Sound familiar?',
      title: 'Close your tabs. Open up your potential.',
      lead: 'One tool for your notes. Another for your projects. Another for your content. And three more because the first three don’t talk to each other.',
      body: 'You’re paying for a growing stack of software just to keep your work together, and managing your tools has become a job of its own. Enough is enough.',
      tabs: ['Notes', 'Projects', 'Content', 'Ads', 'CRM', 'Invoices', 'WhatsApp'],
      bills: 'subscriptions this month',
    },
    meet: {
      badge: 'Introducing Stacbase',
      title: 'Your marketing stack has a new home.',
      lead: 'Planning campaigns. Creating content. Organizing projects. Managing everyday tasks. Stacbase brings 25+ tools together in one workspace built for digital marketers and agencies.',
      cta: 'Meet your new workspace',
      cards: [
        ['Google & Meta campaigns', 'Launch Search, Display, Facebook and Instagram campaigns, then follow spend, clicks and conversions in one report.'],
        ['Social publishing', 'Plan and publish your posts on Facebook, Instagram and LinkedIn from one calendar.'],
        ['Clients and pipeline', 'Contacts, deals and follow-ups in one place, connected to your campaigns and your e-mails.'],
        ['Analytics that read clearly', 'Traffic, sources and conversions from Google Analytics, laid out for wide screens.'],
      ],
    },
    benefits: {
      badge: 'Why it matters',
      title: 'Stop managing your workflow. Start owning it.',
      items: [
        ['Plan without the chaos.', 'Keep your projects, tasks and priorities organized. Know what needs to happen next without digging through multiple apps.'],
        ['Create without the clutter.', 'Bring your everyday content and creative work closer together. Spend less time organizing your process and more time making great things.'],
        ['Run your work without the juggling act.', 'Keep the moving parts of your marketing workflow in one place. Fewer disconnected tools. A clearer view of what needs to get done.'],
        ['Get more out of your tool stack.', 'Stop adding another subscription every time you need another capability. Explore a workspace designed to bring more of your daily work together.'],
      ],
      cta: 'Get your workflow together',
    },
    tools: {
      badge: 'The tool stack',
      title: '25+ tools. One less headache.',
      lead: 'You don’t need another app to manage all your other apps. You need a better way to work. Explore the tools, find what you need, build a workflow that works for you.',
      soon: 'Soon',
      cta: 'Explore all tools',
    },
    audience: {
      badge: 'Who it’s for',
      title: 'Built for people who have actual work to do.',
      items: [
        ['Digital marketers', 'Campaigns to launch. Content to create. Results to deliver. Get your daily workflow under control.'],
        ['Marketing agencies', 'Multiple clients. Multiple projects. Too many moving parts. Bring more of your team’s everyday work into one workspace.'],
        ['Freelancers and creators', 'You’re the strategist, the creator, the project manager and sometimes the entire team. Make your tool stack work harder for you.'],
        ['Growing teams', 'As the workload grows, so does the software mess. Give your team a more connected way to organize and execute its work.'],
      ],
      closing: 'One workspace. Less operational chaos.',
      photoAlt: 'Eight smiling people on coloured backgrounds spelling the word stacbase',
    },
    difference: {
      badge: 'The difference',
      title: 'More doing. Less tool babysitting.',
      before: 'Your current workflow',
      steps: ['Open one app to plan.', 'Jump to another to create.', 'Switch again to organize.', 'Open five more tabs to find what you were doing in the first place.'],
      after: 'With Stacbase',
      afterBody: 'Bring more of that everyday work into one place.',
      punch: 'Not another tool to add to the pile. A better way to manage the pile.',
      cta: 'Explore Stacbase',
    },
    pricing: {
      badge: 'Pricing',
      title: 'Your money should go into your growth. Not your tool addiction.',
      lead: 'Stop evaluating software one subscription at a time. Look at your entire workflow, and choose the plan that fits your needs. Prices in US dollars, billed monthly.',
      month: '/month',
      recommended: 'Recommended',
      cta: { free: 'Get started for free', paid: 'Choose' },
      plans: {
        free: ['For trying Stacbase on your own', ['Google & Meta campaigns', '3 connected accounts', '250 CRM contacts', '250 e-mails per month', '5 invoices per month', '1 website', 'AI assistant']],
        starter: ['For freelancers who run real campaigns', ['Everything in Free', '1 WhatsApp number · 2,500 messages', '2,500 CRM contacts and e-mails', 'Unlimited projects, invoices and sites', '20 e-signatures per month', 'Analytics and HD video']],
        pro: ['For agencies and growing teams', ['Everything in Starter', '15 connected accounts', '3 WhatsApp numbers · 10,000 messages', '10,000 CRM contacts and e-mails', '10 mailboxes', 'Unlimited e-signatures']],
        large: ['For teams running many brands', ['Everything in Pro', 'Unlimited connected accounts', '10 WhatsApp numbers · 25,000 messages', 'Unlimited CRM contacts', '25,000 e-mails per month', 'Unlimited mailboxes and social accounts']],
      } as Record<PlanCode, [string, string[]]>,
    },
    faq: {
      title: 'Before you add another tool, read this.',
      items: [
        ['What is Stacbase?', 'Stacbase is a workspace built for digital marketers and agencies, bringing a collection of everyday productivity and marketing tools together in one place.'],
        ['Who is Stacbase for?', 'Digital marketers, freelancers, content creators, marketing agencies and teams looking to organize more of their daily work in one workspace.'],
        ['Does Stacbase replace all my existing tools?', 'That depends on your current workflow and the tools you use. Stacbase brings multiple capabilities together, but check the available features before replacing any essential software.'],
        ['Can I get started for free?', 'Yes. The Free plan costs $0 and lets you run Google and Meta campaigns, manage your first contacts and send your first invoices, within the usage limits shown in the pricing section.'],
        ['How do I know which tools are included?', 'Explore the tool stack above: every tool is listed by category with what it helps you accomplish, and tools still on the way are marked “Soon”.'],
      ],
      more: 'Read the Adafri story',
    },
    invest: {
      badge: 'Become a co-owner',
      title: 'Own the tool you use.',
      lead: 'Users are the real value behind software. Stacbase shares it: invest and become a co-owner of what we are building together.',
      points: ['Co-owner via Stacbase SPV Inc.', 'Every module, no time limit', 'A vote on every release'],
      cta: 'Invest in Stacbase',
      manifesto: 'Read the manifesto',
    },
  },
  fr: {
    hero: {
      badge: 'Stacbase — votre espace de travail marketing',
      title: 'Arrêtez de collectionner les outils. Passez à l’action.',
      lead: 'Vous êtes marketeur digital, pas gestionnaire d’applications à plein temps. Stacbase réunit vos outils marketing du quotidien dans un seul espace : moins de temps à jongler entre les applis, plus de temps pour avancer.',
      primary: 'Commencer gratuitement',
      secondary: 'Découvrir les outils',
      note: 'Moins de jonglage. Plus de marketing.',
    },
    platforms: 'Branché sur les plateformes que vous utilisez déjà',
    pain: {
      badge: 'Ça vous parle ?',
      title: 'Fermez vos onglets. Libérez votre potentiel.',
      lead: 'Un outil pour vos notes. Un autre pour vos projets. Un autre pour vos contenus. Et trois de plus, parce que les trois premiers ne se parlent pas.',
      body: 'Vous payez une pile grandissante de logiciels juste pour garder votre travail en un seul morceau, et gérer vos outils est devenu un métier à part entière. Ça suffit.',
      tabs: ['Notes', 'Projets', 'Contenus', 'Publicité', 'CRM', 'Factures', 'WhatsApp'],
      bills: 'abonnements ce mois-ci',
    },
    meet: {
      badge: 'Voici Stacbase',
      title: 'Votre stack marketing a trouvé sa maison.',
      lead: 'Planifier des campagnes. Créer du contenu. Organiser des projets. Gérer le quotidien. Stacbase réunit plus de 25 outils dans un seul espace pensé pour les marketeurs digitaux et les agences.',
      cta: 'Découvrir votre nouvel espace',
      cards: [
        ['Campagnes Google et Meta', 'Lancez vos campagnes Search, Display, Facebook et Instagram, puis suivez dépenses, clics et conversions dans un seul rapport.'],
        ['Publication sur les réseaux', 'Planifiez et publiez vos posts sur Facebook, Instagram et LinkedIn depuis un seul calendrier.'],
        ['Clients et pipeline', 'Contacts, opportunités et relances au même endroit, reliés à vos campagnes et à vos e-mails.'],
        ['Des analytics lisibles', 'Trafic, sources et conversions de Google Analytics, présentés pour les grands écrans.'],
      ],
    },
    benefits: {
      badge: 'Ce que ça change',
      title: 'Arrêtez de subir votre organisation. Reprenez-la en main.',
      items: [
        ['Planifiez sans le chaos.', 'Projets, tâches et priorités restent organisés. Vous savez quoi faire ensuite sans fouiller dans plusieurs applis.'],
        ['Créez sans le désordre.', 'Rapprochez vos contenus et votre travail créatif. Moins de temps à organiser, plus de temps à créer.'],
        ['Avancez sans jongler.', 'Toutes les pièces de votre marketing au même endroit. Moins d’outils déconnectés, une vue plus claire de ce qu’il reste à faire.'],
        ['Tirez plus de vos outils.', 'Arrêtez d’ajouter un abonnement à chaque nouveau besoin. Un espace pensé pour réunir davantage de votre travail quotidien.'],
      ],
      cta: 'Remettre de l’ordre dans mon travail',
    },
    tools: {
      badge: 'La boîte à outils',
      title: '25+ outils. Un mal de tête en moins.',
      lead: 'Vous n’avez pas besoin d’une appli de plus pour gérer toutes les autres. Vous avez besoin d’une meilleure façon de travailler. Parcourez les outils, trouvez ce qu’il vous faut, construisez votre façon de faire.',
      soon: 'Bientôt',
      cta: 'Voir tous les outils',
    },
    audience: {
      badge: 'Pour qui',
      title: 'Pensé pour celles et ceux qui ont du vrai travail à abattre.',
      items: [
        ['Marketeurs digitaux', 'Des campagnes à lancer, des contenus à créer, des résultats à livrer. Reprenez la main sur votre quotidien.'],
        ['Agences marketing', 'Plusieurs clients, plusieurs projets, trop de pièces mobiles. Réunissez le travail de votre équipe dans un seul espace.'],
        ['Freelances et créateurs', 'Stratège, créateur, chef de projet, parfois toute l’équipe à vous seul. Faites travailler vos outils pour vous.'],
        ['Équipes en croissance', 'Quand la charge grandit, le désordre logiciel aussi. Donnez à votre équipe une façon plus connectée de s’organiser.'],
      ],
      closing: 'Un seul espace. Moins de chaos opérationnel.',
      photoAlt: 'Huit personnes souriantes sur fonds colorés, qui forment le mot stacbase',
    },
    difference: {
      badge: 'La différence',
      title: 'Plus d’action. Moins de baby-sitting d’outils.',
      before: 'Votre journée aujourd’hui',
      steps: ['Une appli pour planifier.', 'Une autre pour créer.', 'Encore une autre pour organiser.', 'Cinq onglets de plus pour retrouver ce que vous faisiez au départ.'],
      after: 'Avec Stacbase',
      afterBody: 'L’essentiel de ce travail réuni au même endroit.',
      punch: 'Pas un outil de plus sur la pile. Une meilleure façon de gérer la pile.',
      cta: 'Découvrir Stacbase',
    },
    pricing: {
      badge: 'Tarifs',
      title: 'Votre argent doit servir votre croissance. Pas votre collection d’abonnements.',
      lead: 'Arrêtez d’évaluer vos logiciels un abonnement à la fois. Regardez votre travail dans son ensemble, puis choisissez le plan qui vous correspond. Prix en dollars US, facturés chaque mois.',
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
      title: 'Avant d’ajouter un outil de plus, lisez ceci.',
      items: [
        ['Qu’est-ce que Stacbase ?', 'Un espace de travail pensé pour les marketeurs digitaux et les agences, qui réunit une collection d’outils de productivité et de marketing du quotidien au même endroit.'],
        ['À qui s’adresse Stacbase ?', 'Aux marketeurs digitaux, freelances, créateurs de contenu, agences et équipes qui veulent organiser davantage de leur travail quotidien dans un seul espace.'],
        ['Stacbase remplace-t-il tous mes outils ?', 'Cela dépend de votre façon de travailler et des outils que vous utilisez. Stacbase réunit de nombreuses fonctions, mais vérifiez celles disponibles avant de remplacer un logiciel essentiel.'],
        ['Puis-je commencer gratuitement ?', 'Oui. Le plan Free coûte 0 $ : campagnes Google et Meta, premiers contacts et premières factures, dans les limites indiquées dans la section tarifs.'],
        ['Comment savoir quels outils sont inclus ?', 'Parcourez la boîte à outils plus haut : chaque outil y figure par catégorie, avec ce qu’il vous permet de faire, et ceux qui arrivent sont marqués « Bientôt ».'],
      ],
      more: 'Lire l’histoire d’Adafri',
    },
    invest: {
      badge: 'Devenir co-propriétaire',
      title: 'Possédez l’outil que vous utilisez.',
      lead: 'Les utilisateurs sont la vraie valeur des logiciels. Stacbase la partage : investissez et devenez co-propriétaire de ce que nous construisons ensemble.',
      points: ['Co-propriétaire via Stacbase SPV Inc.', 'Tous les modules, sans limite de durée', 'Une voix sur chaque version'],
      cta: 'Investir dans Stacbase',
      manifesto: 'Lire le manifeste',
    },
  },
}

export type Copy = (typeof COPY)['en']

/**
 * La boîte à outils, telle que la range l'application (registre de navigation
 * de work.stacbase.com) : un hub, ses outils, ce que chacun permet de faire.
 * `soon` : annoncé dans l'app, pas encore ouvert.
 */
export const TOOL_HUBS: Record<Lang, { hub: string; tools: { name: string; desc: string; soon?: boolean }[] }[]> = {
  en: [
    { hub: 'Advertising', tools: [
      { name: 'Google Search', desc: 'Show up when customers search, with keyword-level reporting.' },
      { name: 'Google Display', desc: 'Your visuals across millions of sites, with placements and audiences.' },
      { name: 'Meta Ads', desc: 'Facebook and Instagram campaigns, results side by side.' },
      { name: 'Orange Max it', desc: 'Promote your offers to Max it users in Senegal.' },
      { name: 'Bulk WhatsApp', desc: 'Personalised campaigns to your lists, tracked live.' },
      { name: 'E-mailing', desc: 'Branded e-mail campaigns sent to your CRM lists.' },
      { name: 'Bulk SMS', desc: 'Short campaigns straight to your contacts’ phones.', soon: true },
    ] },
    { hub: 'Marketing', tools: [
      { name: 'CRM', desc: 'Contacts, companies, deals and follow-ups in one pipeline.' },
      { name: 'Social publishing', desc: 'Plan and publish on Facebook, Instagram and LinkedIn.' },
      { name: 'Google Analytics', desc: 'Traffic, sources and conversions in a readable report.' },
      { name: 'Search Console', desc: 'The queries and pages that bring you organic traffic.' },
    ] },
    { hub: 'CollabHub', tools: [
      { name: 'Shared inbox', desc: 'Your mailboxes in one place, with your team.' },
      { name: 'Team chat', desc: 'Channels and conversations for your team.' },
      { name: 'WhatsApp inbox', desc: 'Answer your WhatsApp conversations from your workspace.' },
      { name: 'Team & roles', desc: 'Invite your team and choose who can access what.' },
    ] },
    { hub: 'Tools', tools: [
      { name: 'Task manager', desc: 'Projects, boards and deadlines for your whole team.' },
      { name: 'Invoices', desc: 'Quotes and invoices, sent and tracked from the workspace.' },
      { name: 'Website builder', desc: 'A professional website without writing code.' },
      { name: 'Video studio', desc: 'Short marketing videos, edited in the browser.' },
      { name: 'Image editor', desc: 'Resize and adapt your visuals for every channel.', soon: true },
    ] },
    { hub: 'DocHub', tools: [
      { name: 'Notes', desc: 'Briefs, meeting notes and docs your team can share.' },
      { name: 'E-signature', desc: 'Send contracts and quotes for signature.' },
      { name: 'Drive', desc: 'All your marketing files in one shared space.', soon: true },
      { name: 'Forms', desc: 'Collect leads and answers that land in your CRM.', soon: true },
    ] },
    { hub: 'AI agent', tools: [
      { name: 'AI agent', desc: 'Ask in plain language: it drafts, summarises and prepares the next step.' },
      { name: 'Connectors', desc: 'Google, Meta, WhatsApp, LinkedIn, Gmail: connect each account once.' },
    ] },
  ],
  fr: [
    { hub: 'Publicité', tools: [
      { name: 'Google Search', desc: 'Apparaissez quand vos clients cherchent, avec un rapport par mot-clé.' },
      { name: 'Google Display', desc: 'Vos visuels sur des millions de sites, emplacements et audiences compris.' },
      { name: 'Meta Ads', desc: 'Campagnes Facebook et Instagram, résultats côte à côte.' },
      { name: 'Orange Max it', desc: 'Diffusez vos offres auprès des utilisateurs de Max it au Sénégal.' },
      { name: 'WhatsApp en masse', desc: 'Campagnes personnalisées à vos listes, suivies en direct.' },
      { name: 'E-mailing', desc: 'Campagnes e-mail à vos couleurs, envoyées à vos listes CRM.' },
      { name: 'SMS en masse', desc: 'Des campagnes courtes, directement sur le téléphone de vos contacts.', soon: true },
    ] },
    { hub: 'Marketing', tools: [
      { name: 'CRM', desc: 'Contacts, entreprises, opportunités et relances dans un seul pipeline.' },
      { name: 'Publication de posts', desc: 'Planifiez et publiez sur Facebook, Instagram et LinkedIn.' },
      { name: 'Google Analytics', desc: 'Trafic, sources et conversions dans un rapport lisible.' },
      { name: 'Search Console', desc: 'Les recherches et les pages qui vous apportent du trafic naturel.' },
    ] },
    { hub: 'CollabHub', tools: [
      { name: 'Messagerie', desc: 'Vos boîtes mail au même endroit, avec votre équipe.' },
      { name: 'Chat d’équipe', desc: 'Des canaux et des conversations pour votre équipe.' },
      { name: 'WhatsApp', desc: 'Répondez à vos conversations WhatsApp depuis votre espace.' },
      { name: 'Équipe et rôles', desc: 'Invitez votre équipe et choisissez qui accède à quoi.' },
    ] },
    { hub: 'Outils', tools: [
      { name: 'Gestion de tâches', desc: 'Projets, tableaux et échéances pour toute l’équipe.' },
      { name: 'Factures', desc: 'Devis et factures, envoyés et suivis depuis l’espace.' },
      { name: 'Créateur de sites', desc: 'Un site professionnel, sans écrire de code.' },
      { name: 'Studio vidéo', desc: 'Des vidéos marketing courtes, montées dans le navigateur.' },
      { name: 'Éditeur d’images', desc: 'Adaptez vos visuels à chaque canal.', soon: true },
    ] },
    { hub: 'DocHub', tools: [
      { name: 'Notes', desc: 'Briefs, comptes rendus et documents à partager.' },
      { name: 'Signature électronique', desc: 'Envoyez contrats et devis à signer.' },
      { name: 'Drive', desc: 'Tous vos fichiers marketing dans un espace partagé.', soon: true },
      { name: 'Formulaires', desc: 'Des prospects et des réponses qui arrivent dans votre CRM.', soon: true },
    ] },
    { hub: 'Agent IA', tools: [
      { name: 'Agent IA', desc: 'Demandez en langage naturel : il rédige, résume et prépare la suite.' },
      { name: 'Connecteurs', desc: 'Google, Meta, WhatsApp, LinkedIn, Gmail : chaque compte se connecte une fois.' },
    ] },
  ],
}
