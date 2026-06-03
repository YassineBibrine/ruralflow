import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TripCard from '../components/TripCard';
import { mockTrips } from '../constants/mockData';
import { colors } from '../constants/colors';

export default function ResultsScreen() {
  const router = useRouter();
  const { destination } = useLocalSearchParams<{ destination: string }>();
  const [reservedTripId, setReservedTripId] = React.useState<string | null>(null);

  const handleReserve = (trip: (typeof mockTrips)[number]) => {
    setReservedTripId(trip.id);
    Alert.alert(
      'Réservation confirmée',
      `Votre place avec ${trip.driver} à ${trip.departureTime} est pré-réservée. Prix fixe : ${trip.price} DH.`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Trajets disponibles</Text>
          <Text style={styles.sub}>{destination ?? 'Destination'}</Text>
        </View>
      </View>

      <View style={styles.aiBanner}>
        <Text style={styles.aiBannerText}>🤖 L'IA a classé ces trajets selon votre profil</Text>
      </View>

      <FlatList
        data={mockTrips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TripCard trip={item} isReserved={reservedTripId === item.id} onPress={() => handleReserve(item)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: {
    backgroundColor: colors.indigo,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  back: { padding: 4 },
  title: { color: colors.white, fontSize: 18, fontWeight: '700' },
  sub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  aiBanner: { backgroundColor: colors.indigo, marginHorizontal: 16, marginTop: 16, borderRadius: 12, padding: 12, opacity: 0.85 },
  aiBannerText: { color: colors.white, fontSize: 13, fontWeight: '500' },
  list: { padding: 16 },
});
