import { StyleSheet, Vibration } from 'react-native';
import { Button, XStack, YStack } from 'tamagui';

import { SafeAreaView } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <SafeAreaView backgroundColor="$background" style={styles.container}>
      <YStack>
        <XStack gap="$2" justifyContent="space-around">
          <Button
            size="$6"
            onPressIn={() => Vibration.vibrate([0, 10000], true)}
            onPressOut={() => Vibration.cancel()}
          >
            I'm just a button
          </Button>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
