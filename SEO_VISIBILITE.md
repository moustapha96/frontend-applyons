# Rendre ApplyOns visible (Google, Bing, réseaux sociaux)

Ce guide décrit comment faire connaître le site **www.applyons.com** aux moteurs de recherche et aux partages sociaux.

---

## 1. Google Search Console (prioritaire)

1. Va sur [Google Search Console](https://search.google.com/search-console).
2. **Ajouter une propriété** → URL du préfixe : `https://www.applyons.com`.
3. **Vérifier la propriété** :
   - Méthode recommandée : **Enregistrement DNS** (ajoute un enregistrement TXT proposé par Google dans la configuration DNS de ton domaine).
   - Sinon : **Balise HTML** (tu peux l’ajouter temporairement dans `<head>` de `index.html` si Google te donne une meta à coller).
4. Une fois vérifié :
   - **Soumission du sitemap** : dans le menu, **Sitemaps** → ajouter `https://www.applyons.com/sitemap.xml` → Envoyer.
   - Consulter **Couverture** et **Performances** pour voir l’indexation et les recherches Google.

**À faire après chaque gros changement de contenu** : régénérer le sitemap (`npm run generate-sitemap`), redéployer, puis dans Search Console demander une **inspection d’URL** sur la page d’accueil (ou les URLs modifiées) et éventuellement une **demande d’indexation**.

---

## 2. Bing Webmaster Tools

1. Va sur [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Connecte-toi (compte Microsoft).
3. **Ajouter un site** → `https://www.applyons.com`.
4. Vérification : soit importer depuis Google Search Console (si déjà vérifié), soit **fichier XML** ou **balise meta** comme pour Google.
5. Une fois vérifié : **Sitemaps** → soumettre `https://www.applyons.com/sitemap.xml`.

Bing alimente aussi Yahoo et DuckDuckGo, donc une seule config aide plusieurs moteurs.

---

## 3. Google Analytics (déjà intégré)

Le site utilise déjà **Google Analytics** (gtag, ID `G-7YRHWY6LY8` dans `index.html`).  
Pour suivre la popularité :

- Va sur [Google Analytics](https://analytics.google.com) et vérifie que la propriété pointe bien vers `www.applyons.com`.
- Consulte **Acquisition** → **Trafic** pour voir les sources (Google, direct, réseaux sociaux, etc.).

---

## 4. Réseaux sociaux et partages

Les balises **Open Graph** et **Twitter** sont déjà dans `index.html` (titre, description, image). Pour que le site devienne plus « populaire » via le partage :

- **Image de partage** : s’assurer que `https://www.applyons.com/logo.png` (ou une image dédiée 1200×630 px) s’affiche correctement. Tester avec [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) et [Twitter Card Validator](https://cards-dev.twitter.com/validator).
- **Réseaux ApplyOns** : les liens dans le schéma Organization (Facebook, Instagram, X, LinkedIn) doivent pointer vers les vrais comptes ; mettre à jour dans `index.html` si besoin.

---

## 5. Bonnes pratiques à garder en tête

- **Contenu** : textes utiles, mots-clés naturels (déjà présents dans les meta description/keywords).
- **Vitesse** : build Vite + Nginx (gzip, pas de cache excessif) déjà en place.
- **Mobile** : viewport et thème déjà configurés ; tester sur mobile pour le confort de lecture.
- **HTTPS** : déjà en place ; Google favorise les sites en HTTPS.
- **Sitemap à jour** : avant chaque déploiement, lancer `npm run generate-sitemap` pour que `public/sitemap.xml` soit à jour.

---

## 6. Fichiers du projet concernés

| Fichier | Rôle |
|--------|------|
| `public/robots.txt` | Indique aux robots le sitemap et les zones autorisées. |
| `public/sitemap.xml` | Liste des URLs à indexer (généré par `npm run generate-sitemap`). |
| `index.html` | Meta description, Open Graph, Twitter, JSON-LD (Organization + WebSite), Google Analytics. |
| `generateSitemap.js` | Script pour régénérer le sitemap (routes publiques). |

En suivant ces étapes, le site est correctement exposé à Google, Bing et aux partages sociaux ; la « popularité » viendra ensuite du trafic, du contenu et des liens externes.
