# Phase 3 — Feu prédictif IA + Finitions + Handoff
### RuralFlow · Prototype Design Thinking

**Deadline :** Jours 4-5 (4-5 juin 2026)
**Dépendance :** Phase 2 terminée et mergée sur main
**Livrable :** Démo GitHub Pages + screenshots HD
pour coéquipiers rapport et soutenance

---

## 🎯 Objectif de la phase

Upgrader le feu tricolore statique en indicateur **prédictif
intelligent** basé sur l'heure, le jour et le calendrier
académique simulé. Finaliser l'UI, tester sur téléphone réel,
et préparer tous les assets pour les coéquipiers chargés du
rapport et de la soutenance.

---

## 🧠 Questions HMW adressées

| Question HMW | Cluster | Priorité |
|-------------|---------|----------|
| Comment concevoir un système d'alerte automatique notifiant l'étudiant dès qu'un covoiturage est disponible ? | A2 — Fiabilité | **Haute** |
| Comment rendre l'application fonctionnelle hors connexion ? | C7 — Accessibilité | **Haute** |
| Comment structurer les covoiturages informels sans changer les dynamiques sociales ? | C9 — Accessibilité | Modérée |

---

## 🤖 Fonctionnalité IA — Feu tricolore prédictif

### Principe

Le feu tricolore n'affiche plus seulement l'état actuel —
il **prédit** la disponibilité des trajets en fonction de
règles temporelles et du calendrier académique simulé.

### Logique prédictive

```javascript
const predictAvailability = () => {
  const now   = new Date()
  const hour  = now.getHours()
  const day   = now.getDay()     // 0=dim, 1=lun ... 6=sam
  const month = now.getMonth()   // 0=jan ... 11=dec

  // Calendrier académique simulé (examens mai-juin)
  const isExamPeriod = month >= 4 && month <= 5

  // Règles prédictives
  if (day === 0) return 'red'                 // Dimanche : aucun trajet
  if (day === 6) return 'orange'              // Samedi : limité
  if (hour < 6 || hour > 21) return 'red'     // Hors horaires
  if (hour >= 7 && hour <= 9) return 'green'  // Rush matin
  if (hour >= 16 && hour <= 18) return 'green' // Rush soir
  if (isExamPeriod && hour >= 7 && hour <= 10) return 'green'
  return 'orange'                             // Disponibilité partielle
}
```

### Labels prédictifs enrichis

| État | Ancien label | Nouveau label prédictif |
|------|-------------|------------------------|
| 🟢 Vert | "Trajet disponible maintenant" | "3 trajets disponibles · Forte demande" |
| 🟠 Orange | "Départ dans 30 min" | "Disponibilité faible · Réservez à l'avance" |
| 🔴 Rouge | "Aucun trajet disponible" | "Aucun trajet · Prochain: demain 7h30" |

---

## 🎨 Finitions UI

### Mode dégradé réseau lent

Inspiré de l'idée d'Aymane Bari (4.7/5 — HMW C8) :

> *"Si l'app détecte un réseau lent, elle bascule
> automatiquement vers une version simplifiée en
> noir et blanc, sans images, ultra-rapide."*

Implémentation :
```javascript
import NetInfo from '@react-native-community/netinfo'

NetInfo.fetch().then(state => {
  if (state.type === 'cellular' && state.details?.cellularGeneration === '2g') {
    setLowBandwidth(true)  // active le thème simplifié
  }
})
```

En mode dégradé :
- Fond blanc pur, texte noir, 0 ombre, 0 gradient
- Images remplacées par initiales et icônes
- Animations désactivées
- Poids total de l'écran : < 50 Ko

### Autres finitions

- SafeAreaView sur tous les écrans (iPhone notch)
- KeyboardAvoidingView sur les écrans avec input
- ScrollView sur les écrans longs
- Pull-to-refresh sur l'écran Résultats
- Loading skeleton sur les TripCards (shimmer effect)
- Haptic feedback sur les boutons principaux

---

## 📸 Assets à livrer aux coéquipiers

### Screenshots HD à capturer (depuis Expo Go)

| Fichier | Écran | Format |
|---------|-------|--------|
| `screen_01_home_green.png` | Accueil — feu vert | PNG 1080×2340 |
| `screen_02_home_chatbot.png` | Accueil — chatbot ouvert | PNG 1080×2340 |
| `screen_03_chatbot_result.png` | Chatbot — extraction IA | PNG 1080×2340 |
| `screen_04_results.png` | Résultats + badges prix | PNG 1080×2340 |
| `screen_05_detail_score.png` | Détail + score IA | PNG 1080×2340 |
| `screen_06_confirmation.png` | Confirmation + SMS | PNG 1080×2340 |

### Lien démo GitHub Pages

```bash
# Exporter le web build
npx expo export --platform web

# Déployer sur GitHub Pages
npx gh-pages -d dist

# URL résultante :
# https://<username>.github.io/ruralflow-prototype
```

Ce lien sera inclus dans le rapport et montré en direct
à la soutenance.

---

## 📋 Plan de test utilisateur rapide

Tester sur 2-3 personnes correspondant aux personas :

### Test Salma (navetteure)
- [ ] L'indicateur feu tricolore est compréhensible en < 3 sec ?
- [ ] La fonctionnalité "Voir les trajets" est trouvée sans aide ?
- [ ] Le prix est visible avant de cliquer "Réserver" ?

### Test Yassine (urbain)
- [ ] L'ordre des résultats IA semble pertinent ?
- [ ] Le détail du prix inspire confiance ?
- [ ] La réservation se fait en < 60 secondes ?

### Test Hamza (rural, offline)
- [ ] L'app charge sur réseau 2G/3G lent ?
- [ ] Le mode dégradé s'active automatiquement ?
- [ ] La notice SMS sur la confirmation est rassurante ?

---

## ✅ Critères de validation Phase 3

- [ ] Feu tricolore change d'état selon l'heure réelle
- [ ] Labels prédictifs enrichis s'affichent correctement
- [ ] Mode dégradé s'active sur réseau lent
- [ ] App testée sur téléphone Android réel via Expo Go
- [ ] 6 screenshots HD capturés
- [ ] Build web déployé sur GitHub Pages
- [ ] Lien démo fonctionnel partagé aux coéquipiers
- [ ] Commit final pushé : chore: Phase 3 — finitions

---

## 📦 Livrable Phase 3

```text
GitHub repo  : ruralflow-prototype
Branch       : main
Commit       : chore: Phase 3 — feu prédictif + finitions

Fichiers modifiés :
  components/TrafficLight.tsx   (logique prédictive)
  app/index.tsx                 (mode dégradé)

Livrés aux coéquipiers :
  screenshots/                  (6 PNG HD)
  https://<user>.github.io/ruralflow-prototype
```

---

## 🤝 Handoff vers les coéquipiers rapport

| Livrable | Destinataire | Format |
|---------|-------------|--------|
| 6 screenshots | Rapport + slides | PNG HD |
| Lien démo GitHub Pages | Slides soutenance | URL |
| README.md | Rapport section technique | Markdown |
| Ce fichier PHASE_3.md | Rapport section prototype | Markdown |

---

*← Précédent : [PHASE_2.md](./PHASE_2.md)*
*← Retour : [README.md](../README.md)*
