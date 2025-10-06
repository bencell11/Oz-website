# OZ - Portfolio Artiste Visuel

Portfolio professionnel moderne pour l'artiste OZ, présentant ses œuvres photographiques et visuelles.

## 🎨 Caractéristiques

- Design moderne et responsive
- Galerie d'images interactive avec effet lightbox
- Animations fluides et effets parallax
- Navigation smooth scroll
- Curseur personnalisé
- Optimisé pour mobile et desktop

## 📁 Structure du Projet

```
Oz-website/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Interactions JavaScript
├── IMG_8052.jpeg       # Photo 1 (Hero background)
├── IMG_1130.jpeg       # Photo 2
├── 56931244-E465-42CC-9CD5-B3692F66FDE6.jpeg  # Photo 3
└── EAA0E8FB-5653-4D00-9169-6308ED07AE46 (1).jpeg  # Photo 4
```

## 🚀 Déploiement

### Option 1: GitHub Pages (Recommandé)

1. **Initialiser Git et pousser vers GitHub:**
```bash
cd /Users/benjamincellerino/Oz-website
git init
git add .
git commit -m "Initial commit - OZ Portfolio"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/oz-portfolio.git
git push -u origin main
```

2. **Activer GitHub Pages:**
   - Aller sur GitHub → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → root
   - Cliquer sur Save

3. **Votre site sera accessible à:** `https://VOTRE-USERNAME.github.io/oz-portfolio/`

### Option 2: Netlify (Drag & Drop)

1. Aller sur [netlify.com](https://www.netlify.com/)
2. Créer un compte gratuit
3. Glisser-déposer le dossier `Oz-website` sur Netlify
4. Votre site sera déployé en quelques secondes!

### Option 3: Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd /Users/benjamincellerino/Oz-website
vercel
```

### Option 4: Hébergement Local

Pour tester localement:

```bash
cd /Users/benjamincellerino/Oz-website

# Option A: Python
python3 -m http.server 8000

# Option B: Node.js (npx)
npx serve

# Puis ouvrir: http://localhost:8000
```

## 🎯 Personnalisation

### Modifier les informations de contact

Dans `index.html`, section `#contact`:
```html
<a href="mailto:VOTRE-EMAIL">VOTRE-EMAIL</a>
<a href="https://instagram.com/VOTRE-COMPTE">@VOTRE-COMPTE</a>
```

### Ajouter plus de photos

1. Placer les nouvelles images dans le dossier
2. Ajouter dans `index.html` section `.gallery-grid`:
```html
<div class="gallery-item" data-aos="fade-up">
    <img src="NOUVELLE-IMAGE.jpeg" alt="Description">
    <div class="overlay">
        <div class="overlay-text">Titre</div>
    </div>
</div>
```

### Modifier les couleurs

Dans `style.css`, modifier les variables CSS:
```css
:root {
    --primary-color: #0a0a0a;      /* Fond principal */
    --accent-color: #ff006e;        /* Couleur accent */
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🛠️ Technologies Utilisées

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Intersection Observer API
- Web Animations API

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ Performance optimisée

## 📄 License

Tous droits réservés © 2025 OZ

---

**Créé avec ❤️ pour OZ**
