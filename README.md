# Documentation du Frontend - React + TypeScript + Vite

Cette documentation fournit les étapes nécessaires pour démarrer avec une application frontend utilisant React, TypeScript et Vite. Elle inclut des recommandations pour la configuration d'ESLint et des plugins utiles pour optimiser le développement.

---

## Table des Matières
1. [Prérequis](#prérequis)
2. [Démarrage](#démarrage)
3. [Configuration ESLint](#configuration-eslint)
4. [Plugins Recommandés](#plugins-recommandes)
5. [Ressources utiles](#ressources-utiles)

---

## Prérequis
- **Node.js** : Version LTS recommandée.
- **TypeScript** : Installé globalement ou localement dans le projet.
- **Vite** : Outil de build rapide pour les applications frontend.

## Démarrage
1. Clonez le projet ou créez-en un nouveau :
   ```bash
   npm create vite@latest my-project --template react-ts
   cd my-project
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## Configuration ESLint
Pour améliorer la qualité de votre code, configurez ESLint avec les règles recommandées pour TypeScript et React.

### Étendre la Configuration

1. Modifiez le fichier de configuration ESLint (généralement `.eslintrc.js`) :
   ```js
   module.exports = {
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       project: ['./tsconfig.json', './tsconfig.node.json'],
       tsconfigRootDir: __dirname,
     },
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended-type-checked',
       'plugin:@typescript-eslint/strict-type-checked',
       'plugin:react/recommended',
       'plugin:react/jsx-runtime',
     ],
     plugins: ['@typescript-eslint', 'react'],
   };
   ```

2. Installez les plugins nécessaires :
   ```bash
   npm install eslint-plugin-react @typescript-eslint/eslint-plugin eslint-config-react --save-dev
   ```

### Optionnel : Ajouter des Règles Stylistiques
Ajoutez `plugin:@typescript-eslint/stylistic-type-checked` à la liste `extends` pour appliquer des règles stylistiques strictes.

## Plugins Recommandés
### @vitejs/plugin-react
Utilisez ce plugin pour activer le Fast Refresh et d’autres optimisations avec Babel :
```bash
npm install @vitejs/plugin-react
```

### @vitejs/plugin-react-swc
Pour des performances accrues, utilisez SWC comme compilateur :
```bash
npm install @vitejs/plugin-react-swc
```
Activez-le dans `vite.config.ts` :
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
});
```

## Ressources Utiles
- [Guide Vite](https://vitejs.dev/guide/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [ESLint Rules for TypeScript](https://typescript-eslint.io/rules/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vidéo explicative](https://www.youtube.com/watch?v=cYoNDoa4_jE)

---

**AuthenticPage Frontend** est conçu pour interagir avec l’API backend et fournir une interface utilisateur intuitive pour la gestion des documents authentiques. Pour toute question, veuillez consulter la documentation complète ou contacter l’équipe technique.



- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
