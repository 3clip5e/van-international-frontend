# VAN International Group - Déploiement Vercel

## 🚀 Configuration pour Vercel

Ce projet est configuré pour un déploiement gratuit sur Vercel avec front-end et back-end unifiés.

## 📁 Structure du projet

```
van-website/
├── src/                    # Front-end React
├── van-backend/            # Back-end API
├── public/                # Fichiers statiques
├── vercel.json           # Configuration Vercel
├── van-server.js         # Serveur unifié pour Vercel
└── package.json          # Dépendances et scripts
```

## ⚙️ Configuration Vercel

### vercel.json
- Front-end : Build statique avec Vite
- Back-end : Serverless functions
- Routes : API vers back-end, reste vers front-end

### Scripts modifiés
- `vercel-build` : Build du front-end
- `start` : Serveur unifié

## 🌐 Déploiement

### 1. Installation Vercel CLI
```bash
npm i -g vercel
```

### 2. Connexion Vercel
```bash
vercel login
```

### 3. Déploiement
```bash
vercel --prod
```

## 🔧 Variables d'environnement

Configurer dans Vercel Dashboard :
- `NODE_ENV=production`
- `DATABASE_URL` (si base de données externe)
- `JWT_SECRET` (si authentification)

## 📡 Routes API

- `/api/auth/*` : Authentification
- `/api/hero/*` : Contenu Hero
- `/api/about/*` : Contenu About
- `/api/metrics/*` : Métriques
- `/api/values/*` : Valeurs
- `/api/contact/*` : Contact

## 🎯 Avantages

✅ **Gratuit** : Plan Hobby Vercel suffisant
✅ **HTTPS** : SSL automatique
✅ **CDN** : Distribution mondiale
✅ **Auto-deploy** : Git integration
✅ **Serverless** : Back-end scalable

## 📝 Notes

- Base de données SQLite limitée sur Vercel
- Pour production, considérer MongoDB Atlas ou PostgreSQL
- Front-end servi depuis CDN mondial
- Back-end en serverless functions
