const lightTokens = {
  bg: '#F1F1EE', sheet: '#FFFFFF', ink: '#2B2B2B', sub: '#6E6E6A', subLight: '#85857F',
  border: '#ECECE8', tile: '#F1F1EE', btn: '#FFFFFF', dark: '#3A3A3A', onDark: '#FFFFFF',
  accent: '#CC4E0D', onAccent: '#FFFFFF', warnBg: '#FCE9DC', warnText: '#A83E08', good: '#3E8E5A',
  track: '#FFFFFF', chartFill: '#E4E4E0', grid: '#E6E6E2',
  navBg: '#3A3A3A', navIcon: '#B8B8B4', navActiveBg: '#FFFFFF', navActiveIcon: '#2B2B2B',
};

export type Colors = Record<keyof typeof lightTokens, string>;

export const light: Colors = lightTokens;

export const dark: Colors = {
  bg: '#141414', sheet: '#1E1E1E', ink: '#F2F2EE', sub: '#A3A39E', subLight: '#8A8A85',
  border: '#2C2C2C', tile: '#2A2A2A', btn: '#2A2A2A', dark: '#F2F2EE', onDark: '#1B1B1B',
  accent: '#D9561A', onAccent: '#FFFFFF', warnBg: '#3A2A20', warnText: '#F2A074', good: '#6FCF97',
  track: '#3A3A3A', chartFill: '#262626', grid: '#262626',
  navBg: '#2E2E2E', navIcon: '#8A8A85', navActiveBg: '#F2F2EE', navActiveIcon: '#1B1B1B',
};
