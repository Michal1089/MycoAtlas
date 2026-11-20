import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Keyboard, Linking, Platform, ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../store';
import { MUSHROOMS } from '../data/mushrooms';
import { Nav } from '../types';
import { placesWord, shortName } from '../utils';
import { CircleButton, Chip, Shell, Thumb } from '../components/ui';


const USE_OSM_TILES = false;
const OSM_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const POLAND = { latitude: 52.1, longitude: 19.4, latitudeDelta: 10, longitudeDelta: 10 };

type LatLng = { lat: number; lng: number };
type Perm = 'unknown' | 'granted' | 'denied';

export default function MapScreen() {
  const nav = useNavigation<Nav>();
  const { colors, t, language, spots, addSpot, removeSpot } = useApp();
  const insets = useSafeAreaInsets();

  const map = useRef<MapView>(null);
  const initialized = useRef(false);

  const [ready, setReady] = useState(false);
  const [perm, setPerm] = useState<Perm>('unknown');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [pending, setPending] = useState<LatLng | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [note, setNote] = useState('');


  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        try {
          let res = await Location.getForegroundPermissionsAsync();
          if (res.status === 'undetermined') res = await Location.requestForegroundPermissionsAsync();
          if (active) setPerm(res.status === 'granted' ? 'granted' : 'denied');
        } catch (err) {
          if (active) setPerm('denied');
        }
      })();
      return () => {
        active = false;
      };
    }, []),
  );

  const askPermission = async (): Promise<boolean> => {
    try {
      let res = await Location.getForegroundPermissionsAsync();
      if (res.status !== 'granted' && res.canAskAgain) res = await Location.requestForegroundPermissionsAsync();
      const granted = res.status === 'granted';
      setPerm(granted ? 'granted' : 'denied');
      if (!granted && !res.canAskAgain) {
        Alert.alert(t('locationDenied'), undefined, [
          { text: t('openSettings'), onPress: () => Linking.openSettings() },
          { text: t('cancel'), style: 'cancel' },
        ]);
      }
      return granted;
    } catch (err) {
      return false;
    }
  };

  const goToMe = async (): Promise<LatLng | null> => {
    try {
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = pos.coords;
      map.current?.animateToRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 600);
      return { lat: latitude, lng: longitude };
    } catch (err) {
      return null;
    }
  };

  const locate = async (mark: boolean) => {
    const granted = perm === 'granted' ? true : await askPermission();
    if (!granted) return;
    const me = await goToMe();
    if (!me) {
      Alert.alert(t('locationError'));
      return;
    }
    if (mark) {
      setPending(me);
      setSelectedId(null);
    }
  };

  const enableLocation = async () => {
    if (await askPermission()) await goToMe();
  };


  const fit = () => {
    if (!ready || !map.current) return;
    if (spots.length === 0) {
      map.current.animateToRegion(POLAND, 500);
    } else if (spots.length === 1) {
      map.current.animateToRegion(
        { latitude: spots[0].lat, longitude: spots[0].lng, latitudeDelta: 0.02, longitudeDelta: 0.02 },
        500,
      );
    } else {
      map.current.fitToCoordinates(
        spots.map((s) => ({ latitude: s.lat, longitude: s.lng })),
        { edgePadding: { top: 60, right: 60, bottom: 240, left: 60 }, animated: true },
      );
    }
  };

  useEffect(() => {
    if (!ready || perm === 'unknown' || initialized.current) return;
    initialized.current = true;
    if (perm === 'granted') goToMe();
    else fit();
  }, [ready, perm]);


  const search = async () => {
    const q = query.trim();
    if (!q) return;
    Keyboard.dismiss();
    setSearching(true);
    try {
      const results = await Location.geocodeAsync(q);
      if (results.length === 0) {
        Alert.alert(t('searchNotFound'));
      } else {
        const { latitude, longitude } = results[0];
        map.current?.animateToRegion({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }, 600);
      }
    } catch (err) {
      Alert.alert(t('searchError'));
    } finally {
      setSearching(false);
    }
  };


  const cancelPending = () => {
    setPending(null);
    Keyboard.dismiss();
  };

  const savePending = () => {
    if (!pending) return;
    addSpot({ lat: pending.lat, lng: pending.lng, mushroomId: draft, note: note.trim() });
    setPending(null);
    setNote('');
    setDraft(null);
    Keyboard.dismiss();
  };

  const confirmDelete = (id: string) =>
    Alert.alert(t('deleteSpotTitle'), undefined, [
      {
        text: t('deleteSpot'),
        style: 'destructive',
        onPress: () => {
          removeSpot(id);
          setSelectedId(null);
        },
      },
      { text: t('cancel'), style: 'cancel' },
    ]);

  const selected = spots.find((s) => s.id === selectedId) ?? null;
  const selectedMushroom = selected && selected.mushroomId ? MUSHROOMS.find((m) => m.id === selected.mushroomId) ?? null : null;
  const dateText = (ts: number) => new Date(ts).toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-GB');
  const coords = (p: LatLng) => `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;

  const panel: ViewStyle = {
    position: 'absolute', left: 16, right: 16, bottom: insets.bottom + 100, backgroundColor: colors.sheet,
    borderRadius: 30, borderWidth: 1, borderColor: colors.border, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 18, shadowOffset: { width: 0, height: 6 }, elevation: 8,
  };
  const floating: ViewStyle = {
    backgroundColor: colors.sheet, borderWidth: 1, borderColor: colors.border,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  };
  const pillBtn = (bg: string): ViewStyle => ({
    height: 52, borderRadius: 26, backgroundColor: bg, alignItems: 'center', justifyContent: 'center',
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Shell
        line1={t('mapTitle1')}
        line2={t('mapTitle2')}
        right={
          <>
            <CircleButton icon="locate-outline" label={t('locate')} onPress={() => locate(false)} />
            <CircleButton icon="expand-outline" dark label={t('fitAll')} onPress={fit} />
          </>
        }
      >
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <MapView
            ref={map}
            style={{ flex: 1 }}
            initialRegion={POLAND}
            mapType={USE_OSM_TILES && Platform.OS === 'android' ? 'none' : 'standard'}
            showsUserLocation={perm === 'granted'}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            onMapReady={() => setReady(true)}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setPending({ lat: latitude, lng: longitude });
              setSelectedId(null);
            }}
          >
            {USE_OSM_TILES ? <UrlTile urlTemplate={OSM_URL} maximumZ={19} flipY={false} shouldReplaceMapContent /> : null}

            {spots.map((s) => (
              <Marker
                key={s.id}
                coordinate={{ latitude: s.lat, longitude: s.lng }}
                onPress={(e) => {
                  e.stopPropagation();
                  setSelectedId(s.id);
                  setPending(null);
                }}
              />
            ))}

            {pending ? <Marker coordinate={{ latitude: pending.lat, longitude: pending.lng }} pinColor="blue" /> : null}
          </MapView>

          {USE_OSM_TILES ? (
            <View pointerEvents="none" style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
              <Text style={{ fontSize: 10, color: '#333' }}>© OpenStreetMap contributors</Text>
            </View>
          ) : null}

          {!ready ? (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
              <ActivityIndicator color={colors.sub} />
            </View>
          ) : null}

          {ready && perm === 'denied' ? (
            <View style={{ position: 'absolute', top: 12, left: 16, right: 16 }}>
              <View style={[floating, { flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: 26, paddingHorizontal: 18 }]}>
                <Ionicons name="search-outline" size={20} color={colors.sub} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  onSubmitEditing={search}
                  placeholder={t('mapSearchPlaceholder')}
                  placeholderTextColor={colors.sub}
                  returnKeyType="search"
                  autoCorrect={false}
                  style={{ flex: 1, marginLeft: 10, fontSize: 15, color: colors.ink }}
                />
                {searching ? (
                  <ActivityIndicator color={colors.sub} />
                ) : query ? (
                  <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('clear')}>
                    <Ionicons name="close-circle" size={20} color={colors.sub} />
                  </Pressable>
                ) : null}
              </View>
              <Pressable
                onPress={enableLocation}
                accessibilityRole="button"
                style={[floating, { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 8, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }]}
              >
                <Ionicons name="location-outline" size={14} color={colors.accent} />
                <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '600', marginLeft: 6 }}>{t('enableLocation')}</Text>
              </Pressable>
            </View>
          ) : null}

          {ready && pending ? (
            <View style={panel}>
              <Text style={{ color: colors.ink, fontSize: 20, fontWeight: '700', letterSpacing: -0.5 }}>{t('newSpot')}</Text>
              <Text style={{ color: colors.sub, fontSize: 13, marginTop: 2 }}>{coords(pending)}</Text>

              <Text style={{ color: colors.sub, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 14, marginBottom: 8 }}>
                {t('whichMushroom')}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} keyboardShouldPersistTaps="handled">
                <Chip label={t('otherMushroom')} active={draft === null} onPress={() => setDraft(null)} />
                {MUSHROOMS.map((m) => (
                  <Chip key={m.id} label={shortName(m.name[language])} active={draft === m.id} onPress={() => setDraft(m.id)} />
                ))}
              </ScrollView>

              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder={t('notePlaceholder')}
                placeholderTextColor={colors.sub}
                style={{ marginTop: 12, height: 48, borderRadius: 24, backgroundColor: colors.tile, paddingHorizontal: 18, fontSize: 15, color: colors.ink }}
              />

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                <Pressable onPress={cancelPending} accessibilityRole="button" style={[pillBtn(colors.tile), { flex: 1 }]}>
                  <Text style={{ color: colors.ink, fontSize: 15, fontWeight: '600' }}>{t('cancel')}</Text>
                </Pressable>
                <Pressable onPress={savePending} accessibilityRole="button" style={[pillBtn(colors.dark), { flex: 2 }]}>
                  <Text style={{ color: colors.onDark, fontSize: 15, fontWeight: '600' }}>{t('saveSpot')}</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {ready && !pending && selected ? (
            <View style={panel}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {selectedMushroom ? (
                  <Thumb m={selectedMushroom} />
                ) : (
                  <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="location-outline" size={26} color={colors.ink} />
                  </View>
                )}
                <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
                  <Text numberOfLines={1} style={{ color: colors.ink, fontSize: 17, fontWeight: '600', letterSpacing: -0.3 }}>
                    {selectedMushroom ? shortName(selectedMushroom.name[language]) : t('unknownMushroom')}
                  </Text>
                  <Text numberOfLines={1} style={{ color: colors.sub, fontSize: 13, marginTop: 3 }}>
                    {dateText(selected.createdAt)} · {coords(selected)}
                  </Text>
                </View>
                <Pressable onPress={() => setSelectedId(null)} hitSlop={12} accessibilityRole="button" accessibilityLabel={t('close')}>
                  <Ionicons name="close" size={22} color={colors.sub} />
                </Pressable>
              </View>

              {selected.note ? <Text style={{ color: colors.ink, fontSize: 15, lineHeight: 21, marginTop: 12 }}>{selected.note}</Text> : null}

              <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                {selectedMushroom ? (
                  <Pressable
                    onPress={() => nav.navigate('Detail', { id: selectedMushroom.id })}
                    accessibilityRole="button"
                    style={[pillBtn(colors.dark), { flex: 2 }]}
                  >
                    <Text style={{ color: colors.onDark, fontSize: 15, fontWeight: '600' }}>{t('openMushroom')}</Text>
                  </Pressable>
                ) : null}
                <Pressable onPress={() => confirmDelete(selected.id)} accessibilityRole="button" style={[pillBtn(colors.warnBg), { flex: 1 }]}>
                  <Text style={{ color: colors.warnText, fontSize: 15, fontWeight: '600' }}>{t('deleteSpot')}</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {ready && !pending && !selected ? (
            <View style={[panel, { flexDirection: 'row', alignItems: 'center', padding: 12 }]}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="location-outline" size={26} color={colors.ink} />
              </View>
              <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
                <Text style={{ color: colors.ink, fontSize: 16, fontWeight: '600', letterSpacing: -0.3 }}>{t('mapHint')}</Text>
                <Text style={{ color: colors.sub, fontSize: 14, marginTop: 3 }}>
                  {spots.length} {placesWord(spots.length, language)}
                </Text>
              </View>
              <CircleButton icon="navigate" dark size={48} label={t('markMe')} onPress={() => locate(true)} />
            </View>
          ) : null}
        </View>
      </Shell>
    </KeyboardAvoidingView>
  );
}