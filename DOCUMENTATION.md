# Documentation Complète - Authentic Page

## 1. Vue d'ensemble

Authentic Page est une application web moderne développée avec React, TypeScript et Vite. L'application est une plateforme de gestion de documents authentiques avec une interface multilingue et des fonctionnalités avancées.

## 2. Structure du Projet

```
applyons/
├── src/
│   ├── App.jsx           # Point d'entrée principal
│   ├── AppContext.jsx    # Contexte global de l'application
│   ├── assets/           # Ressources statiques
│   ├── components/       # Composants réutilisables
│   ├── context/          # Contextes React
│   ├── helpers/          # Fonctions utilitaires
│   ├── hooks/           # Hooks personnalisés
│   ├── layouts/         # Layouts de l'application
│   ├── locales/         # Fichiers de traduction (fr, en, es, de, it, ch)
│   ├── pages/           # Pages de l'application
│   ├── routes/          # Configuration des routes
│   ├── services/        # Services et API
│   ├── utils/           # Utilitaires et fonctions communes
│   └── vite-env.d.js    # Configuration d'environnement
├── public/              # Fichiers statiques publics
├── .env                 # Variables d'environnement
└── package.json        # Configuration du projet
```

## 3. Technologies Principales

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - ESLint + Prettier

- **Bibliothèques UI**:
  - Ant Design (antd)
  - React Icons
  - Lucide React
  - React Helmet Async
  - React Router DOM

- **Internationalisation**:
  - i18next
  - i18next-browser-languagedetector
  - 6 langues supportées (fr, en, es, de, it, ch)

## 4. Fonctionnalités Principales

### 4.1 Authentification
- Système de connexion/inscription
- Gestion des sessions
- Protection des routes

### 4.2 Interface Multilingue
- Support de 6 langues
- Interface de changement de langue
- Système de détection automatique de la langue

### 4.3 Pages Principales

#### 4.3.1 Pages Landing
- **Applyons** : Page principale de présentation
- **AuthenticPage** : Page d'accueil spécifique à AuthenticPage
- **Inscription** : Formulaire d'inscription
- **PrivacyPolicy** : Politique de confidentialité
- **TermsConditions** : Conditions d'utilisation
- **VerifierDocument** : Page de vérification de documents

#### 4.3.2 Pages d'Authentification
- Connexion
- Inscription
- Récupération de mot de passe

#### 4.3.3 Pages Administrateur
- Gestion des instituts
- Tableau de bord
- Rapports et statistiques

#### 4.3.4 Pages Demandeur
- Partage de documents
- Gestion des demandes
- Profil utilisateur

#### 4.3.5 Pages Institut
- Gestion des documents
- Profil institut
- Historique des transactions

### 4.4 Services
- API Integration
- Gestion des paiements (Stripe, PayPal)
- Gestion des documents
- Système de notifications

## 5. Configuration

### 5.1 Installation
```bash
npm install
```

### 5.2 Variables d'Environnement
Créer un fichier `.env` avec les variables suivantes :
```
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_id
```

### 5.3 Scripts Disponibles
```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview

# Formater le code
npm run format

# Générer le sitemap
npm run generate-sitemap
```

## 6. Structure des Pages

### 6.1 Pages Demandeur
- **Partage** : Interface de partage de documents
- **Demandes** : Gestion des demandes de documents
- **Profil** : Gestion du profil utilisateur
- **Historique** : Historique des transactions

### 6.2 Pages Admin
- **Instituts** : Gestion des instituts
  - Détails institut
  - Statistiques
- **Tableau de bord** : Vue d'ensemble
- **Rapports** : Génération de rapports
- **Utilisateurs** : Gestion des utilisateurs

### 6.3 Pages Institut
- **Documents** : Gestion des documents authentiques
- **Profil** : Gestion du profil institut
- **Historique** : Historique des transactions
- **Statistiques** : Statistiques d'utilisation

## 7. Composants Principaux

### 7.1 Composants Généraux
- **TopNavBar** : Barre de navigation principale
- **Footer** : Pied de page
- **Preloader** : Composant de chargement
- **ScrollToTop** : Bouton de retour en haut
- **ThirdPartyAuth** : Authentification tiers
- **FAQ** : Foire aux questions
- **Testimonials** : Témoignages

### 7.2 Composants de Navigation
- **AdminBreadcrumb** : Navigation pour l'admin
- **DemandeurBreadcrumb** : Navigation pour le demandeur
- **InstitutBreadcrumb** : Navigation pour l'institut
- **PageMetaData** : Métadonnées des pages

### 7.3 Composants UI
- **GlightBox** : Galerie d'images
- **ServicesMarquee** : Services en marquee
- **ProjectSwiper** : Slider de projets
- **Paypal** : Intégration PayPal
- **topBarSecond** : Deuxième barre de navigation

### 7.4 Composants de Formulaire
- **form/** : Composants de formulaire
  - Input
  - Select
  - Textarea
  - Checkbox
  - Radio

### 7.5 Composants UI
- **ui/** : Composants UI réutilisables
  - Buttons
  - Cards
  - Modals
  - Alerts

## 8. Services Principaux

### 8.1 Services Authentification
- **loginService** : Gestion de l'authentification
- **userService** : Gestion des utilisateurs
- **mailerService** : Gestion des emails

### 8.2 Services Demandeur
- **demandeurService** : Gestion des demandeurs
- **demandeService** : Gestion des demandes
- **partageService** : Gestion du partage de documents

### 8.3 Services Institut
- **institutService** : Gestion des instituts
- **institutSuperviseurService** : Gestion des superviseurs
- **documentService** : Gestion des documents

### 8.4 Services Paiement
- **paymentService** : Gestion des paiements
- **transactionService** : Gestion des transactions
- **abonnementService** : Gestion des abonnements

### 8.5 Services Configuration
- **configuraionService** : Configuration générale
- **contactService** : Gestion des contacts

## 9. Gestion des Traductions

Les traductions sont organisées dans le dossier `src/locales` avec les fichiers suivants :
- fr.json (français)
- en.json (anglais)
- es.json (espagnol)
- de.json (allemand)
- it.json (italien)
- ch.json (chinois)

La structure des fichiers est hiérarchique avec des clés imbriquées pour organiser les traductions par section/composant.

## 10. Tests et Déploiement

### 10.1 Tests
- Tests unitaires avec Jest
- Tests d'intégration
- Tests d'interface utilisateur

### 10.2 Déploiement
- Build optimisé pour la production
- Génération de sitemap
- Optimisation des performances

## 11. Maintenance et Support

### 11.1 Mises à jour
- Suivi des dépendances
- Mises à jour de sécurité
- Documentation des changements

### 11.2 Support
- Documentation technique
- Guide d'utilisation
- FAQ et résolution de problèmes

# Le projet en tant que telle

## Description du Projet
Il s'agit d'une plateforme de gestion et d'authentification de documents académiques avec trois types d'utilisateurs principaux:

### 1. Instituts (Établissements académiques)
- Peuvent gérer les demandes d'authentification de documents
- Peuvent téléverser et authentifier des documents officiels (diplômes, relevés, attestations)
- Ont un tableau de bord pour suivre les demandes et les documents
- Peuvent accepter ou rejeter les demandes d'authentification

### 2. Demandeurs
- Peuvent faire des demandes d'authentification de documents 
- Peuvent consulter leurs documents authentifiés
- Peuvent suivre l'état de leurs demandes
- Ont accès à un historique de transactions

### 3. Administrateurs
- Gèrent les instituts et les demandeurs
- Supervisent toutes les demandes et documents
- Peuvent configurer le système
- Ont accès aux statistiques globales

### Fonctionnalités Principales
1. **Gestion des Documents**
   - Téléversement de PDF
   - Vérification de l'authenticité
   - Stockage sécurisé
   - Traçabilité des documents

2. **Gestion des Demandes**
   - Soumission de demandes
   - Processus de validation
   - Suivi des statuts (En attente, Accepté, Rejeté)
   - Notifications

3. **Authentification & Sécurité**
   - Système de connexion multiutilisateurs
   - Gestion des rôles et permissions
   - Protection des données sensibles

4. **Interface Multilingue**
   - Support de plusieurs langues (utilisation de i18n)
   - Traductions disponibles

### Architecture Technique
- Frontend: React + Vite
- Styling: Tailwind CSS
- State Management: Context API
- Form Handling: React Hook Form + Yup
- Internationalisation: react-i18next
- Navigation: React Router
- UI Components: Lucide Icons, Custom Components

Le projet semble être une solution complète pour la dématérialisation et la sécurisation des documents académiques, offrant une plateforme fiable pour la vérification de l'authenticité des diplômes et autres documents officiels.