/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, styled } from 'tamagui';
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import tamaguiConfig from '@/tamagui.config';

export function useThemeColor(
  colorName: keyof (typeof tamaguiConfig.themes)['dark']
) {
  const [colorScheme, _] = useColorScheme();
  const color = tamaguiConfig.themes[colorScheme][colorName];
  return color.val;
}

export const Text = styled(DefaultText);

export const View = styled(DefaultView, {
  backgroundColor: '$background',
  padding: 10
});

export const SafeAreaView = styled(DefaultSafeAreaView, {
  backgroundColor: '$background',
  padding: 10
});
