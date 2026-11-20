import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../store';
import { MONTHS, MONTHS_FULL } from '../i18n';
import { MUSHROOMS } from '../data/mushrooms';
import { IMAGES } from '../data/images';
import { RootStackParamList } from '../types';
import { shortName, typesWord } from '../utils';
import { Chip, CircleButton, InfoRow, Sheet, StatusPill, Thumb, titleStyle } from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { colors, t, language, favorites, toggleFavorite } = useApp();
  const insets = useSafeAreaInsets();
  const m = MUSHROOMS.find((x) => x.id === route.params.id);
  if (!m) return null;

  const saved = favorites.includes(m.id);
  const words = shortName(m.name[language]).split(' ');
  const first = words[0];
  const rest = words.slice(1).join(' ');
  const [a, b] = m.season;
  const seasonMonths: string[] = [];
  for (let i = a; i <= b; i++) seasonMonths.push(MONTHS[language][i - 1]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <CircleButton icon="chevron-back" size={48} label={t('back')} onPress={() => navigation.goBack()} />
          <Text style={{ color: colors.ink, fontSize: 18, fontWeight: '600' }}>{t('details')}</Text>
          <CircleButton
            icon={saved ? 'basket' : 'basket-outline'}
            dark
            size={48}
            label={saved ? t('remove') : t('save')}
            onPress={() => toggleFavorite(m.id)}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 24 }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ color: colors.sub, fontSize: 16, fontStyle: 'italic', marginBottom: 4 }}>{m.latin}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={titleStyle(colors.ink, 44)}>{first}</Text>
            {rest ? (
              <Text numberOfLines={1} adjustsFontSizeToFit style={titleStyle(colors.subLight, 44)}>{rest}</Text>
            ) : null}
            <View style={{ marginTop: 12 }}><StatusPill m={m} /></View>
          </View>
          <Thumb m={m} size={112} bg={colors.btn} />
        </View>
      </View>

      <Sheet radius={48}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingTop: 26, paddingBottom: insets.bottom + 110 }}
        >
          {IMAGES[m.id] ? (
            <Image source={IMAGES[m.id]} style={{ width: '100%', height: 210, borderRadius: 28, marginBottom: 20 }} resizeMode="cover" />
          ) : null}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
            {seasonMonths.map((mn) => (
              <Chip key={mn} label={mn} active />
            ))}
          </ScrollView>

          <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '700', letterSpacing: -0.6, marginTop: 22, marginBottom: 8 }}>{t('about')}</Text>
          <Text style={{ color: colors.sub, fontSize: 16, lineHeight: 24 }}>{m.desc[language]}</Text>

          <View style={{ marginTop: 10 }}>
            <InfoRow
              icon="leaf-outline"
              title={t('habitat')}
              sub={m.habitat.map((h) => t(h)).join(', ')}
              pill={`${m.habitat.length} ${typesWord(m.habitat.length, language)}`}
            />
            <InfoRow
              icon="calendar-outline"
              title={t('season')}
              sub={`${MONTHS_FULL[language][a - 1]} – ${MONTHS_FULL[language][b - 1]}`}
              pill={`${b - a + 1} ${t('monthsShort')}`}
              last
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, padding: 14, borderRadius: 20, backgroundColor: colors.warnBg }}>
            <Ionicons name="warning-outline" size={20} color={colors.warnText} />
            <Text style={{ color: colors.warnText, flex: 1, marginLeft: 10, fontSize: 13, lineHeight: 18 }}>{t('warning')}</Text>
          </View>
        </ScrollView>
      </Sheet>

      <Pressable
        onPress={() => toggleFavorite(m.id)}
        accessibilityRole="button"
        style={{
          position: 'absolute', left: 20, right: 20, bottom: insets.bottom + 16, height: 60, borderRadius: 30,
          backgroundColor: colors.dark, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Ionicons name={saved ? 'basket' : 'basket-outline'} size={22} color={colors.onDark} />
        <Text style={{ color: colors.onDark, fontSize: 16, fontWeight: '600', marginLeft: 10 }}>{saved ? t('remove') : t('save')}</Text>
      </Pressable>
    </View>
  );
}
