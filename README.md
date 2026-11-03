# Novelee

Novelee est une plateforme communautaire dédiée à la lecture. Elle aide les lecteurs à découvrir des livres, échanger autour de leurs lectures et rejoindre des communautés par livre ou par genre.

Ce dépôt contient le frontend de l’application, construit avec React, TypeScript et Vite. L’interface comprend une page d’accueil, des formulaires d’authentification, des espaces membre et administrateur, ainsi que des pages d’information.

## Fonctionnalités

- Présentation responsive des services de la communauté littéraire.
- Inscription et connexion avec attribution du rôle `user` aux nouveaux comptes.
- Navigation adaptée aux rôles `user` et `admin`.
- Dashboards membre et administrateur.
- Pages de profil, bibliothèques, archives, historique et paramètres.
- Pages légales et gestion du consentement aux cookies.

## Démarrage

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Vite affiche l’adresse locale à ouvrir dans le navigateur.

## Commandes

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite. |
| `npm run build` | Vérifie les types TypeScript et construit l’application pour la production. |
| `npm run preview` | Sert localement le dernier build de production. |
| `npm run lint` | Exécute ESLint sur le projet. |

## Configuration

Les variables d’environnement Vite sont facultatives. Crée un fichier `.env.local` à la racine pour les définir; ne commite pas de secrets dans ce fichier.

```dotenv
VITE_MVP_URL=
VITE_BETA_API_URL=
VITE_AUTH_API_URL=
VITE_CONTACT_EMAIL=
```

- `VITE_MVP_URL` : destination du bouton principal de la page d’accueil.
- `VITE_BETA_API_URL` : API d’inscription à la bêta.
- `VITE_AUTH_API_URL` : endpoint d’authentification; s’il est vide, le mode démo local est utilisé.
- `VITE_CONTACT_EMAIL` : adresse de contact affichée sur le site.

### Contrat attendu pour l’API d’authentification

Le frontend envoie une requête `POST` avec `credentials: "include"` et un corps JSON contenant `action` et `email`. `password` est ajouté pour l’inscription et la connexion; `consent` est ajouté pour l’inscription.

Pour une connexion réussie, l’API doit répondre avec un utilisateur dans l’un des formats suivants :

```json
{
  "user": {
    "email": "lecteur@example.com",
    "role": "user"
  }
}
```

ou directement :

```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

Le rôle doit être `user` ou `admin`. L’API doit elle-même vérifier les identifiants, appliquer les permissions et attribuer le rôle `user` lors d’une inscription publique. L’interface seule ne constitue pas un contrôle d’accès sécurisé.

## Comptes de démonstration

En développement, quand `VITE_AUTH_API_URL` n’est pas défini, des comptes locaux permettent de tester les deux espaces :

| Rôle | Adresse | Mot de passe | Destination |
| --- | --- | --- | --- |
| Membre | `lecteur@novelee.test` | `DemoUser!2026` | `/dashboard` |
| Administrateur | `admin@novelee.test` | `DemoAdmin!2026` | `/admin/dashboard` |

Les inscriptions créées depuis le formulaire reçoivent toujours le rôle `user`.

> **Limite de sécurité :** les comptes de démonstration et les comptes créés localement sont enregistrés dans le navigateur. Les données et rôles peuvent être modifiés par l’utilisateur; ce mode est réservé à la démonstration et ne doit pas servir pour des comptes réels ou des données sensibles.

## Routes principales

| Espace | Route | Description |
| --- | --- | --- |
| Public | `/` | Page d’accueil. |
| Public | `/connexion` | Connexion. |
| Public | `/inscription` | Création d’un compte membre. |
| Membre | `/dashboard`, `/accueil` | Tableau de bord membre. |
| Membre | `/bibliotheques`, `/archives` | Bibliothèques et archives. |
| Membre | `/profil`, `/profil/parametres`, `/profil/historique` | Profil et pages associées. |
| Admin | `/admin/dashboard` | Tableau de bord administrateur. |
| Admin | `/admin/utilisateurs` | Liste des comptes connus du mode courant. |
| Admin | `/admin/historique`, `/admin/profil`, `/admin/parametres` | Historique, profil et paramètres admin. |
| Public | `/mentions-legales`, `/confidentialite`, `/conditions-utilisation`, `/cookies`, `/accessibilite` | Informations légales. |

Les pages d’historique, d’archives et de paramètres sont des bases d’interface; leurs fonctionnalités métier nécessitent encore un service de données.

## Organisation du code

```text
src/
  components/layout/       En-tête, pied de page et bandeau cookies
  features/auth/            Authentification et stockage de démonstration
  features/beta/            Inscription à la bêta
  features/landing/         Sections de la page d’accueil
  lib/                      Configuration et navigation par rôle
  pages/                    Pages, dashboards et espaces de rôle
```

Les conventions visuelles et les règles de mise en page sont décrites dans [`design.md`](./design.md).
