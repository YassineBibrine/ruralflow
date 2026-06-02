import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TrafficLight from '../components/TrafficLight';
import ChatbotSheet from '../components/ChatbotSheet';
import { colors } from '../constants/colors';

const QUICK_DESTINATIONS = ['Université', 'Hôpital', 'Centre-ville', 'Gare', 'Marché'];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const goToResults = (dest?: string) =>
    router.push({ pathname: '/results', params: { destination: dest ?? search ?? 'Destination' } });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigo} />

      <View style={styles.header}>
        <Text style={styles.appName}>RuralFlow</Text>
        <Text style={styles.appSub}>Mobilité étudiante intelligente</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TrafficLight />

        <View style={styles.searchRow}>
          <Ionicons name="location-outline" size={20} color={colors.mid} />
          <TextInput
            style={styles.searchInput}
            placeholder="Où allez-vous ?"
            placeholderTextColor={colors.mid}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => goToResults()}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {QUICK_DESTINATIONS.map((d) => (
            <TouchableOpacity key={d} style={styles.chip} onPress={() => goToResults(d)}>
              <Text style={styles.chipText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.cta} onPress={() => goToResults()}>
          <Text style={styles.ctaText}>Voir les trajets disponibles →</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setChatOpen(true)}>
        <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.white} />
      </TouchableOpacity>

      <ChatbotSheet
        visible={chatOpen}
        onClose={() => setChatOpen(false)}
        onResult={(data) => goToResults(data.destination ?? 'Destination')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.indigo },
  header: { backgroundColor: colors.indigo, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  appName: { color: colors.white, fontSize: 28, fontWeight: '800' },
  appSub: { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 },
  scroll: { backgroundColor: colors.cream, padding: 20, paddingBottom: 100 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.charcoal },
  chips: { marginBottom: 20 },
  chip: { backgroundColor: colors.sand, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 10 },
  chipText: { color: colors.indigo, fontWeight: '600', fontSize: 13 },
  cta: { backgroundColor: colors.indigo, borderRadius: 14, padding: 18, alignItems: 'center' },
  ctaText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: colors.terracotta,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.terracotta,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});
