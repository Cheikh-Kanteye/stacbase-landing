# stacbase-landing

Site public de [stacbase.com](https://stacbase.com) : l'accueil, la page Adafri et la page Carrières.

- `/` : présentation produit (inspirée de Qarin) : écran de l'app animé, outils, chiffres, boîte à outils, étapes, tarifs du catalogue de l'API, questions, puis le mot-symbole à l'encre liquide (simulation de fluide WebGL 2, `?ink=demo` la fait couler sans souris).
- `/adafri` : la suite d'Adafri (inspirée de Calendly) : le hub Publicité produit par produit, l'histoire en quatre chapitres, questions.
- `/careers` : carrières.

## Thème

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
