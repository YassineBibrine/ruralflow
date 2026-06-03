import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { mockTrips } from '../constants/mockData';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const trip = mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];

  // Checkmark animation
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  // Countdown — parse departureTime e.g. "8h15" → minutes from now
  const parseMinutes = (t: string) => {
    const [h, m] = t.replace('h', ':').split(':').map(Number);
    const now = new Date();
    const dep = new Date();
    dep.setHours(h, m || 0, 0, 0);
    const diff = Math.max(0, Math.floor((dep.getTime() - now.getTime()) / 1000));
    return diff;
  };

  const [seconds, setSeconds] = useState(parseMinutes(trip.departureTime));
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Checkmark animé */}
        <Animated.View style={[styles.checkCircle, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </Animated.View>

        <Text style={styles.title}>Réservation confirmée !</Text>
        <Text style={styles.sub}>Votre place est réservée. Bonne route 🚗</Text>

        {/* Recap card */}
        <View style={styles.card}>
          <View style={styles.recapRow}>
            <View style={[styles.avatar, { backgroundColor: trip.avatarColor }]}>
              <Text style={styles.initials}>{trip.initials}</Text>
            </View>
            <View style={styles.recapInfo}>
              <Text style={styles.recapDriver}>{trip.driver}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color="#FFC107" />
                <Text style={styles.rating}>{trip.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={colors.mid} />
            <Text style={styles.detailLabel}>Départ</Text>
            <Text style={styles.detailVal}>{trip.departureTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={colors.mid} />
            <Text style={styles.detailLabel}>Rendez-vous</Text>
            <Text style={styles.detailVal}>Place de la gare</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={16} color={colors.mid} />
            <Text style={styles.detailLabel}>Prix payé</Text>
            <View style={[
              styles.priceBadge,
              { backgroundColor: trip.price <= 8 ? colors.greenLight : colors.orangeLight }
            ]}>
              <Text style={[
                styles.priceText,
                { color: trip.price <= 8 ? colors.green : colors.orange }
              ]}>
                {trip.price} DH
              </Text>
            </View>
          </View>
        </View>

        {/* Countdown */}
        <View style={styles.countdownCard}>
          <Ionicons name="timer-outline" size={20} color={colors.indigo} />
          <Text style={styles.countdownLabel}>Départ dans</Text>
          <Text style={styles.countdownTime}>{mm}:{ss}</Text>
        </View>

        {/* SMS fallback notice */}
        <View style={styles.smsCard}>
          <Text style={styles.smsIcon}>📱</Text>
          <View style={styles.smsText}>
            <Text style={styles.smsTitle}>Confirmation envoyée par SMS</Text>
            <Text style={styles.smsSub}>au +212 6XX XXX XXX</Text>
            <Text style={styles.smsSub}>Vous pouvez fermer l'application.</Text>
          </View>
        </View>

        {/* Back home button */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="home-outline" size={18} color={colors.white} />
          <Text style={styles.homeBtnText}>Retour à l'accueil</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scroll: { padding: 24, paddingBottom: 48, alignItems: 'center' },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
    shadowColor: colors.green,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.charcoal, textAlign: 'center', marginBottom: 6 },
  sub: { fontSize: 14, color: colors.mid, textAlign: 'center', marginBottom: 28 },
  // Recap card
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  recapRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.white, fontWeight: '700', fontSize: 18 },
  recapInfo: { flex: 1 },
  recapDriver: { fontSize: 17, fontWeight: '700', color: colors.charcoal },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  rating: { fontSize: 13, color: colors.mid },
  divider: { height: 1, backgroundColor: colors.sand, marginBottom: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  detailLabel: { flex: 1, fontSize: 14, color: colors.mid },
  detailVal: { fontSize: 14, fontWeight: '600', color: colors.charcoal },
  priceBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  priceText: { fontSize: 13, fontWeight: '700' },
  // Countdown
  countdownCard: {
    width: '100%',
    backgroundColor: colors.indigoDark,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  countdownLabel: { flex: 1, color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '500' },
  countdownTime: { color: colors.white, fontSize: 24, fontWeight: '800', fontVariant: ['tabular-nums'] },
  // SMS
  smsCard: {
    width: '100%',
    backgroundColor: colors.sand,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 28,
  },
  smsIcon: { fontSize: 22 },
  smsText: { flex: 1 },
  smsTitle: { fontSize: 14, fontWeight: '700', color: colors.charcoal, marginBottom: 3 },
  smsSub: { fontSize: 13, color: colors.mid },
  // Home button
  homeBtn: {
    width: '100%',
    backgroundColor: colors.indigo,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  homeBtnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
