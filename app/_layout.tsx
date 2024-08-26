import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { registerDevMenuItems } from 'expo-dev-menu';
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv';

import { tamaguiConfig } from '@/tamagui.config';
import {
  useColorScheme,
  invertColorScheme,
  getColorScheme
} from '@/components/useColorScheme';
import { useConfigStore } from '@/store/config';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
};

const devMenuItems = [
  {
    name: 'Toggle Dark Mode',
    callback: () => {
      const colorScheme = getColorScheme();
      const invertedColorScheme = invertColorScheme(colorScheme);
      useConfigStore.getState().updateColorScheme(invertedColorScheme);
    }
  }
];

registerDevMenuItems(devMenuItems);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  });

  const [colorScheme, _] = useColorScheme();
  const invertedColorScheme = invertColorScheme(colorScheme);
  const tamaguiTheme = tamaguiConfig.themes[colorScheme];
  useEffect(() => {
    console.debug('Setting navigation styles');
    NavigationBar.setBackgroundColorAsync(tamaguiTheme.background.val);
    NavigationBar.setButtonStyleAsync(invertedColorScheme);
  }, [colorScheme, tamaguiTheme]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useMMKVDevTools();

  const [colorScheme, _] = useColorScheme();
  console.debug(`colorScheme: ${colorScheme}`);
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const statusBarStyle = theme === DarkTheme ? 'light' : 'dark';

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={theme}>
        <StatusBar style={statusBarStyle} />
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
