import { Ionicons } from '@expo/vector-icons';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type IconName = keyof typeof Ionicons.glyphMap;
export type DocKey = 'privacy' | 'terms' | 'licenses';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Map: undefined;
  Saved: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Detail: { id: string };
  Doc: { doc: DocKey };
};

export type Nav = NativeStackNavigationProp<RootStackParamList>;

export type Spot = {
  id: string;
  lat: number;
  lng: number;
  mushroomId: string | null; // null = inny / nieznany grzyb
  note: string;
  createdAt: number;
};
