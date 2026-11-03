# Design system Novelee

Ce document décrit les conventions visuelles utilisées dans le frontend. Il sert de référence pour créer ou faire évoluer les pages sans rompre la cohérence de l’interface.

## Identité visuelle

Novelee s’inspire de l’univers éditorial du livre : une ambiance chaleureuse et élégante, des tons crème, des accents bordeaux et corail, et une typographie de lecture à empattements pour les titres. L’interface doit rester conviviale, lisible et sans surcharge décorative.

## Couleurs

### Palette globale

Ces couleurs sont définies comme variables CSS dans `src/index.css`.

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Primaire | `#B0183E` | Actions, liens et éléments de marque. |
| Primaire foncée | `#85102F` | Survol et contraste renforcé des actions. |
| Secondaire | `#F85E5A` | Accent corail global. |
| Accent | `#FDD468` | Détails lumineux et décoratifs. |
| Encre | `#302329` | Texte principal global. |
| Texte secondaire | `#71646A` | Descriptions et informations secondaires. |
| Papier | `#FFFAF6` | Fond général. |
| Crème | `#F8EEE8` | Fonds de sections douces. |
| Blanc | `#FFFFFF` | Surfaces et texte sur fond sombre. |

### Palette de la section Communauté

La section des services emploie une palette dédiée, isolée dans `src/features/landing/ServicesSection.css`.

| Rôle | Valeur |
| --- | --- |
| Fond de section | `#FFF8F2` |
| Fond des cartes | `#FFFEFC` |
| Bordeaux | `#790D32` |
| Texte principal | `#35151C` |
| Texte secondaire | `#72545A` |
| Corail | `#F28A78` |
| Bordures | `#F2D8CC` |
| Badge de l’assistant IA | `#FFE9B5` |

## Typographie

- **Titres et citations :** Bellefair, avec Georgia comme police de repli.
- **Texte courant et interface :** Jost, avec une police sans-serif système en repli.
- **Titres :** poids léger à normal, tailles fluides et interlignage resserré.
- **Paragraphes :** interlignage généreux pour faciliter la lecture.
- **Libellés et badges :** Jost en semi-gras ou gras; les petits badges éditoriaux peuvent utiliser les capitales et l’espacement des lettres.

Les polices sont chargées localement depuis `@fontsource/bellefair` et `@fontsource/jost`.

## Mise en page et composants

- Largeur de contenu globale : jusqu’à `1200px`, avec marges fluides.
- Sections : espacements verticaux généreux, ajustés sur les petits écrans.
- Cartes : fonds clairs, bordures discrètes, coins arrondis et ombres légères.
- Actions principales : fond primaire, texte contrasté, forme arrondie.
- Icônes décoratives : SVG intégrés et palette assortie; les éléments purement décoratifs sont masqués aux lecteurs d’écran.
- Navigation : liens simples, menus de profil déroulants et action de déconnexion rendue en bouton.

Les styles globaux sont dans `src/index.css` et `src/App.css`. Les styles propres à une section ou à une page doivent rester dans leur feuille dédiée, comme `ServicesSection.css` et `DashboardPage.css`.

## Responsive

- **Mobile :** une colonne pour les grilles principales, menu compact, composants adaptés à la largeur disponible.
- **Tablette :** grilles souvent en deux colonnes et espacements réduits.
- **Ordinateur :** grilles pouvant passer à trois colonnes et navigation horizontale.
- Les seuils sont définis par composant dans les media queries; les styles de la section Communauté utilisent notamment les paliers `767px` et `1199px`.
- Aucun composant ne doit provoquer de débordement horizontal à partir de `320px`.

## Accessibilité et mouvement

- Chaque contrôle interactif doit être accessible au clavier et avoir un libellé explicite.
- Le focus clavier est visible avec `:focus-visible`.
- Respecter les niveaux de contraste suffisants pour le texte et les actions.
- Les illustrations informatives reçoivent un texte alternatif; les ornements décoratifs utilisent `aria-hidden="true"`.
- Les animations et transitions doivent rester discrètes et tenir compte de `prefers-reduced-motion`, déjà pris en charge globalement.

## Principes à respecter

1. Réutiliser les couleurs, polices et composants existants avant d’ajouter de nouveaux styles.
2. Garder les couleurs d’une section isolées si elles ne sont pas destinées à tout le site.
3. Privilégier la lisibilité et la hiérarchie du contenu aux ornements.
4. Tester les layouts sur mobile, tablette et ordinateur.
5. Ne pas considérer les protections de navigation côté client comme une sécurité serveur; voir la note d’authentification dans le [`README.md`](./README.md).
