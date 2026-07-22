# Profil scientifique — Virginie Ehrlacher (Galland)

Site statique prêt pour **GitHub Pages**, construit à partir de la page publique de l’équipe Inria MATHERIALS et de ses ramifications professionnelles directes.

## Contenu

- profil, affiliations et coordonnées professionnelles ;
- doctorat, habilitation à diriger des recherches et parcours professionnel issu de l’ancien CV lié ;
- distinction, responsabilités éditoriales et animation scientifique ;
- projets actuels et passés, avec les équipes, objectifs, vidéos et publications rattachées à HighLEAP et COMODO ;
- bibliographie filtrable : 6 prépublications, 40 articles et 9 actes ;
- carte interactive et arborescence des relations ;
- section de traçabilité des sources et note de confidentialité.

## Prévisualisation locale

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Publication sur GitHub Pages

1. Créer un dépôt GitHub vide.
2. Ajouter tous les fichiers de ce dossier à la branche `main`.
3. Dans **Settings → Pages**, sélectionner **GitHub Actions** comme source.
4. Le workflow `.github/workflows/pages.yml` publiera automatiquement le site à chaque push sur `main`.

Le workflow suit le modèle GitHub Pages : configuration, téléversement de l’artefact statique, puis déploiement.

## Mise à jour des données

Les données sont centralisées dans `data.js`. Les textes de structure sont dans `index.html`, le rendu dynamique dans `app.js` et le design dans `styles.css`.

## Attribution et statut

Ce dépôt constitue une reproduction éditoriale indépendante et non officielle. Les informations professionnelles sont attribuées à leur source principale :

- https://team.inria.fr/matherials/team-members/virginie-ehrlacher-galland/

Les titres bibliographiques et métadonnées factuelles sont repris à des fins de navigation scientifique. Les résumés sont reformulés. Les marques, logos et contenus des institutions restent la propriété de leurs titulaires.

## Vie privée

Les données personnelles trouvées dans d’anciens CV publics mais non nécessaires au profil professionnel, telles que la date de naissance ou la situation familiale, ne sont pas reproduites.

## Licence du code

Le code HTML, CSS et JavaScript original de ce dépôt est placé sous licence MIT. Cette licence ne s’étend pas aux contenus, marques ou documents externes liés.
