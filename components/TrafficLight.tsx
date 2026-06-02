import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const STATES = [
  { key: 'green', color: '#4CAF50', label: 'Trajet disponible maintenant' },
  { key: 'orange', color: '#FF9800', label: 'Départ dans 30 min' },
  { key: 'red', color: '#F44336', label: 'Aucun trajet disponible' },
];

export default function TrafficLight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [activeIndex, pulseAnim]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Disponibilité en temps réel</Text>
      <View style={styles.light}>
        {STATES.map((s, i) => (
          <Animated.View
            key={s.key}
            style={[
              styles.circle,
              { backgroundColor: s.color, opacity: activeIndex === i ? 1 : 0.2 },
              activeIndex === i && { transform: [{ scale: pulseAnim }] },
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>{STATES[activeIndex].label}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setActiveIndex((i) => (i + 1) % 3)}>
        <Text style={styles.btnText}>Simuler →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.indigoDark, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20 },
  title: { color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 },
  light: { gap: 12, alignItems: 'center', marginBottom: 16 },
  circle: { width: 52, height: 52, borderRadius: 26 },
  label: { color: colors.white, fontSize: 15, fontWeight: '600', textAlign: 'center', marginBottom: 16 },
  btn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8 },
  btnText: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
});
