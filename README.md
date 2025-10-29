# frontend-wp

Boilerplate Vite + Tailwind + style shadcn (Button) + Lucide + Prettier + ESLint + .env

## Démarrage rapide

```bash
# 1) Dézipper ou cloner
cd frontend-wp

# 2) Installer
npm i

# 3) Lancer le dev server
npm run dev
```

### Variables d'environnement
- `.env.development` et `.env.production` sont déjà prêts.
- Accès via `import.meta.env` (voir `src/config.js`).

### Tailwind
- Config dans `tailwind.config.js` (à la racine du projet, ce qui évite l'échec d'installation dans VS Code).
- Fichiers scannés: `./index.html`, `./src/**/*.{js,jsx}`.

### ESLint & Prettier
- ESLint (flat config) permissif afin d'éviter les erreurs bloquantes.
- Prettier activé + format on save (VS Code).

### UI
- Composant `Button` style shadcn dans `src/components/ui/button.jsx`.
- Icônes `lucide-react` (voir exemple dans `App.jsx`).

Bon dev !

## Routage (react-router-dom)
- Home page **/** déjà prête (`src/pages/Home.jsx`)
- 404 minimal
- Navigation dans `App.jsx` avec `BrowserRouter`

## Scripts Windows
- `setup-dev.bat` : installe (`npm i`) puis démarre le serveur de dev
- `build-prod.bat` : build de production

> Double-clique simplement sur le `.bat` depuis l’Explorateur Windows.
