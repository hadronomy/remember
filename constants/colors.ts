export const DEFAULT_COLOR_SCHEME = 'dark';
export const COLOR_SCHEME_STORAGE_KEY = 'colorScheme';

export type ColorScheme = 'light' | 'dark';
export function isColorScheme(value: string): value is ColorScheme {
  return value === 'light' || value === 'dark';
}
