import React, { ReactNode } from 'react';
import { View, Text, Pressable, Image, Alert, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../store';
import { MONTHS } from '../i18n';
import { Mushroom } from '../data/mushrooms';
import { IMAGES } from '../data/images';
import { IconName, Nav } from '../types';

/* ---------- przyciski i drobne elementy ---------- */

export function CircleButton({ icon, onPress, dark, size = 56, label }: {
  icon: IconName; onPress?: () => void; dark?: boolean; size?: number; label: string;
}) {
  const { colors } = useApp();
  const style: ViewStyle = {
    width: size, height: size, borderRadius: size / 2,
    backgroundColor: dark ? colors.dark : colors.btn, alignItems: 'center', justifyContent: 'center',
  };
  const icn = <Ionicons name={icon} size={Math.round(size * 0.43)} color={dark ? colors.onDark : colors.ink} />;
  if (!onPress) return <View style={style}>{icn}</View>;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={style}>
      {icn}
    </Pressable>
  );
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  const { colors } = useApp();
  const style: ViewStyle = {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24, marginRight: 8,
    backgroundColor: active ? colors.accent : colors.tile,
  };
  const text = <Text style={{ fontSize: 15, fontWeight: '500', color: active ? colors.onAccent : colors.sub }}>{label}</Text>;
  if (!onPress) return <View style={style}>{text}</View>;
  return <Pressable accessibilityRole="button" onPress={onPress} style={style}>{text}</Pressable>;
}

export function Pill({ text, tone }: { text: string; tone: 'accent' | 'neutral' }) {
  const { colors } = useApp();
  return (
    <View style={{
      alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
      backgroundColor: tone === 'accent' ? colors.accent : colors.tile,
    }}>
      <Text style={{ fontSize: 12, fontWeight: '600', color: tone === 'accent' ? colors.onAccent : colors.ink }}>{text}</Text>
    </View>
  );
}

export function StatusPill({ m }: { m: Mushroom }) {
  const { colors, t } = useApp();
  let bg = colors.tile;
  let fg = colors.ink;
  let dot: string | null = colors.good;
  let text = t('edible');
  if (m.deadly) { bg = colors.accent; fg = colors.onAccent; dot = null; text = t('deadly'); }
  else if (!m.edible) { bg = colors.warnBg; fg = colors.warnText; dot = null; text = t('inedible'); }
  return (
    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: bg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 }}>
      {dot ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dot, marginRight: 6 }} /> : null}
      <Text style={{ color: fg, fontSize: 12, fontWeight: '600' }}>{text}</Text>
    </View>
  );
}

export function Thumb({ m, size = 56, bg }: { m: Mushroom; size?: number; bg?: string }) {
  const { colors } = useApp();
  const src = IMAGES[m.id];
  const box: ViewStyle = {
    width: size, height: size, borderRadius: size / 2, backgroundColor: bg ?? colors.tile,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  };
  return (
    <View style={box}>
      {src ? (
        <Image source={src} style={{ width: size, height: size }} resizeMode="cover" />
      ) : (
        <MaterialCommunityIcons name="mushroom-outline" size={Math.round(size * 0.5)} color={colors.ink} />
      )}
    </View>
  );
}

export function Tile({ label, value, progress }: { label: string; value: string; progress: number }) {
  const { colors } = useApp();
  const r = 20;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <View style={{ flex: 1, height: 118, borderRadius: 28, backgroundColor: colors.tile, padding: 18 }}>
      <Text style={{ color: colors.ink, fontSize: 15, fontWeight: '600', lineHeight: 19 }}>{label}</Text>
      <View style={{ position: 'absolute', right: 14, top: 14, transform: [{ rotate: '-90deg' }] }}>
        <Svg width={52} height={52} viewBox="0 0 52 52">
          <Circle cx={26} cy={26} r={r} stroke={colors.track} strokeWidth={7} fill="none" />
          {p > 0 ? (
            <Circle
              cx={26} cy={26} r={r} stroke={colors.ink} strokeWidth={7} fill="none" strokeLinecap="round"
              strokeDasharray={`${p * c} ${c}`}
            />
          ) : null}
        </Svg>
      </View>
      <Text style={{ position: 'absolute', left: 18, bottom: 10, color: colors.ink, fontSize: 40, fontWeight: '300', letterSpacing: -1.2 }}>{value}</Text>
    </View>
  );
}

export function SectionHeader({ title, right, onRight }: { title: string; right?: string; onRight?: () => void }) {
  const { colors } = useApp();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 26, marginBottom: 14 }}>
      <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '700', letterSpacing: -0.6 }}>{title}</Text>
      {right ? (
        <Pressable onPress={onRight} hitSlop={10}>
          <Text style={{ color: colors.sub, fontSize: 15 }}>{right}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Empty({ icon, title, text }: { icon: IconName; title: string; text?: string }) {
  const { colors } = useApp();
  return (
    <View style={{ alignItems: 'center', marginTop: 48, paddingHorizontal: 24 }}>
      <Ionicons name={icon} size={44} color={colors.sub} />
      <Text style={{ color: colors.ink, fontSize: 18, fontWeight: '600', marginTop: 12 }}>{title}</Text>
      {text ? <Text style={{ color: colors.sub, textAlign: 'center', marginTop: 6, fontSize: 15 }}>{text}</Text> : null}
    </View>
  );
}

/* ---------- karty grzybów ---------- */

export function MushroomCard({ m }: { m: Mushroom }) {
  const nav = useNavigation<Nav>();
  const { colors, t, language, favorites, toggleFavorite } = useApp();
  const saved = favorites.includes(m.id);

  const openMenu = () =>
    Alert.alert(m.name[language], m.latin, [
      { text: t('openDetails'), onPress: () => nav.navigate('Detail', { id: m.id }) },
      { text: saved ? t('remove') : t('save'), onPress: () => toggleFavorite(m.id) },
      { text: t('cancel'), style: 'cancel' },
    ]);

  return (
    <Pressable
      onPress={() => nav.navigate('Detail', { id: m.id })}
      style={{
        flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: colors.border,
        borderRadius: 30, marginBottom: 12, backgroundColor: colors.sheet,
      }}
    >
      <Thumb m={m} />
      <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
        <Text numberOfLines={1} style={{ color: colors.ink, fontSize: 17, fontWeight: '600', letterSpacing: -0.3 }}>{m.name[language]}</Text>
        <Text numberOfLines={1} style={{ color: colors.sub, fontSize: 14, marginTop: 3 }}>{m.latin}</Text>
        <View style={{ marginTop: 8 }}><StatusPill m={m} /></View>
      </View>
      {saved ? <Ionicons name="basket" size={18} color={colors.accent} style={{ marginRight: 6 }} /> : null}
      <Pressable onPress={openMenu} hitSlop={12} accessibilityRole="button" accessibilityLabel={t('add')}>
        <Ionicons name="ellipsis-vertical" size={22} color={colors.sub} />
      </Pressable>
    </Pressable>
  );
}

export function ResultRow({ m, last }: { m: Mushroom; last?: boolean }) {
  const nav = useNavigation<Nav>();
  const { colors, language } = useApp();
  return (
    <Pressable
      onPress={() => nav.navigate('Detail', { id: m.id })}
      style={{
        flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.border,
      }}
    >
      <Thumb m={m} />
      <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
        <Text numberOfLines={1} style={{ color: colors.ink, fontSize: 17, fontWeight: '600', letterSpacing: -0.3 }}>{m.name[language]}</Text>
        <Text numberOfLines={1} style={{ color: colors.sub, fontSize: 14, marginTop: 3 }}>{m.latin}</Text>
      </View>
      <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 9 }}>
        <Text style={{ color: colors.ink, fontSize: 14, fontWeight: '500' }}>
          {MONTHS[language][m.season[0] - 1]} – {MONTHS[language][m.season[1] - 1]}
        </Text>
      </View>
    </Pressable>
  );
}

export function InfoRow({ icon, title, sub, pill, last }: {
  icon: IconName; title: string; sub: string; pill: string; last?: boolean;
}) {
  const { colors } = useApp();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.border }}>
      <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={24} color={colors.ink} />
      </View>
      <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
        <Text style={{ color: colors.ink, fontSize: 17, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: colors.sub, fontSize: 14, marginTop: 3 }}>{sub}</Text>
      </View>
      <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 9 }}>
        <Text style={{ color: colors.ink, fontSize: 14, fontWeight: '500' }}>{pill}</Text>
      </View>
    </View>
  );
}

/* ---------- układ ekranu: szare tło + biały arkusz ---------- */

const titleStyle = (color: string, size = 34): TextStyle => ({
  color, fontSize: size, fontWeight: '700', letterSpacing: -1, lineHeight: size + 4,
});

export function Sheet({ children, radius = 44 }: { children: ReactNode; radius?: number }) {
  const { colors } = useApp();
  return (
    <View style={{ flex: 1, backgroundColor: colors.sheet, borderTopLeftRadius: radius, borderTopRightRadius: radius, overflow: 'hidden' }}>
      {children}
    </View>
  );
}

export function SheetScroll({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingTop: 28, paddingBottom: insets.bottom + 120 }}
    >
      {children}
    </ScrollView>
  );
}

export function Shell({ line1, line2, right, children }: {
  line1: string; line2: string; right?: ReactNode; children: ReactNode;
}) {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={titleStyle(colors.ink)}>{line1}</Text>
          <Text style={titleStyle(colors.subLight)}>{line2}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>{right}</View>
      </View>
      <Sheet>{children}</Sheet>
    </View>
  );
}

export { titleStyle };
