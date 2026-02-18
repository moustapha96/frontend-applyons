export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Ajoutez vos règles ESLint personnalisées ici
     // 🔥 Optimisations & bonnes pratiques
      // 'no-console': 'warn', // éviter console.log partout
      // 'no-unused-vars': 'warn', // nettoyer le code mort
      // 'react/jsx-no-duplicate-props': 'error', 
      // 'react/jsx-no-undef': 'error',
      // 'react/no-deprecated': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
