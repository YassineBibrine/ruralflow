import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../constants/colors';

type ExtractedTrip = { destination: string | null; date: string | null; heure: string | null };

type Props = {
  visible: boolean;
  onClose: () => void;
  onResult: (data: ExtractedTrip) => void;
};

export default function ChatbotSheet({ visible, onClose, onResult }: Props) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedTrip | null>(null);
  const [error, setError] = useState(false);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(false);
    setExtracted(null);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          max_tokens: 150,
          messages: [
            {
              role: 'system',
              content: `Tu es l'IA de RuralFlow, une app de covoiturage étudiant au Maroc. Analyse la demande et retourne UNIQUEMENT un JSON valide:
{"destination": string|null, "date": string|null, "heure": string|null}
Si une info manque mets null. Aucun texte autour du JSON.`,
            },
            { role: 'user', content: input },
          ],
        }),
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed: ExtractedTrip = JSON.parse(clean);
      setExtracted(parsed);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Assistant RuralFlow 🤖</Text>
          <Text style={styles.sub}>Décris ton trajet en français, arabe ou darija</Text>

          <View style={styles.examples}>
            {['je pars demain à 8h pour Rabat', 'غدا الصباح كازا', 'dman sbah l kénitra'].map((e) => (
              <View key={e} style={styles.chip}>
                <Text style={styles.chipText}>{e}</Text>
              </View>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Ex: je veux aller à Rabat demain matin"
            placeholderTextColor={colors.mid}
            value={input}
            onChangeText={setInput}
            multiline
            numberOfLines={3}
          />

          {loading && (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={colors.terracotta} />
              <Text style={styles.loadingText}>L'IA analyse votre demande...</Text>
            </View>
          )}

          {extracted && !loading && (
            <View style={styles.resultRow}>
              {extracted.destination && (
                <View style={[styles.resultChip, { backgroundColor: colors.indigo }]}>
                  <Text style={styles.resultChipText}>📍 {extracted.destination}</Text>
                </View>
              )}
              {extracted.date && (
                <View style={[styles.resultChip, { backgroundColor: colors.sage }]}>
                  <Text style={styles.resultChipText}>📅 {extracted.date}</Text>
                </View>
              )}
              {extracted.heure && (
                <View style={[styles.resultChip, { backgroundColor: colors.terracotta }]}>
                  <Text style={styles.resultChipText}>🕗 {extracted.heure}</Text>
                </View>
              )}
            </View>
          )}

          {error && <Text style={styles.errorText}>Connexion requise pour l'IA</Text>}

          {!extracted ? (
            <TouchableOpacity style={[styles.sendBtn, loading && { opacity: 0.5 }]} onPress={analyze} disabled={loading}>
              <Text style={styles.sendText}>Analyser avec l'IA →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                onResult(extracted);
                onClose();
              }}
            >
              <Text style={styles.sendText}>Voir les trajets →</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: colors.cream, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  handle: { width: 40, height: 4, backgroundColor: colors.mid, borderRadius: 2, alignSelf: 'center', marginBottom: 20, opacity: 0.4 },
  title: { fontSize: 20, fontWeight: '700', color: colors.charcoal, marginBottom: 4 },
  sub: { fontSize: 13, color: colors.mid, marginBottom: 16 },
  examples: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { backgroundColor: colors.sand, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { fontSize: 12, color: colors.charcoal },
  input: { backgroundColor: colors.sand, borderRadius: 12, padding: 14, fontSize: 15, color: colors.charcoal, minHeight: 80, textAlignVertical: 'top', marginBottom: 16 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  loadingText: { color: colors.mid, fontSize: 13 },
  resultRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  resultChip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  resultChipText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  errorText: { color: colors.red, fontSize: 13, marginBottom: 12 },
  sendBtn: { backgroundColor: colors.terracotta, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 12 },
  sendText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  cancel: { alignItems: 'center', padding: 10 },
  cancelText: { color: colors.mid, fontSize: 14 },
});
