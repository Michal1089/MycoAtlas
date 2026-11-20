import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS, Lang } from './i18n';
import { light, dark, Colors } from './theme';
import { Spot } from './types';

const KEY = 'mycoatlas:v2';

export type ThemeMode = 'light' | 'dark' | 'system';
type Persisted = { favorites: string[]; language: Lang; themeMode: ThemeMode; spots: Spot[] };

type AppContextValue = Persisted & {
  ready: boolean;
  isDark: boolean;
  colors: Colors;
  t: (key: string) => string;
  toggleFavorite: (id: string) => void;
  addSpot: (s: Omit<Spot, 'id' | 'createdAt'>) => void;
  removeSpot: (id: string) => void;
  setLanguage: (l: Lang) => void;
  setThemeMode: (m: ThemeMode) => void;
};

const Ctx = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<Persisted>({ favorites: [], language: 'pl', themeMode: 'system', spots: [] });
  const [system, setSystem] = useState<Exclude<ColorSchemeName, null>>(Appearance.getColorScheme() ?? 'light');

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) =>
      setSystem(colorScheme ?? 'light'),
    );
    return () => sub.remove();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setState((s) => ({ ...s, ...(JSON.parse(raw) as Partial<Persisted>) }));
      } catch (e) {
        // brak zapisanych danych lub błąd odczytu – zaczynamy od ustawień domyślnych
      }
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id],
    }));
  }, []);

  const addSpot = useCallback((s: Omit<Spot, 'id' | 'createdAt'>) => {
    const spot: Spot = { ...s, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now() };
    setState((st) => ({ ...st, spots: [...st.spots, spot] }));
  }, []);

  const removeSpot = useCallback((id: string) => {
    setState((st) => ({ ...st, spots: st.spots.filter((x) => x.id !== id) }));
  }, []);

  const value = useMemo<AppContextValue>(() => {
    const isDark = state.themeMode === 'system' ? system === 'dark' : state.themeMode === 'dark';
    const dict = STRINGS[state.language];
    return {
      ready,
      isDark,
      colors: isDark ? dark : light,
      language: state.language,
      themeMode: state.themeMode,
      favorites: state.favorites,
      spots: state.spots,
      t: (k: string) => dict[k] ?? k,
      toggleFavorite,
      addSpot,
      removeSpot,
      setLanguage: (language: Lang) => setState((s) => ({ ...s, language })),
      setThemeMode: (themeMode: ThemeMode) => setState((s) => ({ ...s, themeMode })),
    };
  }, [state, system, ready, toggleFavorite, addSpot, removeSpot]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = (): AppContextValue => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside AppProvider');
  return v;
};
