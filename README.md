# stacbase-landing

Site public de [stacbase.com](https://stacbase.com) : l'accueil, la page Adafri et la page Carrières.

- `/` : l'accueil « Use. Pay. Co-own. » : hero en photo plein cadre, les trois mots en panneaux qui s'empilent, le bloc workspace (l'app redessinée, épinglée à l'écran : chaque cran de défilement ouvre un hub), le calculateur « combien avez-vous loué », l'adhésion (tarifs du catalogue de l'API), le manifeste, les questions, la signature.
- `/publicite-paris-sportifs` (FR) et `/en/sports-betting-advertising` (EN) : la régie pour opérateurs de paris licenciés. Deux adresses reliées par hreflang, questions en données structurées, demande de contact par la messagerie du visiteur (`betting@stacbase.com`).
- `/adafri` : la suite d'Adafri (inspirée de Calendly) : le hub Publicité produit par produit, l'histoire en quatre chapitres, questions.
- `/careers` : carrières.

## Thème

L'accueil et la page betting vivent dans `components/v2/` : Fraunces (titres) et Space Grotesk (texte), fond crème, un accent par page (violet `#5b2be0` et jaune `#ffc531` pour l'accueil, magenta `#a3238e` sur marine pour le betting). Les jetons sont posés sur `.theme` dans `components/v2/ui.module.css` ; les textes sont dans `lib/home.ts` et `lib/betting.ts`. Les pages Adafri et Carrières gardent le thème d'origine, décrit ci-dessous.

Le site reprend les repères de l'application (work.stacbase.com) : Poppins, le violet primaire de l'app (`#7c3aed`), des neutres ardoise et des coins arrondis. Les jetons vivent dans `app/globals.css` (`:root`). Les couleurs du logo (marine, rose, violet) servent aux dégradés et aux accents.

Composants partagés : `components/site/` (barre de navigation, pied de page, questions, icônes, langue, mouvement), `components/mock/` (écrans de l'app redessinés).

## Mouvement

- Révélations au défilement (`data-reveal`, titres `Words`) : rien n'est caché sans JavaScript ni avec « réduire les animations ».
- Onglets qui avancent seuls avec barre de progression (`useAutoTabs`), chiffres qui comptent (`CountUp`), écran incliné qui se redresse au défilement (`useScrollProgress`).
- Transitions entre pages par l'API View Transitions (`@view-transition`).

## Commandes

- `npm run dev` : développement sur http://localhost:3002.
- `npm run build` : site statique dans `out/`.

Déploiement : workflow `landing.yml` du dépôt `stacbase-api` (serveur Lightsail, nginx, certificat Let's Encrypt).
