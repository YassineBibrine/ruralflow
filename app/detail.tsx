import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { mockTrips } from '../constants/mockData';

// ─── AI Scoring ───────────────────────────────────────────────────────────────
const scoreDriver = (driver: (typeof mockTrips)[number]) => {
  const budget = driver.price <= 8 ? 95 : driver.price <= 12 ? 75 : 45;
  const proximity = Math.floor(Math.random() * 30) + 65;
  const reliability = Math.round(driver.rating * 20);
  const community = driver.isAIRecommended ? 90 : 75;
  return { budget, proximity, reliability, community };
};

// ─── Score Bar ─────────────────────────────────────────────────────────────────
function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={barStyles.row}>
      <Text style={barStyles.label}>{label}</Text>
      <View style={barStyles.track}>
        <View style={[barStyles.fill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={barStyles.pct}>{value}%</Text>
    </View>
  );
}

const barStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  label: { width: 110, fontSize: 12, color: colors.charcoal, fontWeight: '500' },
  track: { flex: 1, height: 8, backgroundColor: colors.sand, borderRadius: 4, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
  pct: { width: 36, fontSize: 12, fontWeight: '700', color: colors.charcoal, textAlign: 'right' },
});

// ─── Main Screen ───────────────────────────────────────────────────────────────
export default function DetailScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  const trip = mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];
  const scores = scoreDriver(trip);

  // Transparent price breakdown
  const distanceKm = 12;
  const carburant = Math.round(distanceKm * 0.4 * 10) / 10;
  const marge = 2;
  const total = trip.price;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail du trajet</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Driver profile */}
        <View style={styles.card}>
          <View style={styles.driverRow}>
            <View style={[styles.avatar, { backgroundColor: trip.avatarColor }]}>
              <Text style={styles.initials}>{trip.initials}</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{trip.driver}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Text style={styles.rating}>{trip.rating} · Conducteur vérifié ✓</Text>
              </View>
              {trip.isAIRecommended && (
                <View style={styles.aiBadge}>
                  <Text style={styles.aiText}>⭐ Recommandé par l'IA</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Route visualization */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trajet</Text>
          <View style={styles.routeRow}>
            <View style={styles.routeDot} />
            <View style={styles.routeLine} />
            <Ionicons name="car" size={20} color={colors.indigo} />
            <View style={styles.routeLine} />
            <View style={[styles.routeDot, { backgroundColor: colors.terracotta }]} />
          </View>
          <View style={styles.routeLabels}>
            <Text style={styles.routeCity}>Départ</Text>
            <Text style={styles.routeCity}>{trip.destination}</Text>
          </View>
          <View style={styles.timesRow}>
            <View style={styles.timeBlock}>
              <Ionicons name="time-outline" size={14} color={colors.mid} />
              <Text style={styles.timeText}>Départ {trip.departureTime}</Text>
            </View>
            <View style={styles.timeBlock}>
              <Ionicons name="flag-outline" size={14} color={colors.mid} />
              <Text style={styles.timeText}>Arrivée ~9h00</Text>
            </View>
          </View>
        </View>

        {/* Transparent price block */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Détail du prix</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Distance</Text>
            <Text style={styles.priceVal}>{distanceKm} km</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Carburant estimé</Text>
            <Text style={styles.priceVal}>{carburant} DH</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Marge fixe</Text>
            <Text style={styles.priceVal}>{marge} DH</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceTotalLabel}>Total</Text>
            <View style={[
              styles.totalBadge,
              { backgroundColor: total <= 8 ? colors.greenLight : total <= 12 ? colors.orangeLight : colors.redLight }
            ]}>
              <Text style={[
                styles.totalBadgeText,
                { color: total <= 8 ? colors.green : total <= 12 ? colors.orange : colors.red }
              ]}>
                {total} DH
              </Text>
            </View>
          </View>
          <Text style={styles.priceMention}>Prix fixe · Aucune négociation</Text>
        </View>

        {/* AI Scoring */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Score IA conducteur</Text>
          <ScoreBar label="Budget étudiant" value={scores.budget} color={colors.green} />
          <ScoreBar label="Proximité zone" value={scores.proximity} color={colors.indigo} />
          <ScoreBar label="Fiabilité" value={scores.reliability} color={colors.sage} />
          <ScoreBar label="Communauté" value={scores.community} color={colors.terracotta} />
        </View>

        {/* Action buttons */}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push({ pathname: '/confirmation', params: { tripId: trip.id } })}
        >
          <Text style={styles.btnPrimaryText}>Confirmer la réservation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="chatbubble-outline" size={16} color={colors.indigo} />
          <Text style={styles.btnOutlineText}>Contacter le conducteur</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: {
    backgroundColor: colors.indigo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: colors.white, fontSize: 17, fontWeight: '700' },
  scroll: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.mid, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 14 },
  // Driver
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.white, fontWeight: '800', fontSize: 20 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: '700', color: colors.charcoal },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  rating: { fontSize: 13, color: colors.mid },
  aiBadge: { backgroundColor: colors.terracotta, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 8 },
  aiText: { color: colors.white, fontSize: 11, fontWeight: '600' },
  // Route
  routeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  routeDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.indigo },
  routeLine: { flex: 1, height: 2, backgroundColor: colors.sand },
  routeLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  routeCity: { fontSize: 13, fontWeight: '600', color: colors.charcoal },
  timesRow: { flexDirection: 'row', gap: 20 },
  timeBlock: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeText: { fontSize: 13, color: colors.mid },
  // Price
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  priceLabel: { fontSize: 14, color: colors.mid },
  priceVal: { fontSize: 14, color: colors.charcoal, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.sand, marginVertical: 10 },
  priceTotalLabel: { fontSize: 15, fontWeight: '700', color: colors.charcoal },
  totalBadge: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5 },
  totalBadgeText: { fontSize: 14, fontWeight: '700' },
  priceMention: { fontSize: 11, color: colors.mid, marginTop: 8, textAlign: 'center' },
  // Buttons
  btnPrimary: { backgroundColor: colors.indigo, borderRadius: 14, padding: 18, alignItems: 'center', marginBottom: 12 },
  btnPrimaryText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  btnOutline: { borderWidth: 1.5, borderColor: colors.indigo, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnOutlineText: { color: colors.indigo, fontWeight: '600', fontSize: 15 },
});
