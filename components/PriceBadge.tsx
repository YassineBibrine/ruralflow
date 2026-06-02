import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

type Props = { price: number };

export default function PriceBadge({ price }: Props) {
  const getStyle = () => {
    if (price <= 8) return { bg: colors.greenLight, text: colors.green, label: 'Économique ✓' };
    if (price <= 12) return { bg: colors.orangeLight, text: colors.orange, label: 'Moyen' };
    return { bg: colors.redLight, text: colors.red, label: 'Élevé ↑' };
  };

  const s = getStyle();

  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.text }]}>
        {price} DH · {s.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '600' },
});
