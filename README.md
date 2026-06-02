# RuralFlow 🚗
### Application de covoiturage étudiant intelligente — Maroc rural et périurbain

> Projet Design Thinking — Master IA-OC · Management de l'Innovation Technologique
> Faculté des Sciences Ibn Tofail · Promotion 2025-2026

---

## 📋 Contexte du projet

RuralFlow est une application mobile de covoiturage étudiant conçue
pour résoudre les problèmes de mobilité des étudiants dans les zones
rurales et périurbaines du Maroc. Le projet a été développé dans le
cadre de l'Activité 6 du module Management de l'Innovation
Technologique, en suivant le processus Design Thinking complet.

Le problème fondamental identifié n'est pas l'absence physique de
mobilité, mais **l'absence d'information fiable et de prévisibilité**
dans cette mobilité. Ce déficit informationnel génère de l'anxiété,
des retards et des échecs académiques.

---

## 👥 Équipe projet

| Membre | Rôle |
|--------|------|
| Hajar Ait-Ouarab | Membre 1 |
| Meryem Cherkaoui | Membre 2 |
| Yassine Bibrine | Membre 3 |
| Khalid El Aoula | Membre 4 |
| Fatima Ezzahra El Onsory | Membre 5 |
| Aymane Bari | Membre 6 |

---

## 📊 Données terrain — Phase Empathy

Questionnaire administré en mai 2026 auprès de **28 étudiants**
(100% étudiants, 17-30 ans).

### Chiffres clés

| Indicateur | Valeur |
|------------|--------|
| Répondants | 28 |
| Sans véhicule personnel | 50% |
| Ont raté un RDV (exam, médecin, entretien) à cause du transport | **61%** |
| Pratiquent déjà le covoiturage informel | **57%** |
| Ouverts à une application mobile | **79%** |
| Connexion internet limitée ou inexistante | 36% |
| Budget accepté par trajet | 5-15 DH |

### Répartition géographique

| Zone | Nb | % |
|------|-----|---|
| Petite ville | 11 | 39% |
| Grande ville | 11 | 39% |
| Périphérie | 5 | 18% |
| Douar | 1 | 4% |

### Priorités d'amélioration (Q18)

| Priorité | Répondants |
|----------|-----------|
| Fiabilité des horaires | 41% |
| Temps de trajet | 26% |
| Coût abordable | 22% |
| Sécurité | 11% |

---

## 🎭 Personas identifiés

### 👩‍🎓 Salma — L'étudiante navetteure quotidienne
- **Âge :** 20 ans · **Zone :** Petite ville
- **Transport :** Collectif/scolaire · **Connexion :** Limitée
- **Problème :** *"Je pars toujours 30 minutes à l'avance parce que
  je ne sais jamais si le bus sera là."*
- **Besoin :** Information en temps réel + prix fixe connu à l'avance
- **Fonctionnalité clé :** Alerte avant départ + voir les trajets proches

### 👨‍💻 Yassine — L'étudiant urbain multi-modal
- **Âge :** 23 ans · **Zone :** Grande ville
- **Transport :** Petit taxi + marche + collectif · **Connexion :** 4G
- **Problème :** *"Je combine taxi et marche selon les jours. C'est
  épuisant de ne jamais savoir combien ça va coûter."*
- **Besoin :** Transparence tarifaire + réservation anticipée
- **Fonctionnalité clé :** Voir le prix avant de confirmer

### 🧑‍🎒 Hamza — L'étudiant isolé en zone rurale
- **Âge :** 17 ans · **Zone :** Douar / Périphérie
- **Transport :** Bus scolaire uniquement · **Connexion :** Inexistante
- **Problème :** *"Le week-end, il n'y a aucun transport. Je suis
  bloqué chez moi."*
- **Besoin :** Transport hors horaires scolaires + mode offline/SMS
- **Fonctionnalité clé :** Interface hors connexion + prix < 5 DH

---

## 💡 Points d'innovation identifiés (Phase Define)

| # | Point d'innovation | Priorité | Impact | Faisabilité |
|---|-------------------|----------|--------|-------------|
| 1 | Visibilité en temps réel de l'offre de trajets | **Critique** | 9/10 | 7/10 |
| 2 | Tarification fixe et transparente avant confirmation | **Critique** | 9/10 | 9/10 |
| 3 | Structuration des covoiturages informels existants | Élevée | 8/10 | 8/10 |
| 4 | Système d'alertes et de réservation anticipée | Élevée | 8/10 | 7/10 |
| 5 | Mode dégradé offline et accès par SMS | Élevée | 9/10 | 4/10 |
| 6 | Requalification comme enjeu d'équité éducative | Long terme | 7/10 | 6/10 |

---

## 🏆 Top 3 idées retenues (Phase Ideate — Brainstorming)

54 idées générées par 6 membres, notées sur 3 critères
(Impact / Faisabilité / Originalité, échelle 1-5).

| # | Idée | Membre | Note |
|---|------|--------|------|
| 🥇 | Indicateur feu tricolore : vert/orange/rouge pour la disponibilité | Aymane Bari | **5.0/5** |
| 🥈 | Code couleur tarifaire : vert < 8 DH · orange 8-12 · rouge > 12 DH | Aymane Bari | **5.0/5** |
| 🥉 | Calcul automatique du prix selon distance, affiché avant mise en relation | Hajar Ait-Ouarab | **4.7/5** |

---

## 🤖 Intégration IA

RuralFlow intègre l'intelligence artificielle à 3 niveaux :

| Fonctionnalité IA | Phase | API |
|-------------------|-------|-----|
| Chatbot NLP — comprend les demandes en français, arabe, darija | Phase 1 | OpenAI GPT-4o |
| Score de recommandation conducteurs — classement selon profil étudiant | Phase 2 | Logique scoring |
| Feu tricolore prédictif — prédit la disponibilité future | Phase 3 | Règles temporelles |

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | React Native + Expo SDK 56 |
| Navigation | expo-router (file-based) |
| Style | NativeWind v4 (Tailwind) |
| Icônes | @expo/vector-icons (Ionicons) |
| Animations | react-native-reanimated |
| IA Chatbot | OpenAI API (gpt-4o) |
| Versioning | Git + GitHub |

---

## ⚙️ Installation et lancement

```bash
# 1. Cloner le repo
git clone https://github.com/<username>/ruralflow-prototype
cd ruralflow-prototype

# 2. Installer les dépendances
npm install

# 3. Configurer la clé API
cp .env.example .env
# Éditer .env et ajouter : EXPO_PUBLIC_OPENAI_API_KEY=sk-...

# 4. Lancer l'app
npx expo start

# 5. Tester sur téléphone
# Installer Expo Go sur votre téléphone et scanner le QR code
```

---

## 📁 Structure du projet

```text
ruralflow/
├── app/
│   ├── _layout.tsx          Navigation principale (tabs)
│   ├── index.tsx            Écran Accueil
│   ├── results.tsx          Résultats de trajets
│   ├── detail.tsx           Détail trajet (Phase 2)
│   └── confirmation.tsx     Confirmation réservation (Phase 2)
├── components/
│   ├── TrafficLight.tsx     Feu tricolore animé
│   ├── TripCard.tsx         Carte trajet + badge prix
│   ├── PriceBadge.tsx       Badge couleur tarifaire
│   └── ChatbotSheet.tsx     Chatbot IA (OpenAI)
├── constants/
│   ├── colors.ts            Design tokens
│   └── mockData.ts          Données mock trajets
└── docs/
    ├── PHASE_1.md           Documentation Phase 1
    ├── PHASE_2.md           Documentation Phase 2
    └── PHASE_3.md           Documentation Phase 3
```

---

## 📅 Calendrier projet

| Étape | Activité | Deadline |
|-------|----------|----------|
| Empathy | Questionnaire + analyse + personas | 11/05 |
| Define | Points d'innovation + POV + HMW | 15/05 |
| Ideate | Brainstorming individuel + collectif | 22/05 |
| **Prototype** | **Phase 1 + 2 + 3** | **05/06** |
| Test | Test auprès des personas cibles | 05/06 |
| Rapport | Remise des rapports de projet | 10/06 |
| Soutenance | Présentation des projets | 12/06 |

---

*RuralFlow — Projet Design Thinking · Mai-Juin 2026*
