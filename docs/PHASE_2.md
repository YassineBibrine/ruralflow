# Phase 2 — Flux complet + Recommandation IA
### RuralFlow · Prototype Design Thinking

**Deadline :** Jours 2-3 (2-3 juin 2026)
**Dépendance :** Phase 1 terminée et mergée sur main
**Livrable :** App complète navigable de bout en bout +
scoring IA visible à l'écran

---

## 🎯 Objectif de la phase

Compléter le flux de réservation de bout en bout (Accueil →
Résultats → Détail → Confirmation) et intégrer le scoring IA
des conducteurs basé sur le profil de l'étudiant.

---

## 🧠 Questions HMW adressées

| Question HMW | Cluster | Priorité |
|-------------|---------|----------|
| Comment permettre aux étudiants de réserver leur place la veille ? | A3 — Fiabilité | Modérée |
| Comment garantir que le coût reste entre 5 et 15 DH ? | B5 — Tarification | **Haute** |
| Comment concevoir un paiement sans mobile payment ? | B6 — Tarification | Modérée |
| Comment structurer les covoiturages informels existants ? | C9 — Accessibilité | Modérée |

---

## 📱 Écrans construits

### Écran 3 — Détail du trajet (app/detail.tsx)

**Composants :**
- Header avec bouton retour
- Profil conducteur : avatar, nom, note ★, badge
  "Conducteur vérifié ✓"
- Visualisation du trajet : point départ → destination
  avec ligne et icône voiture
- Heure départ + heure arrivée estimée
- **Bloc prix transparent** :
  ```text
  Distance    : XX km
  Carburant   : XX DH
  Marge fixe  : 2 DH
  ────────────────
  Total       : XX DH (badge couleur)
  Prix fixe · Aucune négociation
  ```
- **Score IA conducteur** :
  Barre de progression colorée avec étiquettes :
  Budget étudiant ██████████ 94%
  Proximité zone  ███████░░░ 72%
  Fiabilité       █████████░ 89%
  Communauté      ████████░░ 81%
- 2 boutons : "Confirmer la réservation" (plein, indigo)
  et "Contacter le conducteur" (outline)

**Idée source :**
> *"Moteur de tarification transparent : l'algorithme calcule
> le prix en fonction des km, du carburant moyen et d'une
> marge fixe de 2 DH, affiché ligne par ligne."*
> — Khalid El Aoula · Note : **4.3/5** (HMW B4)

---

### Écran 4 — Confirmation de réservation (app/confirmation.tsx)

**Composants :**
- Icône checkmark vert animé (scale 0 → 1 à l'entrée)
- Titre "Réservation confirmée !"
- Carte récapitulative :
  - Nom conducteur + note ★
  - Heure de départ
  - Point de rendez-vous
  - Prix payé (badge couleur)
- **Countdown départ** : "Départ dans 23:45" décrémentant
- **Notice SMS fallback** (pour Hamza) :
  ```text
  📱 Confirmation envoyée par SMS au +212 6XX XXX XXX
  Vous pouvez fermer l'application.
  ```
- Bouton "Retour à l'accueil"

**Idée source :**
> *"Alerte SMS automatique (sans internet) envoyée 45 min
> avant le départ."*
> — Meryem Cherkaoui · Note : **4.3/5** (HMW A2)

---

## 🤖 Fonctionnalité IA — Scoring conducteurs

### Principe

Plutôt que d'afficher une liste brute, l'IA classe et évalue
chaque conducteur selon 4 dimensions liées au profil
de l'étudiant.

### Dimensions du score

| Dimension | Description | Source données |
|-----------|-------------|----------------|
| Budget étudiant | Adéquation prix/budget déclaré | Q16 questionnaire |
| Proximité zone | Distance entre conducteur et étudiant | Q3 questionnaire |
| Fiabilité | Historique ponctualité conducteur | Données mock |
| Communauté | Niveau de confiance réseau social | Q12 questionnaire |

### Algorithme de scoring (simulé Phase 2)

```javascript
const scoreDriver = (driver, studentProfile) => ({
  budget:      driver.price <= 8 ? 95 : driver.price <= 12 ? 75 : 45,
  proximity:   Math.floor(Math.random() * 30) + 65,
  reliability: driver.rating * 20,
  community:   driver.isAIRecommended ? 90 : 75,
})

const globalScore = (scores) =>
  Math.round(
    scores.budget * 0.35 +
    scores.proximity * 0.25 +
    scores.reliability * 0.25 +
    scores.community * 0.15
  )
```

Le conducteur avec le score global le plus élevé reçoit
le badge **"⭐ Recommandé par l'IA"** sur l'écran Résultats.

---

## 🔄 Navigation complète Phase 2

```text
Accueil (index.tsx)
    │
    ├── Chip destination / Barre recherche / Chatbot IA
    │
    ▼
Résultats (results.tsx)
    │
    ├── Bouton "Réserver" sur un TripCard
    │
    ▼
Détail trajet (detail.tsx)
    │
    ├── Bouton "Confirmer la réservation"
    │
    ▼
Confirmation (confirmation.tsx)
    │
    └── Bouton "Retour à l'accueil" → index.tsx
```

---

## 📲 Nouveaux fichiers créés

```text
app/detail.tsx           Écran détail trajet + scoring IA
app/confirmation.tsx     Écran confirmation + SMS fallback
```

---

## ✅ Critères de validation Phase 2

- [✅ ] Navigation complète Accueil → Résultats → Détail →
      Confirmation → Accueil fonctionne sans erreur
- [✅ ] Bloc prix transparent affiche le détail ligne par ligne
- [ ✅] Score IA conducteur affiché avec barres de progression
- [ ✅] Animation checkmark à l'entrée sur l'écran Confirmation
- [✅ ] Countdown départ décrémente en temps réel
- [✅ ] Notice SMS visible sur l'écran Confirmation
- [✅ ] Bouton "Retour à l'accueil" ramène bien à index.tsx
- [✅ ] Commit pushé sur GitHub : feat: Phase 2

---

## 📦 Livrable Phase 2

```text
GitHub repo : ruralflow-prototype
Branch      : main
Commit      : feat: Phase 2 — flux complet + scoring IA

Nouveaux fichiers :
  app/detail.tsx
  app/confirmation.tsx
```

---

*← Précédent : [PHASE_1.md](./PHASE_1.md)*
*→ Suite : [PHASE_3.md](./PHASE_3.md)*
