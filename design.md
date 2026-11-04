# Référentiel visuel Novelee

Ce document rassemble les conventions visuelles du frontend. Il sert de guide lors de
la création ou de la modification d’écrans; les styles effectivement présents dans le
code restent la source de vérité.

## Direction artistique

Novelee reprend les codes d’un univers éditorial et chaleureux : fonds crème, tons
bordeaux et corail, typographie à empattements pour les titres et interface sobre.
L’identité doit rester accueillante et lisible. Les ornements ne doivent jamais nuire
à la hiérarchie du contenu ni à l’usage.

## Couleurs

### Palette globale

Les principales couleurs de l’interface sont définies dans `src/index.css`.

| Rôle | Valeur | Utilisation |
| --- | --- | --- |
| Primaire | `#B0183E` | Actions et repères de marque. |
| Primaire foncée | `#85102F` | Variantes renforcées et états de survol. |
| Secondaire | `#F85E5A` | Accent corail. |
| Accent | `#FDD468` | Détails et éléments décoratifs. |
| Encre | `#302329` | Texte principal. |
| Texte secondaire | `#71646A` | Descriptions et informations secondaires. |
| Papier | `#FFFAF6` | Fond général. |
| Crème | `#F8EEE8` | Surfaces et sections douces. |
| Blanc | `#FFFFFF` | Surfaces et contenu sur fond sombre. |

## Typographie

- **Titres et citations :** Bellefair, avec Georgia comme police de repli.
- **Texte courant et interface :** Jost, puis une police sans empattements système.
- **Hiérarchie :** titres expressifs et resserrés; corps de texte confortable à lire;
  libellés et badges clairement différenciés.
- **Chargement :** les fontes sont importées depuis `@fontsource/bellefair` et
  `@fontsource/jost` dans `src/index.css`.

Privilégier les styles et niveaux typographiques déjà présents plutôt que de créer
des variantes ponctuelles sans besoin fonctionnel.

## Mise en page et composants

- La largeur de contenu globale de référence est `1200px` (`--content-width`).
- Conserver des marges fluides et un espacement généreux entre les sections.
- Construire les cartes avec une hiérarchie claire, des surfaces claires, des bordures
  discrètes et des arrondis cohérents avec les composants voisins.
- Réserver la couleur primaire aux actions et aux repères importants; maintenir un
  contraste suffisant entre texte, fond et contrôles.
- Placer les styles partagés dans `src/index.css` ou `src/App.css`, et les styles
  spécifiques près de la page ou de la fonctionnalité concernée.
- Réutiliser les composants et motifs existants avant d’ajouter une nouvelle
  implémentation.

## Adaptation aux écrans

Le site prend en charge les viewports à partir de `320px`. Chaque composant doit
s’adapter à la largeur disponible sans créer de défilement horizontal.

- **Mobile :** privilégier une colonne, des contrôles faciles à utiliser et une
  navigation compacte.
- **Tablette :** ajuster les espacements et organiser les grilles selon le contenu.
- **Grand écran :** exploiter les grilles et la navigation horizontale lorsque cela
  améliore la lecture.

Les seuils responsive sont définis par composant dans les media queries. Vérifier les
changements aux largeurs réellement utilisées par l’interface plutôt que de supposer
un breakpoint universel.

## Accessibilité et mouvement

- Fournir un nom explicite à chaque champ et contrôle interactif.
- Garder tous les parcours utilisables au clavier et préserver le style `:focus-visible`
  global.
- Associer les messages d’état et d’erreur aux contrôles concernés.
- Donner un texte alternatif aux images informatives; masquer les ornements décoratifs
  aux technologies d’assistance (`aria-hidden="true"`).
- Maintenir une structure de titres cohérente et un contraste suffisant.
- Respecter `prefers-reduced-motion`; les styles globaux réduisent déjà les animations,
  transitions et défilements animés lorsque cette préférence est active.

## Principes de contribution

1. Vérifier les variables, composants et styles existants avant d’introduire une
   nouvelle couleur ou un nouveau motif.
2. Garder les palettes propres à une section dans ses styles locaux.
3. Privilégier la clarté, la lecture et des interactions prévisibles aux effets
   décoratifs.
4. Tester les écrans sur mobile, tablette et ordinateur, ainsi qu’au clavier.
5. Ne pas traiter la navigation ou les rôles côté client comme une frontière de
   sécurité; l’autorisation réelle relève du service serveur. Voir
   [README.md](./README.md) pour le fonctionnement de l’authentification.
