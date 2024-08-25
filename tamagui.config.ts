import { tokens, config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

import * as themes from './constants/themes';

export const tamaguiConfig = createTamagui({
  ...config,
  reactNative: true,
  tokens,
  themes
});
export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
