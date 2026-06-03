# Phase 1 — Chatbot IA + Écrans de base
### RuralFlow · Prototype Design Thinking

**Deadline :** Jours 1-2 (1-2 juin 2026)
**Plateforme :** OpenAI Codex CLI
**Livrable :** App Expo fonctionnelle sur GitHub +
chatbot IA démontrable

**Statut vérifié :** Phase 1 complète localement
**Date de vérification :** 3 juin 2026

---

## 🎯 Objectif de la phase

Construire les deux premiers écrans de l'application avec la
fonctionnalité IA centrale : un chatbot en langage naturel qui
permet à l'étudiant de décrire son trajet librement, sans formulaire.

Cette phase répond directement aux deux idées les mieux notées du
brainstorming (5.0/5) et couvre les clusters HMW A1 et B4.

---

## 🧠 Questions HMW adressées

| Question HMW | Cluster | Priorité |
|-------------|---------|----------|
| Comment vérifier en temps réel la disponibilité d'un trajet avant de quitter son domicile ? | A1 — Fiabilité | **Haute** |
| Comment afficher un prix fixe non négociable avant confirmation ? | B4 — Tarification | **Haute** |
| Comment concevoir une interface utilisable en moins de 60 secondes ? | C8 — Accessibilité | Modérée |

---

## 📱 Écrans construits

### Écran 1 — Accueil (app/index.tsx)

**Composants :**
- Header indigo : nom app + sous-titre
- **TrafficLight** : indicateur feu tricolore animé
  (vert / orange / rouge avec pulsation CSS)
- Barre de recherche manuelle
- Chips de destinations rapides (Université, Hôpital,
  Centre-ville, Gare, Marché)
- Bouton CTA principal
- **Bouton flottant chatbot IA** (terracotta, coin bas-droit)

**Persona principal :** Salma (navetteure quotidienne)

**Idée source :**
> *"Indicateur visuel type feu tricolore : vert = trajet disponible
> maintenant, orange = départ dans 30 min, rouge = aucun trajet"*
> — Aymane Bari · Note : **5.0/5** (HMW A1)

---

### Écran 2 — Résultats de trajets (app/results.tsx)

**Composants :**
- Header avec destination extraite
- Bannière IA : *"L'IA a classé ces trajets selon votre profil"*
- FlatList de TripCard avec :
  - Avatar conducteur (initiales colorées)
  - Note ★ et nom conducteur
  - Heure de départ + minutage (rouge si < 15 min)
  - Places restantes
  - **PriceBadge** (vert / orange / rouge selon tarif)
  - Badge *"Recommandé par l'IA"* sur le premier résultat
  - Bouton Réserver

**Logique PriceBadge :**
```text
prix ≤ 8 DH  →  🟢 vert   "Économique ✓"
prix 9-12 DH →  🟠 orange "Moyen"
prix ≥ 13 DH →  🔴 rouge  "Élevé ↑"
```

**Idée source :**
> *"Code couleur tarifaire : vert (moins de 8 DH), orange (8-12 DH),
> rouge (plus de 12 DH) — affiché avant toute confirmation"*
> — Aymane Bari · Note : **5.0/5** (HMW B4)

---

## 🤖 Fonctionnalité IA — Chatbot NLP

### Principe

L'étudiant décrit son trajet librement en français, arabe ou
darija. L'IA (GPT-4o) extrait les paramètres structurés et
redirige automatiquement vers les résultats correspondants.

### Exemples d'entrées supportées

| Langue | Exemple d'entrée | Extraction attendue |
|--------|-----------------|---------------------|
| Français | "je veux aller à Rabat demain matin" | destination: Rabat · date: demain · heure: matin |
| Arabe | "غدا الصباح كازا" | destination: Casablanca · date: demain · heure: matin |
| Darija | "dman sbah l kénitra" | destination: Kénitra · date: demain · heure: matin |

### Appel API OpenAI

```javascript
POST https://api.openai.com/v1/chat/completions
Model : gpt-4o
Max tokens : 150

System prompt :
"Tu es l'IA de RuralFlow. Analyse la demande et retourne
UNIQUEMENT un JSON : {destination, date, heure}.
Si une info manque mets null. Aucun texte autour du JSON."

User message : <input de l'étudiant>
```

### États de l'interface chatbot

| État | UI affichée |
|------|------------|
| Idle | Input + bouton "Analyser avec l'IA →" |
| Loading | ActivityIndicator + "L'IA analyse votre demande..." |
| Succès | Chips colorés (📍 destination · 📅 date · 🕗 heure) + "Voir les trajets →" |
| Erreur réseau | "Connexion requise pour l'IA" + retour possible à la recherche manuelle sur l'accueil |

### Fallback offline (persona Hamza)

Si l'appel API échoue, l'interface affiche l'erreur réseau et
l'utilisateur peut fermer le chatbot pour revenir à la recherche
manuelle de l'écran d'accueil. L'app reste utilisable sans connexion
pour les écrans statiques.

---

## 🎨 Design tokens utilisés

| Token | Valeur | Usage |
|-------|--------|-------|
| `indigo` | #2C3E6B | Header, boutons principaux, avatar |
| `terracotta` | #C8553D | Bouton chatbot, badge IA, CTA secondaire |
| `sand` | #F2E8D9 | Background écrans, chips |
| `sage` | #7A9E7E | Chip date (chatbot), succès |
| `greenLight` | #E8F5E9 | Badge prix économique |
| `orangeLight` | #FFF3E0 | Badge prix moyen |
| `redLight` | #FFEBEE | Badge prix élevé |

---

## ✅ Critères de validation Phase 1

- [x] Dépendances Expo SDK 54 alignées (`npx expo install --check`)
- [x] TypeScript passe sans erreur (`npx tsc --noEmit`)
- [x] Bundle Android Metro généré avec succès (`npx expo export --platform android`)
- [x] Feu tricolore s'anime et change d'état au clic
- [x] Chips destinations naviguent vers l'écran Résultats
- [x] Chatbot s'ouvre en bottom sheet animé
- [x] Appel OpenAI implémenté avec parsing JSON (`destination`, `date`, `heure`)
- [x] Chips colorés s'affichent après extraction IA
- [x] Redirection vers Résultats avec la destination extraite
- [x] Badge prix change de couleur selon le tarif
- [x] Badge "Recommandé par l'IA" visible sur le 1er trajet
- [ ] Publication GitHub des dernières corrections SDK 54 à effectuer

**Note de vérification :** le flux OpenAI a été vérifié par inspection
du code et par compilation Metro. Aucun appel réel à l'API OpenAI n'a
été lancé pendant cette vérification.

---

## 📦 Livrable Phase 1

```text
GitHub repo : https://github.com/YassineBibrine/ruralflow
Branch      : master
Dernier commit local vérifié : ca59958 added md files
Statut      : Phase 1 complète localement, corrections SDK 54 non encore publiées

Fichiers créés :
  app/index.tsx
  app/results.tsx
  app/_layout.tsx
  components/TrafficLight.tsx
  components/TripCard.tsx
  components/PriceBadge.tsx
  components/ChatbotSheet.tsx
  constants/colors.ts
  constants/mockData.ts
```

---

*→ Suite : [PHASE_2.md](./PHASE_2.md)*
