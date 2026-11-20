import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../store';
import { IconName } from '../types';

const ICONS: Record<string, IconName> = {
  Home: 'home-outline',
  Search: 'search-outline',
  Map: 'map-outline',
  Saved: 'basket-outline',
  Profile: 'person-outline',
};

export default function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, t } = useApp();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ position: 'absolute', left: 0, right: 0, bottom: Math.max(insets.bottom, 12) + 4, alignItems: 'center', pointerEvents: 'box-none' }}
    >
      <View
        style={{
          flexDirection: 'row', width: 320, height: 64, borderRadius: 32, backgroundColor: colors.navBg,
          alignItems: 'center', justifyContent: 'space-around',
          shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 8,
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={t(route.name.toLowerCase())}
              onPress={onPress}
              style={{
                width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
                backgroundColor: focused ? colors.navActiveBg : 'transparent',
              }}
            >
              <Ionicons name={ICONS[route.name] ?? 'ellipse-outline'} size={24} color={focused ? colors.navActiveIcon : colors.navIcon} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
