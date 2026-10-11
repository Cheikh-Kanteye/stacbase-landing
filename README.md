# stacbase-landing

Page d'accueil de [stacbase.com](https://stacbase.com) : le mot-symbole noir, et une encre liquide qui révèle le logo animé sous la souris (simulation de fluide WebGL 2).

- `npm run dev` : développement sur http://localhost:3002 (`?ink=demo` fait couler l'encre sans souris).
- `npm run build` : site statique dans `out/`.

Déploiement : workflow `landing.yml` du dépôt `stacbase-api` (serveur Lightsail, nginx, certificat Let's Encrypt).
