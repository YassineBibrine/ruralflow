import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PriceBadge from './PriceBadge';
import { colors } from '../constants/colors';

type Trip = {
  id: string;
  driver: string;
  initials: string;
  avatarColor: string;
  rating: number;
  departureTime: string;
  minutesUntil: number;
  seats: number;
  price: number;
  isAIRecommended: boolean;
};

type Props = { trip: Trip; isReserved?: boolean; onPress: () => void };

export default function TripCard({ trip, isReserved = false, onPress }: Props) {
  return (
    <View style={styles.card}>
      {trip.isAIRecommended && (
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>⭐ Recommandé par l'IA</Text>
        </View>
      )}

      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: trip.avatarColor }]}>
          <Text style={styles.initials}>{trip.initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.driver}>{trip.driver}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FFC107" />
            <Text style={styles.rating}>{trip.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={14} color={colors.mid} />
        <Text style={styles.detail}>{trip.departureTime}</Text>
        <Text style={[styles.minutes, { color: trip.minutesUntil < 15 ? colors.terracotta : colors.mid }]}>
          dans {trip.minutesUntil} min
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="people-outline" size={14} color={colors.mid} />
        <Text style={styles.detail}>{trip.seats} places restantes</Text>
      </View>

      <View style={styles.footer}>
        <PriceBadge price={trip.price} />
        <TouchableOpacity style={[styles.btn, isReserved && styles.btnReserved]} onPress={onPress}>
          <Text style={[styles.btnText, isReserved && styles.btnReservedText]}>
            {isReserved ? 'Réservé' : 'Réserver'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  aiBadge: {
    backgroundColor: colors.terracotta,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  aiText: { color: colors.white, fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  initials: { color: colors.white, fontWeight: '700', fontSize: 16 },
  info: { flex: 1 },
  driver: { fontWeight: '700', fontSize: 16, color: colors.charcoal },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  rating: { fontSize: 13, color: colors.mid },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  detail: { fontSize: 13, color: colors.charcoal },
  minutes: { fontSize: 13, fontWeight: '500', marginLeft: 4 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  btn: { borderWidth: 1.5, borderColor: colors.indigo, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 8 },
  btnText: { color: colors.indigo, fontWeight: '600', fontSize: 13 },
  btnReserved: { backgroundColor: colors.sage, borderColor: colors.sage },
  btnReservedText: { color: colors.white },
});
