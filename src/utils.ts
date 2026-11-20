import { Mushroom } from './data/mushrooms';
import { Lang } from './i18n';

const DIACRITICS: Record<string, string> = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

export const norm = (s: string): string =>
  s.toLowerCase().replace(/[ąćęłńóśźż]/g, (c) => DIACRITICS[c] ?? c);

export const inSeason = (m: Mushroom, month: number): boolean => month >= m.season[0] && month <= m.season[1];

export const seasonCounts = (list: Mushroom[]): number[] =>
  Array.from({ length: 12 }, (_, i) => list.filter((m) => inSeason(m, i + 1)).length);

export const currentMonth = (): number => new Date().getMonth() + 1;

export const pad2 = (n: number): string => (n < 10 ? `0${n}` : String(n));

export const shortName = (name: string): string => name.replace(/\s*\(.*\)\s*$/, '');

export function plural(n: number, lang: Lang, pl: [string, string, string], en: [string, string]): string {
  if (lang === 'en') return n === 1 ? en[0] : en[1];
  if (n === 1) return pl[0];
  const d = n % 10;
  const h = n % 100;
  if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return pl[1];
  return pl[2];
}

export const speciesWord = (n: number, lang: Lang): string =>
  plural(n, lang, ['gatunek', 'gatunki', 'gatunków'], ['species', 'species']);

export const typesWord = (n: number, lang: Lang): string =>
  plural(n, lang, ['typ', 'typy', 'typów'], ['type', 'types']);

export const placesWord = (n: number, lang: Lang): string =>
  plural(n, lang, ['miejsce', 'miejsca', 'miejsc'], ['spot', 'spots']);
