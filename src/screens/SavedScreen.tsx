import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../store';
import { MUSHROOMS, Mushroom } from '../data/mushrooms';
import { Nav } from '../types';
import { norm, pad2 } from '../utils';
import { CircleButton, Empty, MushroomCard, SectionHeader, Shell, SheetScroll, Tile } from '../components/ui';

export default function SavedScreen() {
  const nav = useNavigation<Nav>();
  const { colors, t, language, favorites } = useApp();
  const [sort, setSort] = useState<'recent' | 'az'>('recent');

  const saved: Mushroom[] = favorites
    .map((id) => MUSHROOMS.find((m) => m.id === id))
    .filter((m): m is Mushroom => m !== undefined);
  const list: Mushroom[] =
    sort === 'recent'
      ? saved.slice().reverse()
      : saved.slice().sort((a, b) => (norm(a.name[language]) < norm(b.name[language]) ? -1 : 1));
  const edibleSaved = saved.filter((m) => m.edible).length;

  return (
    <Shell
      line1={t('savedTitle1')}
      line2={t('savedTitle2')}
      right={<CircleButton icon="search-outline" dark label={t('search')} onPress={() => nav.navigate('Tabs', { screen: 'Search' })} />}
    >
      <SheetScroll>
        <Text style={{ color: colors.ink, fontSize: 24, fontWeight: '600', letterSpacing: -0.8 }}>{t('savedHeading')}</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 22 }}>
          <Tile label={t('tileSaved')} value={pad2(saved.length)} progress={saved.length / MUSHROOMS.length} />
          <Tile label={t('tileSavedEdible')} value={pad2(edibleSaved)} progress={saved.length === 0 ? 0 : edibleSaved / saved.length} />
        </View>

        <SectionHeader
          title={t('savedSection')}
          right={`${t('sort')}: ${sort === 'recent' ? t('sortRecent') : t('sortAz')}`}
          onRight={() => setSort(sort === 'recent' ? 'az' : 'recent')}
        />
        {list.length === 0 ? (
          <Empty icon="basket-outline" title={t('savedEmptyTitle')} text={t('savedEmptyText')} />
        ) : (
          list.map((m) => <MushroomCard key={m.id} m={m} />)
        )}
      </SheetScroll>
    </Shell>
  );
}
