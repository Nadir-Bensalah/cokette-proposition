# Proposition Cokette Girls

Proposition de refonte e-commerce, publiée en page privée sur GitHub Pages.

Le contenu n'est jamais publié en clair : il voyage chiffré en AES-256-GCM,
la clé étant dérivée de la phrase de passe par PBKDF2-SHA256 à 600 000 itérations.
Une phrase fausse fait échouer la vérification d'intégrité — pas de déchiffrement partiel.

Rien n'est conservé : ni stockage local, ni cookie, ni adresse. Recharger, fermer
l'onglet, ou laisser cinq minutes sans activité referme le document.

## Modifier le contenu

Le clair vit dans `contenu.html`, **ignoré par git** — il ne part jamais sur le dépôt.

```bash
# 1. éditer contenu.html
# 2. resceller
node sceller.mjs "<phrase de passe>"
# 3. publier
git add -A && git commit -m "maj proposition" && git push
```

## Aperçu local

`apercu.html` injecte le contenu sans la porte, pour vérifier le rendu.
Il est ignoré par git lui aussi.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La porte : formulaire de phrase de passe |
| `styles.css` | Le style de la porte |
| `coffre.js` | Déchiffrement et minuteur d'inactivité |
| `app.js` | Comportements de la page une fois ouverte |
| `page.enc` | Le contenu chiffré — seul fichier publié |
| `contenu.html` | Le clair, **jamais publié** |
| `sceller.mjs` | Chiffre `contenu.html` vers `page.enc` |
