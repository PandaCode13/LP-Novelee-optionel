# Novelee — frontend

Novelee est une plateforme communautaire autour de la lecture. Le site présente le
projet et ses services, propose une inscription à la liste d’attente de la bêta et
fournit des parcours de connexion ainsi que des espaces d’interface pour les membres
et l’administration.

Ce dépôt contient le frontend, construit avec React, TypeScript et Vite. Les écrans
connectés et certains services sont des bases d’interface : leur fonctionnement réel
dépend de la configuration d’une API et de services métier.

## Sommaire

- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Scripts disponibles](#scripts-disponibles)
- [Configuration](#configuration)
- [Authentification](#authentification)
- [Routes](#routes)
- [Structure du projet](#structure-du-projet)
- [Documentation complémentaire](#documentation-complémentaire)

## Prérequis

- Node.js compatible avec la version de Vite installée dans le projet.
- npm.

## Installation et lancement

À la racine du dépôt :

```bash
npm install
npm run dev
```

Vite affiche l’adresse locale du serveur dans le terminal. Pour créer et prévisualiser
une version de production :

```bash
npm run build
npm run preview
```

## Scripts disponibles

| Script | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite. |
| `npm run build` | Vérifie les projets TypeScript puis génère le build de production dans `dist/`. |
| `npm run preview` | Sert localement le build de production. |
| `npm run lint` | Exécute ESLint sur le dépôt. |

## Configuration

La configuration publique du frontend est lue depuis les variables d’environnement
préfixées par `VITE_`. Crée un fichier `.env.local` à la racine pour le développement
local :

```dotenv
VITE_MVP_URL=
VITE_BETA_API_URL=
VITE_AUTH_API_URL=
VITE_CONTACT_EMAIL=
```

| Variable | Rôle | Valeur par défaut |
| --- | --- | --- |
| `VITE_MVP_URL` | Destination du bouton principal de la page d’accueil. | `#beta` |
| `VITE_BETA_API_URL` | URL appelée pour enregistrer une adresse sur la liste d’attente. | Désactivée |
| `VITE_AUTH_API_URL` | URL du service d’inscription, de connexion et de réinitialisation du mot de passe. | Mode local de démonstration; la réinitialisation est désactivée |
| `VITE_CONTACT_EMAIL` | Adresse de contact affichée dans le site. | Vide |

Les variables `VITE_*` sont intégrées au code livré au navigateur : elles ne doivent
jamais contenir de secret, de clé privée ou d’identifiant confidentiel. Ne commite pas
`.env.local`.

### API de liste d’attente

Lorsque `VITE_BETA_API_URL` est renseignée, le formulaire envoie une requête `POST`
avec un corps JSON de la forme :

```json
{
  "email": "lecteur@example.com",
  "consent": true
}
```

Toute réponse HTTP réussie est considérée comme une inscription enregistrée. Sans URL
configurée, le formulaire indique que les inscriptions en ligne ne sont pas encore
activées.

### API d’authentification

Lorsque `VITE_AUTH_API_URL` est renseignée, le frontend envoie une requête `POST` avec
`Content-Type: application/json` et `credentials: "include"`. Les données envoyées
dépendent de l’action :

```json
{
  "action": "login",
  "email": "lecteur@example.com",
  "password": "mot-de-passe"
}
```

Les actions acceptées sont `login`, `register` et `reset`. L’inscription ajoute
`consent: true` et le formulaire de réinitialisation n’envoie pas de mot de passe.
L’API doit vérifier les entrées, gérer les mots de passe et les sessions, appliquer
les autorisations côté serveur et attribuer le rôle `user` aux inscriptions publiques.

Pour une connexion réussie, la réponse JSON doit fournir l’adresse e-mail et le rôle
`user` ou `admin`, directement ou dans une propriété `user` :

```json
{
  "user": {
    "email": "lecteur@example.com",
    "role": "user"
  }
}
```

Le champ facultatif `createdAt` est conservé s’il s’agit d’une chaîne de caractères.
Sans ce champ, le frontend crée une date au moment de la connexion. Les actions
d’inscription et de réinitialisation sont considérées réussies lorsque la réponse HTTP
est réussie.

Si l’URL d’authentification est absente, l’inscription et la connexion utilisent le
stockage du navigateur. Ce mode est réservé au développement et à la démonstration :
les rôles et données conservés côté client ne constituent pas une sécurité et ne
conviennent pas à de vrais comptes.

#### Comptes de démonstration en développement

En mode développement (`npm run dev`), les comptes suivants sont créés par le service
d’authentification locale :

| Rôle | Adresse | Mot de passe | Destination après connexion |
| --- | --- | --- | --- |
| Membre | `lecteur@novelee.test` | `DemoUser!2026` | `/dashboard` |
| Administrateur | `admin@novelee.test` | `DemoAdmin!2026` | `/admin/dashboard` |

Ces comptes sont exclusivement destinés à la démonstration locale. La session et les
comptes sont enregistrés dans le navigateur; effacer les données du site supprime les
comptes locaux enregistrés.

## Routes

| Route | Accès / contenu |
| --- | --- |
| `/` | Page d’accueil et formulaire de liste d’attente. |
| `/connexion` | Connexion. |
| `/inscription` | Création d’un compte. |
| `/mot-de-passe-oublie` | Demande de réinitialisation du mot de passe (nécessite l’API). |
| `/dashboard` | Tableau de bord membre (`src/pages/user/DashboardPage.tsx`). |
| `/accueil` | Accueil membre (`src/pages/user/AccueilPage.tsx`). |
| `/bibliotheques` | Bibliothèques (`src/pages/user/LibrariesPage.tsx`). |
| `/archives` | Archives (`src/pages/user/ArchivesPage.tsx`). |
| `/conversations` | Conversations (`src/pages/user/ConversationsPage.tsx`). |
| `/notifications` | Notifications (`src/pages/user/NotificationsPage.tsx`). |
| `/profil` | Profil membre (`src/pages/user/ProfilePage.tsx`). |
| `/profil/parametres` | Paramètres du profil (`src/pages/user/ProfileSettingsPage.tsx`). |
| `/profil/historique` | Historique membre (`src/pages/user/ProfileHistoryPage.tsx`). |
| `/admin/dashboard` | Tableau de bord administrateur (`src/pages/admin/DashboardPage.tsx`). |
| `/admin/utilisateurs` | Gestion des utilisateurs (`src/pages/admin/UsersPage.tsx`). |
| `/admin/historique` | Historique admin (`src/pages/admin/HistoryPage.tsx`). |
| `/admin/profil` | Profil admin (`src/pages/admin/ProfilePage.tsx`). |
| `/admin/parametres` | Paramètres admin (`src/pages/admin/SettingsPage.tsx`). |
| `/deconnexion` | Déconnexion. |
| `/mentions-legales`, `/confidentialite`, `/conditions-utilisation` | Informations légales. |
| `/cookies`, `/gestion-protection-donnees`, `/accessibilite` | Informations sur les cookies, les données et l’accessibilité. |
| `/signalement` | Page de signalement. |

Les pages d’espaces membre et administrateur sont actuellement des interfaces de base,
pas des fonctionnalités métier complètes. La vérification d’accès faite dans le
frontend améliore la navigation, mais seule l’API peut imposer des autorisations
fiables.

## Structure du projet

```text
src/
  components/layout/       En-tête, pied de page, consentement aux cookies et retour en haut
  features/auth/           Formulaires d’authentification et service local de démonstration
  features/beta/            Formulaire de liste d’attente de la bêta
  features/landing/         Sections, contenu et icônes de la page d’accueil
  hooks/                    Hooks, dont la gestion du consentement aux cookies
  lib/                      Configuration du site et navigation par rôle
  pages/
    admin/                  Fichier de page dédié à chaque écran administrateur
    styles/                 Feuilles de style des espaces membre et admin
    user/                   Fichier de page dédié à chaque écran membre
                            Pages publiques et d’information à la racine de pages/
```

Les styles globaux se trouvent dans `src/index.css` et `src/App.css`. Les styles
propres à un composant ou à une page sont regroupés près de leur fonctionnalité.
Chaque écran membre ou administrateur a son propre composant dans `src/pages/user/`
ou `src/pages/admin/`. Pour ajouter un écran, crée son fichier dans le dossier du rôle,
puis enregistre son chemin dans `src/App.tsx` et ajoute son lien dans
`src/lib/navigation.ts` si l’écran doit apparaître dans le menu.

## Documentation complémentaire

Les conventions visuelles, la palette et les principes d’accessibilité sont détaillés
dans [`design.md`](./design.md).
