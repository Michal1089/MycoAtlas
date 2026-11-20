import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../store';
import { MUSHROOMS } from '../data/mushrooms';
import { Nav } from '../types';
import { currentMonth, inSeason, pad2, shortName } from '../utils';
import { CircleButton, Pill, Tile, SectionHeader, MushroomCard, Shell, SheetScroll } from '../components/ui';

export default function HomeScreen() {
  const nav = useNavigation<Nav>();
  const { colors, t, language, favorites, toggleFavorite } = useApp();

  const month = currentMonth();
  const edibleCount = MUSHROOMS.filter((m) => m.edible).length;
  const seasonCount = MUSHROOMS.filter((m) => inSeason(m, month)).length;
  const seasonalEdible = MUSHROOMS.filter((m) => m.edible && inSeason(m, month));
  const pool = seasonalEdible.length > 0 ? seasonalEdible : MUSHROOMS.filter((m) => m.edible);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const featured = pool[dayOfYear % pool.length];
  const featuredSaved = favorites.includes(featured.id);

  const goSearch = () => nav.navigate('Tabs', { screen: 'Search' });
  const goSaved = () => nav.navigate('Tabs', { screen: 'Saved' });

  return (
    <Shell
      line1={t('greet1')}
      line2={t('greet2')}
      right={
        <>
          <CircleButton icon="calendar-outline" label={t('search')} onPress={goSearch} />
          <CircleButton icon="basket-outline" dark label={t('saved')} onPress={goSaved} />
        </>
      }
    >
      <SheetScroll>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Pressable style={{ flex: 1, paddingRight: 12 }} onPress={() => nav.navigate('Detail', { id: featured.id })}>
            <Text numberOfLines={2} style={{ color: colors.ink, fontSize: 24, fontWeight: '600', letterSpacing: -0.8 }}>
              {shortName(featured.name[language])}
            </Text>
            <View style={{ marginTop: 8 }}>
              <Pill text={seasonalEdible.length > 0 ? t('inSeasonNow') : t('offSeason')} tone={seasonalEdible.length > 0 ? 'accent' : 'neutral'} />
            </View>
          </Pressable>
          <CircleButton
            icon={featuredSaved ? 'checkmark' : 'add'}
            label={featuredSaved ? t('remove') : t('save')}
            onPress={() => toggleFavorite(featured.id)}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 22 }}>
          <Tile label={t('tileEdible')} value={pad2(edibleCount)} progress={edibleCount / MUSHROOMS.length} />
          <Tile label={t('tileSeason')} value={pad2(seasonCount)} progress={seasonCount / MUSHROOMS.length} />
        </View>

        <SectionHeader title={t('allMushrooms')} right={t('seeAll')} onRight={goSearch} />
        {MUSHROOMS.map((m) => (
          <MushroomCard key={m.id} m={m} />
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Ionicons name="warning-outline" size={16} color={colors.sub} />
          <Text style={{ color: colors.sub, fontSize: 12, marginLeft: 8, flex: 1 }}>{t('warning')}</Text>
        </View>
      </SheetScroll>
    </Shell>
  );
}
