import { useColorScheme as usePreferedColorScheme } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import {
  ColorScheme,
  COLOR_SCHEME_STORAGE_KEY,
  isColorScheme,
  DEFAULT_COLOR_SCHEME
} from '@/constants/colors';
import { useConfigStore } from '@/store/config';
import { storage } from '@/store/mmkv';

export function useColorScheme(): [
  ColorScheme,
  (colorScheme: ColorScheme) => void
] {
  const [storedColorScheme, _] = useMMKVString(
    COLOR_SCHEME_STORAGE_KEY,
    storage
  );
  const updateColorScheme = useConfigStore((state) => state.updateColorScheme);
  const selectedColorScheme = selectColorScheme(storedColorScheme);
  return [selectedColorScheme, updateColorScheme];
}

export function getColorScheme(): ColorScheme {
  const colorScheme = storage.getString(COLOR_SCHEME_STORAGE_KEY);
  return selectColorScheme(colorScheme);
}

function selectColorScheme(
  colorScheme: ColorScheme | string | undefined
): ColorScheme {
  if (isColorScheme(colorScheme!) && colorScheme !== undefined) {
    return colorScheme;
  }
  return usePreferedColorScheme() || DEFAULT_COLOR_SCHEME;
}

export function invertColorScheme(colorScheme: ColorScheme): ColorScheme {
  return colorScheme === 'light' ? 'dark' : 'light';
}
