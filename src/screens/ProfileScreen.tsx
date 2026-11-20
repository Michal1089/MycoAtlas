import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../store';
import { Nav, IconName, DocKey } from '../types';
import { Chip, CircleButton, Shell, SheetScroll } from '../components/ui';

const DOCS: Array<{ key: DocKey; icon: IconName }> = [
  { key: 'privacy', icon: 'shield-checkmark-outline' },
  { key: 'terms', icon: 'document-text-outline' },
  { key: 'licenses', icon: 'ribbon-outline' },
];

export default function ProfileScreen() {
  const nav = useNavigation<Nav>();
  const { colors, t, language, setLanguage, themeMode, setThemeMode } = useApp();

  const heading = (text: string, first?: boolean) => (
    <Text style={{ color: colors.ink, fontSize: 22, fontWeight: '700', letterSpacing: -0.6, marginTop: first ? 0 : 26, marginBottom: 14 }}>{text}</Text>
  );

  return (
    <Shell line1={t('profileTitle1')} line2={t('profileTitle2')} right={<CircleButton icon="person-outline" dark label={t('profile')} />}>
      <SheetScroll>
        {heading(t('language'), true)}
        <View style={{ flexDirection: 'row' }}>
          <Chip label="Polski" active={language === 'pl'} onPress={() => setLanguage('pl')} />
          <Chip label="English" active={language === 'en'} onPress={() => setLanguage('en')} />
        </View>

        {heading(t('theme'))}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 }}>
          <Chip label={t('themeLight')} active={themeMode === 'light'} onPress={() => setThemeMode('light')} />
          <Chip label={t('themeDark')} active={themeMode === 'dark'} onPress={() => setThemeMode('dark')} />
          <Chip label={t('themeSystem')} active={themeMode === 'system'} onPress={() => setThemeMode('system')} />
        </View>

        {heading(t('documents'))}
        {DOCS.map((d) => (
          <Pressable
            key={d.key}
            onPress={() => nav.navigate('Doc', { doc: d.key })}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 30, marginBottom: 12 }}
          >
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.tile, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={d.icon} size={24} color={colors.ink} />
            </View>
            <Text style={{ flex: 1, marginLeft: 14, color: colors.ink, fontSize: 17, fontWeight: '600' }}>{t(d.key)}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.sub} style={{ marginRight: 6 }} />
          </Pressable>
        ))}

        <Text style={{ color: colors.sub, textAlign: 'center', fontSize: 12, marginTop: 18 }}>MycoAtlas v1.0.0</Text>
      </SheetScroll>
    </Shell>
  );
}
