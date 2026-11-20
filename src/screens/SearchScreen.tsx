import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, ScrollViewInstance, ScrollViewProps, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../store';
import { MONTHS, MONTHS_FULL } from '../i18n';
import { MUSHROOMS, HABITATS, Habitat } from '../data/mushrooms';
import { currentMonth, inSeason, norm, pad2, seasonCounts, speciesWord } from '../utils';
import { Chip, Empty, ResultRow, Sheet } from '../components/ui';
import SeasonChart from '../components/SeasonChart';

type Edibility = 'all' | 'edible' | 'inedible';
const EDIBILITY: Edibility[] = ['all', 'edible', 'inedible'];
const ITEM_W = 56;

export default function SearchScreen() {
  const { colors, t, language } = useApp();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const monthScroll = useRef<ScrollViewInstance>(null);

  const [q, setQ] = useState('');
  const [edib, setEdib] = useState<Edibility>('all');
  const [habitat, setHabitat] = useState<'all' | Habitat>('all');
  const [month, setMonth] = useState<number>(currentMonth());

  const base = useMemo(() => {
    const nq = norm(q.trim());
    return MUSHROOMS.filter((m) => {
      if (nq && !norm(`${m.name.pl} ${m.name.en} ${m.latin}`).includes(nq)) return false;
      if (edib === 'edible' && !m.edible) return false;
      if (edib === 'inedible' && m.edible) return false;
      if (habitat !== 'all' && !m.habitat.includes(habitat)) return false;
      return true;
    });
  }, [q, edib, habitat]);

  const results = useMemo(() => (month === 0 ? base : base.filter((m) => inSeason(m, month))), [base, month]);
  const counts = useMemo(() => seasonCounts(base), [base]);

  const reset = () => { setQ(''); setEdib('all'); setHabitat('all'); setMonth(0); };
  const monthItems = Array.from({ length: 13 }, (_, i) => i);
  const edibLabel = (k: Edibility) => (k === 'all' ? t('all') : t(k));

  const listHeader = (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {EDIBILITY.map((k) => (
          <Chip key={k} label={edibLabel(k)} active={edib === k} onPress={() => setEdib(k)} />
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, flexGrow: 0 }}>
        <Chip label={t('all')} active={habitat === 'all'} onPress={() => setHabitat('all')} />
        {HABITATS.map((h) => (
          <Chip key={h} label={t(h)} active={habitat === h} onPress={() => setHabitat(h)} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, marginBottom: 4 }}>
        <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '700', letterSpacing: -0.6 }}>
          {t('results')} ({results.length})
        </Text>
        <Pressable onPress={reset} hitSlop={10}>
          <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '500' }}>{t('clear')}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 56, borderRadius: 28, backgroundColor: colors.btn, paddingHorizontal: 20 }}>
          <Ionicons name="search-outline" size={22} color={colors.sub} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={colors.sub}
            autoCorrect={false}
            returnKeyType="search"
            style={{ flex: 1, marginLeft: 12, fontSize: 16, color: colors.ink }}
          />
          {q ? (
            <Pressable onPress={() => setQ('')} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('clear')}>
              <Ionicons name="close-circle" size={20} color={colors.sub} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        ref={monthScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 14 }}
        onContentSizeChange={() => monthScroll.current?.scrollTo({ x: Math.max(0, (month - 2) * ITEM_W), animated: false })}
      >
        {monthItems.map((i) => {
          const active = i === month;
          return (
            <Pressable
              key={i}
              onPress={() => setMonth(i)}
              style={{ width: ITEM_W, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? colors.dark : 'transparent' }}
            >
              <Text style={{ fontSize: 15, fontWeight: active ? '600' : '400', color: active ? colors.onDark : colors.sub }}>
                {i === 0 ? t('allShort') : MONTHS[language][i - 1]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Text style={{ color: colors.sub, fontSize: 18 }}>{month === 0 ? t('allMonths') : MONTHS_FULL[language][month - 1]}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ color: colors.ink, fontSize: 64, fontWeight: '300', letterSpacing: -2 }}>{results.length}</Text>
          <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '500', marginLeft: 8 }}>{speciesWord(results.length, language)}</Text>
        </View>
      </View>

      <SeasonChart counts={counts} highlight={month} width={width} />

      <Sheet>
        <FlatList
          data={results}
          keyExtractor={(m) => m.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={<Empty icon="leaf-outline" title={t('noResults')} text={t('noResultsText')} />}
          contentContainerStyle={{ padding: 20, paddingTop: 24, paddingBottom: insets.bottom + 120 }}
          renderItem={({ item, index }) => <ResultRow m={item} last={index === results.length - 1} />}
        />
      </Sheet>
    </View>
  );
}
