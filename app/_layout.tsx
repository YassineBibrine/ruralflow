import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.indigo,
        tabBarInactiveTintColor: colors.mid,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: '#E0D8CE',
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Trajets',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car' : 'car-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detail"
        options={{
          href: null, // Masqué dans la tab bar, accessible via router.push
        }}
      />
      <Tabs.Screen
        name="confirmation"
        options={{
          href: null, // Masqué dans la tab bar, accessible via router.push
        }}
      />
    </Tabs>
  );
}
