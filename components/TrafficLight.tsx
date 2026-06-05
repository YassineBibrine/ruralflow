import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

// ─── Logique prédictive Phase 3 ──────────────────────────────────────────────

type TrafficState = 'green' | 'orange' | 'red';

interface PredictionResult {
  state: TrafficState;
  label: string;
  tripCount?: number;
}

const predictAvailability = (): PredictionResult => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();     // 0=dim, 1=lun ... 6=sam
  const month = now.getMonth(); // 0=jan ... 11=dec

  // Calendrier académique simulé (examens mai-juin)
  const isExamPeriod = month >= 4 && month <= 5;

  // Règles prédictives
  if (day === 0) {
    return { state: 'red', label: 'Aucun trajet · Prochain: demain 7h30' };
  }
  if (day === 6) {
    return { state: 'orange', label: 'Disponibilité faible · Réservez à l\'avance' };
  }
  if (hour < 6 || hour > 21) {
    return { state: 'red', label: 'Aucun trajet · Prochain: demain 7h30' };
  }
  if (hour >= 7 && hour <= 9) {
    const count = isExamPeriod ? 6 : 3;
    return { state: 'green', label: `${count} trajets disponibles · Forte demande`, tripCount: count };
  }
  if (hour >= 16 && hour <= 18) {
    return { state: 'green', label: '4 trajets disponibles · Forte demande', tripCount: 4 };
  }
  if (isExamPeriod && hour >= 7 && hour <= 10) {
    return { state: 'green', label: '5 trajets disponibles · Période d\'examens', tripCount: 5 };
  }
  return { state: 'orange', label: 'Disponibilité faible · Réservez à l\'avance' };
};

// ─── Config des états ─────────────────────────────────────────────────────────

const STATE_CONFIG: Record<TrafficState, { color: string; index: number }> = {
  green:  { color: '#4CAF50', index: 0 },
  orange: { color: '#FF9800', index: 1 },
  red:    { color: '#F44336', index: 2 },
};

const LIGHTS: TrafficState[] = ['green', 'orange', 'red'];

// ─── Composant ────────────────────────────────────────────────────────────────

export default function TrafficLight() {
  const [prediction, setPrediction] = useState<PredictionResult>(predictAvailability);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseRef = useRef<Animated.CompositeAnimation | null>(null);

  // Mise à jour toutes les minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrediction(predictAvailability());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Animation pulse sur l'état actif
  useEffect(() => {
    pulseRef.current?.stop();
    pulseAnim.setValue(1);
    pulseRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.18, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    );
    pulseRef.current.start();
    return () => pulseRef.current?.stop();
  }, [prediction.state, pulseAnim]);

  const activeIndex = STATE_CONFIG[prediction.state].index;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Disponibilité prédictive</Text>

      <View style={styles.light}>
        {LIGHTS.map((key, i) => {
          const cfg = STATE_CONFIG[key];
          const isActive = i === activeIndex;
          return (
            <Animated.View
              key={key}
              style={[
                styles.circle,
                { backgroundColor: cfg.color, opacity: isActive ? 1 : 0.15 },
                isActive && { transform: [{ scale: pulseAnim }] },
              ]}
            />
          );
        })}
      </View>

      <Text style={styles.label}>{prediction.label}</Text>

      <View style={styles.meta}>
        <Text style={styles.metaText}>
          {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} · Mise à jour auto
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.indigoDark,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  light: { gap: 12, alignItems: 'center', marginBottom: 16 },
  circle: { width: 52, height: 52, borderRadius: 26 },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  meta: { opacity: 0.45 },
  metaText: { color: colors.white, fontSize: 11 },
});
