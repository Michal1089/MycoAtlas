import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../store';
import { RootStackParamList } from '../types';
import { CircleButton, Sheet, titleStyle } from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'Doc'>;

export default function DocScreen({ route, navigation }: Props) {
  const { colors, t } = useApp();
  const insets = useSafeAreaInsets();
  const key = route.params.doc;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 24 }}>
        <CircleButton icon="chevron-back" size={48} label={t('back')} onPress={() => navigation.goBack()} />
        <Text style={[titleStyle(colors.ink, 32), { marginTop: 20 }]}>{t(key)}</Text>
      </View>
      <Sheet>
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 28, paddingBottom: insets.bottom + 32 }}>
          <Text style={{ color: colors.ink, fontSize: 16, lineHeight: 25 }}>{t(`${key}Text`)}</Text>
        </ScrollView>
      </Sheet>
    </View>
  );
}
