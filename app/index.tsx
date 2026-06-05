import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TrafficLight from '../components/TrafficLight';
import ChatbotSheet from '../components/ChatbotSheet';
import { colors } from '../constants/colors';

// ─── Détection réseau lent (mode dégradé Phase 3) ────────────────────────────
// NetInfo est optionnel — import dynamique pour ne pas bloquer le build
let NetInfo: any = null;
try { NetInfo = require('@react-native-community/netinfo').default; } catch (_) {}

const QUICK_DESTINATIONS = ['Université', 'Hôpital', 'Centre-ville', 'Gare', 'Marché'];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);

  // Mode dégradé réseau lent
  useEffect(() => {
    if (!NetInfo) return;
    NetInfo.fetch().then((state: any) => {
      if (state.type === 'cellular' && state.details?.cellularGeneration === '2g') {
        setLowBandwidth(true);
      }
    });
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setLowBandwidth(
        state.type === 'cellular' && state.details?.cellularGeneration === '2g'
      );
    });
    return () => unsubscribe();
  }, []);

  const goToResults = (dest?: string) =>
    router.push({ pathname: '/results', params: { destination: dest ?? search ?? 'Destination' } });

  // ── Mode dégradé : UI ultra-légère noir/blanc ─────────────────────────────
  if (lowBandwidth) {
    return (
      <SafeAreaView style={degraded.safe}>
        <Text style={degraded.title}>RuralFlow</Text>
        <Text style={degraded.sub}>Mode réseau lent · Confirmation SMS activée</Text>
        <View style={degraded.inputRow}>
          <TextInput
            style={degraded.input}
            placeholder="Destination"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={() => goToResults()}
          />
          <TouchableOpacity style={degraded.btn} onPress={() => goToResults()}>
            <Text style={degraded.btnText}>→</Text>
          </TouchableOpacity>
        </View>
        {QUICK_DESTINATIONS.map((d) => (
          <TouchableOpacity key={d} style={degraded.link} onPress={() => goToResults(d)}>
            <Text style={degraded.linkText}>{d}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  }

  // ── Mode normal ───────────────────────────────────────────────────────────
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
  safe: { flex: 1, backgroundColor: colors.indigo, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { backgroundColor: colors.indigo, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  appName: { color: colors.white, fontSize: 28, fontWeight: '800' },
  appSub: { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 },
  scroll: { backgroundColor: colors.cream, padding: 20, paddingBottom: 100 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10,
    marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.charcoal },
  chips: { marginBottom: 20 },
  chip: { backgroundColor: colors.sand, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 10 },
  chipText: { color: colors.indigo, fontWeight: '600', fontSize: 13 },
  cta: { backgroundColor: colors.indigo, borderRadius: 14, padding: 18, alignItems: 'center' },
  ctaText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  fab: {
    position: 'absolute', bottom: 90, right: 20,
    backgroundColor: colors.terracotta, width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.terracotta, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
});

// Mode dégradé — < 50 Ko, 0 animation, 0 ombre
const degraded = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff', padding: 24, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: '800', color: '#000', marginBottom: 4 },
  sub: { fontSize: 12, color: '#555', marginBottom: 24 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#000', padding: 12, fontSize: 15 },
  btn: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 18, justifyContent: 'center' },
  btnText: { fontSize: 18 },
  link: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  linkText: { fontSize: 15, color: '#000' },
});
